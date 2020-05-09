// 将 cookie 存储起来
import cookie from "cookie_js";

const adminToKen = "admin_toKen";
const username = "username";

export function getToken() {
    return cookie.get(adminToKen);
}

export function setToken(token) {
    return cookie.set(adminToKen, token);
}

export function removeToken() {
    return cookie.remove(adminToKen);
}


export function setUserName(name) {
    return cookie.set(username, name);
}

export function getUserName() {
    return cookie.get(username);
}

export function removeUserName() {
    return cookie.remove(username);
}