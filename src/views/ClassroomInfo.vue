<template>
<section>
  <h1>Classroom №{{ classroom.number }}</h1>
  <v-card
  elevation="10"
  class = "mx-auto"
  max-width="70%"
  >
  <v-row>
      <v-col cols="5" class="mx-auto">
      <p>Appointment: {{ classroom.appointment }}</p>
      <p>Area: {{ classroom.area }}</p>
      <div class="lefted">
      <p>Property: </p>
      <ul
      v-for="unitOfProperty in unitOfPropertys"
      :key="unitOfProperty.id">
      <li
      @click="$router.push('/property/' + unitOfProperty.id)
  $router.go()"
      >Inventory number: {{ unitOfProperty.inventory_number }} cost: {{ unitOfProperty.cost }}rub.</li>
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
          this.unitOfPropertys = res.data.Classroom.unit_of_property
          this.employeeItems = res.data.Employees
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
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
