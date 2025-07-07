import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order, OrderFile } from '@/types/order'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useOrderStore = defineStore('order', () => {
   const originalOrder = useLocalStorage<Order>('orderAppData', {
    id: 1,
    title: 'Прототип умных часов',
    description: 'Разработка прототипа с базовым функционалом:\n- Отображение времени\n- Шагомер\n- Уведомления',
    image: './clocks.jpg',
    files: [
      { id: 1, name: 'Техническое задание.pdf', type: 'document' },
      { id: 2, name: 'Эскиз дизайна.png', type: 'image' }
    ],
    manufacturer: {
      name: 'ООО "Рога и копыта"',
      contact: 'Иванов Иван Иванович',
      phone: '+7 (123) 123-12-23'
    },
    organization: {
      name: 'Копыта и Рога ООО',
      department: 'Отдел разработки'
    },
    status: 'in_progress'
  })

 
  const currentOrder = ref({ ...originalOrder.value })
  const isEditMode = ref(false)
  const statuses = ref<Array<Order['status']>>(['draft', 'published', 'in_progress', 'completed'])

  const resetChanges = (): void => {
    currentOrder.value = JSON.parse(JSON.stringify(originalOrder.value))
  }

  const saveChanges = () => {
    originalOrder.value = JSON.parse(JSON.stringify(currentOrder.value))
    isEditMode.value = false
  }

  function addFile(file: File): void {
    currentOrder.value.files.push({
      id: Date.now(),
      name: file.name,
      type: file.type.split('/')[0] as OrderFile['type'] || 'file'
    })
  }

  function removeFile(id: number): void {
    currentOrder.value.files = currentOrder.value.files.filter(f => f.id !== id)
  }

  function updateImage(file: File): void {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        currentOrder.value.image = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }

  return {
    originalOrder,
    currentOrder,
    isEditMode,
    statuses,
    resetChanges,
    saveChanges,
    addFile,
    removeFile,
    updateImage
  }
})