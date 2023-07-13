<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Liste des ingrédients"
      :rows="ingredients"
      :columns="columns"
      row-key="id"
      :filter="filter"
      white
      color="teal-6"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Rechercher">
          <template v-slot:append>
            <q-icon name="search" color="teal-4" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round dense color="teal-4" icon="edit" @click="editRow(props.row)" />
          <q-btn flat round dense color="teal-4" icon="delete" @click="deleteRow(props.row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Add New Ingredient Button -->
    <div class="text-center q-pa-md">
      <q-btn color="teal-4" @click="isAddingNew = !isAddingNew">Ajouter un nouvel ingrédient</q-btn>
    </div>

    <!-- New Ingredient Form -->
    <div v-if="isAddingNew" class="flex flex-center q-pa-md" style="max-width: 500px; margin: auto;">
      <div style="width: 100%;">
        <q-input color="teal-4" filled v-model="newIngredient.name" label="Nom" />
        <q-input color="teal-4" filled v-model="newIngredient.unit" label="Unité" />
        <q-input color="teal-4" filled v-model="newIngredient.calories" label="Calories" />
        <div class="text-center">
          <q-btn color="teal-4" @click="createIngredient">Créer</q-btn>
        </div>
      </div>
    </div>

    <!-- Update Form -->
    <div v-if="selectedIngredient" class="flex flex-center q-pa-md" style="max-width: 500px; margin: auto;">
      <div style="width: 100%;">
        <q-input color="teal-4" filled v-model="selectedIngredient.name" label="Nom" />
        <q-input color="teal-4" filled v-model="selectedIngredient.unit" label="Unité" />
        <q-input color="teal-4" filled v-model="selectedIngredient.calories" label="Calories" />
        <div class="text-center">
          <q-btn color="teal-4" @click="updateSelectedIngredient">Mettre à jour</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useIngredientsStore } from "../stores/ingredient.js";

export default {
  setup () { 
    const store = useIngredientsStore();
    const ingredients = computed(() => store.ingredients);
    const selectedIngredient = ref(null);
    const newIngredient = ref({ name: "", unit: "", calories: "" });
    const isAddingNew = ref(false);
    const userStore = useUserStore();
    
    const columns = [
      { name: 'name', required: true, label: 'Nom', align: 'left', field: 'name', sortable: true  },
      { name: 'unit', required: true, label: 'Unité', align: 'left', field: 'unit', sortable: true  },
      { name: 'calories', required: true, label: 'Calories', align: 'left', field: 'calories', sortable: true },
      { name: 'actions', required: true, label: 'Actions', align: 'left', field: 'id', sortable: false },
    ]

    async function deleteRow(row) {
      try {
        const updatedIngredients = await store.deleteIngredient(row.id);
        ingredients.value = updatedIngredients; // Here we update the ingredients array
      } catch (error) {
        console.error("Erreur lors de la suppression de l'ingrédient :", error);
      }
    }

    function editRow(row) {
      if (!row || !row.id) return;
      selectedIngredient.value = { ...row };
    }

    async function createIngredient() {
      if (!newIngredient.value) return;
      try {
        const updatedIngredients = await store.createIngredient(newIngredient.value);
        ingredients.value = updatedIngredients; // Here we update the ingredients array
        newIngredient.value = { name: "", unit: "", calories: "" };
        isAddingNew.value = false;
      } catch (error) {
        console.error("Erreur lors de la création de l'ingrédient :", error);
      }
    }

    async function updateSelectedIngredient() {
      if (!selectedIngredient.value) return;
      try {
        const updatedIngredient = await store.updateIngredient(selectedIngredient.value);
        selectedIngredient.value = null;
        await store.fetchIngredients(); // Mettre à jour le tableau d'ingrédients
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'ingrédient :", error);
      }
    }


    onMounted(async () => {
      ingredients.value = await store.fetchIngredients();
    })


    return {
      filter: ref(''),
      columns,
      ingredients,
      selectedIngredient,
      deleteRow,
      editRow,
      createIngredient,
      updateSelectedIngredient,
      isAddingNew,
      newIngredient
    }
  }
}
</script>
