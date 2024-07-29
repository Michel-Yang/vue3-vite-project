<!-- @format -->

<template>
  <div class="menu">
    <div v-for="(item, index) in menuList" :key="index">
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :index="!level ? String(index + 1) : `${level}+${index + 1}`">
           <template #title>{{ item.meunName }}</template>
        
          <Menu :level="index + 1" :menu-list="item.children" />
        </el-sub-menu>
      </template>
      <div v-else>
        <el-menu-item :index="item.murl" :attrindex="item.murl">{{ item.meunName }}</el-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
    powerList: {
      type: Array,
      default() {
        return [];
      },
    },
    level: {
      type: [Number, String],
      default: "",
    },
  },
};
</script>

<style scoped lang="scss"></style>
