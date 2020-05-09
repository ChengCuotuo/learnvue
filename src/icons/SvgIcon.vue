<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="svgName"> </use>
    </svg>
</template>
<script>
import { ref, computed } from '@vue/composition-api'
export default {
    name: 'svgIcon',
    // props: ['iconClass', 'className'],
    props: {
        // 这种是更为详细的描述
        iconClass: {
            type: String,  // 定义数据类型
            default: ''
        },
        className: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        // console.log(props.iconClass);
        // console.log(props.className);

        /**
         * 计算属性 computed
         * 监听属性变化，计算属性，并返回
         */
        // 根据子组件传递过来的参数 props 中的数据，定义该组件的内容  icnoName svgClass
        const svgName = computed(() => {
            return `#icon-${props.iconClass}`;
        })

        const svgClass = computed(() => {
            if (props.className) {
                return `svg-icon ${props.className}`;
            } else {
                return `svg-icon`;
            }
        } )

        return {
            svgName,
            svgClass
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
}
</style>