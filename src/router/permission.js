// 引入本地的 路由
import router from "./index";
import { getToken, removeToken, removeUserName } from "@/utils/app";
import store from "../store/index";

const whiteRouter = ["/login"];

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断当前是否存在 token
  if (getToken()) {
    /**
     * 登录成功的过程：
     *    1. to = /console
     *    2. to = /index
     *    3. 无重定向，显示指定的页面
     */

    // console.log("存在");

    if (to.path == "/login") {
      // 主动进入到 login 页面删除掉 token
      removeToken();
      removeUserName();
      store.commit("app/SET_TOKEN", '');
      store.commit("app/SET_USERNAME", '');
      next();
    } else {
      // 获取用户角色
      // 动态分配路由权限
      next();  // 存在直接跳转
    }
    
  } else {
    // console.log("不存在");

    // 没有 token 的话，就跳转到 login, 但是这里出现了一个死循环
    // 因为没有 token 进行了 /login 的跳转，但是在跳转的时候也是页面转换，再次触发路由守卫，又触发了一次 next("/login") 所以出现死循环
    // next("/login");

    if(whiteRouter.indexOf(to.path) != -1) { // login 存在白名单
      next();
    } else {
      next("/login"); // 路由的指向
    }
  }
})