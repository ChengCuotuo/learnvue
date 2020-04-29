<template>
    <div id="layout">
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

export default {
    name: 'layout',
    // 指明组件
    components: {LayoutHeader, LayoutMain, LayoutNav}, 
    setup() {

    }
}
</script>
<style lang="scss" scoped>

</style>