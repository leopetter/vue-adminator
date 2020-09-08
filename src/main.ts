import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { AppModule } from "./store/modules/app";

import BootstrapVue from "bootstrap-vue";
import NProgress from "vue-nprogress";
import VueCookies from "vue-cookies-ts";
import Trend from "vuetrend";
import axios from "axios";
import VueAxios from "vue-axios";
import { VueMasonryPlugin } from "vue-masonry";
import { VNode } from 'vue/types/umd';

Vue.config.productionTip = false;

Vue.use(Trend);
Vue.use(VueMasonryPlugin);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.use(BootstrapVue);

const options = {
  showSpinner: false,
  latencyThreshold: 70,
  router: true,
  http: true,
  parent: ".nprogress-container"
};

Vue.use(NProgress, options);

// Set up progress bar
const nprogress = new NProgress(options);

// Set authentication token if available
const authToken = localStorage.getItem("user-token");
if (authToken) {
  Vue.axios.defaults.headers.common["Authorization"] = authToken;
}
Vue.axios.defaults.headers.common["Accept"] = "application/json";

Vue.directive('click-outside-close', {
  bind: function (el:any, binding, vnode: any) {
    el.clickOutsideEvent = function (event:any) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        if (vnode.context.open) {
          vnode.context.open = false
        }
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el:any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

new Vue({
  nprogress,
  router,
  axios,
  store,
  render: h => h(App)
}).$mount("#app");
