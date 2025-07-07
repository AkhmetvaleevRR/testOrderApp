<template>
  <div class="order-form">
    <div class="form-columns">
      <div class="left-column">
        <OrderImage />
        <FileList />
      </div>
      
      <div class="right-column">
        <OrderHeader />
        
        <div class="form-section">
          <h3>Описание</h3>
          <TextEditor v-model="currentOrder.description" :editable="isEditMode" />
        </div>
        
        <div class="form-section">
          <h3>Изготовитель</h3>
          <div v-if="isEditMode" class="edit-fields">
            <input v-model="currentOrder.manufacturer.name" placeholder="Название">
            <input v-model="currentOrder.manufacturer.contact" placeholder="Контактное лицо">
            <input v-model="currentOrder.manufacturer.phone" placeholder="Телефон">
          </div>
          <div v-else class="view-fields">
            <p>{{ currentOrder.manufacturer.name }}</p>
            <p>{{ currentOrder.manufacturer.contact }}</p>
            <p>{{ currentOrder.manufacturer.phone }}</p>
          </div>
        </div>
        
        <OrderStatus />
        
        <div class="action-buttons">
          <template v-if="isEditMode">
            <button @click="saveChanges" class="save-button">Сохранить</button>
            <button @click="cancelEditing" class="cancel-button">Отмена</button>
          </template>
          <template v-else>
            <button @click="startEditing" class="edit-button">Редактировать</button>
            <button class="chat-button">Перейти в чат</button>
            <button class="support-button">Связаться с поддержкой</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import OrderImage from '@/components/OrderImage.vue'
import FileList from '@/components/FileList.vue'
import OrderHeader from '@/components/OrderHeader.vue'
import OrderStatus from '@/components/OrderStatus.vue'
import TextEditor from '@/components/TextEditor.vue'

const store = useOrderStore()

const currentOrder = computed(() => store.currentOrder)
const isEditMode = computed(() => store.isEditMode)

const startEditing = (): void => {
  store.isEditMode = true
}

const cancelEditing = (): void => {
  store.resetChanges()
  store.isEditMode = false
}

const saveChanges = (): void => {
  store.saveChanges()
}
</script>

<style scoped>
.order-form {
  display: flex;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-columns {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  width: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-section {
  margin-bottom: 20px;
}

.form-section h3 {
  margin-bottom: 12px;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.edit-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-fields input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
}

.view-fields p {
  margin-bottom: 8px;
  color: #34495e;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-button {
  background-color: #3498db;
  color: white;
  border: none;
}

.edit-button:hover {
  background-color: #2980b9;
}

.save-button {
  background-color: #2ecc71;
  color: white;
  border: none;
}

.save-button:hover {
  background-color: #27ae60;
}

.cancel-button {
  background-color: #f1f1f1;
  color: #7f8c8d;
  border: 1px solid #ddd;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.chat-button {
  background-color: #f39c12;
  color: white;
  border: none;
}

.chat-button:hover {
  background-color: #e67e22;
}

.support-button {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.support-button:hover {
  background-color: #c0392b;
}
</style>