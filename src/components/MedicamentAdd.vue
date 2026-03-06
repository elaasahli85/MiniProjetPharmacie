<script setup>
import { ref } from 'vue';
import { addMedicament } from '../services/api.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const nom = ref('');
const forme = ref('');
const imageURL = ref('');
const quantite = ref(0);
const categorieCode = ref('');
const message = ref('');

function cancel() {
  router.back();
}

async function add() {
  if (!nom.value || !forme.value || !quantite.value || !categorieCode.value) {
    message.value = 'Veuillez remplir tous les champs obligatoires !';
    return;
  }

  const newMedicament = {
    nom: nom.value,
    quantiteParUnite: forme.value,
    imageURL: imageURL.value,
    unitesEnStock: quantite.value,
    unitesCommandees: 0,
    niveauDeReappro: 0,
    indisponible: false,
    categorieCode: parseInt(categorieCode.value),
  };

  try {
    const savedMedicament = await addMedicament(newMedicament);
    if (savedMedicament) {
      message.value = 'Médicament ajouté avec succès !';
      nom.value = '';
      forme.value = '';
      imageURL.value = '';
      quantite.value = 0;
      categorieCode.value = '';
    }
  } catch (error) {
    console.error(error);
    message.value = error.message;
  }
}
</script>

<template>
  <div class="container">
    <h2>Ajouter un médicament</h2>

    <input v-model="nom" placeholder="Nom du médicament" />
    <input
      v-model="forme"
      placeholder="Quantité par unité / forme pharmaceutique"
    />
    <input type="number" v-model="quantite" placeholder="Quantité en stock" />
    <input v-model="imageURL" placeholder="URL de l’image" />
    <input v-model="categorieCode" placeholder="Code catégorie (ex: 1, 2, 3)" />

    <div class="buttons">
      <button @click="add">Ajouter</button>
      <button class="cancel" @click="cancel">Retour</button>
    </div>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: #42b883;
  color: white;
  transition: 0.2s;
}

button:hover {
  background: #369870;
}

.cancel {
  background: #ef4444;
}

.cancel:hover {
  background: #dc2626;
}

.buttons {
  display: flex;
  gap: 1rem;
}

p {
  text-align: center;
  font-weight: bold;
}
</style>
