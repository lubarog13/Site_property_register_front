<template>
 <v-app>
   <v-app-bar
     app
     color="primary"
     dark
   >
     <div class="d-flex align-center">
       <h1 class="headline">Реестр имущества университета ИТМО</h1>
     </div>
     <div class="d-flex align-center" :style="{'margin-right': '30px'}"
      @click="$router.push('/subdivisions')
  $router.go()">
       Subdivisions
     </div>
     <div class="d-flex align-center" :style="{'margin-right': '30px'}"
      @click="$router.push('/employees')
  $router.go()">
       Employees
     </div>
     <div class="d-flex align-center" :style="{'margin-right': '30px'}"
      @click="$router.push('/classrooms')
  $router.go()">
       Classrooms
     </div>
   </v-app-bar>
   <v-main class="d-flex align-center text-center" :style="{'background-image': 'url(' + require('./images/1.jpg') + ') ' , 'background-size' : '100%', 'background-color': '#00008B', 'background-attachment': 'fixed', 'overflow': 'hidden'}">
     <router-view />
   </v-main>
 </v-app>
</template>
<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
<style>
router-view {
  overflow-y: auto;
}
</style>
