"use client"

import { useCallback, useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { UploadZone } from "@/components/upload-zone"
import { SortingProgress } from "@/components/sorting-progress"
import { ResultsSummary } from "@/components/results-summary"
import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { useRouter } from "next/navigation";

type AppState = "idle" | "processing" | "done"

export default function HomePage() {
  const router = useRouter();
  const authChecked = useRef(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    console.log('Checking authentication status...');
    if (authChecked.current) return;
    authChecked.current = true;

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    console.log('Authentication status:', isAuthenticated);
    if (!isAuthenticated) {
      console.warn('User not authenticated. Redirecting to login page.');
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  const [state, setState] = useState<AppState>("idle")
  const [imageCount, setImageCount] = useState(0)

  const handleFolderSelected = useCallback((files: File[]) => {
    setImageCount(files.length)
    setState("processing")
  }, [])

  const handleSortingComplete = useCallback(() => {
    setState("done")
  }, [])

  const handleReset = useCallback(() => {
    setState("idle")
    setImageCount(0)
  }, [])

  if (checkingAuth) return null;

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-8 md:px-6">
        <div className="w-full max-w-xl">
          {/* Heading - always visible */}
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Smart Image Sorting
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Organize your images
              <br />
              <span className="text-primary">effortlessly</span>
            </h1>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed text-balance">
              Select a folder of images and let our intelligent sorting engine
              categorize them automatically
            </p>
          </div>

          {/* Content area based on state */}
          {state === "idle" && (
            <UploadZone
              onFolderSelected={handleFolderSelected}
              isProcessing={false}
            />
          )}

          {state === "processing" && (
            <div className="rounded-2xl border bg-card p-8">
              <SortingProgress
                totalImages={imageCount}
                onComplete={handleSortingComplete}
              />
            </div>
          )}

          {state === "done" && (
            <div className="rounded-2xl border bg-card p-8">
              <ResultsSummary
                totalImages={imageCount}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center px-6 py-4">
        <p className="text-xs text-muted-foreground/60">
          PixelSort — Your images stay on your device
        </p>
      </footer>
    </div>
  )
}
