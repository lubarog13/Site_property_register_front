<template>
<section>
  <h1>Create propery list</h1>
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
    <v-select
      v-model="classrooms"
      :items="classItems"
      :rules="[v => !!v || 'Classroom is required']"
      item-text="number"
      item-value="id"
      label="Classroom"
      required
    ></v-select>
    <v-select
      v-model="unit_of_property"
      :items="units"
      :rules="[v => !!v || 'Property is required']"
      item-text="inventory_number"
      attach
      chips
      item-value="id"
      label="Unit of propertys"
      multiple
    ></v-select>
    <v-text-field
      v-model="start_date"
      :rules="[v => !!v || 'Start date is required']"
      type="date"
      label="Start date"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="pushList('http://localhost:8000/property_list/create/')"
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
const URl1 = 'http://localhost:8000/property/?format=json'
const URl2 = 'http://localhost:8000/classroom/?format=json'
export default {
  name: 'PropertyListCreate',
  data: () => ({
    start_date: '',
    classItems: [],
    units: [],
    valid: true,
    classrooms: null,
    unit_of_property: []
  }),
  methods: {
    async pushList (apiURl) {
      for (var i = 0; i < this.unit_of_property.length; i++) {
        await this.axios.post(apiURl, {
          date_of_creation: this.start_date,
          unit_of_property: this.unit_of_property[i],
          classroom: this.classrooms
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
      }
    },
    reset () {
      console.log(this.unit_of_property)
      this.$refs.form.reset()
    },
    async getItems () {
      await this.axios.get(URl1, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.units = res.data.Unit_of_property
        })
        .catch(err => {
          console.log('error displaying units', err)
        })
      await this.axios.get(URl2, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.classItems = res.data
        })
        .catch(err => {
          console.log('error displaying employeeItems', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
    var id = this.$route.params.id
    this.getItems(id)
  }
}
</script>
