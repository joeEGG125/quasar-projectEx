
const routes = [
  {path: '/', component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/IndexPage.vue') },
    { path: 'account_ex1', component: () => import('pages/account_ex1.vue') },
    { path: 'product_ex2', component: () => import('pages/product_ex2.vue') },
    { path: 'table_ex3', component: () => import('pages/table_ex3.vue') },
    { path: 'accountLoading_ex4', component: () => import('pages/accountLoading_ex4.vue') },
    { path: 'actshowing_ex4', component: () => import('pages/actshowing_ex4.vue') },
    { path: 'userLogin', component: () => import('pages/userLogin.vue') },
    { path: 'userProduction', component: () => import('pages/userProduction.vue') },
  ]},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes