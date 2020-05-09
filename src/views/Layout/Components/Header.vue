<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"/></div>
        <div class="pull-right">
            <div class="userinfo pull-left">
                <img class="headimg" src="../../../img/head.jpg" />
                {{ username }}
            </div>
            <div class="header-icon pull-left" @click="exit">
                <svg-icon iconClass="exit" className="exit"/>
            </div>
        </div>
    </div>
</template>
<script>

import { computed } from '@vue/composition-api';


export default {
    name: 'layoutHeader',
    setup(props, { root }) {
        // 从 store 中获取
        const username = computed(() => root.$store.state.app.username); 


        const navMenuState = () => {
            root.$store.commit('app/SET_Collapse');
        }
        //退出
        const exit = () => {
            root.$store.dispatch("app/exit").then(() => {
                root.$router.push({
                    name: 'Login'
                })
            });
        };


        return {
            navMenuState,
            username,
            exit
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
    position: fixed;
    top: 0;
    right: 0%;
    height: $layoutHeader;
    background-color: #fff;
    line-height: 75px;
    @include webkit(transition, all .3s ease 0s);
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));

}
.header-icon{
  padding: 0 32px;
  svg { 
      margin-bottom: -8px;
      font-size: 25px;
      cursor: pointer;
    }
}

.userinfo {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon {
        padding: 0 28px;
    } 
}
.headimg {
    width: 40px;
    border-radius: 50%;
    margin-bottom: -12px;
    margin-right: 10px;
}

 .open {
    #header-wrap { left: $navMenu; }
 }
 .close {
    #header-wrap { left: $navMenuMin; }
 }
</style>