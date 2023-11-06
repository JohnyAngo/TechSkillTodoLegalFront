<script setup>
  import { ref } from 'vue'
  import { useDataStore } from '../stores/data-store';
  import TabPanel from "../components/TabPanel.vue";

    const rightDrawerOpen = ref(false)
    const dataStore = useDataStore();

    const tab = ref('mails');
    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }      
</script>

<template>
  <q-layout view="hHh lpr fFf" style="background-image: linear-gradient(to bottom, #eef2f5, #e8eef4, #e2ebf3, #dde7f3, #d8e3f2);">

    <q-header class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="q-ml-md text-weight-bold" style="font-family: 'Nunito', sans-serif;">
          todo<span 
            class="bg-grey-10 text-light-blue-12 q-px-xs" 
            style="border-bottom-left-radius: 18%;padding-right: 0;">
              legal
            </span>
            <span class="text-light-blue-12 text-weight-medium">.</span> 
        </q-toolbar-title>

        <label v-if="!$q.screen.xs"
          class="q-mr-md text-h6 text-weight-bolder">
          Smart <span class="text-blue-14">Contracts</span> Suite
        </label>

        <q-btn dense flat color="blue-13" round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <div class="row q-mt-lg justify-center">

        <TabPanel />

        <div :style="$q.screen.xs ? 'width: 88%' : 'width: 74%'">
          <router-view />
        </div>

      </div>
    </q-page-container>

    <q-footer v-if="$q.screen.xs" class="bg-grey-8 text-white">
      <q-btn-group spread>
        <q-btn v-if="dataStore.files.length > 0"
          @click="dataStore.setFiles([])" color="purple" 
          class="q-py-md text-light-blue-9 bg-grey-1 btnFooterMovil" label="Regresar" />
        <q-btn @click="dataStore.setSendFiles( true )" :loading="dataStore.loading"
          color="purple" class="q-py-md bg-light-blue-9" label="Siguiente" />
      </q-btn-group>
    </q-footer>

  </q-layout>
</template>
