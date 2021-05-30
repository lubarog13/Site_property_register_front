<template>
<section>
  <h1>Create property</h1>
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
      @click="pushProperty('http://localhost:8000/property/create/')"
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
</v-card>
</section>
</template>
<script>
export default {
  name: 'PropertyCreate',
  data: () => ({
    inventory_number: '',
    date_of_registration: null,
    revaluation_year: null,
    cost: null,
    lifetime: null,
    valid: true,
    numberRules: [
      v => !!v || 'Inventory number is required',
      v => (v && v.length <= 20 && v.length >= 4) || 'Inventory number must be less than 20 and more then 4 characters'
    ],
    yearRules: [
      v => (v && v >= 1900) || 'Bad year'
    ]
  }),
  methods: {
    async pushProperty (apiURl) {
      await this.axios.post(apiURl, {
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
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    reset () {
      this.$refs.form.reset()
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
  }
}
</script>
