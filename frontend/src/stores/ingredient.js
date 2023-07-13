import { defineStore } from "pinia";
import axios from "axios";

export const useIngredientsStore = defineStore("ingredients", {
  state: () => ({
    ingredients: [],
  }),
  actions: {
    // Créer un ingrédient
    async createIngredient(newIngredient) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/ingredient",
          newIngredient
        );
        console.log('createIngredient response.data:', response.data); // Keep this for debugging
        // Here we make sure to add the created ingredient, not the full response
        this.ingredients = [...this.ingredients, response.data.createdIngredient];
        return response.data.createdIngredient; // <== Note the change here
      } catch (error) {
        console.error("Erreur lors de la création de l'ingrédient :", error);
      }
    },
    // Lire tous les ingrédients
    async fetchIngredients() {
      try {
        const response = await axios.get("http://localhost:3000/api/ingredients");
        console.log(response.data); // log the fetched ingredients
        this.ingredients = response.data.ingredients; // Here you can use `this` because we're in a Pinia store
        return this.ingredients;
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients :', error);
      }
    },
   // Mettre à jour un ingrédient
    async updateIngredient(updatedIngredient) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/ingredient/${updatedIngredient.id}`,
          updatedIngredient
        );
        console.log('updateIngredient response.data:', response.data); // Pour le debugging
        const index = ingredients.value.findIndex((ingredient) => ingredient.id === updatedIngredient.id);
        if (index !== -1) {
          ingredients.value = [
            ...ingredients.value.slice(0, index),
            response.data.updatedIngredient,
            ...ingredients.value.slice(index + 1)
          ];
        }
        return response.data.updatedIngredient;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'ingrédient :", error);
      }
    },
   // Supprimer un ingrédient
    async deleteIngredient(ingredientId) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/ingredient/${ingredientId}`);
        console.log('deleteIngredient response:', response); // Pour le debugging
        const index = this.ingredients.findIndex((ingredient) => ingredient.id === ingredientId);
        if (index !== -1) {
          this.ingredients = [
            ...this.ingredients.slice(0, index),
            ...this.ingredients.slice(index + 1)
          ];
        }
        return ingredientId; // On retourne l'id de l'ingrédient supprimé
      } catch (error) {
        console.error("Erreur lors de la suppression de l'ingrédient :", error);
      }
    },
    // Récupérer un ingrédient par ID
    async fetchIngredientById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/ingredient/${id}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ingrédient :", error);
      }
    },
  },
});
