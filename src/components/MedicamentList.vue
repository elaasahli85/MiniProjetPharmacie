<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  getMedicaments,
  addMedicament,
  deleteMedicament,
  updateMedicament,
} from '../services/api.js';
import MedicamentDetail from './MedicamentDetail.vue';
import MedicamentEdit from './MedicamentEdit.vue';

const medicaments = ref([]);
const search = ref('');

const showModal = ref(false);
const medicamentModifie = ref(null);

const router = useRouter();

function openModal(med) {
  medicamentModifie.value = med;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}

const filteredMedicaments = computed(() =>
  medicaments.value.filter(
    (med) =>
      med.nom && med.nom.toLowerCase().includes(search.value.toLowerCase())
  )
);

async function afficherListeMedicaments() {
  const data = await getMedicaments();
  medicaments.value = Array.isArray(data) ? data : [data];
}

async function addOne(med) {
  med.unitesEnStock++;
  const updated = await updateMedicament(med.reference, med);
  const index = medicaments.value.findIndex(
    (m) => m.reference === med.reference
  );
  if (index !== -1) medicaments.value[index] = updated;
}

async function removeOne(med) {
  if (med.unitesEnStock > 0) med.unitesEnStock--;
  const updated = await updateMedicament(med.reference, med);
  const index = medicaments.value.findIndex(
    (m) => m.reference === med.reference
  );
  if (index !== -1) medicaments.value[index] = updated;
}

async function handleUpdate(updatedMed) {
  const result = await updateMedicament(updatedMed.reference, updatedMed);
  const index = medicaments.value.findIndex(
    (m) => m.reference === updatedMed.reference
  );
  if (index !== -1) medicaments.value[index] = result;
  closeModal();
}

async function handleDelete(reference) {
  await deleteMedicament(reference);
  medicaments.value = medicaments.value.filter(
    (m) => m.reference !== reference
  );
}

async function handleAdd(med) {
  const savedMed = await addMedicament(med);
  if (savedMed) medicaments.value.push(savedMed);
}

function goToAddPage() {
  router.push('/add');
}

onMounted(() => {
  afficherListeMedicaments();
});
</script>

<template>
  <h3>Stock de la pharmacie</h3>

  <input
    v-model="search"
    type="text"
    placeholder="Rechercher un médicament..."
  />
  <button @click="goToAddPage">Ajouter un médicament</button>

  <ul>
    <MedicamentDetail
      v-for="med in filteredMedicaments"
      :key="med.reference"
      :medicament="med"
      @delete="() => handleDelete(med.reference)"
      @modifier="() => openModal(med)"
      @addOne="() => addOne(med)"
      @removeOne="() => removeOne(med)"
    />

    <MedicamentEdit
      :show="showModal"
      :medicament="medicamentModifie"
      @close="closeModal"
      @update="handleUpdate"
    />
  </ul>
</template>
<style scoped>
h3 {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.8rem;
  color: #2c3e50;
}

input[type='text'] {
  display: block;
  margin: 0 auto 1rem auto;
  padding: 0.6rem 1rem;
  width: 250px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: 0.2s ease;
}

input[type='text']:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

button {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s ease;
}

button:first-of-type {
  display: block;
  margin: 0 auto 2rem auto;
  background: #42b883;
  color: white;
}

button:first-of-type:hover {
  background: #369870;
}
ul {
  list-style: none;
  padding: 0;
  max-width: 900px;
  margin: 0 auto 3rem auto;
  display: grid;
  gap: 1.2rem;
}
</style>
