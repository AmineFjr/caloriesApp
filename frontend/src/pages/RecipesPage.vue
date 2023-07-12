<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="recipe in recipes" :key="recipe.id" class="my-card bg-teal-4 text-white">
      <q-card-section>
        <div class="text-h6">{{ recipe.title }}</div>
        <div class="text-subtitle2">par {{ recipe.userId }} - {{ formatDate(recipe.createdAt) }}</div>
      </q-card-section>
      <q-separator dark />
      <q-card-section>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient.name }} - {{ ingredient.recipe_ingredient.quantity }}{{ ingredient.unit }} = {{ ingredient.calories * ingredient.recipe_ingredient.quantity }} calories
          </li>
        </ul>
        <q-separator dark />
        <div class="text-center">
          0 calories total
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat :to="`/recipe_edit/${recipe.id}`">Modifier</q-btn>
        <q-btn flat @click="deleteRecipe(recipe.id)">supprimer</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useRecipesStore } from "../stores/recipe.js";
export default {
  data() {
    return {
      recipes: [],
    };
  },
  async created() {
    try {
      const recipeStore = useRecipesStore();
      const data = await recipeStore.fetchRecipes();
      console.log(data); // Log the fetched recipes
      this.recipes = data;
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async deleteRecipe(id) {
      const recipeStore = useRecipesStore();
      await recipeStore.deleteRecipe(id);
      this.recipes = await recipeStore.fetchRecipes();
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px

.centered-header 
  text-align: center
  font-size: 2rem

q-card-section
  padding-bottom: 0
  padding-top: 0
</style>
