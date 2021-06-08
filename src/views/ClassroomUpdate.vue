<template>
<section>
  <h1>Create classroom</h1>
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
    <v-text-field
      v-model="number"
      :counter="4"
      :rules="numberRules"
      label="Number"
      required
    ></v-text-field>

    <v-text-field
      v-model="area"
      :rules="areaRules"
      label="Area"
      required
    ></v-text-field>
    <v-select
      v-model="appointment"
      :items="items"
      :rules="[v => !!v || 'Appointment is required']"
      label="Type"
      required
    ></v-select>
    <v-select
      v-model="id_subdivisions"
      :items="subdivisions"
      :rules="[v => !!v || 'Subdivision is required']"
      item-text="subdivision_name"
      item-value="id"
      label="Subdivision "
      required
    ></v-select>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushClassroom('http://localhost:8000/classroom/update/'+$route.params.id+'/')"
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
const URl = 'http://localhost:8000/subdivisions/?format=json'
export default {
  name: 'ClassroomUpdate',
  data: () => ({
    id: '',
    number: '',
    area: '',
    appointment: null,
    id_subdivisions: null,
    valid: true,
    numberRules: [
      v => !!v || 'Number is required',
      v => (v && v <= 10000) || 'Number must be less than 4 characters'
    ],
    areaRules: [
      v => !!v || 'Appointment is required'
    ],
    items: [
      'lecture',
      'laboratory',
      'staff_only',
      'gym',
      'other'
    ],
    employee: [],
    unit_of_property: [],
    subdivisions: []
  }),
  methods: {
    async pushClassroom (apiURl) {
      await this.axios.put(apiURl, {
        number: this.number,
        area: this.area,
        appointment: this.appointment,
        subdivision: this.id_subdivisions,
        employee: this.employee,
        unit_of_property: this.unit_of_property
      },
      {
        headers: {
          Authorization: 'Token ' + this.$cookies.get('token').toString()
        }
      })
        .then(response => {
          console.log(response)
          this.$router.push('/classroom/' + this.id)
          this.$router.go()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getSubdivisionItems () {
      await this.axios.get(URl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.subdivisions = res.data.Subdivisions
          console.log(this.subdivisions)
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    reset (id) {
      console.log(this.id_subdivisions)
      this.$refs.form.reset()
      this.getUpdateItems('http://localhost:8000/classroom/update/' + id + '/')
    },
    async getUpdateItems (URl_) {
      await this.axios.get(URl_, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.id = res.data.id
          this.number = res.data.number
          this.area = res.data.area
          this.appointment = res.data.appointment
          this.id_subdivisions = res.data.subdivision
          this.employee = res.data.employee
          this.unit_of_property = res.data.unit_of_property
        })
        .catch(err => {
          console.log('error displaying subdivisionItem', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    this.getSubdivisionItems()
    var URl_ = 'http://localhost:8000/classroom/update/' + this.$route.params.id + '/'
    this.getUpdateItems(URl_)
  }
}
</script>
