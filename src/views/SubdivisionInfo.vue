<template>
<section>
  <h1>{{ subdivision.subdivision_name }}</h1>
  <v-card
  elevation="10"
  v-scroll.self="onScroll"
  class = "mx-auto overflow-y-auto overflow-x-hidden"
  max-width="70%"
  max-height="450px"
  >
  <v-row>
      <v-col cols="5" class="mx-auto">
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
        @click="$router.push('/subdivision_update/'+subdivision.id)
            $router.go()">
            Update
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Do you want to delete {{ subdivision.subdivision_name }}?
        </v-card-title>
        <v-card-text>You cant't cancel this action</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteSubdivision('http://localhost:8000/subdivisions/delete/'+$route.params.id+'/')
            $router.push('/subdivisions')
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
      <p>{{ subdivision.phone_number }}</p>
      <p>{{ subdivision.subdivision_type }}</p>
      <p v-if="subdivision.id_subdivision!=null"
      >A part of: <a :href = "subdivision.id_subdivision.id"> {{ subdivision.id_subdivision.subdivision_name }}</a></p>
      <div class="lefted">
      <p>Employees: </p>
      <ul
      v-for="employee in employees"
      :key="employee.id">
      <li
      :style="{'text-decoration': 'underline'}"
      @click="$router.push('/employee/' + employee.id)
      $router.go()"
      >{{ employee.first_name }} {{ employee.last_name }}</li>
      </ul>
      </div>
      </v-col>
      <v-col cols="5" class="mx-auto">
  <v-row
  v-if="classItems[0]!=null">
    <v-col class="mx-auto">
      Classrooms:
      <ClassItemCard
        v-for="classItem in classItems"
        :key="classItem.id"
        :class-item="classItem"
        class="my-2"
      />
    </v-col>
  </v-row>
  <v-row
  v-if="subdivisionItems[0]!=null">
  <v-col class="mx-auto">
      Subdivisions:
      <SubdivisionItemCard
        v-for="subdivisionItem in subdivisionItems"
        :key="subdivisionItem.id"
        :subdivision-item="subdivisionItem"
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
import ClassItemCard from '@/components/ClassItemCard.vue'
import SubdivisionItemCard from '@/components/SubdivisionItemCard.vue'
// const id = this.$route.params.id

export default {
  components: { ClassItemCard, SubdivisionItemCard },
  name: 'SubdivisionInfo',
  data: () => ({
    subdivision: Object,
    classItems: [],
    subdivisionItems: [],
    employees: [],
    dialog: false,
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getSubdivisionItems (apiURl) {
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.subdivision = res.data
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    async getClassRoom (classAPIURL) {
      await this.axios.get(classAPIURL, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.classItems = res.data.Classrooms
          this.subdivisionItems = res.data.Subdivisions
          this.employees = res.data.Employees
          console.log(this.classItems)
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    async deleteSubdivision (URl) {
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
    var apiURl = 'http://localhost:8000/subdivision/' + this.$route.params.id + '/?format=json'
    var classAPIURL = 'http://localhost:8000/classrooms/' + this.$route.params.id + '/?format=json'
    this.getSubdivisionItems(apiURl)
    this.getClassRoom(classAPIURL)
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
