<template>
  <q-page class="row justify-center q-pt-lg">
    <q-form class="q-gutter-md" style="width: 60%;" @submit="saveRecipe">
      <q-input filled v-model="recipe.title" label="Titre" readonly/>
      <q-input filled v-model="recipe.author" label="Auteur" readonly/>
      <q-input filled v-model="recipe.date" label="Date" readonly />

      <div class="q-mt-md" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <div class="q-gutter-sm row items-start">
          <q-input filled v-model="ingredient.name" label="Ingrédient" style="width: 30%;" readonly />
          <q-input color="teal-4" filled v-model.number="ingredient.quantity" label="Quantité" style="width: 30%;" />
          <q-btn round color="teal-6" icon="delete" @click="removeIngredient(index)" />
        </div>
      </div>

      <div class="q-gutter-sm row items-start">
        <q-select color="teal-4" filled v-model="selectedIngredientId" :options="ingredients"  option-value="id" option-label="name" label="Nouvel Ingrédient" style="width: 30%;" />
        <q-btn class="q-ml-sm" round color="teal-6" icon="add" @click="addNewIngredient" />
      </div>

      <div v-if="showNewIngredientInputs">
        <div class="q-gutter-sm row items-start">
          <q-input filled v-model="newIngredient.name" label="Ingrédient" style="width: 30%;" readonly />
          <q-input filled v-model.number="newIngredient.quantity" label="Quantité" style="width: 30%;" />
        </div>  
      </div>
      <q-btn class="q-mt-md" type="submit" color="teal-6" label="Save" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  setup(){
    return{
      ingredients: [
        { id: 4, name: 'Fraise' },
        { id: 5, name: 'Lait' },
        // Ajoutez d'autres ingrédients ici
      ],
    }
  },
  data() {
    return {
      recipes: [
        {
          id: 2,
          title: 'Tarte aux pommes',
          author: 'John Doe',
          date: '27/05/2023',
          ingredients: [
            { id: 1, name: 'Pomme', quantity: 60 },
            { id: 2, name: 'Sucre', quantity: 5550 },
            { id: 3, name: 'Pâte', quantity: 50 },
          ],
        },
      ],
      recipe: null,
      selectedIngredientId: null,
      newIngredient: { name: '', quantity: 0 },
      showNewIngredientInputs: false,
      
    };
  },

  created() {
    const { id } = this.$route.params;
    this.recipe = this.recipes.find(recipe => recipe.id == id);
  },

  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ name: '', quantity: 0 });
    },

    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },

    saveRecipe() {
      // Update the recipe in the recipes array
      const index = this.recipes.findIndex(recipe => recipe.id == this.recipe.id);
      if (index != -1) {
        this.recipes[index] = this.recipe;
      }
    },

    addNewIngredient() {
      if (this.selectedIngredientId) {
        const selectedIngredient = this.ingredients.find(ingredient => ingredient.id === this.selectedIngredientId.id);
        this.newIngredient.name = selectedIngredient.name;
        this.recipe.ingredients.push({ ...this.newIngredient });
        this.selectedIngredientId = null;
        this.newIngredient = { name: '', quantity: 0 };
        this.showNewIngredientInputs = false;
      }
    },
  },
};
</script>
