<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  medicament: Object,
});

const emits = defineEmits(['delete', 'removeOne', 'addOne', 'modifier']);
</script>

<template>
  <li>
    <p>{{ medicament.nom }}</p>
    <p>{{ medicament.quantiteParUnite }}</p>
    <p>{{ medicament.unitesEnStock }}</p>

    <img :src="medicament.imageURL" width="40" alt="Image du médicament" />

    <button @click="emits('delete', medicament.reference)">Supprimer</button>
    <button @click="emits('addOne', medicament)">+1</button>
    <button @click="emits('removeOne', medicament)">-1</button>
    <button @click="emits('modifier', medicament)">Modifier</button>
  </li>
</template>
<style scoped>
li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: box-shadow 0.2s, transform 0.2s;
  list-style: none;
}

li:hover {
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  transform: translateY(-1px);
}

li p {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9rem;
  color: #334155;
}

li p:first-of-type {
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  font-size: 1rem;
}

li p:nth-of-type(2) {
  color: #64748b;
  font-size: 0.85rem;
  flex: 0.8;
}

li p:nth-of-type(3) {
  font-weight: 700;
  color: #0d9488;
  min-width: 36px;
  text-align: center;
  background-color: #f0fdfa;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.95rem;
}

li img {
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

li button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background-color: #0d9488;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  white-space: nowrap;
}

li button:hover {
  background-color: #0f766e;
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);
}

li button:active {
  transform: scale(0.95);
}

li button:first-of-type {
  background-color: #ef4444;
}

li button:first-of-type:hover {
  background-color: #dc2626;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

li button:last-of-type {
  background-color: #3b82f6;
}

li button:last-of-type:hover {
  background-color: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}
</style>
