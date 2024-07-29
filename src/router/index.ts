import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/inner'
      // name: 'home',
      // component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/inner',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/inner/InnerView.vue'),
      children:[
      {
        path:"vpn",
         component: () => import('../views/inner/networkManagement/vpn/Index.vue'),
      },
      {
        path:"ngrok",
         component: () => import('../views/inner/networkManagement/ngrok/Index.vue'),
      },{
        path:"wechat",
         component: () => import('../views/inner/networkManagement/wechat/Index.vue'),
      }]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/login/LoginForm.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  const token = localStorage.getItem('token')
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
