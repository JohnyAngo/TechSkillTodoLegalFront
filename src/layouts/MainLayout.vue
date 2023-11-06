<script setup>
  import { ref } from 'vue'
  import { useDataStore } from '../stores/data-store';

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

        <div :style="$q.screen.xs ? 'width: 88%' : 'width: 74%'">
          <div v-if="!$q.screen.xs" class="col-10 offset-1 bg-white q-py-md">
            <div class="row justify-around text-subtitle1">
              <label class="col-3 text-h6 text-weight-medium text-right q-pr-lg">
                Firmar nuevo documento
              </label>
              <div class="col-9 q-pl-xl">
                <label class="text-blue-12 text-weight-medium">
                  <span class="nav-option q-mr-sm nav-option-selected">1</span>
                  Cargar Documento
                </label>
                <label class="q-px-xl text-blue-grey-6 text-weight-medium">
                  <span class="nav-option q-mr-sm">2</span>
                  Indicar Firmantes
                </label>
                <label class="text-blue-grey-6 text-weight-medium">
                  <span class="nav-option q-mr-sm">3</span>
                  Personalizaciones opcionales
                </label>
              </div>
            </div>
          </div>
        </div>

        <div :style="$q.screen.xs ? 'width: 88%' : 'width: 74%'">
          <router-view />
        </div>

      </div>
    </q-page-container>

    <q-footer v-if="$q.screen.xs" class="bg-grey-8 text-white">
      <q-btn-group spread>
        <q-btn v-if="dataStore.files.length > 0"
          @click="dataStore.setFiles([])"
         color="purple" style="border-top: 2px #0277bd solid;border-bottom: 2px #0277bd solid;"
          class="q-py-md text-light-blue-9 bg-grey-1" label="Regresar" />
        <q-btn @click="dataStore.setSendFiles( true )" :loading="dataStore.loading"
          color="purple" class="q-py-md bg-light-blue-9" label="Siguiente" />
      </q-btn-group>
    </q-footer>

  </q-layout>
</template>

<style>
.nav-option{
  display: inline-block;
  width: 30px !important;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  border-color: #517dc1;
  color: #3A77EC;
  line-height: 28px;
  border: 1px #517dc1 solid;
}

.nav-option-selected{
  background-color: #517dc1;
  color: white;
}
</style>