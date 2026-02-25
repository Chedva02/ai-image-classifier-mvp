"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

interface SortingProgressProps {
  totalImages: number
  onComplete: () => void
}

const SORTING_STEPS = [
  "Scanning images",
  "Analyzing metadata",
  "Classifying content",
  "Organizing into categories",
  "Finalizing results",
]

export function SortingProgress({ totalImages, onComplete }: SortingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const totalDuration = Math.max(2000, Math.min(totalImages * 80, 5000))
    const interval = 30
    const increment = (100 / totalDuration) * interval

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 0.5
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 400)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [totalImages, onComplete])

  useEffect(() => {
    const stepIndex = Math.min(
      Math.floor((progress / 100) * SORTING_STEPS.length),
      SORTING_STEPS.length - 1
    )
    setCurrentStep(stepIndex)
  }, [progress])

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      {/* Animated spinner */}
      <div className="relative">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10">
          <Loader2 className="size-9 animate-spin text-primary" strokeWidth={1.5} />
        </div>
        <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/5" />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4">
        {/* Progress bar */}
        <Progress value={progress} className="h-2.5 bg-secondary" />

        {/* Step indicator */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            {SORTING_STEPS[currentStep]}
            <span className="animate-pulse">...</span>
          </p>
          <span className="text-sm font-mono text-muted-foreground tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Processing {totalImages} image{totalImages !== 1 ? "s" : ""}
      </p>
    </div>
  )
}
