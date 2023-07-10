<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 1200px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan">
        <q-toolbar>
          <q-btn flat round dense to="/" icon="home" />
          <q-btn
            color="white"
            flat
            to="/liste"
            label="Les recettes"
          />
          <q-space />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  setup() {
    return {};
  },
};
</script>
