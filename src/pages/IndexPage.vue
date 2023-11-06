<script setup lang="ts">
  import { useQuasar, date  } from 'quasar'
  import { ref, onMounted, computed, watch } from 'vue';
  import dragDrop from "drag-drop";
  import { useDataStore } from '../stores/data-store';
  import axios from 'axios';

  const dataStore = useDataStore();
  
  const $q = useQuasar();
  const filesSelected = ref([]);
  const base_url_signedurl = 'https://74v4865l13.execute-api.us-east-1.amazonaws.com/dev/signedurl';

  watch( dataStore, (newValue, oldValue) => {
    if( newValue.files.length == 0 && filesSelected.value.length != 0)
      filesSelected.value = []

    if (newValue.sendFiles) uploadFiles()
  })

  watch( filesSelected, (newValue, oldValue) => {
    dataStore.setFiles( filesSelected.value )
  }, { deep: true })

  const openExplorerFile = () => {
    document.getElementsByClassName('q-field')[0].click()
  }

  const checkValidations = (rejectedEntries) => {
    for (let index = 0; index < rejectedEntries.length; index++) {
      const element = rejectedEntries[index];      
      if ( element.failedPropValidation == 'duplicate' ) {
        $q.notify({ type: 'negative', message: `El archivo ${ element.file.name } se encuentra duplicado` })    
        continue;
      }else if( element.failedPropValidation == 'max-files' ){
        $q.notify({ type: 'negative', message: `Se supero el maximo de archivos permitidos` })    
        continue;
      }else if( element.failedPropValidation == 'max-file-size' ){
        $q.notify({ type: 'negative', message: `El archivo ${ element.file.name } supera el tamaño permitido 20Mb` })
        continue;
      }else{
        $q.notify({ type: 'negative', message: `${rejectedEntries.length} archivo no pasó las restricciones de validación` })
        continue;
      }      
    }
  }
  
  onMounted(() => {
    dragDrop('#drag-drop-element', (files, pos, fileList, directories) => {
      for (let index = 0; index < files.length; index++) {
        const element = files[index];    
        if ( element.type == 'application/pdf') { //validar formato
          if ( (element.size / 1024) <= 20480) { //validar peso max: 20Mb
            const exist = filesSelected.value.some( x => x.name == element.name); 
            if ( !exist ) { //validar duplicado
              if (filesSelected.value.length < 5) { //validar max-file : 5
                filesSelected.value.push(element)                     
              }else
                $q.notify({ type: 'negative', message: `Solo se puede subir maximo 5 archivos`})
            }else
              $q.notify({ type: 'negative', message: `El archivo ${ element.name } se encuentra duplicado`})
          }else{
            $q.notify({ type: 'negative', message: `${element.name} supera el peso permitido 20Mb`})
            continue;
          }
        }else{
          $q.notify({ type: 'negative', message: `${element.name} no es un archivo PDF` })
          continue;
        }
      }
    })
  })

  const uploadFiles = async () => {

    if ( filesSelected.value.length == 0 ){
      dataStore.setSendFiles( false )
      return $q.notify({ type: 'warning', message: 'Agrega al menos un archivo'})
    } 

    dataStore.loading = true

    filesSelected.value.forEach(async (file, index) => {
      const { data } = await axios.get(`${ base_url_signedurl }`, { 
        params: { path: 'documentos', filename: file.name } 
      });  
      await uploadFile( file, data.signedUrl, index );      
    });
  }

  const uploadFile = ( file, signedUrl, index ) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async function (e) {
        try { 
          await fetch(signedUrl, { method: 'PUT', body: e.target.result });

          if ( ( index + 1) == filesSelected.value.length ) {
            dataStore.loading = false;
            filesSelected.value = [];
            dataStore.setSendFiles( false );

            const res = await axios.get("https://api.ipify.org/?format=json");
            const timeStamp = Date.now()
            const formattedString = date.formatDate(timeStamp, 'HH:mm')

            await axios.post('https://webhook.site/aa88b3ad-be3e-475f-8adc-f5dc99559dc1', {
                name:"Johny Ango",
                hora_local: formattedString,
                ip: res.data.ip
            });   

            $q.notify({ type: 'positive', message: 'Archivos subidos exitosamente'})
          }

          resolve( true );
        } catch (error) {
          $q.notify({ type: 'negative', message: 'Fallo la conexión con la API del WEBHOOK'})
          reject( false );
        }            
      }
      reader.readAsDataURL(file);
    });
  }

