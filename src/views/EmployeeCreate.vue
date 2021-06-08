<template>
<section>
  <h1>Create employee</h1>
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
      :counter="8"
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
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushClassroom('http://localhost:8000/employees/create/')"
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
  name: 'EmployeeCreate',
  data: () => ({
    password: '',
    last_login: '',
    message: '',
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
      v => (v && v.length >= 8 && v.length <= 40) || 'Password must be less than 40 characters and more then 4'
    ],
    subdivisions: []
  }),
  methods: {
    async pushClassroom (apiURl) {
      await this.axios.post(apiURl, {
        password: this.password,
        last_login: this.date_joined.toISOString(),
        is_superuser: this.is_superuser,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        is_staff: this.is_superuser,
        is_active: this.is_active,
        date_joined: this.date_joined.toISOString(),
        second_name: this.second_name,
        position: this.position,
        start_year: this.start_year,
        home_address: this.home_address,
        subdivision: this.id_subdivisions,
        groups: [],
        user_permissions: []
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
      console.log(new Date().toISOString())
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
