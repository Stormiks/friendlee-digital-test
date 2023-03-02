import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    autoAmount: 3300000,
    deposit: 420000,
    leaseTerm: 60
  }),
  actions: {
    sendFormData() {
      const jsonData = JSON.stringify({
        autoAmount: this.autoAmount,
        deposit: this.deposit,
        leaseTerm: this.leaseTerm
      });

      alert(jsonData);
    }
  },
})
