import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import("../views/PostView.vue"),
  },
    {
    path: "/user",
    name: "UserView",
    component: () => import("../views/UserView.vue"),
  },
    {
    path: "/user/post/:id",
    name: "UserPost",
    component: () => import("../views/UserPost.vue"),
  },
]

const router = new VueRouter({
  routes
})

export default router
