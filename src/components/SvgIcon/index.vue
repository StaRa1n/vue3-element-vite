<template>
  <div>
    <!-- svg图标的使用 -->
    <svg>
      <use
        :xlink:href="prefix + name"
        :color="color"
        :width="width"
        :height="height"
      ></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //svg矢量图的名字
  name: {
    type: String,
    default: 'unload',
  },
  //svg图标的颜色
  color: {
    type: String,
    default: '',
  },
  //svg宽度
  width: {
    type: String,
    default: '16px',
  },
  //svg高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
