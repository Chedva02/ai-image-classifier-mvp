"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Moon, Sun } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary-foreground"
          >
            <path
              d="M4 4h6v6H4V4Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M14 4h6v6h-6V4Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M4 14h6v6H4v-6Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M14 14h6v6h-6v-6Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold tracking-tight text-foreground">
          PixelSort
        </span>
      </div>
      {mounted && (
        <div className="flex items-center gap-1 rounded-full border bg-card p-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className={`rounded-full ${theme === "light" ? "bg-secondary" : ""}`}
            onClick={() => setTheme("light")}
            aria-label="Light mode"
          >
            <Sun className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className={`rounded-full ${theme === "system" ? "bg-secondary" : ""}`}
            onClick={() => setTheme("system")}
            aria-label="System mode"
          >
            <Monitor className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className={`rounded-full ${theme === "dark" ? "bg-secondary" : ""}`}
            onClick={() => setTheme("dark")}
            aria-label="Dark mode"
          >
            <Moon className="size-3.5" />
          </Button>
        </div>
      )}
    </header>
  )
}
