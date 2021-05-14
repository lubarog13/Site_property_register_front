<template>
<v-hover
    v-slot:default="{ hover }">
<v-card
   :elevation="hover? 15: 4"
  @click="$router.push('/subdivision/' + subdivisionItem.id)
  $router.go()"
   class = "px-2 py-5" :style = "{'background': 'linear-gradient(180deg, rgb(255, 255, 255) 88%, rgb(255, 0, 0) 48%)'}"
>
<v-row>
    <v-col class="mx-auto">
      <v-card-title class="justify-center">
        {{ subdivisionItem.subdivision_name }}
      </v-card-title>
     <v-card-text>
       {{ subdivisionItem.subdivision_type }}
     </v-card-text>
    <v-card-text>
       tel.{{ subdivisionItem.phone_number }}
     </v-card-text>
   </v-col>
</v-row>
</v-card>
</v-hover>
</template>
<script>
export default {
  name: 'SubdivisionItemCard',
  props: {
    subdivisionItem: Object
  }
}
</script>
<style>
v-card-title {
  text-align: center;
}
</style>
