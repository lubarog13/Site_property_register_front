<template>
<v-hover
    v-slot:default="{ hover }">
<v-card
   :elevation="hover? 15: 4"
   class = "px-2 py-5" :style = "{'background': 'linear-gradient(180deg, rgb(255, 255, 255) 88%, rgb(255, 0, 0) 48%)'}"
>
<v-row>
    <v-col class="mx-auto">
      <v-card-title class="justify-center">
        {{ classItem.number }}
      </v-card-title>
      Employee:
     <div
        v-for="employee in classItem.employee"
        :key="employee.id">
       {{ employee.first_name }} {{ employee.last_name }},
     </div>
     <v-card-text>
         Appointment: {{ classItem.appointment }}
     </v-card-text>
    <v-card-text>
       {{ classItem.area }} m2
     </v-card-text>
   </v-col>
</v-row>
</v-card>
</v-hover>
</template>
<script>
export default {
  name: 'ClassItemCard',
  props: {
    classItem: Object
  }
}
</script>
<style>
v-card-title {
  text-align: center;
}
</style>
