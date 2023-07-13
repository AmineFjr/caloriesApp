import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
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

    // Logger un user EN COURS
    async logUser(newUser) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/user/login",
            newUser
          );
          this.users.push(response.data);
        } catch (error) {
          console.error("Erreur lors de la création de l'user :", error);
        }
      },


  },
});
