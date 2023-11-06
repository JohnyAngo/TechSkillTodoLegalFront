import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    files: [],
    sendFiles: false,
    loading: false
  }),
  getters: {
    
  },
  actions: {
    setFiles( files: any ) {
      this.files = files;
    },
    setSendFiles( state: boolean ) {
      this.sendFiles = state;
    }
  },
});
