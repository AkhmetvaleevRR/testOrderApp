<template>
  <div class="order-status">
    <h3>Статус заказа</h3>
    <div class="status-container">
      <div 
        v-for="(status, index) in statuses"
        :key="status"
        class="status-item"
      >
        <div
          :class="{
            'status-step': true,
            'active': isActive(status),
            'completed': isCompleted(status)
          }"
          @click="changeStatus(status)"
        >
          <div class="status-indicator"></div>
          <div class="status-label">{{ getStatusLabel(status) }}</div>
        </div>
        <div 
          v-if="index < statuses.length - 1"
          :class="{
            'status-line': true,
            'completed': isLineCompleted(index)
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import type { OrderStatus } from '@/types/order'

const store = useOrderStore()

const currentStatus = computed(() => store.currentOrder.status)
const statuses = computed(() => store.statuses)
const isEditMode = computed(() => store.isEditMode)

const statusLabels: Record<OrderStatus, string> = {
  draft: 'Черновик',
  published: 'Опубликован',
  in_progress: 'Выполняется',
  completed: 'Завершён'
}

const getStatusLabel = (status: OrderStatus): string => {
  return statusLabels[status] || status
}

const isActive = (status: OrderStatus): boolean => {
  return currentStatus.value === status
}

const isCompleted = (status: OrderStatus): boolean => {
  return statuses.value.indexOf(status) < statuses.value.indexOf(currentStatus.value)
}

const isLineCompleted = (index: number): boolean => {
  return index < statuses.value.indexOf(currentStatus.value)
}

const changeStatus = (status: OrderStatus): void => {
  if (isEditMode.value) {
    store.currentOrder.status = status
  }
}
</script>

<style scoped>
.order-status {
  margin: 2rem 0;
}

.status-container {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  flex: 1;
}

.status-item:last-child {
  flex: none;
}

.status-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  margin-bottom: -20px;
}

.status-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #bdc3c7;
  margin-bottom: 0.5rem;
  border: 3px solid white;
  box-sizing: border-box;
}

.status-step.completed .status-indicator,
.status-step.active .status-indicator {
  background: #2ecc71;
}

.status-line {
  flex: 1;
  height: 3px;
  background: #e0e0e0;
  margin: 0 -1px;
}

.status-line.completed {
  background: #2ecc71;
}

.status-label {
  font-size: 0.85rem;
  text-align: center;
  color: #7f8c8d;
  white-space: nowrap;
}

.status-step.active .status-label,
.status-step.completed .status-label {
  color: #2c3e50;
  font-weight: 500;
}

@media (max-width: 600px) {
  .status-label {
    font-size: 0.75rem;
  }
  
  .status-indicator {
    width: 20px;
    height: 20px;
  }
}
</style>