<template>
    <q-page class="row justify-center q-pt-lg">
      <q-form class="q-gutter-md" style="width: 90%;" @submit="saveUser">   
        <q-input color="teal-4" filled v-model="user.email" type="email" label="Email" />
        
        <q-input color="teal-4" filled v-model="user.password" :type="showPassword ? 'text' : 'password'" label="Mot de passe">
          <template v-slot:append>
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"/>
          </template>
        </q-input>
  
        <q-btn class="q-mt-md" type="submit" color="teal-6" label="Se connecter"/>
      </q-form>
    </q-page>
  </template>
  
  <script>
  import { useUserStore } from "../stores/user.js"; // Importez votre store

  export default {
    name: "RegisterPage",
    data() {
      return {
        user: {
          email: "",
          password: ""
        },
        showPassword: false,
        submitted: false,
      };
    },
    methods: {
      async saveUser(e) {
        e.preventDefault();
        this.submitted = true;
        if (this.user.email && this.user.password) {
          // console.log(JSON.stringify(this.user));
        
          const userStore = useUserStore();
          await userStore.loginUser(this.user)
          .then((res) => this.$router.push({ path: "/" }))
          .catch((error) => console.error("Erreur lors de la connexion :", error))

        }
      },
    }
  };
  </script>
  