import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('../views/home/Home.vue')
const Login = () => import('../views/login/Login.vue')
const Register = () => import('../views/register/Register.vue')
const Shop = () => import('../views/shop/Shop.vue')
const Order = () => import('../views/order/Order.vue')
const OrderList = () => import('../views/orderlist/OrderList.vue')
const Address = () => import('../views/address/Address.vue')
const NewAddress = () => import('../views/address/NewAddress.vue')
const ModifyAddress = () => import('../views/address/ModifyAddress.vue')
const Profile = () => import('../views/my/profile.vue')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // 访问login页面之前执行
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin === "true") {
        next({ name: "Home" })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        // 已登录直接跳转到首页
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/order/:shopid',
    name: 'Order',
    component: Order
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
  },
  {
    path: '/add',
    name: 'NewAddress',
    component: NewAddress
  },
  {
    path: '/modify',
    name: 'ModifyAddress',
    component: ModifyAddress
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.isLogin === "true" || to.name === "Login" || to.name === "Register") {
    next()
  } else {
    console.log('请先登录才能进行访问')
    next({ name: "Login" })
  }
})

export default router
