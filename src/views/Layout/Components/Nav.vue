<template>
    <div id="nav-wrap">
        <!-- transparent 可以显示背景面板的所有颜色 -->
        <!-- el-menu 是 element-ui 中的组件，router 变量用来启用 router  -->
        <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo"
             @open="handleOpen" 
             @close="handleClose" 
             :collapse="isCollapse" 
             background-color="transparent" 
             text-color="#fff" 
             active-text-color="#fff"
             router>

            <!-- template 标签是不会被解析出来的，使用 v-for 的时候是不允许使用 key 的 -->
            <template v-for="(item, index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <!--一级菜单 -->
                    <template slot="title">
                        <!-- <i :class="item.meta.icon"></i> -->
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <!-- index 绑定的数据作为 router 的路径 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { reactive, ref, toRefs, onMounted, refs } from '@vue/composition-api' 
export default {
    name: 'navMenu',
    setup(props, { root }) {
        /**
         * 数据
         */
        // 展开的状态
        const isCollapse = ref(false);
        // 获取子路由的数据，当前路由的选中中的子路由
        const routers = reactive(root.$router.options.routes) 
        // console.log(routers);

        /**
         * 函数
         */
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath);
        }

        const handleClose = (key, keyPath) => {
            console.log(key, keyPath);
        }

        return {
            isCollapse,
            routers,
            handleOpen,
            handleClose
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
 #nav-wrap {
     position:fixed;
     top: 0;
     left: 0;
     width: $navMenu;
     height: 100vh;
     background-color: #344a5f;
 }
</style>