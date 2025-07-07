<template>
  <div class="order-image">
    <div v-if="isEditMode" 
         @dragover.prevent="dragOver = true"
         @dragleave="dragOver = false"
         @drop.prevent="handleDrop"
         :class="{ 'drag-over': dragOver }"
         class="image-upload">
      <img :src="image" alt="Order Image" v-if="image">
      <div v-else class="upload-placeholder">
        Перетащите изображение сюда
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" hidden>
      <button @click="triggerFileInput" class="upload-button">
        Выбрать файл
      </button>
    </div>
    <div v-else class="image-preview" @click="openPreview">
      <img :src="image" alt="Order Image" class="preview-image">
    </div>

    <div v-if="showPreview" class="image-preview-modal" @click.self="closePreview">
      <div class="preview-content">
        <button class="close-button" @click="closePreview">×</button>
        <img :src="image" alt="Увеличенное изображение" class="full-size-image">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderStore } from '@/stores/order'

const store = useOrderStore()
const dragOver = ref<boolean>(false)
const fileInput = ref<HTMLInputElement | null>(null)
const showPreview = ref<boolean>(false)

const image = computed(() => store.currentOrder.image)
const isEditMode = computed(() => store.isEditMode)

const triggerFileInput = (): void => {
  fileInput.value?.click()
}

const openPreview = (): void => {
  if (image.value) {
    showPreview.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closePreview = (): void => {
  showPreview.value = false
  document.body.style.overflow = ''
}

const handleDrop = (e: DragEvent): void => {
  dragOver.value = false
  if (e.dataTransfer?.files) {
    const file = e.dataTransfer.files[0]
    if (file && file.type.match('image.*')) {
      store.updateImage(file)
    }
  }
}

const handleFileChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) {
    store.updateImage(target.files[0])
  }
}
</script>

<style scoped>
.order-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image-upload {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-upload.drag-over {
  border-color: #3498db;
  background-color: #f0f8ff;
}

.image-upload img {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.upload-placeholder {
  color: #7f8c8d;
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.upload-button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.upload-button:hover {
  background-color: #2980b9;
}

.image-preview {
  position: relative;
  padding-top: 100%;
  background-color: #f5f5f5;
  cursor: pointer;
}

.preview-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.preview-image:hover {
  transform: scale(1.03);
}

.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.preview-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.full-size-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-button:hover {
  opacity: 1;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>