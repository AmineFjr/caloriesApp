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
          <q-btn flat round dense color="teal-4" icon="delete" @click="deleteRow(props.row)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useIngredientsStore } from "../stores/ingredient.js";

export default {
  setup () { 
    const store = useIngredientsStore();
    const ingredients = ref([]);
    const columns = [
      { name: 'name', required: true, label: 'Nom', align: 'left', field: 'name', sortable: true  },
      { name: 'unit', required: true, label: 'Unité', align: 'left', field: 'unit', sortable: true  },
      { name: 'calories', required: true, label: 'Calories', align: 'left', field: 'calories', sortable: true },
      { name: 'actions', required: true, label: 'Actions', align: 'left', field: 'id', sortable: false },
    ]

    async function deleteRow(row) {
      store.deleteIngredient(row.id);
    }

    onMounted(async() => {
      const result = await store.fetchIngredients();
      ingredients.value = result.ingredients;
    })

    return {
      filter: ref(''),
      columns,
      ingredients,
      deleteRow,
    }
  }
}
</script>
