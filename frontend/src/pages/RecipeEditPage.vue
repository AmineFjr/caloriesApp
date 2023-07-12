<template>
  <q-page class="row justify-center q-pt-lg">
    <q-form class="q-gutter-md" style="width: 90%;" @submit="saveRecipe">
      <q-input filled v-model="recipe.title" label="Titre" readonly/>
      <q-input filled v-model="recipe.author" label="Auteur" readonly/>
      <q-input filled v-model="recipe.date" label="Date" readonly />

      <div class="q-mt-md" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <div class="q-gutter-sm row items-start">
          <q-input type="hidden" v-model="ingredient.id" />
          <q-input filled v-model="ingredient.name" label="Ingrédient" style="width: 30%;" readonly />
          <q-input color="teal-4" filled v-model.number="ingredient.quantity" :label="`Quantité (${ingredient.unit})`" style="width: 30%;" />

          <q-btn round color="teal-6" icon="delete" @click="removeIngredient(index)" />
        </div>
      </div>

      <div class="q-gutter-sm row items-start">
        <q-select color="teal-4" filled v-model="selectedIngredientId" :options="ingredients" option-value="id" option-label="name" label="Nouvel Ingrédient" style="width: 30%;" />
        <q-btn class="q-ml-sm" round color="teal-6" icon="add" @click="addNewIngredient" />
      </div>

      <div v-if="showNewIngredientInputs">
        <div class="q-gutter-sm row items-start">
          <q-input type="hidden" v-model="newIngredient.id" />
          <q-input filled v-model="newIngredient.name" label="Ingrédient" style="width: 30%;" readonly />
          <q-input filled v-model.number="newIngredient.quantity" label="Quantité" style="width: 30%;" />
        </div>  
      </div>

      <q-btn class="q-mt-md" type="submit" color="teal-6" label="Sauvegarder" />
      
      <p v-if="duplicateIngredientError" style="color: red;">Cet ingrédient est déjà dans la recette.</p>
    </q-form>
  </q-page>
</template>

<script>
import { useRecipesStore } from "../stores/recipe.js"; // Importez votre store
import { useIngredientsStore } from "../stores/ingredient.js"; // Importez votre store pour les ingrédients
import { useRouter } from "vue-router"; // Importer le routeur Vue Router

export default {
  data() {
    return {
      recipe: {
        id: null,
        title: '',
        author: '',
        date: '',
        ingredients: [],
      },
      ingredients: [], // sera rempli avec des données réelles depuis le serveur
      selectedIngredientId: null,
      newIngredient: { id: null, name: '', quantity: 0 },
      showNewIngredientInputs: false,
      duplicateIngredientError: false,
    };
  },

  async created() {
    const { id } = this.$route.params;
    const recipeStore = useRecipesStore(); // Utilisez le store pour les recettes
    const ingredientStore = useIngredientsStore(); // Utilisez le store pour les ingrédients
    this.router = useRouter();

    try {
      this.recipe = await recipeStore.fetchRecipeById(id);
      this.recipe.author = this.recipe.userId; // Utilisez userId comme author

      // Formatez la date
      const date = new Date(this.recipe.createdAt);
      this.recipe.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Utilisez createdAt comme date

    } catch (error) {
      // console.error("Error fetching recipe: ", error);
    }
        
    try {
      let result = await ingredientStore.fetchIngredients();
      this.ingredients = result.ingredients;
      // console.log(this.ingredients);
    } catch (error) {
      // console.error("Error fetching ingredients: ", error);
    }

    this.recipe.ingredients = this.recipe.ingredients.map(ingredient => {
      const storeIngredient = this.ingredients.find(storeIng => storeIng.id === ingredient.id);
      return {
        ...ingredient,
        quantity: ingredient.recipe_ingredient.quantity, // Extraire la quantité de l'ingrédient
        unit: storeIngredient ? storeIngredient.unit : '' // Utiliser l'unité du store si elle existe, sinon utiliser une chaîne vide
      };
    });
  },



  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ id: null, name: '', quantity: 0 });
    },

    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },

    getUnitText(ingredientId) {
      const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
      return ingredient ? ingredient.unit : '';
    },

    async saveRecipe() {
      // Check for duplicate ingredient
      const duplicateIngredient = this.recipe.ingredients.find(
        (ingredient) => ingredient.id === this.newIngredient.id
      );

      if (duplicateIngredient) {
        this.duplicateIngredientError = true; // Afficher l'erreur
        return; // Arrêter l'exécution de la méthode
      }

      // Convertir les données de la recette au format souhaité
      const recipeData = {
        id: this.recipe.id,
        ingredients: this.recipe.ingredients.map((ingredient) => ({
          id_ingredient: ingredient.id,
          quantity: ingredient.quantity,
        })),
      };

      // Log the JSON data
      console.log(JSON.stringify(recipeData));

      // Utiliser le store pour mettre à jour la recette dans la base de données
      const recipeStore = useRecipesStore();
      try {
        await recipeStore.updateRecipe(recipeData);
        this.$router.push({ path: "/recipes" });
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la recette :", error);
      }
    },


    addNewIngredient() {
      if (this.selectedIngredientId) {
        const selectedIngredient = this.ingredients.find(
          (ingredient) => ingredient.id === this.selectedIngredientId.id
        );

        // Check for duplicate ingredient
        const duplicateIngredient = this.recipe.ingredients.find(
          (ingredient) => ingredient.id === selectedIngredient.id
        );

        if (duplicateIngredient) {
          this.duplicateIngredientError = true; // Afficher l'erreur
          return; // Arrêter l'exécution de la méthode
        }

        this.newIngredient.id = selectedIngredient.id;
        this.newIngredient.name = selectedIngredient.name;
        this.newIngredient.unit = selectedIngredient.unit; // Ajoutez l'unité ici
        this.recipe.ingredients.push({ ...this.newIngredient });
        this.selectedIngredientId = null;
        this.newIngredient = { id: null, name: '', quantity: 0 };
        this.showNewIngredientInputs = false;
        this.duplicateIngredientError = false; // Réinitialiser l'erreur
      }
    },
  },
};
</script>

<style lang="sass" scoped>
button
  align-self: center
</style>