import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Toast, Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'
// 样式统一
import 'normalize.css';
import './style/iconfont.js';

declare module "vue/types/vue" {
  interface Vue {
    $toast: any;
    $indicator: any;
  }
}

Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
