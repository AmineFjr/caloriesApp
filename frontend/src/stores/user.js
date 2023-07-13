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
      console.log(newUser) ; 
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/signup",
          newUser,
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
          this.currentuser = [] ; 
          this.currentuser.push({token : response.data.token});
          this.currentuser.push({userId :  response.data.userId});
          this.currentuser.push({email : loginUser.email});
          // this.users.push(response.data);
        } catch (error) {
          console.error("Erreur lors de la création de l'user :", error);
        }
      },
  },
});
