<template>
<section>
<h1>Inventory number {{ unitOfProperty.inventory_number }}</h1>
  <v-card
  elevation="10"
  v-scroll.self="onScroll"
  class = "mx-auto overflow-y-auto overflow-x-hidden"
  max-width="70%"
  max-height="450px"
  >
  <v-row>
      <v-col cols="6" class="mx-auto">
      <p> Registration in: {{ unitOfProperty.date_of_registration }}</p>
      <div class="lefted">
          <p>Lifetime: {{ unitOfProperty.lifetime }}</p>
          <p>Revaluation year: {{ unitOfProperty.revaluation_year }}</p>
          <h2>Cost: {{ unitOfProperty.cost }}rub.</h2>
      </div>
      </v-col>
      <v-col cols="4" class="mx-auto">
  <v-row>
    <v-col class="mx-auto">
      Classrooms:
      <class-item-card
        v-for="classroomItem in classroomItems"
        :key="classroomItem.id"
        :class-item="classroomItem"
        class="my-2"
      />
    </v-col>
  </v-row>
 </v-col>
  </v-row>
  </v-card>
</section>
</template>
<script>
import ClassItemCard from '../components/ClassItemCard.vue'
// const id = this.$route.params.id

export default {
  components: { ClassItemCard },
  name: 'PropertyInfo',
  data: () => ({
    unitOfProperty: Object,
    classroomItems: [],
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getPropertyItems (apiURl) {
      await this.axios.get(apiURl)
        .then(res => {
          this.unitOfProperty = res.data.Unit_of_property
          this.classroomItems = res.data.Classroom
        })
        .catch(err => {
          console.log('error displaying propertyItems', err)
        })
    }
  },
  created () {
    // console.log('id', this.computed.id())
    var apiURl = 'http://localhost:8000/property/' + this.$route.params.id + '/?format=json'
    this.getPropertyItems(apiURl)
  }
}
</script>
<style>
.lefted {
  text-align: left;
}
h1 {
  color: white;
  font-size: 32pt;
  text-shadow: 4px 4px 5px darkgray;
  margin: 3% 3%;
}
.list {
    background-color: white;
}
</style>
