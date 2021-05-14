<template>
<section>
  <h1>Classrooms</h1>
  <v-row>
    <v-col cols="4" class="mx-auto">
      <ClassItemCard
        v-for="classItem in classItems"
        :key="classItem.id"
        :class-item="classItem"
        class="my-2"
      />
    </v-col>
  </v-row>
</section>
</template>
<script>
import ClassItemCard from '@/components/ClassItemCard.vue'
const apiURl = 'http://localhost:8000/classroom/?format=json'
export default {
  components: { ClassItemCard },
  name: 'Classroom',
  data: () => ({
    classItems: []
  }),
  methods: {
    async getClassroomItems () {
      await this.axios.get(apiURl)
        .then(res => {
          this.classItems = res.data
        })
        .catch(err => {
          console.log('error displaying classItems', err)
        })
    }
  },
  created () {
    this.getClassroomItems()
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
