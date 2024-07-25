<script setup lang="ts">
import Header from '../../components/Header.vue'
import Menu from '../../components/Menu.vue'
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="260px">
          <Menu />
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
}
.el-header {
  border-bottom: 1px solid #eee;
}
</style>
