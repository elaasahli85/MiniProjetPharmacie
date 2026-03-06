<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({ medicament: Object, show: Boolean });
const emit = defineEmits(['update', 'close']);

const localMedicament = ref({
  nom: '',
  quantiteParUnite: '',
  unitesEnStock: 0,
  imageURL: '',
});

watch(
  () => props.medicament,
  (newMed) => {
    if (newMed) localMedicament.value = { ...newMed };
  }
);

function handleUpdate() {
  emit('update', localMedicament.value);
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <input v-model="localMedicament.nom" placeholder="Nom du médicament" />
      <input
        v-model="localMedicament.quantiteParUnite"
        placeholder="Forme / Quantité par unité"
      />
      <input v-model="localMedicament.imageURL" placeholder="URL de l’image" />
      <input
        v-model="localMedicament.unitesEnStock"
        type="number"
        placeholder="Quantité en stock"
      />
      <button @click="handleUpdate">Enregistrer</button>
      <button @click="emit('close')">Annuler</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal input {
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.modal input:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
}

.modal button {
  padding: 0.6rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background-color: #0d9488;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.modal button:hover {
  background-color: #0f766e;
}
</style>
