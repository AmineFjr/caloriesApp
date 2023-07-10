import { defineStore } from "pinia";
import axios from "axios";

export const useDonationStore = defineStore("donation", {
  state: () => ({
    donations: [],
  }),
  actions: {
    // Créer une donation
    async createDonation(newDonation) {
      try {
        const response = await axios.post(
          "https://donation-exam.shuttleapp.rs/donations",
          newDonation
        );
        this.donations.push(response.data);
      } catch (error) {
        console.error("Erreur lors de la création de la donation :", error);
      }
    },
    // Lire toutes les donations
    async fetchDonation() {
      try {
        const response = await axios.get(
          "https://todolist-v2.shuttleapp.rs/donations"
        );
        this.donations = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des donations :", error);
      }
    },
    // Lire une donation
    async fetchOneDonation() {
      try {
        await axios.get(`/api/donations/${DonationId}`);
        const index = this.donations.findIndex(
          (donation) => donation.id === DonationId
        );
        if (index !== -1) {
          this.donations = response.data;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la donation :", error);
      }
    },
    // Mettre à jour une donation
    async updateDonation(updatedDonation) {
      try {
        const response = await axios.put(
          `/api/donations/${updatedDonation.id}`,
          updatedDonation
        );
        const index = this.donations.findIndex(
          (donations) => donations.id === updatedDonation.id
        );
        if (index !== -1) {
          this.donations.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la donation :", error);
      }
    },
    // Supprimer une donation
    async deleteDonation(DonationId) {
      try {
        await axios.delete(`/api/donations/${DonationId}`);
        const index = this.donations.findIndex(
          (donation) => donation.id === DonationId
        );
        if (index !== -1) {
          this.donations.splice(index, 1);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la donation :", error);
      }
    },
  },
});
