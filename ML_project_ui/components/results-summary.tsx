"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle2,
  FolderOpen,
  ImageIcon,
  Layers,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Category {
  name: string
  count: number
  color: string
}

interface ResultsSummaryProps {
  totalImages: number
  onReset: () => void
}

function generateCategories(total: number): Category[] {
  const categoryTemplates = [
    { name: "Landscapes", color: "bg-emerald-500" },
    { name: "Portraits", color: "bg-sky-500" },
    { name: "Architecture", color: "bg-amber-500" },
    { name: "Nature", color: "bg-lime-500" },
    { name: "Food", color: "bg-orange-500" },
    { name: "Travel", color: "bg-cyan-500" },
  ]

  const numCategories = Math.min(
    Math.max(2, Math.ceil(total / 5)),
    categoryTemplates.length
  )

  const selected = categoryTemplates.slice(0, numCategories)
  let remaining = total

  return selected.map((cat, i) => {
    if (i === selected.length - 1) {
      return { ...cat, count: remaining }
    }
    const avg = remaining / (selected.length - i)
    const count = Math.max(1, Math.round(avg + (Math.random() - 0.5) * avg * 0.6))
    remaining -= count
    return { ...cat, count }
  })
}

export function ResultsSummary({ totalImages, onReset }: ResultsSummaryProps) {
  const [visible, setVisible] = useState(false)
  const [categories] = useState(() => generateCategories(totalImages))

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Success icon */}
      <div className="relative">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-success/15">
          <CheckCircle2
            className="size-10 text-success"
            strokeWidth={1.5}
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-success/10 transition-all duration-1000",
            visible ? "scale-100 opacity-0" : "scale-75 opacity-100"
          )}
        />
      </div>

      {/* Summary heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          {totalImages} image{totalImages !== 1 ? "s were" : " was"} successfully
          sorted
        </h2>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed text-balance">
          Your images have been intelligently organized into{" "}
          {categories.length} categories based on their content
        </p>
      </div>

      {/* Stats row */}
      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        <StatCard
          icon={<ImageIcon className="size-4" />}
          label="Images"
          value={totalImages}
          delay={0}
          visible={visible}
        />
        <StatCard
          icon={<Layers className="size-4" />}
          label="Categories"
          value={categories.length}
          delay={100}
          visible={visible}
        />
        <StatCard
          icon={<FolderOpen className="size-4" />}
          label="Folders"
          value={categories.length}
          delay={200}
          visible={visible}
        />
      </div>

      {/* Category breakdown */}
      <div className="w-full max-w-md space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Category Breakdown
        </p>
        <div className="space-y-2">
          {categories.map((cat, i) => (
            <CategoryRow
              key={cat.name}
              category={cat}
              total={totalImages}
              delay={300 + i * 80}
              visible={visible}
            />
          ))}
        </div>
      </div>

      {/* Reset button */}
      <Button
        variant="outline"
        size="lg"
        onClick={onReset}
        className="mt-2 gap-2 rounded-xl"
      >
        <RotateCcw className="size-4" />
        Sort Another Folder
      </Button>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  delay,
  visible,
}: {
  icon: React.ReactNode
  label: string
  value: number
  delay: number
  visible: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl border bg-card p-4 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-xl font-semibold tabular-nums text-foreground">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function CategoryRow({
  category,
  total,
  delay,
  visible,
}: {
  category: Category
  total: number
  delay: number
  visible: boolean
}) {
  const pct = Math.round((category.count / total) * 100)

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-4 py-3 transition-all duration-500",
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn("size-2.5 shrink-0 rounded-full", category.color)} />
      <span className="flex-1 text-sm font-medium text-foreground">
        {category.name}
      </span>
      <span className="text-xs tabular-nums text-muted-foreground">
        {category.count} image{category.count !== 1 ? "s" : ""}
      </span>
      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000", category.color)}
          style={{
            width: visible ? `${pct}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  )
}
