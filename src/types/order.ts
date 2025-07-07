export interface OrderFile {
  id: number
  name: string
  type: 'image' | 'document' | 'file'
}

export interface Manufacturer {
  name: string
  contact: string
  phone: string
}

export interface Organization {
  name: string
  department: string
}

export type OrderStatus = 'draft' | 'published' | 'in_progress' | 'completed'

export interface Order {
  id: number
  title: string
  description: string
  image: string
  files: OrderFile[]
  manufacturer: Manufacturer
  organization: Organization
  status: OrderStatus
}

export const statusLabels: Record<OrderStatus, string> = {
  draft: 'Черновик',
  published: 'Опубликован',
  in_progress: 'Выполняется',
  completed: 'Завершён'
}
