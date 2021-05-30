<template>
<section>
  <h1>Employees
    <v-btn
        color="warning"
        :style="{'margin':'20px'}"
        @click="$router.push('/employee_create/')
            $router.go()">
            Create
        </v-btn>
  </h1>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <EmployeeItemCard
        v-for="employee in employees"
        :key="employee.id"
        :employee-item="employee"
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
  computed: {
    employees: function () {
      return this.employeeItems.filter(function (employeeItem) {
        return employeeItem.position != null
      })
    }
  },
  methods: {
    async getEmployeeItems () {
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.employeeItems = res.data.Employees
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
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
