"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit2, Check } from "lucide-react"
import { useTheme } from "next-themes"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export function TodoList() {
  const { theme } = useTheme()
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const addTodo = () => {
    if (!newTodo.trim()) return
    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
    }
    setTodos([...todos, todo])
    setNewTodo("")
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    )
    setEditingId(null)
  }

  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 300, friction: 20 },
  })

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          ✨ Todo List
        </h1>
        <p className="text-muted-foreground">Stay organized with style</p>
      </motion.div>

      <Card className="p-4 shadow-lg dark:shadow-primary/5">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} size="icon" className="shadow-sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 mb-2 shadow-md hover:shadow-lg transition-shadow duration-200 dark:shadow-primary/5">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                {editingId === todo.id ? (
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit(todo.id)}
                    className="flex-1"
                  />
                ) : (
                  <span
                    className={`flex-1 transition-colors duration-200 ${
                      todo.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
                <div className="flex gap-2">
                  {editingId === todo.id ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveEdit(todo.id)}
                      className="hover:bg-primary/10"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(todo)}
                      className="hover:bg-primary/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {todos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground"
        >
          No todos yet. Add one to get started!
        </motion.div>
      )}
    </div>
  )
} 