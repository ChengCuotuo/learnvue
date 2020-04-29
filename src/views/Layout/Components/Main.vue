<template>
    <div id="main-wrap">
        <!-- 本身在路由的第一层的内容在 App.vue 的 router-view 里面显示的
        这里再加一层 router-view 显示的则是当前页面所在路由的 children 中指定的页面 -->
        <router-view />
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    position: fixed;
    left: $navMenu;
    top: 75px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    -webkit-box-sizing: border-box;
}
</style>