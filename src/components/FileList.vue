<template>
  <div class="file-list">
    <h3>Прикрепленные файлы</h3>
    <div v-if="isEditMode" 
         @dragover.prevent="dragOver = true"
         @dragleave="dragOver = false"
         @drop.prevent="handleDrop"
         :class="{ 'drag-over': dragOver }"
         class="file-drop-zone">
      Перетащите файлы сюда
    </div>
    
    <ul>
      <li v-for="file in files" :key="file.id" class="file-item" :class="{ 'view': !isEditMode }" @click="downloadFile(file)">
        <span class="file-icon" :class="file.type">{{ getFileIcon(file.type) }}</span>
        <span class="file-name">{{ file.name }}</span>
        <button v-if="isEditMode" @click="removeFile(file.id)" class="remove-file">
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import type { OrderFile } from '@/types/order'

const store = useOrderStore()
const dragOver = ref<boolean>(false)

const files = computed(() => store.currentOrder.files)
const isEditMode = computed(() => store.isEditMode)

const getFileIcon = (type: OrderFile['type']): string => {
  const icons: Record<File['type'], string> = {
    image: '🖼️',
    document: '📄',
    file: '📁'
  }
  return icons[type] || icons.file
}

const handleDrop = (e: DragEvent): void => {
  dragOver.value = false
  if (e.dataTransfer?.files) {
    Array.from(e.dataTransfer.files).forEach(file => {
      store.addFile(file)
    })
  }
}

const downloadFile = (file: OrderFile): void => {
  if (!isEditMode.value) {
    const blob = new Blob([`Это содержимое файла ${file.name}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

const removeFile = (id: number): void => {
  store.removeFile(id)
}
</script>

<style scoped>
.file-list {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
}

.file-list h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.file-drop-zone {
  border: 2px dashed #bdc3c7;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
  border-radius: 6px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  color: #7f8c8d;
}

.file-drop-zone.drag-over {
  border-color: #3498db;
  background-color: #eaf4ff;
  color: #3498db;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  transition: background-color 0.2s ease;
}

.file-item.view {
  cursor: pointer;
}

.file-item:hover {
  background-color: #e9ecef;
}

.file-icon {
  margin-right: 10px;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.file-icon.image {
  color: #3498db;
}

.file-icon.document {
  color: #e74c3c;
}

.file-icon.file {
  color: #2ecc71;
}

.file-name {
  flex: 1;
  font-size: 0.9rem;
  color: #34495e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-file {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.remove-file:hover {
  opacity: 1;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.file-item {
  animation: fadeIn 0.3s ease-out;
}
</style>