import Vue from 'vue'
import App from './App.vue';
import {post, get} from "./store/action";
import store from "./store/index";
import router from './router';
import iView from 'iview';
import '../theme/index.less';

Vue.use(iView);

Vue.config.productionTip = false;

Vue.prototype.$post = post;
Vue.prototype.$get = get;


Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText + ' - auto-wine'
    el.remove();
  }
});

new Vue({
  el: '#app',
  router: router,
  store,
  template: '<App/>',
  components: { App }
})

