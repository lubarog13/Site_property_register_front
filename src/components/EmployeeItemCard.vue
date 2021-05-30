<template>
<v-hover
    v-slot:default="{ hover }">
<v-card
   :elevation="hover? 15: 4"
   class = "px-2 py-5" :style = "{'background': 'linear-gradient(180deg, rgb(255, 255, 255) 90%, rgb(0, 71, 177) 24%)'}"
   @click="$router.push('/employee/' + employeeItem.id)
  $router.go()"
>
<v-row>
    <v-col class="mx-auto">
      <v-card-title class="justify-center">
        {{ employeeItem.first_name }} {{ employeeItem.last_name }} {{ employeeItem.second_name }}
      </v-card-title>
     <v-card-text>
        {{ employeeItem.position }}
     </v-card-text>
   </v-col>
</v-row>
</v-card>
</v-hover>
</template>
<script>
export default {
  name: 'EmployeeItemCard',
  props: {
    employeeItem: Object
  }
}
</script>
<style>
v-card-title {
  text-align: center;
}
</style>
