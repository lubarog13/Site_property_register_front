<template>
    <section>
    <h1>Profile</h1>
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
      v-model="username"
      label="Username"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushUser('http://localhost:8000/auth/users/me/')"
    >
      Update
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Log out
    </v-btn>
  </v-form>
  <v-card-text text-color="error">
      {{ message }}
  </v-card-text>
        </v-card>
    </section>
</template>
<script>
export default {
  name: 'Profile',
  data: () => ({
    first_name: '',
    last_name: '',
    second_name: '',
    email: '',
    username: '',
    message: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    first_nRules: [
      v => !!v || 'It is required',
      v => (v && v.length <= 40) || 'It must be less than 40 characters'
    ]
  }),
  methods: {
    async pushUser (url) {
      await this.axios.patch(url, {
        first_name: this.first_name,
        last_name: this.last_name,
        second_name: this.second_name,
        email: this.email,
        username: this.username
      },
      {
        headers: {
          Authorization: 'Token ' + this.$cookies.get('token').toString()
        }
      })
        .then(response => {
          console.log(response)
          this.message = 'Ok'
          this.$router.go()
        })
        .catch(error => {
          this.message = 'Password is simple'
          console.log(error)
          this.$cookies.set('token', 'error')
        })
    },
    async reset () {
      await this.axios.post('http://localhost:8000/auth/token/logout/', {}, {
        headers: {
          Authorization: 'Token ' + this.$cookies.get('token').toString()
        }
      })
        .then(res => {
          console.log(res)
          this.$cookies.set('token', 'error')
          this.$router.push('/')
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getUpdateItems (URl_) {
      await this.axios.get(URl_, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.username = res.data.username
          this.first_name = res.data.first_name
          this.last_name = res.data.last_name
          this.second_name = res.data.second_name
          this.email = res.data.email
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
    var URl_ = 'http://localhost:8000/auth/users/me/'
    this.getUpdateItems(URl_)
  }
}
</script>
