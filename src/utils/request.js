import axios from 'axios'
import { Message } from 'element-ui'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,  // 超时，受网络延迟的影响，这里的时间不适宜太小
});
/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 后台需要这边传相关的参数（再请求头添加参数）
    // Tokey
    // userId
    // sui

    // 根据业务需求而定

    // 直接获取请求头
    console.log(config.headers);
    // 添加 tokey
    config.headers['Tokey'] = '1111';
    config.headers['userId'] = '1111';
    config.headers['sui'] = '1111';

    return config;
    // Promis.resolve()
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求接口后，返回数据进行拦截（响应拦截）
 */
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response);

    // response.data 是后端返回的数据，里面的内容都是约定好的
    // 此处给出的定义，resCode 表示返回的编码，0 是成功，其他的是各类错误信息；message 是错误提示
    let data = response.data;
    if (data.resCode !== 0) {
        // 在这里不能像是在其他的 vue 页面中那样使用 element-ui 的组件，因为在 main.js
        // 中进行的全局注入是针对 vue 文件的，这里采用单独引入的方法
        Message.error(data.message);
        // 将信息返回
        return Promise.reject(data);
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;

/**
 * 使用 export deafult 时，但不能同时存在多个 default
 * 文件 import 不需要花括号
 */