<template>
<section>
  <h1>Create propery liability</h1>
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
      :rules="[v => !!v || 'Classroom is required']"
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
      @click="pushProperty('http://localhost:8000/property_liab/create/')"
    >
      Submit
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
  </v-form>
  <v-row>
    <v-card-text
    :style="{'color': 'red'}"
    >{{ message }}</v-card-text>
  </v-row>
</v-card>
</section>
</template>
<script>
const URl1 = 'http://localhost:8000/employees/?format=json'
const URl2 = 'http://localhost:8000/classroom/?format=json'
export default {
  name: 'PropertyLiabilityCreate',
  data: () => ({
    start_date: '',
    end_date: '',
    classItems: [],
    employeeItems: [],
    valid: true,
    message: '',
    classrooms: null,
    employees: null
  }),
  methods: {
    async pushProperty (apiURl) {
      await this.axios.post(apiURl, {
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
        .then(response => {
          console.log(response)
          this.message = 'Created success'
        })
        .catch(error => {
          console.log(error)
          this.message = 'Creation error'
        })
    },
    reset () {
      this.$refs.form.reset()
    },
    async getItems () {
      await this.axios.get(URl1, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.employeeItems = res.data.Employees
          console.log('items', this.employeeItems)
          console.log(this.employees)
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
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    var id = this.$route.params.id
    this.getItems(id)
  }
}
</script>
