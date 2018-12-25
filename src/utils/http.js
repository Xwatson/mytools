import axios from 'axios';

/**
 * get请求
 * @param {*} url 地址
 * @param {*} data 参数
 * @param {*} options 其他配置
 */
export const httpGet = async(url, data = {}, options = {}) => {
    return await request(url, 'GET', data, options);
}

/**
 * post请求
 * @param {*} url 地址
 * @param {*} data 参数
 * @param {*} options 其他配置
 */
export const httpPost = async(url, data = {}, options = {}) => {
    return await request(url, 'POST', data, options);
}

export const request = (url, method = 'GET', data = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        axios.request({
            url,
            method,
            data,
            headers: { 'sign': 'xxx', 'Cache-Control': 'no-cache', token: 'xxx' },
            validateStatus: function (status) {
                return status < 500;
            },
            ...options
        })
        .then(function(res) {
            resolve(res);
        })
        .catch(function(err) {
            reject(err);
        })
    });
}