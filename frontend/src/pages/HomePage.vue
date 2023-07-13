<template>
    <q-form class="q-gutter-md" style="width: 90%;" @submit="saveRecipe" >
      <q-input filled v-model="recipe.title" label="Titre" />
      <q-input filled v-model="recipe.author" label="Auteur" style="display: none" readonly/>
    
      <div class="q-mt-md" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <div class="q-gutter-sm row items-start">
          <q-input type="hidden" v-model="ingredient.id" />
          <q-input filled v-model="ingredient.name" label="Ingrédient" style="width: 30%;"  />
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
          <q-input filled v-model="newIngredient.name" label="Ingrédient" style="width: 40%;"  />
          <q-input filled v-model.number="newIngredient.quantity" label="Quantité" style="width: 40%;" />
        </div>  
      </div>

      <div>
        <q-btn class="q-mt-md" type="submit" color="teal-6" label="Ajouter" style="margin: 5px" />
        <q-btn class="q-mt-md" color="teal-6" label="Analyser" @click="onAnalyze" style="margin: 5px" />
      </div>
      
      <p v-if="duplicateIngredientError" style="color: red;">Cet ingrédient est déjà dans la recette.</p>
    </q-form>

    <div id="analyze" class="q-pa-md" hidden >
      <div>
        <h4>Rapport d'analyse</h4>
        <h5>{{totalkcal}} calories</h5>
      </div>
      <div>
        <p>exporter en</p>
        <img src='/icons/json.png' alt='json' title='json' @click="downloadJSON" style='height : 50px; width : 50px;'/>
        <img src='/icons/csv.png' alt='csv' title='csv' @click="downloadCSV" style='height : 50px; width : 50px;'/>
      </div>
    </div>

</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';

import { useRecipesStore } from "../stores/recipe.js"; // Importez votre store
import { useIngredientsStore } from "../stores/ingredient.js"; // Importez votre store pour les ingrédients

// import CardComponents from "../components/CardComponents.vue";


export default {
  name: "HomePage",
  components: {},
  setup() {
    const $q = useQuasar();
    var text = ref("");
    var totalkcal = ref(0);
    return {
      text,
      totalkcal,  
    };
  },
  data() {
    return {
      recipe: {
        id: null,
        title: '',
        author: '',
        date: '',
        ingredients: [],
      },
      ingredients: [],
      selectedIngredientId: null,
      newIngredient: { id: null, name: '', quantity: 0 },
      showNewIngredientInputs: false,
      duplicateIngredientError: false,
      generatedtable : []
    };   
  },
  async created() {
    this.recipe = this.recipe
    const ingredientStore = useIngredientsStore();
    this.recipe.author = 1

    try {
      const result = await ingredientStore.fetchIngredients();
      this.ingredients = result.ingredients;
    } catch (error) {
      console.error("Error fetching ingredients: ", error);
    }

    this.recipe.ingredients = this.recipe.ingredients.map(ingredient => {
      const storeIngredient = this.ingredients.find(storeIng => storeIng.id === ingredient.id);
      return {
        ...ingredient,
        quantity: ingredient.recipe_ingredient.quantity,
        unit: storeIngredient ? storeIngredient.unit : ''
      };
    });
  },
  methods: {
 ////////////////////////Fonction d'analyse des calories
    onAnalyze() {      
      this.generatedtable = []
      var result = 0
      var data = this.recipe.ingredients

    
    for(var i in data)
    {
      for(var j in this.ingredients)
      {
        if (data[i].name == this.ingredients[j].name)
        {
          var cal = data[i].quantity * this.ingredients[j].calories
          result = result + cal ;

          var element = {name: data[i].name, kcal: cal }
          this.generatedtable.push(element)
          
        }
      }
      
    }
    console.log( ) 
    this.totalkcal = result;
    document.getElementById("analyze").hidden = false;
    },

    downloadJSON() {
      var data = this.generatedtable
      var titlefile = this.recipe.title + "_rapportJSON.json"
     
      var fileToSaveJSON = new Blob([JSON.stringify(data)], {
        type: 'application/json'
      });
      saveAs(fileToSaveJSON, titlefile);
    },

    downloadCSV() {
      var data = this.generatedtable
      var titlefile = this.recipe.title + "_rapportCSV.csv"

      let options = {
        delimiter : 
        {
          field : ';', // Comma field delimiter
        },
      }
      json2csv(data,options) 
      .then((csv) => {
       var fileToSave = new Blob([csv], {type: 'text/csv;charset=utf-8;'})
       saveAs(fileToSave, titlefile)})
      .catch((err) =>{ console.log(err)})
      
    },

// ////////////////////////////////////////////////////

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
        title: this.recipe.title,
        userId : this.recipe.author,
        ingredients: this.recipe.ingredients.map((ingredient) => ({
          id: ingredient.id,
          quantity: ingredient.quantity,
          step: 1,
        })),
      };

      // Log the JSON data
      console.log(JSON.stringify(recipeData));


      // Utiliser le store pour mettre à jour la recette dans la base de données
      const recipeStore = useRecipesStore();
      try {
        await recipeStore.createRecipe(recipeData);
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

  }
};
</script>
<style></style>
