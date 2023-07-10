<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card bg-teal-6 text-white">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

export default {
  name: "RecipePage",

  setup() {
    return {
    };
  },
};
</script>
<style></style>
