<template>
  <div><h3>Calories calculator</h3></div>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @save="onSubmit" @analyze="onAnalyze" class="q-gutter-md">
      <q-input v-model="text" filled type="textarea" />
      <div>
        <q-btn
          label="Enregistrer"
          type="save"
          color="primary"
          style="margin: 5px"
        />
        <q-btn
          label="Analyser"
          type="analyze"
          color="primary"
          style="margin: 5px"
        />
      </div>
    </q-form>
  </div>
  <div><h4>Rapport d'analyse</h4></div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

// import CardComponents from "../components/CardComponents.vue";

export default {
  name: "HomePage",
  components: {},
  setup() {
    return {
      text: ref(""),

      onSubmit() {
        console.log("submit");
      },

      onAnalyze() {
        console.log("analyze");
        const box = `
        <div id='box'>
          <button id='button-1'>Button</button>
        </div>`;

        document.body.innerHTML = box;
      },
    };
  },
};
</script>
<style></style>
