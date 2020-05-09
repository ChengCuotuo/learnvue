<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <!-- 本身在路由的第一层的内容在 App.vue 的 router-view 里面显示的
                这里再加一层 router-view 显示的则是当前页面所在路由的 children 中指定的页面 -->
                <router-view />
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    height: 100vh;
}
.main-content{
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-right: 30px;
    @include webkit(box-sizing, border-box);
    @include webkit(transition, all .3s ease 0s);
}

.content {
   width: 100%;
   height: 100%;
   padding: 30px 30px 0;
   background-color: #fff;
   @include webkit(box-sizing, border-box);
}

 .open {
    .main-content { padding-left: $navMenu + 30; }
 }
 .close {
    .main-content { padding-left: $navMenuMin + 30; }
 }
</style>