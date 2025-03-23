"use client"
import { useState } from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit2, Check, GripVertical, Calendar, Tag, Clock } from "lucide-react"
import { useTheme } from "next-themes"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  dueDate?: Date
  priority?: "low" | "medium" | "high"
  tags?: string[]
}

export function TodoList() {
  const { theme } = useTheme()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    dueDate: "",
    priority: "medium" as const,
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")

  const addTodo = () => {
    if (!formData.text.trim()) return
    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      text: formData.text.trim(),
      completed: false,
      createdAt: new Date(),
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      priority: formData.priority,
      tags: formData.tags,
    }
    setTodos([...todos, todo])
    setIsFormOpen(false)
    setFormData({ text: "", dueDate: "", priority: "medium", tags: [] })
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
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
    <div className="w-full space-y-6 mt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          ✨ Todo List
        </h1>
        <p className="text-muted-foreground text-lg">Stay organized with style</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="p-4 shadow-lg bg-white/10 dark:bg-zinc-800/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg hover:shadow-xl transition-all duration-300">
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="w-full h-14 text-lg bg-white dark:bg-zinc-700 text-black dark:text-white hover:bg-white/90 dark:hover:bg-zinc-600 shadow-sm transition-all duration-200 group"
            variant="outline"
          >
            <Plus className="h-5 w-5 mr-2 text-primary-foreground group-hover:scale-110 transition-transform duration-200" />
            Add New Task
          </Button>
        </Card>
      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 w-full max-w-md border border-white/20 dark:border-white/10"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Create New Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Task Name</label>
                  <Input
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="What needs to be done?"
                    className="text-lg bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Due Date</label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700"
                    />
                    <Button variant="outline" size="icon" className="bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Priority</label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((priority) => (
                      <Button
                        key={priority}
                        variant={formData.priority === priority ? "default" : "outline"}
                        onClick={() => setFormData({ ...formData, priority: priority as any })}
                        className={`flex-1 capitalize ${
                          formData.priority === priority 
                            ? "bg-white dark:bg-zinc-700 text-black dark:text-white border border-primary"
                            : "bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        {priority}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      className="bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700"
                    />
                    <Button variant="outline" size="icon" onClick={addTag} className="bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addTodo}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                >
                  Create Task
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0,
              transition: {
                duration: 0.3,
                delay: index * 0.1
              }
            }}
            exit={{ opacity: 0, x: 20, y: -20 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setIsHovered(todo.id)}
            onHoverEnd={() => setIsHovered(null)}
          >
            <Card className="p-4 mb-2 shadow-md hover:shadow-lg transition-all duration-200 bg-white/10 dark:bg-zinc-800/50 backdrop-blur-sm group relative border border-white/20 dark:border-white/10 rounded-lg">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered === todo.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-2"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                </motion.div>
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
                />
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit(todo.id)}
                      className="text-lg"
                    />
                  ) : (
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isHovered === todo.id ? 1.02 : 1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span
                        className={`text-lg ${
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {todo.text}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        {todo.dueDate && (
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(todo.dueDate).toLocaleDateString()}
                          </Badge>
                        )}
                        {todo.priority && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              todo.priority === "high"
                                ? "text-destructive"
                                : todo.priority === "medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            {todo.priority}
                          </Badge>
                        )}
                        {todo.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {editingId === todo.id ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => saveEdit(todo.id)}
                      className="hover:bg-primary/10 hover:scale-110 transition-transform duration-200"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(todo)}
                      className="hover:bg-primary/10 hover:scale-110 transition-transform duration-200"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="hover:bg-destructive/10 hover:text-destructive hover:scale-110 transition-transform duration-200"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-muted-foreground text-lg mt-8"
        >
          No todos yet. Add one to get started!
        </motion.div>
      )}
    </div>
  )
} 