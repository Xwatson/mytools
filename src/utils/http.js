import axios from 'axios';

/* // 请求列表
const requestList = []
// 取消列表
const CancelToken = axios.CancelToken
let sources = {}
axios.interceptors.request.use((config) => {
  // 将请求地址及参数作为一个完整的请求
  const request = JSON.stringify(config.url) + JSON.stringify(config.data)
  config.cancelToken = new CancelToken((cancel) => {
    sources[request] = cancel
  })
  // 1.判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
  if(requestList.includes(request)){
    sources[request]('取消重复请求')
  }else{
    requestList.push(request)
    // 2.请求开始，改变loading状态供加载动画使用
    //store.dispatch('changeGlobalState', {loading: true})
  }
  // 3.从store中获取token并添加到请求头供后端作权限校验
  // const token = store.getters.userInfo.token
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
}) */
/**
 * get请求
 * @param {*} url 地址
 * @param {*} data 参数
 * @param {*} options 其他配置
 */
export const httpGet = async (url, data = {}, options = {}) => {
  return await request(url, 'GET', data, options);
}

/**
 * post请求
 * @param {*} url 地址
 * @param {*} data 参数
 * @param {*} options 其他配置
 */
export const httpPost = async (url, data = {}, options = {}) => {
  return await request(url, 'POST', data, options);
}

export const request = (url, method = 'GET', data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      method,
      data,
      headers: { 'sign': 'xxx', 'Cache-Control': 'no-cache', token: 'xxx' },
      responseType: 'json',
      validateStatus: function (status) {
        return status >= 200 && status < 300;;
      },
      ...options
    })
      .then(function (res) {
        if (res.data.code === 0) {
          resolve(res.data);
        } else {
          reject(res.data.message);
        }
      })
      .catch(function (err) {
        reject(err);
      })
  });
}
