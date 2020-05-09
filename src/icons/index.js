import Vue from 'vue';

import SvgIcon from './SvgIcon';

// 添加全局组件
Vue.component('svg-icon', SvgIcon);

// svg 的图片解析
/**
 * require.context 读取指定目录的所有文件
 *  第一个参数：目录    第二个参数：是否遍历子级目录  第三个参数：定义便利文件规则
 * 
 */
const req = require.context('./svg', false, /\.svg$/);  // 正则表达式，读取以 svg 结尾的文件
// es6
const requireAll = requireContext => {
    return requireContext.keys().map(requireContext)
}

// es5
// const requireAll = function(requireContext) {
//     return requireContext.keys().map(requireContext)
// }
requireAll(req);