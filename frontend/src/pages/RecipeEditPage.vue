<template>
  <q-page class="row justify-center q-pt-lg">
    <q-form class="q-gutter-md" style="width: 60%;" @submit="saveRecipe">
      <q-input filled v-model="recipe.title" label="Titre" readonly/>
      <q-input filled v-model="recipe.author" label="Auteur" readonly/>
      <q-input filled v-model="recipe.date" label="Date" readonly />

      <div class="q-mt-md" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <div class="q-gutter-sm row items-start">
          <q-input type="hidden" v-model="ingredient.id" />
          <q-input filled v-model="ingredient.name" label="Ingrédient" style="width: 30%;" readonly />
          <q-input color="teal-4" filled v-model.number="ingredient.quantity" :label="`Quantité (${getUnitText(ingredient.id)})`" style="width: 30%;" />
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

      <q-btn class="q-mt-md" type="submit" color="teal-6" label="Save" />
      
      <p v-if="duplicateIngredientError" style="color: red;">Cet ingrédient est déjà dans la recette.</p>
    </q-form>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      ingredients: [
        { id: 4, name: 'Fraise', unit: "gramme" },
        { id: 5, name: 'Lait', unit: "centilitre"},
        { id: 1, name: 'Pomme', unit: "gramme"},
        { id: 2, name: 'Sucre', unit: "gramme"},
        { id: 3, name: 'Pâte', unit: "gramme"}
        // Ajoutez d'autres ingrédients ici
      ],
    };
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
      newIngredient: { id: null, name: '', quantity: 0 },
      showNewIngredientInputs: false,
      duplicateIngredientError: false, // Ajout de la propriété pour afficher l'erreur
    };
  },

  created() {
    const { id } = this.$route.params;
    this.recipe = this.recipes.find((recipe) => recipe.id == id);
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

    saveRecipe() {
      // Check for duplicate ingredient
      const duplicateIngredient = this.recipe.ingredients.find(
        (ingredient) => ingredient.id === this.newIngredient.id
      );

      if (duplicateIngredient) {
        this.duplicateIngredientError = true; // Afficher l'erreur
        return; // Arrêter l'exécution de la méthode
      }

      // Update the recipe in the recipes array
      const index = this.recipes.findIndex((recipe) => recipe.id == this.recipe.id);
      if (index != -1) {
        this.recipes[index] = this.recipe;
      }

      // Prepare the JSON format for logging
      const recipeData = {
        id: this.recipe.id,
        ingredients: this.recipe.ingredients.map((ingredient) => ({
          id_ingredient: ingredient.id,
          quantity: ingredient.quantity,
        })),
      };

      // Log the JSON data
      console.log(JSON.stringify(recipeData));
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