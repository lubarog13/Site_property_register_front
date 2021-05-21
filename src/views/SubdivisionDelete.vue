<template>
    <section>
        <v-card
        elevation="10"
        class="mx-auto">
        <v-card-title>
            Do you want to delete {{ subdivision_name }}?
        </v-card-title>
        <v-btn
        color="error"
        class="mr-4"
        @click="deleteSubdivision('http://localhost:8000/subdivisions/delete/'+$route.params.id+'/')"
        >
        Yes
        </v-btn>
        </v-card>
    </section>
</template>
<script>
export default {
  name: 'SubdivisionDelete',
  data: () => ({
    subdivision_name: ''
  }),
  methods: {
    async deleteSubdivision (apiURl) {
      await this.axios.delete(apiURl
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getSubdivisionName (URl) {
      await this.axios.get(URl)
        .then(res => {
          this.subdivision_name = res.data.subdivision_name
          console.log(this.subdivisions)
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    }
  },
  created () {
    var URl_ = 'http://localhost:8000/subdivisions/delete/' + this.$route.params.id + '/'
    this.getSubdivisionName(URl_)
  }
}
</script>
