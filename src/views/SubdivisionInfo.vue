<template>
<section>
  <h1>{{ subdivision.subdivision_name }}</h1>
  <v-card
  elevation="10"
  class = "mx-auto"
  max-width="70%"
  >
  <v-row>
      <v-col cols="5" class="mx-auto">
      <p>{{ subdivision.phone_number }}</p>
      <p>{{ subdivision.subdivision_type }}</p>
      <p v-if="subdivision.id_subdivision!=null"
      >A part of: <a :href = "subdivision.id_subdivision.id"> {{ subdivision.id_subdivision.subdivision_name }}</a></p>
      <div class="lefted">
      <p>Employees: </p>
      <ul
      v-for="employee in employees"
      :key="employee.id">
      <li
      :style="{'text-decoration': 'underline'}"
      @click="$router.push('/employee/' + employee.id)
      $router.go()"
      >{{ employee.first_name }} {{ employee.last_name }}</li>
      </ul>
      </div>
      </v-col>
      <v-col cols="5" class="mx-auto">
  <v-row
  v-if="classItems[0]!=null">
    <v-col class="mx-auto">
      Classrooms:
      <ClassItemCard
        v-for="classItem in classItems"
        :key="classItem.id"
        :class-item="classItem"
        class="my-2"
      />
    </v-col>
  </v-row>
  <v-row
  v-if="subdivisionItems[0]!=null">
  <v-col class="mx-auto">
      Subdivisions:
      <SubdivisionItemCard
        v-for="subdivisionItem in subdivisionItems"
        :key="subdivisionItem.id"
        :subdivision-item="subdivisionItem"
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
import ClassItemCard from '@/components/ClassItemCard.vue'
import SubdivisionItemCard from '@/components/SubdivisionItemCard.vue'
// const id = this.$route.params.id

export default {
  components: { ClassItemCard, SubdivisionItemCard },
  name: 'SubdivisionInfo',
  data: () => ({
    subdivision: Object,
    classItems: [],
    subdivisionItems: [],
    employees: [],
    computed: {
      id () {
        console.log('id1', this.$route.params.id)
        return this.$route.params.id
      }
    }
  }),
  methods: {
    async getSubdivisionItems (apiURl) {
      await this.axios.get(apiURl)
        .then(res => {
          this.subdivision = res.data
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    },
    async getClassRoom (classAPIURL) {
      await this.axios.get(classAPIURL)
        .then(res => {
          this.classItems = res.data.Classrooms
          this.subdivisionItems = res.data.Subdivisions
          this.employees = res.data.Employees
          console.log(this.classItems)
        })
        .catch(err => {
          console.log('error displaying subdivisionItems', err)
        })
    }
  },
  created () {
    // console.log('id', this.computed.id())
    var apiURl = 'http://localhost:8000/subdivision/' + this.$route.params.id + '/?format=json'
    var classAPIURL = 'http://localhost:8000/classrooms/' + this.$route.params.id + '/?format=json'
    this.getSubdivisionItems(apiURl)
    this.getClassRoom(classAPIURL)
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
