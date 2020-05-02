// 入口文件
import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/main.scss"
// 自定义全局组件
import './icons';

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
