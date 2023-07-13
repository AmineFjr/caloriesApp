import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    currentuser : [
      
    ]
  }),
  actions: {
    // Créer un user
    async createUser(newUser) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/signup",
          newUser
        );
        this.users.push(response.data);
      } catch (error) {
        console.error("Erreur lors de la création de l'user :", error);
      }
    },

    async loginUser(loginUser) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/user/login",
            loginUser
          );
          console.log(response.data)
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("user", loginUser.email);
          // this.users.push(response.data);
        } catch (error) {
          console.error("Erreur lors de la création de l'user :", error);
        }
      },


  },
});
