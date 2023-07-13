<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 1200px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-teal-6">
        <q-toolbar>
          <q-btn flat round dense to="/" icon="home" />
          <q-btn
            color="white"
            flat
            to="/recipes"
            label="Les recettes"
          />
          <q-space />

          <q-btn color="teal-6" icon="person" class="q-ml-auto q-btn-no-padding q-mr-md">
            <q-menu>
              <q-list style="min-width: 120px">
                <q-item clickable v-close-popup to="/login">
                  <q-item-section>Se connecter</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/register">
                  <q-item-section>S'inscrire</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn color="teal-6" icon="settings" class="q-ml-auto q-btn-no-padding">
            <q-menu>
              <q-list style="min-width: 120px">
                <q-item clickable v-close-popup to="/ingredients">
                  <q-item-section>Ingrédients</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          
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
