<template>
    <section>
    <h1>Sign Up</h1>
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
      v-model="username"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :counter="4"
      type="password"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushUser('http://localhost:8000/auth/users/')"
    >
      Submit
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
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
  name: 'Signup',
  data: () => ({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    message: '',
    first_nRules: [
      v => !!v || 'It is required',
      v => (v && v.length <= 40) || 'It must be less than 40 characters'
    ]
  }),
  methods: {
    async pushUser (url) {
      await this.axios.post(url, {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        password: this.password
      })
        .then(response => {
          console.log(response)
          this.message = 'Ok'
          this.$router.push('/auth')
        })
        .catch(error => {
          this.message = 'Password is simple'
          console.log(error)
          this.$cookies.set('token', 'error')
        })
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
