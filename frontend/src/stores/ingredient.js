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
        this.ingredients.push(response.data);
      } catch (error) {
        console.error("Erreur lors de la création de l'ingrédient :", error);
      }
    },
    // Lire tous les ingrédients
    async fetchIngredients() {
        try {
          const response = await axios.get("http://localhost:3000/api/ingredients");
          console.log(response.data); // log the fetched ingredients
          this.ingredients = response.data;
          return this.ingredients; // You should return the data
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
        const index = this.ingredients.findIndex((ingredient) => ingredient.id === updatedIngredient.id);
        if (index !== -1) {
          this.ingredients.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'ingrédient :", error);
      }
    },
    // Supprimer un ingrédient
    async deleteIngredient(ingredientId) {
      try {
        await axios.delete(`http://localhost:3000/api/ingredient/${ingredientId}`);
        const index = this.ingredients.findIndex((ingredient) => ingredient.id === ingredientId);
        if (index !== -1) {
          this.ingredients.splice(index, 1);
        }
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
