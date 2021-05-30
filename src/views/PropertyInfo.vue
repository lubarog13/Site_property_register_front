<template>
<section>
<h1>Inventory number {{ unitOfProperty.inventory_number }}</h1>
<v-btn
        color="warning"
        :style="{'margin':'20px'}"
        @click="$router.push('/property_create/')
            $router.go()">
            Create
        </v-btn>
  <v-card
  elevation="10"
  v-scroll.self="onScroll"
  class = "mx-auto overflow-y-auto overflow-x-hidden"
  max-width="70%"
  max-height="450px"
  >
  <v-row>
      <v-col cols="6" class="mx-auto"
      :style="{'padding':'3%'}"
      >
      <p> Registration in: {{ unitOfProperty.date_of_registration }}</p>
      <div class="lefted">
          <p>Lifetime: {{ unitOfProperty.lifetime }}</p>
          <p>Revaluation year: {{ unitOfProperty.revaluation_year }}</p>
          <h2>Cost: {{ unitOfProperty.cost }}rub.</h2>
      </div>
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
        @click="$router.push('/property_update/'+$route.params.id)
            $router.go()">
            Update
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Do you want to delete property №{{ unitOfProperty.inventory_number }}?
        </v-card-title>
        <v-card-text>You cant't cancel this action</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteProperty('http://localhost:8000/property/delete/'+$route.params.id+'/')
            $router.go(-1)
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
      <v-col cols="4" class="mx-auto">
  <v-row>
    <v-col class="mx-auto">
      Classrooms:
      <class-item-card
        v-for="classroomItem in classroomItems"
        :key="classroomItem.id"
        :class-item="classroomItem"
        class="my-2"
      />

    </v-col>
  </v-row>
 </v-col>
  </v-row>
  </v-card>
</section>
</template>
<script>
import ClassItemCard from '../components/ClassItemCard.vue'
// const id = this.$route.params.id

export default {
  components: { ClassItemCard },
  name: 'PropertyInfo',
  data: () => ({
    unitOfProperty: Object,
    classroomItems: [],
    dialog: false,
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getPropertyItems (apiURl) {
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.unitOfProperty = res.data.Unit_of_property
          this.classroomItems = res.data.Classroom
        })
        .catch(err => {
          console.log('error displaying propertyItems', err)
        })
    },
    async deleteProperty (URl) {
      await this.axios.delete(URl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } }
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    // console.log('id', this.computed.id())
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    var apiURl = 'http://localhost:8000/property/' + this.$route.params.id + '/?format=json'
    this.getPropertyItems(apiURl)
  }
}
</script>
<style>
.lefted {
  text-align: left;
}
h1 {
  color: white;
  font-size: 32pt;
  text-shadow: 4px 4px 5px darkgray;
  margin: 3% 3%;
}
.list {
    background-color: white;
}
</style>
