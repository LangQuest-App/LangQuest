import * as React from "react"

// Simplified toast implementation using Sonner pattern
// This replaces the deprecated toast system

type ToastType = "default" | "success" | "error" | "warning" | "info"

interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  type?: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface Toast extends ToastOptions {
  id: string
  timestamp: number
}

const toastQueue: Toast[] = []
const listeners: Array<(toasts: Toast[]) => void> = []

let toastCounter = 0

function generateId(): string {
  return `toast-${Date.now()}-${++toastCounter}`
}

function notify(listeners: Array<(toasts: Toast[]) => void>) {
  listeners.forEach((listener) => listener([...toastQueue]))
}

function addToast(options: ToastOptions): string {
  const id = generateId()
  const toast: Toast = {
    id,
    timestamp: Date.now(),
    type: "default",
    duration: 4000,
    ...options,
  }

  toastQueue.push(toast)
  notify(listeners)

  // Auto remove after duration
  if (toast.duration && toast.duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, toast.duration)
  }

  return id
}

function dismissToast(id: string) {
  const index = toastQueue.findIndex((t) => t.id === id)
  if (index > -1) {
    toastQueue.splice(index, 1)
    notify(listeners)
  }
}

// Toast function with different types
const toast = Object.assign(
  (options: ToastOptions) => addToast(options),
  {
    default: (options: Omit<ToastOptions, "type">) => addToast({ ...options, type: "default" }),
    success: (options: Omit<ToastOptions, "type">) => addToast({ ...options, type: "success" }),
    error: (options: Omit<ToastOptions, "type">) => addToast({ ...options, type: "error" }),
    warning: (options: Omit<ToastOptions, "type">) => addToast({ ...options, type: "warning" }),
    info: (options: Omit<ToastOptions, "type">) => addToast({ ...options, type: "info" }),
    dismiss: dismissToast,
  }
)

// React hook for managing toasts
function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      const index = listeners.indexOf(setToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    toasts,
    toast,
    dismiss: dismissToast,
  }
}

export { useToast, toast }
export type { Toast, ToastOptions, ToastType }