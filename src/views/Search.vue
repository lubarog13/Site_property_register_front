<template>
<section>
    <h1>Results of search</h1>
    <v-row>
    <v-col cols="3" class="mx-auto"
    v-if="subdivisionItems[0]!=null">
        <h2>Subdivisions: </h2>
      <subdivision-item-card
        v-for="subdivisionItem in subdivisionItems"
        :key="subdivisionItem.id"
        :subdivision-item="subdivisionItem"
        class="my-2"
      />
    </v-col>
    <v-col cols="3" class="mx-auto"
    v-if="classItems[0]!=null">
    <h2>Classrooms: </h2>
      <ClassItemCard
        v-for="classItem in classItems"
        :key="classItem.id"
        :class-item="classItem"
        class="my-2"
      />
    </v-col>
  <v-col cols="3" class="mx-auto"
  v-if="unitItems[0]!=null">
  <h2>Units of property: </h2>
      <unit-of-property-item-card
        v-for="unitItem in unitItems"
        :key="unitItem.id"
        :unit-item="unitItem"
        class="my-2"
      />
    </v-col>
    <v-col cols="3" class="mx-auto"
    v-if="employeeItems[0]!=null">
    <h2>Employees:</h2>
      <employee-item-card
        v-for="employeeItem in employeeItems"
        :key="employeeItem.id"
        :employee-item="employeeItem"
        class="my-2"
      />
    </v-col>
    </v-row>
</section>
</template>
<script>
import ClassItemCard from '../components/ClassItemCard.vue'
import SubdivisionItemCard from '@/components/SubdivisionItemCard.vue'
import EmployeeItemCard from '../components/EmployeeItemCard.vue'
import UnitOfPropertyItemCard from '../components/UnitOfPropertyItemCard.vue'
export default {
  components: { ClassItemCard, SubdivisionItemCard, EmployeeItemCard, UnitOfPropertyItemCard },
  name: 'Search',
  data: () => ({
    classItems: [],
    subdivisionItems: [],
    employeeItems: [],
    unitItems: []
  }),
  methods: {
    async getSearchItems (apiURl) {
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.employeeItems = res.data.Employee
          this.subdivisionItems = res.data.Subdivision
          this.unitItems = res.data.Unit_of_property
          this.classItems = res.data.Classroom
        })
        .catch(err => {
          this.$router.push('/auth')
          console.log('error displaying propertyItems', err)
        })
    }
  },
  created () {
    // console.log('id', this.computed.id())
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    var apiURl = 'http://localhost:8000/search/' + this.$route.params.str + '/?format=json'
    this.getSearchItems(apiURl)
    this.$cookies.set('hello', 'hi')
  }
}
</script>
<style>
h2 {
  color: white;
  font-size: 26pt;
  text-shadow: 4px 4px 5px darkgray;
  margin: 3% 3%;
}
</style>
