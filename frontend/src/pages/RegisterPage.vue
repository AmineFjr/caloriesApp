<template>
    <q-page class="row justify-center q-pt-lg">
      <q-form class="q-gutter-md" style="width: 60%;" @submit="saveUser">
        <q-input color="teal-4" filled v-model="user.firstname" label="Prénom">
          <div v-if="submitted && !user.firstname" class="text-negative">Le prénom est requis</div>
        </q-input>
        
        <q-input color="teal-4" filled v-model="user.lastname" label="Nom">
          <div v-if="submitted && !user.lastname" class="text-negative">Le nom est requis</div>
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
  export default {
    name: "RegisterPage",
    data() {
      return {
        user: {
          firstname: "",
          lastname: "",
          email: "",
          password: ""
        },
        showPassword: false,
        submitted: false,
      };
    },
    methods: {
      saveUser(e) {
        e.preventDefault();
        this.submitted = true;
        if (this.user.firstname && this.user.lastname && this.validateEmail(this.user.email) && this.user.password && this.user.password.length >= 6) {
          console.log(JSON.stringify(this.user));
        }
      },
      validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    }
  };
  </script>
  