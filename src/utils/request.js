import axios from 'axios'
import Toast from 'muse-ui-toast';

import store from '@/store'//将vuex引入进来，结合返回的状态码做一些处理，
//如返回401，重新跳转回登陆页
//返回50*，抛出错误提示

// create an axios instance
const service = axios.create({
  baseURL: 'https://www.apiopen.top/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Toast.message('服务错误');
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    //获得响应的状态码
    //error.response.status,可以针对返回对状态码进行进一步的措施，比如返回401，直接路由跳转到登陆页面。
    console.log('err' + error) // for debug
    Toast.message('服务错误');

    return Promise.reject(error)
  }
)

export default service
