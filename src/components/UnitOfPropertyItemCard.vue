<template>
<v-hover
    v-slot:default="{ hover }">
<v-card
   :elevation="hover? 15: 4"
  @click="$router.push('/property/' + unitItem.id)
  $router.go()"
   class = "px-2 py-5" :style = "{'background': 'linear-gradient(180deg, rgb(255, 255, 255) 88%, rgb(120,120, 0) 48%)'}"
>
<v-row>
    <v-col class="mx-auto">
      <v-card-title class="justify-center">
        {{ unitItem.inventory_number }}
      </v-card-title>
     <v-card-text>
      Cost: {{ unitItem.cost }}р.
     </v-card-text>
    <v-card-text>
       registration in {{ unitItem.date_of_registration }}
     </v-card-text>
   </v-col>
</v-row>
</v-card>
</v-hover>
</template>
<script>
export default {
  name: 'UnitOfPropertyItemCard',
  props: {
    unitItem: Object
  }
}
</script>
<style>
v-card-title {
  text-align: center;
}
</style>
