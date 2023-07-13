<template>
    <q-page class="row justify-center q-pt-lg">
      <q-form class="q-gutter-md" style="width: 60%;" @submit="saveUser">
        <q-input color="teal-4" filled v-model="user.firstName" label="Prénom">
          <div v-if="submitted && !user.firstName" class="text-negative">Le prénom est requis</div>
        </q-input>
        
        <q-input color="teal-4" filled v-model="user.lastName" label="Nom">
          <div v-if="submitted && !user.lastName" class="text-negative">Le nom est requis</div>
        </q-input>
        
        <q-input color="teal-4" filled v-model="user.email" type="email" label="Email">
          <div v-if="submitted && !user.email" class="text-negative">L'email est requis</div>
          <div v-if="submitted && user.email && !validateEmail(user.email)" class="text-negative">L'email n'est pas valide</div>
        </q-input>
        
        <q-input color="teal-4" filled v-model="user.password" :type="showPassword ? 'text' : 'password'" label="Mot de passe">
          <template v-slot:append>
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"/>
          </template>
          <div v-if="submitted && (!user.password || user.password.length < 6)" class="text-negative">Le mot de passe doit contenir au moins 6 caractères</div>
        </q-input>
  
        <q-btn class="q-mt-md" type="submit" color="teal-6" label="Sauvegarder"/>
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
          firstName: "",
          lastName: "",
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
        if (this.user.firstName && this.user.lastName && this.validateEmail(this.user.email) && this.user.password && this.user.password.length >= 6) {
          console.log(this.user);

          const userStore = useUserStore();
          try {
          await userStore.createUser(this.user);
          this.$router.push({ path: "/login" });
        } catch (error) {
          console.error("Erreur lors de la sauvegarde de la recette :", error);
        }

      }
      },
      validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    }
  };
  </script>
  