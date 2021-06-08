<template>
<section>
  <h1>Update subdivision</h1>
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
      :rules="phoneRules"
      :counter="11"
      label="Phone"
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
      @click="pushSubdivision('http://localhost:8000/subdivisions/update/'+$route.params.id+'/')"
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
  name: 'SubdivisionUpdate',
  data: () => ({
    id: '',
    subdivision_name: '',
    phone_number: '',
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
      await this.axios.put(apiURl, {
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
          this.$router.push('/subdivision/' + this.id)
          this.$router.go()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reset (id) {
      console.log(this.id_subdivisions)
      this.$refs.form.reset()
      this.getUpdateItems('http://localhost:8000/subdivisions/update/' + id + '/')
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
    async getUpdateItems (URl_) {
      await this.axios.get(URl_, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.id = res.data.id
          this.subdivision_name = res.data.subdivision_name
          this.phone_number = res.data.phone_number
          this.subdivision_type = res.data.subdivision_type
          this.id_subdivisions = res.data.id_subdivision
        })
        .catch(err => {
          this.$router.push('/auth')
          console.log('error displaying subdivisionItem', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    this.getSubdivisionItems()
    var URl_ = 'http://localhost:8000/subdivisions/update/' + this.$route.params.id + '/'
    this.getUpdateItems(URl_)
  }
}
</script>
