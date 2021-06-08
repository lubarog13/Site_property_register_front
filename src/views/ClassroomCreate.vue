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
      @click="pushClassroom('http://localhost:8000/classroom/create/')"
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
const URl = 'http://localhost:8000/subdivisions/?format=json'
export default {
  name: 'ClassroomCreate',
  data: () => ({
    number: '',
    area: '',
    message: '',
    appointment: null,
    id_subdivisions: null,
    valid: true,
    numberRules: [
      v => !!v || 'Number is required',
      v => (v && v.length <= 4) || 'Number must be less than 4 characters'
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
    subdivisions: []
  }),
  methods: {
    async pushClassroom (apiURl) {
      await this.axios.post(apiURl, {
        number: this.number,
        area: this.area,
        appointment: this.appointment,
        subdivision: this.id_subdivisions
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
      console.log(this.id_subdivisions)
      this.$refs.form.reset()
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
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    this.getSubdivisionItems()
  }
}
</script>
