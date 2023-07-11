<template>
  <q-page class="row justify-center q-pt-lg">
    <q-form class="q-gutter-md" style="width: 60%;" @submit="saveRecipe">
      <q-input filled v-model="recipe.title" label="Title" readonly/>
      <q-input filled v-model="recipe.author" label="Author" readonly/>
      <q-input filled v-model="recipe.date" label="Date" readonly />

      <div class="q-mt-md" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <div class="q-gutter-sm row items-start">
          <q-input filled v-model="ingredient.name" label="Ingredient name" style="width: 30%;" />
          <q-input filled v-model.number="ingredient.kcal" label="Kcal" style="width: 30%;" />
          <q-input filled v-model.number="ingredient.gramme" label="Gramme" style="width: 30%;" />
        </div>
      </div>

      <q-btn class="q-mt-md" round color="primary" icon="add" @click="addIngredient" />

      <q-input class="q-mt-md" filled v-model="totalKcalComputed" label="Total kcal" readonly />

      <q-btn class="q-mt-md" type="submit" color="primary" label="Save" />
    </q-form>
  </q-page>
</template>



<script>
export default {
  data() {
    return {
      recipes: [
        {
          id: 1,
          title: 'Tarte aux pommes',
          author: 'John Doe',
          date: '27/05/2023',
          totalKcal: 500,
          ingredients: [
            { name: 'Pomme', kcal: 52, gramme: 60 },
            { name: 'Sucre', kcal: 200, gramme: 5550 },
            { name: 'Pâte', kcal: 160, gramme: 50 },
            // Autres ingrédients...
          ],
        }
        // Autres recettes...
      ],
      recipe: null
    };
  },

  computed: {
    totalKcalComputed() {
      return this.recipe.ingredients.reduce((total, ingredient) => total + (ingredient.kcal || 0), 0);
    }
  },

  created() {
    const { id } = this.$route.params;
    this.recipe = this.recipes.find(recipe => recipe.id == id);
  },

  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ name: '', kcal: 0, gramme: 0 });
    },

    saveRecipe() {
      // Update the recipe in the recipes array
      const index = this.recipes.findIndex(recipe => recipe.id == this.recipe.id);
      if (index != -1) {
        this.recipes[index] = this.recipe;
      }
    },
  },
};
</script>
