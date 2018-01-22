// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import sellers from 'components/sellers/sellers';

import 'common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/sellers', component: sellers},
  {path: '*', redirect: '/goods'}
];
var router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
