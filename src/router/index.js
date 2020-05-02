import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 引入布局主键
import Layout from '@/views/Layout/index.vue'

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true, // 是否隐藏
    meta: {
      name: '主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () => import("../views/Login")   // index 文件名称可以省略，会自动给读取
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",  // 定义初始页面
    meta: {
      name: '控制台',
      icon: 'dashboard'
    },
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'ConsoleIndex',
        meta: {
          name: '首页'
        },
        component: () => import("../views/Console"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: '信息管理',
      icon: 'el-icon-info'
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: '信息列表'
        },
        component: () => import("../views/Info")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: '信息分类'
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: '用户管理',
      icon: 'el-icon-help'
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: '用户列表'
        },
        component: () => import("../views/User")
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
