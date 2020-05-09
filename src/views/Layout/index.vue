<template>
    <div id="layout" :class="[ navMenuStatus ? 'close' : 'open']">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
// 引入组件的时候名称时可以自定义的
import LayoutHeader from './Components/Header';
import LayoutMain from './Components/Main';
import LayoutNav from './Components/Nav';
import { computed } from '@vue/composition-api';

export default {
    name: 'layout',
    // 指明组件
    components: {LayoutHeader, LayoutMain, LayoutNav}, 
    setup(props, { root }) {
        const navMenuStatus = computed(() => root.$store.state.app.isCollapse);

        return {
            navMenuStatus
        }
    }
}
</script>
<style lang="scss" scoped>
#layout {
    background-color: #E8E8E8;
}
</style>