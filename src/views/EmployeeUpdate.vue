<template>
<section>
  <h1>Update employee</h1>
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
      v-model="first_name"
      :counter="40"
      :rules="first_nRules"
      label="First name"
      required
    ></v-text-field>

    <v-text-field
      v-model="last_name"
      :counter="40"
      :rules="first_nRules"
      label="Last name"
      required
    ></v-text-field>
    <v-text-field
      v-model="second_name"
      :counter="40"
      label="Second name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="position"
      :counter="40"
      :rules="first_nRules"
      label="Position"
      required
    ></v-text-field>
    <v-text-field
      v-model="start_year"
      :rules="yearRules"
      label="Start year"
      required
    ></v-text-field>
    <v-text-field
      v-model="home_address"
      :counter="50"
      :rules="homeRules"
      label="Home address"
      required
    ></v-text-field>
    <v-text-field
      v-model="username"
      :rules="first_nRules"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      :counter="4"
      label="Password"
      required
    ></v-text-field>
    <v-select
      v-model="id_subdivisions"
      :items="subdivisions"
      :rules="[v => !!v || 'Subdivision is required']"
      item-text="subdivision_name"
      item-value="id"
      label="Subdivision "
      required
    ></v-select>
    <v-checkbox
        v-model="is_superuser"
        label="Is Superuser"
    ></v-checkbox>
    <v-checkbox
        v-model="is_active"
        label="Is Active"
    ></v-checkbox>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushClassroom('http://localhost:8000/employee/update/' + $route.params.id + '/')"
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
  name: 'EmployeeUpdate',
  data: () => ({
    password: '',
    last_login: '',
    is_superuser: false,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
    is_active: true,
    date_joined: new Date(),
    second_name: '',
    position: '',
    start_year: '',
    home_address: '',
    groups: [],
    user_permissions: [],
    id_subdivisions: null,
    valid: true,
    first_nRules: [
      v => !!v || 'It is required',
      v => (v && v.length <= 40) || 'It must be less than 40 characters'
    ],
    homeRules: [
      v => !!v || 'Address is required',
      v => (v && v.length <= 50) || 'It must be less than 50 characters'
    ],
    yearRules: [
      v => !!v || 'Year is required',
      v => (v && v >= 1900 && v <= new Date().getFullYear()) || 'Incorrect year'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 4 && v.length <= 40) || 'Password must be less than 40 characters and more then 4'
    ],
    subdivisions: []
  }),
  methods: {
    async pushClassroom (apiURl) {
      await this.axios.put(apiURl, {
        password: this.password,
        last_login: this.last_login,
        is_superuser: this.is_superuser,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        is_staff: this.is_superuser,
        is_active: this.is_active,
        date_joined: this.date_joined,
        second_name: this.second_name,
        position: this.position,
        start_year: this.start_year,
        home_address: this.home_address,
        subdivision: this.id_subdivisions,
        groups: [],
        user_permissions: []
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reset (id) {
      console.log(this.id_subdivisions)
      this.$refs.form.reset()
      this.getUpdateItems('http://localhost:8000/employee/update/' + id + '/')
    },
    async getSubdivisionItems () {
      await this.axios.get(URl)
        .then(res => {
          this.subdivisions = res.data.Subdivisions
          console.log(this.subdivisions)
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    async getUpdateItems (URl_) {
      await this.axios.get(URl_)
        .then(res => {
          this.password = res.data.password
          this.username = res.data.username
          this.first_name = res.data.first_name
          this.last_name = res.data.last_name
          this.date_joined = res.data.date_joined
          this.last_login = res.data.last_login
          this.second_name = res.data.second_name
          this.position = res.data.position
          this.is_superuser = res.data.is_superuser
          this.is_staff = res.data.is_staff
          this.is_active = res.data.is_active
          this.home_address = res.data.home_address
          this.email = res.data.email
          this.id_subdivisions = res.data.subdivision
          this.start_year = res.data.start_year
        })
        .catch(err => {
          console.log('error displaying subdivisionItem', err)
        })
    }
  },
  created () {
    this.getSubdivisionItems()
    var URl_ = 'http://localhost:8000/employee/update/' + this.$route.params.id + '/'
    this.getUpdateItems(URl_)
  }
}
</script>
