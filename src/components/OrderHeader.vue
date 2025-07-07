<template>
  <div class="order-header">
    <h1 v-if="isEditMode">
      <input 
        v-model="title" 
        type="text" 
        placeholder="Название заказа"
        class="title-input"
      >
    </h1>
    <h1 v-else>{{ title }}</h1>
    
    <div class="meta-info">
      <span class="order-id">ID: {{ orderId }}</span>
      <span class="created-date">Создан: {{ formattedDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'

const store = useOrderStore()

const orderId = computed(() => store.currentOrder.id)
const title = computed({
  get: () => store.currentOrder.title,
  set: (value: string) => { store.currentOrder.title = value }
})
const isEditMode = computed(() => store.isEditMode)

const formattedDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})
</script>

<style scoped>
.order-header {
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.title-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.meta-info {
  display: flex;
  gap: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>