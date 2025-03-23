"use client"

import { TodoList } from "@/components/TodoList"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ThemeProvider } from "next-themes"

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800/50 transition-colors duration-300">
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-2xl flex flex-col items-center justify-center relative px-4">
            <ThemeToggle />
            <TodoList />
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}