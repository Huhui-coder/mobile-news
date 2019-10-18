import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import MuseUI from "muse-ui";
import moment from "moment"; //引入moment 时间格式化插件
import md5 from "js-md5";
import animated from "animate.css";
import Toast from "muse-ui-toast";
import "./icons/index"; //引入icon图标
import "muse-ui/dist/muse-ui.css";
import Video from "video.js";
import "video.js/dist/video-js.css";
import { ImagePreview, Lazyload, Tab, Tabs } from "vant";

// options 为可选参数，无则不传

Vue.use(MuseUI);
Vue.use(animated);
Vue.use(Toast);
Vue.use(ImagePreview);
Vue.use(Lazyload, {
  preLoad: 1.3,
  error:
    "https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=364878ec78899e5178db32127297f50b/0823dd54564e9258d2bb2dff9f82d158ccbf4e17.jpg",
  loading:
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571331613339&di=417e97a77a53133a4e3388eb7207a71c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8ed6293156c45e9d244e6f83a3083053aee078ff4c3f-XXWGSd_fw658",
  attempt: 1
});
Vue.use(Tab).use(Tabs);

Vue.prototype.$md5 = md5;
Vue.prototype.$moment = moment; //挂载到原型链上，直接通过this._moment()使用
Vue.prototype.$video = Video;

Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD hh:mm:ss") {
  //将moment注册为全局过滤器
  if (dataStr) {
    return moment(dataStr).format(pattern);
  } else {
    return dataStr;
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
