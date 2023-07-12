<template>
 <q-page class="row justify-center q-pt-lg">
    <q-form class="q-gutter-md" style="width: 90%;" @submit="saveRecipe" >
      <q-input filled v-model="recipe.title" label="Titre" />
      <q-input filled v-model="recipe.author" label="Auteur" readonly/>
    
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
        <q-btn class="q-mt-md" type="submit" color="teal-6" label="Save" style="margin: 5px" />
        <q-btn class="q-mt-md" color="teal-6" label="Analyze" @click="onAnalyze" style="margin: 5px" />
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

  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';
import { defineStore } from "pinia";
import axios from "axios";
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
      ////
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
          id: 1,
          title: '',
          author: 'test@test.com',
          ingredients: [
          
          ],
        },
      ],
      recipe: null,
      selectedIngredientId: null,
      newIngredient: { id: null, name: '', quantity: 0 },
      showNewIngredientInputs: false,
      duplicateIngredientError: false, // Ajout de la propriété pour afficher l'erreur
      generatedtable : {}
    };   
  },
  created() {
    this.recipe = this.recipes.find((recipe) => recipe.id == 1);
  },
  methods: {
 ////////////////////////Fonction d'analyse des calories
    onAnalyze() {      
      this.generatedtable = {}
      var result = 0
      var data = this.recipe.ingredients
      var dbingrediants = [ //fake data 
    {
        "id": "1",
        "name": "Farine",
        "unit": "g",
        "calories": "700"
    },
    {
        "id": "2",
        "name": "Sucre",
        "unit": "g",
        "calories": "400"
    },
    {
        "id": "3",
        "name": "Pâte",
        "unit": "g",
        "calories": "350"
    },
    {
        "id": "4",
        "name": "Oeuf",
        "unit": "",
        "calories": "140"
    },
    {
        "id": "5",
        "name": "Levure",
        "unit": "g",
        "calories": "20"
    },
    {
        "id": "6",
        "name": "Vanille",
        "unit": "cuillère à café",
        "calories": "10"
    },
    {
        "id": "7",
        "name": "Chocolat noir",
        "unit": "g",
        "calories": "550"
    },
    {
        "id": "8",
        "name": "Lait",
        "unit": "ml",
        "calories": "100"
    },
    {
        "id": "9",
        "name": "Sel",
        "unit": "g",
        "calories": "0"
    },
    {
        "id": "10",
        "name": "Amandes",
        "unit": "g",
        "calories": "320"
    },
    {
        "id": "11",
        "name": "Miel",
        "unit": "g",
        "calories": "90"
    },
    {
        "id": "12",
        "name": "Levure chimique",
        "unit": "cuillère à café",
        "calories": "5"
    },
    {
        "id": "13",
        "name": "Cannelle",
        "unit": "cuillère à café",
        "calories": "6"
    },
    {
        "id": "14",
        "name": "Noix de coco râpée",
        "unit": "g",
        "calories": "185"
    },
    {
        "id": "15",
        "name": "Miel d'acacia",
        "unit": "g",
        "calories": "120"
    },
    {
        "id": "16",
        "name": "Framboises",
        "unit": "g",
        "calories": "64"
    },
    {
        "id": "17",
        "name": "Écorce d'orange confite",
        "unit": "g",
        "calories": "180"
    }
    ]

    
    for(var i in data)
    {
      for(var j in dbingrediants)
      {
        if (data[i].name == dbingrediants[j].name)
        {
          var cal = data[i].quantity * dbingrediants[j].calories
          result = result + cal ;

          var element = {"name": data[i].name, "kcal": cal }
          Object.assign(this.generatedtable,element);
        }
      }
      
    }
   
    this.totalkcal = result;
    document.getElementById("analyze").hidden = false;
    },

    downloadJSON() {
      var data = this.generatedtable

      var fileToSaveJSON = new Blob([JSON.stringify(data)], {
        type: 'application/json'
      });
      saveAs(fileToSaveJSON, "rapportJSON.json");
    },

    downloadCSV() {
      var data = this.generatedtable
      
      let options = {
        delimiter : 
        {
          field : ';', // Comma field delimiter
        },
      }
      json2csv(data,options) 
      .then((csv) => {
       var fileToSave = new Blob([csv], {type: 'text/csv;charset=utf-8;'})
       saveAs(fileToSave, "rapportCSV.csv")})
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
        title: this.recipe.title,
        author : this.recipe.author,
        ingredients: this.recipe.ingredients.map((ingredient) => ({
          id_ingredient: ingredient.id,
          quantity: ingredient.quantity,
        })),
      };

      // Log the JSON data
      console.log(recipeData);
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

  }
};
</script>
<style></style>
