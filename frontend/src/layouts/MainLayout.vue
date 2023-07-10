<template>
  <div class="q-pa-md">
    <q-layout style="margin: 0px; height: 100%">
      <q-page-container>
        <q-page class="q-pa-md" style="margin: 0px; height: 100%">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
// import NavbarComponants from "../components/NavbarComponants.vue";

export default {
  name: "MainLayout",
  components: {},
  setup() {
    return {};
  },
};
</script>