</script>
<template>
  <q-page class="row q-col-gutter-x-xl justify-between" style="min-height: auto;">

    <div class="col-xs-12 col-sm-6" 
      :class="$q.screen.xs ? '' : 'q-mt-lg'">
      <div class="bg-white row" 
        :style="$q.screen.xs ? 'height: 14vh;' : 'height: 67vh;'"
        style="border-radius: 3%;">

        <div v-if="$q.screen.xs"
          class="col-xs-5 col-sm-12 flex flex-center text-center" 
          :class="$q.screen.xs ? 'q-py-sm' : 'q-mt-xl'">
          <q-img src="/img1.JPG" style="max-width: 300px; max-height: 80px;" fit="contain" />
        </div>

        <div class="col-xs-7 col-sm-12 text-center text-weight-bolder text-blue-12 testing" 
          :class="$q.screen.xs ? 'text-h6 flex flex-center q-pr-md' : 'text-h4'"
          :style="$q.screen.xs 
            ? 'display: flex;align-items: center;justify-content: flex-start;' 
            : 'letter-spacing: 2px;padding-top: 31px;'">
          ¿Cómo funciona?           
        </div>

        <div v-if="!$q.screen.xs"
          class="col-xs-6 col-sm-12 text-center" :class="$q.screen.xs ? '' : 'q-mt-xl'">
          <q-img src="/img1.JPG" style="max-width: 400px; max-height: 250px;" fit="contain" />
        </div>

        <div v-if="$q.screen.name !== 'xs'"
          class="col-sm-12 q-pt-md text-h6 text-center q-pb-xl q-mt-sm text-blue-grey-13 text-weight-regular" 
          style="">
          Este es un servicio gratuito de <span class="text-blue-14 text-weight-bold">todolegal</span> 
        </div>

      </div>
    </div>


    <div class="col-xs-12 col-sm-6 q-mt-lg" id="drag-drop-element" 
      :class="filesSelected.length == 5 && $q.screen.xs ? 'q-mb-xl' : ''">

      <div class="bg-white rounded-borders" style=";position: relative" 
        :style="$q.screen.xs ? 'max-height: 69vh; height: auto' : 'height: 67vh;'">

        <div class="text-subtitle1 q-ml-lg q-pt-md text-weight-bolder text-blue-10">
          <label @click="filesSelected = []"
            style="display: block">
            <q-icon v-if="filesSelected.length > 0 && !$q.screen.xs"
              style="position:relative; bottom: 2px" 
              class="text-weight-bold" name="arrow_back_ios" /> 
              Carga de Documentos
          </label>
          <label class="text-weight-regular text-blue-grey-14 descriptionUploadFile">
            Sube tus documentos y ordénalos <q-icon color="blue-12" name="help" />
          </label>
          <div id="inputFile" class="hiddenElement">
            <q-file input-class="inputFileClick"
              accept=".pdf" max-files="5" max-file-size="20971520"
              @rejected="checkValidations" v-model="filesSelected" filled
              multiple append />
          </div>
        </div>

        <div v-if="filesSelected.length == 0" 
          class="row text-center justify-center" 
          :class="$q.screen.xs ? 'q-mt-md' : 'q-mt-lg'">

          <div v-if="!$q.screen.xs"
            class="col-xs-8 col-sm-8 q-py-lg rounded-borders contentDragDrop" >
            <img src="/nube.png" style="width: 34%;">
            <label style="display: block" class="q-mt-lg text-caption text-blue-grey-8 cursor-pointer">
              Arrastra y suelta tus documentos aqui o
              <span @click="openExplorerFile" style="text-decoration: underline;"
                class="text-weight-medium text-indigo-14">
                Buscar archivo
              </span>
            </label>
          </div>  

          <div v-else class="col-xs-8 col-sm-8 q-py-lg rounded-borders contentDragDrop" 
            @click="openExplorerFile">
            <img src="/nube.png" style="width: 60%;">
          </div> 
          
        </div>

        <div v-else class="row text-center justify-center items-center" 
          :class="$q.screen.xs ? 'q-mt-md q-pb-lg' : 'q-mt-md'">
          <div class="col-xs-11 col-sm-9 q-px-md rounded-borders flex flex-center boxShowElementsFile" 
            :class="$q.screen.xs ? 'q-py-md' : 'q-py-lg'"
            id="drag-drop-element">

            <div v-if="$q.screen.xs" class="q-pb-md q-pt-sm">
              <img src="/nube.png" style="width: 34%;">
            </div>

            <!-- Recorre todos fichero seleccionados -->
            <div v-for="(file, index) in filesSelected" :key="index"
              class="row bg-white flex q-mb-sm content-box rounded-borders">

              <div class="flex flex-center addFileBtn">
                <q-icon size="xs" color="blue-12" class="text-weight-medium" name="reorder" />
              </div>
              <div class="flex justify-left text-blue-grey-13 q-pl-sm fileName">
                {{ file.name.split('.')[0] }}
              </div>

              <div @click="filesSelected.splice(index, 1);"
                class="border-rigth flex flex-center btnDeleteFile">
                <q-icon size="xs" color="blue-12" 
                  class="text-weight-medium" name="delete" />
              </div>
            </div>

            <div v-if="filesSelected.length < 5"
              @click="openExplorerFile"
              class="row flex content-box rounded-borders" 
              style="border: 3px white solid;cursor: pointer">

              <div class="flex flex-center addFileBtn">
                <q-icon size="xs" color="blue-12" class="text-weight-medium" name="add" />
              </div>
              <div class="flex justify-left items-center text-blue-12 text-weight-medium q-pl-sm" 
                style="width: 75%">
                Añadir más documentos
              </div>

              <div class="border-rigth flex flex-center column text-weight-bolder text-blue-12 btnDeleteFile"
                style="font-size: 10px">
                <label>5 Máx</label>
                <label>20Mb</label>
              </div>
            </div>

          </div>  
        </div>

        <div v-if="filesSelected.length == 0"
          class="text-center q-mt-sm text-red-6 text-weight-medium" 
          :class="$q.screen.xs ? 'q-pb-lg q-pt-md text-subtitle1' : ''">
          Solo se admiten archivos en formato <span>PDF</span>
        </div>

        <div v-if="!$q.screen.xs"
          class="row text-center justify-center q-mt-sm text-red-9 btn-siguiente">
          <q-btn @click="uploadFiles" :loading="dataStore.loading"
            class="col-sm-6 q-py-sm q-mt-md" color="indigo-12" label="Siguiente" />
        </div>

      </div>
    </div>

  </q-page>
</template>