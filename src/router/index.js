import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'E洁家政管理系统', icon: 'dashboard' }
    }]
  },

  {
    path: '/waiter',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Waiter',//在这里name必须要，不要的话会出现一些不可能预计的错误
        component: () => import('@/views/waiter/index'),
        meta: { title: '员工管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Customer',//在这里name必须要，不要的话会出现一些不可能预计的错误
        component: () => import('@/views/customer/index'),
        meta: { title: '顾客管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Product',//在这里name必须要，不要的话会出现一些不可能预计的错误
        component: () => import('@/views/product/index'),
        meta: { title: '产品管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',//在这里name必须要，不要的话会出现一些不可能预计的错误
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Category',//在这里name必须要，不要的话会出现一些不可能预计的错误
        component: () => import('@/views/category/index'),
        meta: { title: '栏目管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',//在这里name必须要，不要的话会出现一些不可能预计的错误
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
