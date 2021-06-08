<template>
<section>
  <h1>Classrooms
    <v-btn
        color="warning"
        :style="{'margin':'20px'}"
        @click="$router.push('/classroom_create/')
            $router.go()">
            Create
        </v-btn>
  </h1>
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
      await this.axios.get(apiURl, { headers: { Authorization: 'Token ' + this.$cookies.get('token').toString() } })
        .then(res => {
          this.classItems = res.data
        })
        .catch(err => {
          this.$router.push('/auth')
          console.log('error displaying classItems', err)
        })
    }
  },
  created () {
    if (this.$cookies.get('token') === 'error') {
      this.$router.push('/auth')
    }
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
