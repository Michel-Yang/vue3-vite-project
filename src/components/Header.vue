
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
import { userStore } from '@/stores'
const user = userStore()
const handleSelect = (index: string) => {
  if (index === '0-1') {
    localStorage.clear()
    router.push('/login')
  }
}
</script>

<template>
  <div class="header">
    <img src="@/assets/images/logo.png" class="logo" />
    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
      <el-sub-menu index="0">
        <template #title>{{ user.userInfo.name }}</template>
        <el-menu-item index="0-1">退出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    height: 60px;
  }
}
</style>
