<template>
  <div :style="$q.screen.xs ? 'width: 88%' : 'width: 74%'">
    <div v-if="!$q.screen.xs" class="col-10 offset-1 bg-white q-py-md">
      <div class="row justify-around text-subtitle1">
        <label class="col-3 text-subtitle1 text-weight-bolder text-blue-10 text-right q-pr-lg">
          Firmar nuevo documento
        </label>
        <div class="col-9 q-pl-xl">
          <label class="text-blue-12 text-weight-medium">
            <span class="nav-option q-mr-sm nav-option-selected">1</span>
            Cargar Documento
          </label>
          <label class="q-px-lg text-blue-grey-6 text-weight-medium">
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
</template>
