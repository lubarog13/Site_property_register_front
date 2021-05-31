import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Greeting from '../views/Greeting.vue'
import Profile from '../views/Profile.vue'
import Subdivision from '../views/Subdivision.vue'
import Login from '../views/Login.vue'
import Nasa from '../views/Nasa.vue'
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
import EmployeeCreate from '../views/EmployeeCreate.vue'
import EmployeeUpdate from '../views/EmployeeUpdate.vue'
import PropertyCreate from '../views/PropertyCreate.vue'
import PropertyUpdate from '../views/PropertyUpdate.vue'
import Signup from '../views/SignUp.vue'
import ClassroomUpdate from '../views/ClassroomUpdate.vue'
import PropertyListUpdate from '../views/PropertyListUpdate.vue'
import PropertyListCreate from '../views/PropertyListCreate.vue'
import PropertyLiabilityUpdate from '../views/PropertyLiabilityUpdate.vue'
import PropertyLiabilityCreate from '../views/PropertyLiabilityCreate.vue'
import Search from '../views/Search.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Greeting',
    component: Greeting
  },
  {
    path: '/auth',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Signup',
    component: Signup
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
    path: '/profile',
    name: 'Profile',
    component: Profile
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
  },
  {
    path: '/employee_create/',
    name: 'EmployeeCreate',
    component: EmployeeCreate,
    props: false
  },
  {
    path: '/employee_update/:id',
    name: 'EmployeeUpdate',
    component: EmployeeUpdate,
    props: true
  },
  {
    path: '/property_liab_create/',
    name: 'PropertyLiabilityCreate',
    component: PropertyLiabilityCreate,
    props: true
  },
  {
    path: '/property_liab_update/:id',
    name: 'PropertyLiabilityUpdate',
    component: PropertyLiabilityUpdate,
    props: true
  },
  {
    path: '/property_list_create/',
    name: 'PropertyListCreate',
    component: PropertyListCreate,
    props: false
  },
  {
    path: '/property_list_update/:id',
    name: 'PropertyListUpdate',
    component: PropertyListUpdate,
    props: true
  },
  {
    path: '/property_create/',
    name: 'PropertyCreate',
    component: PropertyCreate
  },
  {
    path: '/property_update/:id',
    name: 'PropertyUpdate',
    component: PropertyUpdate,
    props: true
  },
  {
    path: '/search/:str',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
