<template>
<section>
  <h1>Classroom №{{ classroom.number }}</h1>
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
        @click="$router.push('/classroom_update/'+classroom.id)
            $router.go()">
            Update
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Do you want to delete classroom №{{ classroom.number }}?
        </v-card-title>
        <v-card-text>You cant't cancel this action</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteClassroom('http://localhost:8000/classroom/delete/'+$route.params.id+'/')
            $router.push('/classrooms')
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
      <p>Appointment: {{ classroom.appointment }}</p>
      <p>Area: {{ classroom.area }}</p>
      <div class="lefted">
      <p>Property:
      <v-btn
        color="warning"
        :style="{'margin':'10px 10px'}"
        @click="$router.push('/property_list_create/')
            $router.go()">
            Create
        </v-btn></p>
      <ul
      v-for="unitOfProperty in unitOfPropertys"
      :key="unitOfProperty.id">
      <li
      ><p
      @click="$router.push('/property/' + unitOfProperty.unit_of_property.id)
  $router.go()"
      >Inventory number: {{ unitOfProperty.unit_of_property.inventory_number }} cost: {{ unitOfProperty.unit_of_property.cost }}rub.</p>
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
          :style="{'margin':'10px 0px'}"
          v-bind="attrs"
          v-on="on"
        >
          Delete
        </v-btn>
        <v-btn
        color="primary"
        :style="{'margin':'10px'}"
        @click="$router.push('/property_list_update/'+unitOfProperty.id)
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
            @click="deletePropertyList('http://localhost:8000/property_list/delete/'+unitOfProperty.id+'/')
            dialog = false
            $router.go()
            "
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
    </v-dialog></li>
      </ul>
      </div>
      </v-col>
      <v-col cols="5" class="mx-auto">
  <v-row>
    <v-col class="mx-auto">
      Subdivision:
      <subdivision-item-card
        :key="subdivisionItem.id"
        :subdivision-item="subdivisionItem"
        class="my-2"
      />
    </v-col>
  </v-row>
  <v-row
  v-if="employeeItems[0]!=null">
  <v-col class="mx-auto">
      Employees:
      <v-btn
        color="warning"
        :style="{'margin':'20px'}"
        @click="$router.push('/property_liab_create/')
            $router.go()">
            Create
        </v-btn>
      <property-liab-item-card
        v-for="employeeItem in employeeItems"
        :key="employeeItem.id"
        :property-liab-item="employeeItem"
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
import PropertyLiabItemCard from '@/components/PropertyLiabItemCard.vue'
import SubdivisionItemCard from '../components/SubdivisionItemCard.vue'
// const id = this.$route.params.id

export default {
  components: { PropertyLiabItemCard, SubdivisionItemCard },
  name: 'ClassroomInfo',
  data: () => ({
    classroom: Object,
    subdivisionItem: Object,
    unitOfPropertys: [],
    employeeItems: [],
    dialog: false,
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getClassroomItems (apiURl) {
      await this.axios.get(apiURl)
        .then(res => {
          this.classroom = res.data.Classroom
          this.subdivisionItem = res.data.Classroom.subdivision
          this.unitOfPropertys = res.data.Lists
          this.employeeItems = res.data.Employees
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    async deleteClassroom (URl) {
      await this.axios.delete(URl
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async deletePropertyList (URl) {
      await this.axios.delete(URl
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
    var apiURl = 'http://localhost:8000/classroom/' + this.$route.params.id + '/?format=json'
    this.getClassroomItems(apiURl)
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
