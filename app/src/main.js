import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
//第一个参数：全局组件的名称 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

//注册弹框组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入先关的mock数据的文件【需要代码执行一次】
import "@/mock/serve";
//引入swiper需要使用的样式[项目当中用到swiper的地方很多，样式引入一次即可
import "swiper/css/swiper.css"

import { reqGetSearchInfo } from '@/api'

//引入路由器
import router from '@/router'

//引入仓库
import store from '@/store'

//引入全部的请求函数
import * as API from '@/api';

//图片懒加载
import VueLazyload from 'vue-lazyload'
//使用图片懒加载插件：自定义插件【Vue.use】
//Vue.use,回调用插件对象install方法，install方法会注入Vue构造函数
//插件里面：Vue.component、Vue.directive、Vue.prototype.$bus、Vue.filter等等
//在使用图片懒加载插件的时候，第二个参数：配置对象
//引入图片模块：JSON、图片默认对外暴露
import erha from '@/assets/images/1.gif';
//Vue.use的时候，这个插件给咱们提供一个全局指令v-lay
Vue.use(VueLazyload, {
  //设置图片懒加载默认图片
  loading: erha,
});

//引入自定义插件
import jch from '@/plugins/jch';
//Vue.use使用这个插件的时候，会出发自定义插件对象的install方法
Vue.use(jch);

import '@/plugins/validate'

new Vue({
  render: h => h(App),
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取
    //请求函数只需要注册一次，可以在组件当中使用。
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')

