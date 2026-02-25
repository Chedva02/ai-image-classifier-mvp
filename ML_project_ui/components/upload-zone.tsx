"use client"

import { useCallback, useRef, useState } from "react"
import { FolderOpen, ImageIcon, Sparkles, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFolderSelected: (files: File[]) => void
  isProcessing: boolean
}

export function UploadZone({ onFolderSelected, isProcessing }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      )
      if (imageFiles.length > 0) {
        onFolderSelected(imageFiles)
      }
    },
    [onFolderSelected]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = e.dataTransfer.files
      if (!files || files.length === 0) return

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      )
      if (imageFiles.length > 0) {
        onFolderSelected(imageFiles)
      }
    },
    [onFolderSelected]
  )

  return (
    <div className="relative">
      {/* Hidden file input with webkitdirectory for folder selection */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        // @ts-expect-error webkitdirectory is not in the HTML spec but is widely supported
        webkitdirectory=""
        directory=""
        multiple
        accept="image/*"
      />

      <button
        type="button"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isProcessing}
        className={cn(
          "group relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-60",
          isDragOver
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-accent/50"
        )}
      >
        {/* Animated background glow on hover */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)]",
            !isProcessing && "group-hover:opacity-[0.06]",
            isDragOver && "opacity-[0.1]"
          )}
        />

        <div className="relative flex flex-col items-center gap-6 px-6 py-14 md:py-20">
          {/* Icon cluster */}
          <div className="relative">
            <div
              className={cn(
                "flex size-20 items-center justify-center rounded-2xl transition-all duration-300",
                "bg-primary/10 text-primary",
                "group-hover:bg-primary/15 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/10",
                isDragOver && "bg-primary/20 scale-110"
              )}
            >
              <FolderOpen className="size-9 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </div>

            {/* Floating icons */}
            <div className="absolute -right-3 -top-2 flex size-8 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-md border transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary">
              <ImageIcon className="size-4" />
            </div>
            <div className="absolute -bottom-1 -left-3 flex size-7 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-md border transition-all duration-300 group-hover:translate-y-1 group-hover:text-primary delay-75">
              <Sparkles className="size-3.5" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              Select a folder to sort
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground text-balance text-center leading-relaxed">
              Choose a folder containing your images and we will
              intelligently organize them for you
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={cn(
              "inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-300",
              "bg-primary text-primary-foreground",
              "group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-[1.03]",
              "group-active:scale-[0.98]"
            )}
          >
            <Upload className="size-4" />
            Browse Folder
          </div>

          <p className="text-xs text-muted-foreground/70">
            Supports JPG, PNG, WebP, GIF, BMP, TIFF
          </p>
        </div>
      </button>
    </div>
  )
}
