<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <!-- v-for permet de faire des cards de façon dynamique -->
    <q-card v-for="recipe in recipes" :key="recipe.id" class="my-card bg-teal-4 text-white">
      <q-card-section>
        <div class="text-h6">{{ recipe.title }}</div>
        <div class="text-subtitle2">par {{ recipe.author }} - {{ recipe.date }}</div>
      </q-card-section>
      <q-separator dark />
      <q-card-section>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient.name }} - {{ ingredient.gramme }}g - {{ ingredient.kcal }} cal
          </li>
        </ul>
        <q-separator dark />
        <div class="text-center">
          {{ recipe.totalKcal }} calories total
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat :to="`/recipe_edit/${recipe.id}`">Modifier</q-btn>
        <q-btn flat>supprimer</q-btn>
      </q-card-actions>
    </q-card>
  </div>
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
        },
        {
          id: 2,
          title: 'Poulet rôti',
          author: 'Jane Doe',
          date: '27/05/2023',
          totalKcal: 600,
          ingredients: [
            { name: 'Poulet', kcal: 335, gramme: 50 },
            { name: 'Sel', kcal: 0, gramme: 500 },
            { name: 'Poivre', kcal: 1, gramme: 550 },
            // Autres ingrédients...
          ],
        },
        // Autres recettes...
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px

.centered-header 
  text-align: center
  font-size: 2rem

q-card-section
  padding-bottom: 0
  padding-top: 0
</style>
