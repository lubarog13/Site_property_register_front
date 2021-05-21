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
import EmployeeInfo from '../views/EmployeeInfo.vue'
import PropertyInfo from '../views/PropertyInfo.vue'
import SubdivisionCreate from '../views/SubdivisionCreate.vue'
import SubdivisionUpdate from '../views/SubdivisionUpdate.vue'
import SubdivisionDelete from '../views/SubdivisionDelete.vue'
import ClassroomCreate from '../views/ClassroomCreate.vue'
import ClassroomUpdate from '../views/ClassroomUpdate.vue'
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
  },
  {
    path: '/employee/:id',
    name: 'EmployeeInfo',
    component: EmployeeInfo,
    props: true
  },
  {
    path: '/property/:id',
    name: 'PropertyInfo',
    component: PropertyInfo,
    props: true
  },
  {
    path: '/subdivision_create/',
    name: 'SubdivisionCreate',
    component: SubdivisionCreate,
    props: false
  },
  {
    path: '/subdivision_update/:id',
    name: 'SubdivisionUpdate',
    component: SubdivisionUpdate,
    props: true
  },
  {
    path: '/delete/:id',
    name: 'SubdivisionDelete',
    component: SubdivisionDelete,
    props: true
  },
  {
    path: '/classroom_create/',
    name: 'ClassroomCreate',
    component: ClassroomCreate,
    props: false
  },
  {
    path: '/classroom_update/:id',
    name: 'ClassroomUpdate',
    component: ClassroomUpdate,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
