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
      <main className="min-h-screen bg-gradient-to-b from-background to-muted transition-colors duration-300">
        <ThemeToggle />
        <div className="container py-8">
          <TodoList />
        </div>
      </main>
    </ThemeProvider>
  )
}