import { defineStore } from "pinia";
import axios from "axios";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
  }),
  actions: {
    // Créer une recette
    async createRecipe(newRecipe) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/recipe",
          newRecipe
        );
        this.recipes.push(response.data);
      } catch (error) {
        console.error("Erreur lors de la création de la recette :", error);
      }
    },
    // Lire toutes les recettes
    async fetchRecipes() {
        try {
          const response = await axios.get("http://localhost:3000/api/recipes");
          console.log(response.data); // log the fetched recipes
          this.recipes = response.data;
          return this.recipes; // You should return the data
        } catch (error) {
          console.error('Erreur lors de la récupération des recettes :', error);
        }
      },
      
    // Mettre à jour une recette
    async updateRecipe(updatedRecipe) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/recipe/${updatedRecipe.id}`,
          updatedRecipe
        );
        const index = this.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette :", error);
      }
    },
    // Supprimer une recette
    async deleteRecipe(recipeId) {
      try {
        await axios.delete(`http://localhost:3000/api/recipe/${recipeId}`);
        const index = this.recipes.findIndex((recipe) => recipe.id === recipeId);
        if (index !== -1) {
          this.recipes.splice(index, 1);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la recette :", error);
      }
    },
    // Récupérer une recette par ID
    async fetchRecipeById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipe/${id}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette :", error);
      }
    },
  },
});
