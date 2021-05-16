import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Subdivision from '../views/Subdivision.vue'
import Nasa from '../views/Nasa.vue'
import Greeting from '../views/Greeting.vue'
import Classroom from '../views/Classroom.vue'
import Employee from '../views/Employee.vue'
import SubdivisionInfo from '../views/SubdivisionInfo.vue'
import ClassroomInfo from '../views/ClassroomInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Greeting',
    component: Greeting
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/subdivisions',
    name: 'Subdivision',
    component: Subdivision
  },

  {
    path: '/nasa',
    name: 'Nasa',
    component: Nasa
  },

  {
    path: '/classrooms',
    name: 'Classroom',
    component: Classroom
  },
  {
    path: '/employees',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/subdivision/:id',
    name: 'SubdivisionInfo',
    component: SubdivisionInfo,
    props: true
  },
  {
    path: '/classroom/:id',
    name: 'ClassroomInfo',
    component: ClassroomInfo,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
