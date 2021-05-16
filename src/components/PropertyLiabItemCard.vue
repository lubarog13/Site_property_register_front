<template>
<v-hover
    v-slot:default="{ hover }">
<v-card
   :elevation="hover? 15: 4"
   class = "px-2 py-5" :style = "{'background': 'linear-gradient(180deg, rgb(255, 255, 255) 90%, rgb(0, 71, 177) 24%)'}"
>
<v-row>
    <v-col class="mx-auto"
    v-if="propertyLiabItem.employee.position!=null">
      <v-card-title class="justify-center">
        {{ propertyLiabItem.employee.first_name }} {{ propertyLiabItem.employee.last_name }} {{ propertyLiabItem.employee.second_name }}
      </v-card-title>
     <v-card-text>
        {{ propertyLiabItem.employee.position }}
     </v-card-text>
     <v-card-text
     v-if="propertyLiabItem.end_date!=null">
         {{ propertyLiabItem.start_date}} - {{ propertyLiabItem.end_date}}
     </v-card-text>
     <v-card-text
     v-else>
      since {{ propertyLiabItem.start_date}}
     </v-card-text>
   </v-col>
</v-row>
</v-card>
</v-hover>
</template>
<script>
export default {
  name: 'PropertyLiabItemCard',
  props: {
    propertyLiabItem: Object
  }
}
</script>
<style>
v-card-title {
  text-align: center;
}
</style>
