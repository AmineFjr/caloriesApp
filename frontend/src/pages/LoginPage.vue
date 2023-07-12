<template>
    <q-page class="row justify-center q-pt-lg">
      <q-form class="q-gutter-md" style="width: 60%;" @submit="saveUser">   
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
      saveUser(e) {
        e.preventDefault();
        this.submitted = true;
        if (this.user.email && this.user.password) {
          console.log(JSON.stringify(this.user));
        }
      },
    }
  };
  </script>
  