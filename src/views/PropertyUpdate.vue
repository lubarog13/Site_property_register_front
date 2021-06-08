<template>
<section>
  <h1>Update property</h1>
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
      v-model="inventory_number"
      :counter="20"
      :rules="numberRules"
      label="Inventory number"
      required
    ></v-text-field>

    <v-text-field
      v-model="date_of_registration"
      type="date"
      label="Date of registration"
      required
    ></v-text-field>
    <v-text-field
      v-model="revaluation_year"
      label="Revaluation year"
      required
    ></v-text-field>
    <v-text-field
      v-model="cost"
      :rules="[v => !!v || 'Cost is required']"
      label="Cost"
      required
    ></v-text-field>
    <v-text-field
      v-model="lifetime"
      :rules="[v => !!v || 'Lifetime is required']"
      label="Lifetime"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushProperty('http://localhost:8000/property/update/' + $route.params.id + '/')"
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
export default {
  name: 'PropertyUpdate',
  data: () => ({
    inventory_number: '',
    date_of_registration: null,
    revaluation_year: null,
    cost: null,
    lifetime: null,
    valid: true,
    numberRules: [
      v => !!v || 'Inventory number is required',
      v => (v && v < 1000000000000000000000 && v >= 1000) || 'Inventory number must be less than 20 and more then 4 characters'
    ],
    yearRules: [
      v => (v && v >= 1900) || 'Bad year'
    ]
  }),
  methods: {
    async pushProperty (apiURl) {
      await this.axios.put(apiURl, {
        inventory_number: this.inventory_number,
        date_of_registration: this.date_of_registration,
        revaluation_year: this.revaluation_year,
        cost: this.cost,
        lifetime: this.lifetime
      },
      {
        headers: {
          Authorization: 'Token ' + this.$cookies.get('token').toString()
        }
      })
        .then(response => {
          console.log(response)
          this.$router.push('/property/' + this.id)
          this.$router.go()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reset (id) {
      this.$refs.form.reset()
      this.getItems(id)
    },
    async getItems (id) {
      var url = 'http://localhost:8000/property/update/' + id + '/'
      await this.axios.get(url, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.inventory_number = res.data.inventory_number
          this.lifetime = res.data.lifetime
          this.cost = res.data.cost
          this.date_of_registration = res.data.date_of_registration
          this.revaluation_year = res.data.revaluation_year
        })
        .catch(err => {
          this.$router.push('/auth')
          console.log('error displaying employeeItems', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    this.getItems(this.$route.params.id)
  }
}
</script>
