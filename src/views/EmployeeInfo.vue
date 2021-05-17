<template>
<section>
<h1>{{ employee.first_name }} {{ employee.last_name }} {{ employee.second_name }}</h1>
  <v-card
  elevation="10"
  class = "mx-auto"
  max-width="70%"
  >
  <v-row>
      <v-col cols="6" class="mx-auto">
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
      @click="$router.push('/property/' + unitOfProperty.unit_of_property.id)
  $router.go()"
      ><b>Inventory number:</b> {{ unitOfProperty.unit_of_property.inventory_number }}  cost: {{ unitOfProperty.unit_of_property.cost }}rub.
           aud.{{ unitOfProperty.classroom.number }} {{ unitOfProperty.date_of_creation }}
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
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getEmployeeItems (apiURl) {
      await this.axios.get(apiURl)
        .then(res => {
          this.employee = res.data.Employee
          this.subdivisionItem = res.data.Employee.subdivision
          this.unitOfPropertys = res.data.Property_list
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    }
  },
  created () {
    // console.log('id', this.computed.id())
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
