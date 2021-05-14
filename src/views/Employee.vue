<template>
<section>
  <h1>Employees</h1>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <EmployeeItemCard
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
import EmployeeItemCard from '@/components/EmployeeItemCard.vue'
const apiURl = 'http://localhost:8000/employees/?format=json'
export default {
  components: { EmployeeItemCard },
  name: 'Employee',
  data: () => ({
    employeeItems: []
  }),
  methods: {
    async getEmployeeItems () {
      await this.axios.get(apiURl)
        .then(res => {
          this.employeeItems = res.data.Employees
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    }
  },
  created () {
    this.getEmployeeItems()
  }
}
</script>
<style>
h1 {
  color: white;
  font-size: 32pt;
  text-shadow: 4px 4px 5px darkgray;
  margin: 3% 3%;
}
</style>
