/**
 * 过滤特殊字符
 */
// 将方法暴露出去，就可以被引用了
export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 * @param {*} str 
 */
export function expEmail(str) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(str) ? true : false;
}

/**
 * 验证 6-20 位字母加数字
 * @param {*} str 
 */
export function expPassword(str) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(str) ? true : false;
}

/**
 * 验证验证码
 */
export function expCode(str) {
    let reg = /^[0-9a-z]{6}$/;
    return !reg.test(str) ? true : false;
}