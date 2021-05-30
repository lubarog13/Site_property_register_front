<template>
<section>
<h1>{{ employee.first_name }} {{ employee.last_name }} {{ employee.second_name }}</h1>
  <v-card
  elevation="10"
  v-scroll.self="onScroll"
  class = "mx-auto overflow-y-auto overflow-x-hidden"
  max-width="70%"
  max-height="450px"
  >
  <v-row>
      <v-col cols="6" class="mx-auto">
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
        @click="$router.push('/employee_update/'+employee.id)
            $router.go()">
            Update
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Do you want to delete {{ employee.last_name }} {{ employee.first_name }}?
        </v-card-title>
        <v-card-text>You cant't cancel this action</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteEmployee('http://localhost:8000/employee/delete/'+$route.params.id+'/')
            $router.push('/employees')
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
        <v-card-text>email: {{ employee.email }}</v-card-text>
      <p> {{ employee.position }}</p>
      <p>In ITMO command since {{ employee.start_year }}</p>
      <p>Home address {{ employee.home_address }}</p>
      <div class="lefted">
      <p>Propertys: </p>
      <ol
      v-for="unitOfProperty in unitOfPropertys"
      :key="unitOfProperty.id">
      <li
      ><div @click="$router.push('/property/' + unitOfProperty.unit_of_property.id)
  $router.go()"><b>Inventory number:</b> {{ unitOfProperty.unit_of_property.inventory_number }}  cost: {{ unitOfProperty.unit_of_property.cost }}rub.</div>
           <a @click="$router.push('/classroom/' + unitOfProperty.classroom.id)">aud.{{ unitOfProperty.classroom.number }} </a>{{ unitOfProperty.date_of_creation }}
      </li>
      </ol>
      </div>
      </v-col>
      <v-col cols="4" class="mx-auto">
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
 </v-col>
  </v-row>
  </v-card>
</section>
</template>
<script>
import SubdivisionItemCard from '../components/SubdivisionItemCard.vue'
// const id = this.$route.params.id

export default {
  components: { SubdivisionItemCard },
  name: 'EmployeeInfo',
  data: () => ({
    employee: Object,
    subdivisionItem: Object,
    unitOfPropertys: [],
    dialog: false,
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getEmployeeItems (apiURl) {
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.employee = res.data.Employee
          this.subdivisionItem = res.data.Employee.subdivision
          this.unitOfPropertys = res.data.Property_list
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    async deleteEmployee (URl) {
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
    var apiURl = 'http://localhost:8000/employee/' + this.$route.params.id + '/?format=json'
    this.getEmployeeItems(apiURl)
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
