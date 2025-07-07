<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Форма заказа #{{ orderId }}</h1>
    </header>

    <main class="app-main">
      <OrderForm />
    </main>

    <footer class="app-footer">
      <p>Тестовое задание © 2025</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import OrderForm from '@/components/OrderForm.vue'

const store = useOrderStore()
const orderId = computed(() => store.currentOrder.id)
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.app-main {
  flex: 1;
}

.app-footer {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
}
</style>