<template>
<section>
  <h1>Subdivisions
    <v-btn
        color="warning"
        :style="{'margin':'20px'}"
        @click="$router.push('/subdivision_create/')
            $router.go()">
            Create
        </v-btn>
  </h1>
  <v-row>
    <v-col cols="4" class="mx-auto">
      <SubdivisionItemCard
        v-for="subdivisionItem in subdivisionItems"
        :key="subdivisionItem.id"
        :subdivision-item="subdivisionItem"
        class="my-2"
      />
    </v-col>
  </v-row>
</section>
</template>
<script>
import SubdivisionItemCard from '@/components/SubdivisionItemCard.vue'
const apiURl = 'http://localhost:8000/subdivisions/?format=json'
export default {
  components: { SubdivisionItemCard },
  name: 'Subdivision',
  data: () => ({
    subdivisionItems: []
  }),
  methods: {
    async getSubdivisionItems () {
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.subdivisionItems = res.data.Subdivisions
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
<style>
h1 {
  color: white;
  font-size: 32pt;
  text-shadow: 4px 4px 5px darkgray;
  margin: 3% 3%;
}
</style>
