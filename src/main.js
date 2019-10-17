import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from './router'
import MuseUI from 'muse-ui';
import moment from 'moment' //引入moment 时间格式化插件
import md5 from "js-md5";
import animated from 'animate.css'
import Toast from 'muse-ui-toast';
import './icons/index' //引入icon图标
import 'muse-ui/dist/muse-ui.css';
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import VueTouch from 'vue-touch'

Vue.use(MuseUI);
Vue.use(animated)
Vue.use(Toast);
Vue.use(VueTouch, {name: 'v-touch'})

Vue.prototype.$md5 = md5;
Vue.prototype.$moment = moment; //挂载到原型链上，直接通过this._moment()使用
Vue.prototype.$video = Video
VueTouch.config.swipe = {
  threshold: 100 //手指左右滑动距离
}

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD hh:mm:ss') { //将moment注册为全局过滤器
  if (dataStr) {
      return moment(dataStr).format(pattern)
  } else {
      return dataStr
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
