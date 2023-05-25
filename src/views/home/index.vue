<template>
    <div>这里是Home: {{ userStore.username }}</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
</script>

<style scoped>
div{
  width: 100%;
  height: 200px;
  border: 1px solid #c8bbbb;
  border-radius: 25px;
  padding: 12px;
}
</style>
