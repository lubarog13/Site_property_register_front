<template>
<section>
  <h1>Create subdivision</h1>
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
      v-model="subdivision_name"
      :counter="45"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="phone_number"
      :counter="11"
      :rules="phoneRules"
      label="Phone 8xxxxxxxxxx"
      required
    ></v-text-field>
    <v-select
      v-model="subdivision_type"
      :items="items"
      :rules="[v => !!v || 'Type is required']"
      label="Type"
      required
    ></v-select>
    <v-select
      v-model="id_subdivisions"
      :items="subdivisions"
      item-text="subdivision_name"
      item-value="id"
      label="A part of: "
      required
    ></v-select>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushSubdivision('http://localhost:8000/subdivisions/create/')"
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
  name: 'SubdivisionCreate',
  data: () => ({
    subdivision_name: '',
    phone_number: '',
    message: '',
    subdivision_type: null,
    id_subdivisions: null,
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 45) || 'Name must be less than 45 characters'
    ],
    phoneRules: [
      v => !!v || 'Phone is required'
    ],
    items: [
      'faculty',
      'department',
      'mega-faculty',
      'other'
    ],
    subdivisions: []
  }),
  methods: {
    async pushSubdivision (apiURl) {
      await this.axios.post(apiURl, {
        subdivision_name: this.subdivision_name,
        phone_number: this.phone_number,
        subdivision_type: this.subdivision_type,
        id_subdivision: this.id_subdivisions
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
          this.$router.push('/auth')
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
