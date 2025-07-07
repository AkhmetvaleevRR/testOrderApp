<template>
  <div v-if="editable" class="text-editor">
    <textarea v-model="localValue" @input="handleInput"></textarea>
    <div class="format-tools">
      <button @click="insertText('- ')">Список</button>
      <button @click="insertText('**текст**')">Жирный</button>
      <button @click="insertText('*текст*')">Курсив</button>
    </div>
  </div>
  <div v-else class="text-view" v-html="formattedText"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  editable: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = ref<string>(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

const handleInput = (e: Event): void => {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const formattedText = computed<string>(() => {
  return props.modelValue
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/- (.*?)(\n|$)/g, '<li>$1</li>')
    .replace(/\n/g, '<br>')
})

const insertText = (pattern: string): void => {
  const textarea = document.querySelector('.text-editor textarea') as HTMLTextAreaElement
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = localValue.value.substring(start, end)
  
  localValue.value = 
    localValue.value.substring(0, start) + 
    pattern.replace('текст', selectedText || 'текст') + 
    localValue.value.substring(end)
  
  emit('update:modelValue', localValue.value)
  
  textarea.focus()
  textarea.setSelectionRange(start + pattern.length, start + pattern.length)
}
</script>

<style scoped>
.text-editor, .text-view {
  min-height: 200px;
  padding: 12px;
  font-family: inherit;
  line-height: 1.5;
  background-color: #fff;
}

.text-editor {
  border: 1px solid #ddd;
  border-radius: 4px;
}


.text-editor textarea {
  width: 100%;
  min-height: 150px;
  border: none;
  resize: vertical;
  outline: none;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: inherit;
  padding: 0;
  margin-bottom: 10px;
}

.format-tools {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.format-tools button {
  padding: 4px 8px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.format-tools button:hover {
  background-color: #e0e0e0;
}

.text-view {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.text-view strong {
  font-weight: bold;
  color: #2c3e50;
}

.text-view em {
  font-style: italic;
  color: #7f8c8d;
}

.text-view li {
  margin-left: 20px;
  list-style-type: disc;
}

.drag-over {
  background-color: #f0f8ff;
  border: 2px dashed #3498db !important;
}

.upload-button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.upload-button:hover {
  background-color: #2980b9;
}
</style>