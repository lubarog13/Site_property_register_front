<template>
    <section>
    <h1>Login</h1>
        <v-card
  elevation="10"
  class = "mx-auto"
  max-width="50%"
  >
  <v-form
    ref="form"
    :style="{'padding':'20px'}"
  >
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
      color="success"
      class="mr-4"
      @click="pushUser('http://localhost:8000/auth/token/login/')"
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
    <a href='/registration'>No account? Sign up!</a>
  </v-form>
  <v-card-text text-color="error">
      {{ message }}
  </v-card-text>
        </v-card>
    </section>
</template>
<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    message: ''
  }),
  methods: {
    async pushUser (url) {
      await this.axios.post(url, {
        password: this.password,
        username: this.username
      })
        .then(response => {
          this.$cookies.set('token', response.data.auth_token)
          console.log(this.$cookies.get('token'))
          this.message = 'Ok'
          this.$router.push('/subdivisions')
          this.$router.go()
        })
        .catch(error => {
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
