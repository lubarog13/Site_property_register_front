<template>
<v-hover
    v-slot:default="{ hover }">
<v-card
   :elevation="hover? 15: 4"
   class = "px-2 py-5" :style = "{'background': 'linear-gradient(180deg, rgb(255, 255, 255) 90%, rgb(0, 71, 177) 24%)'}"
  @click="$router.push('/employee/' + propertyLiabItem.employee.id)
  $router.go()"
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
     <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template
      v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          :style="{'margin':'20px'}"
          v-bind="attrs"
          v-on="on"
        >
          Delete
        </v-btn>
        <v-btn
        color="primary"
        :style="{'margin':'20px'}"
        @click="$router.push('/property_liab_update/'+propertyLiabItem.id)
            $router.go()">
            Update
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Do you want to delete this?
        </v-card-title>
        <v-card-text>You cant't cancel this action</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteProperty('http://localhost:8000/property_liab/delete/'+propertyLiabItem.id+'/')
            $router.push('/classroom/' + propertyLiabItem.classroom.id)
            $router.go()
            dialog = false"
          >
            Yes
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  },
  methods: {
    async deleteProperty (URl) {
      await this.axios.delete(URl
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

}
</script>
<style>
v-card-title {
  text-align: center;
}
</style>
