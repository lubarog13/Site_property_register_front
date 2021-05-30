<template>
<section>
  <h1>Update propery liability</h1>
<v-card
  elevation="10"
  class = "mx-auto"
  max-width="50%"
  >
  <v-form
    ref="form"
    :style="{'padding':'20px'}"
    v-model="valid"
    lazy-validation
  >
    <v-select
      v-model="employees"
      :items="employeeItems"
      :rules="[v => !!v || 'Employee is required']"
      item-text="last_name"
      item-value="id"
      label="Employee"
      required
    ></v-select>
    <v-select
      v-model="classrooms"
      :items="classItems"
      item-text="number"
      item-value="id"
      label="Classroom"
      required
    ></v-select>
    <v-text-field
      v-model="start_date"
      :rules="[v => !!v || 'Start date is required']"
      type="date"
      label="Start date"
      required
    ></v-text-field>
    <v-text-field
      v-model="end_date"
      type="date"
      label="End date"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushProperty('http://localhost:8000/property_liab/update/' + $route.params.id + '/')
      $router.push('/classroom/' + classrooms)
      $router.go()"
    >
      Submit
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset($route.params.id)"
    >
      Reset Form
    </v-btn>
  </v-form>
</v-card>
</section>
</template>
<script>
const URl1 = 'http://localhost:8000/employees/?format=json'
const URl2 = 'http://localhost:8000/classroom/?format=json'
export default {
  name: 'PropertyLiabilityUpdate',
  data: () => ({
    start_date: '',
    end_date: '',
    classItems: [],
    employeeItems: [],
    valid: true,
    classrooms: null,
    employees: null
  }),
  methods: {
    async pushProperty (apiURl) {
      await this.axios.put(apiURl, {
        start_date: this.start_date,
        end_date: this.end_date,
        classroom: this.classrooms,
        employee: this.employees
      },
      {
        headers: {
          Authorization: 'Token ' + this.$cookies.get('token').toString()
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(this.start_date)
          console.log(error)
        })
    },
    reset (id) {
      this.$refs.form.reset()
      this.getParams('http://localhost:8000/property_liab/' + id + '/')
    },
    async getItems () {
      await this.axios.get(URl1, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.employeeItems = res.data.Employees
        })
        .catch(err => {
          console.log('error displaying employeeItems', err)
        })
      await this.axios.get(URl2, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.classItems = res.data
        })
        .catch(err => {
          console.log('error displaying employeeItems', err)
        })
    },
    async getParams (url) {
      await this.axios.get(url, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.employees = res.data.employee.id
          this.classrooms = res.data.classroom.id
          this.start_date = res.data.start_date
          this.end_date = res.data.end_date
          console.log(this.start_date)
          console.log(this.end_date)
        })
        .catch(err => {
          console.log('error displaying employeeItems', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    var url = 'http://localhost:8000/property_liab/' + this.$route.params.id + '/'
    this.getItems()
    this.getParams(url)
    console.log(this.start_date)
    console.log(this.end_date)
  }
}
</script>
