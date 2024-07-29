<script lang="ts" setup>
import { ref } from 'vue'
const isCollapse = ref(false)
const handleOpen = () => {
  //   isCollapse.value = false
}
const handleClose = () => {
  //   isCollapse.value = true
}
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
     <el-menu-item index="1-4-1">item one</el-menu-item>
    <el-sub-menu index="1">
     
      
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
   
  </el-menu>
</template>
<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
