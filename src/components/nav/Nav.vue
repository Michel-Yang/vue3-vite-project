<!-- @format -->

<template>
  <div class="menu">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#F9FBFF"
      text-color="#252525"
      active-text-color="#3D7FFF"
      :router="true"
    >
      <Menu :menu-list="menuList" :power-list="powerList" />
    </el-menu>
    <div class="menu-title" @click="onGoto(1)">组态模式</div>
    <div class="menu-title" @click="onGoto(0)">运行模式</div>
  </div>
</template>

<script>
import Menu from '@/components/nav/Menu.vue';
export default {
  name: "Nav",
  components: {
    Menu
  },
  data() {
    return {
      defaultActive: "",
      menuList: [
        {
          meunName: "网络设置",
          murl: "",
          children: [
            { meunName: "VPN设置", murl: "/inner/vpn" },
            { meunName: "微信设置", murl: "/inner/wechat" },
            { meunName: "ngrok设置", murl: "/inner/ngrok" },
          ],
        },
        {
          meunName: "系统管理",
          murl: "",
          children: [
            // {
            //   meunName: "系统设置",
            //   murl: "/inner/systemsetting",
            // },
            {
              meunName: "系统信息",
              murl: "/inner/systemmes",
            },
            {
              meunName: "用户管理",
              murl: "/inner/userManagement",
            },
            {
              meunName: "日志管理",
              murl: "/inner/systemlog",
            },
            {
              meunName: "固件",
              murl: "/inner/firmware",
            },
            {
              meunName: "固件信息",
              murl: "/inner/firmwareInfo",
            },
            // {
            //   meunName: "许可证",
            //   murl: "/inner/license",
            // },
          ],
        },
        // {
        //   meunName: "组态模式",
        //   murl: "",
        // }
      ], //左侧菜单列表
      UserInfo: {},
      powerList: [],
    };
  },
  async created() {
    // await this.getMenuList()
    // await this.getRolePower();
    await this.defaultOpen();
    // this.getAiFunByUserId();
  },
  methods: {
    onGoto(value) {
      if (value == 1) {
        window.open(window.location.origin+"/scada/editor", "_blank");
      } else {
        window.open(window.location.origin+"/scada/home", "_blank");
      }
    },
    // 获取角色权限
    async getRolePower() {
      this.UserInfo = this.$store.getters.getUserInfo;
      if (!this.UserInfo.id) {
        this.UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      }
      try {
        let res = await this.$apis.systemManageServer.getAiMenuByUserId(this.UserInfo.id);
        if (res.code == 1) {
          this.menuList = res.data ? res.data : [];
        } else {
          this.$message.error(res.msg);
        }
      } catch (error) {
        this.$message.error("获取角色菜单权限错误！");
      }
    },
    //获取角色控制按钮
    async getAiFunByUserId() {
      this.UserInfo = this.$store.getters.getUserInfo;
      if (!this.UserInfo.id) {
        this.UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      }
      const res = await this.$apis.sysServer.getAiFunByUserId(this.UserInfo.id);
      if (res.code == 1) {
        this.$store.commit("setBtn", res.data);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取菜单列表
    async getMenuList() {
      this.menuList = [];
      let res = await this.$apis.systemManageServer.getAiMenuTree();
      if (res.code == 1) {
        if (res.data.meunName == "根目录") {
          this.menuList = res.data.children ? res.data.children : [];
        } else {
          this.menuList = [res.data];
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击菜单页面刷新
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // if(key=='组态模式'){
      //   window.open("","_blank")
      // }
    },
    defaultOpen() {
      let path = window.location.hash;
      console.log(path, "path");
      if (path == "#/inner") {
        this.$nextTick(() => {
          let menuItem = document.getElementsByClassName("el-menu-item");
          if (menuItem.length) {
            this.defaultActive = menuItem[0].getAttribute("attrindex");
            menuItem[0].click();
          }
        });
      } else if (path.indexOf("#/inner/") !== -1) {
        let currPath = path.split("#")[1].split("?")[0];
        console.log(currPath, "123123");
        // if (["/inner/taskManagement/resultDetail", "/inner/taskManagement/taskDetail"].includes(currPath)) {
        //   currPath = "/inner/taskManagement";
        // }
        this.defaultActive = currPath;
      }
      console.log(this.defaultActive, "this.defaultActive");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  background: #f9fbff;

  .el-menu {
    :v-deep .el-submenu__title:hover,
    .el-submenu .el-menu-item:hover {
      color: #3d7fff !important;
      background: #e5efff !important;
    }

    :v-deep .el-submenu.is-active > .el-submenu__title {
      color: #3d7fff !important;
    }

    .el-menu-item.is-active {
      background: #e5efff !important;
    }

    :v-deep .el-submenu__title,
    .el-submenu .el-menu-item {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 80%;
        height: 1px;
        background: #f0f2f5;
      }
    }

    :v-deep .el-submenu__title {
      font-size: 16px;
    }
  }
}
.menu-title {
  padding-left: 20px;
  color: rgb(37, 37, 37);
  background-color: rgb(249, 251, 255);
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #e5efff;
    color: #3d7fff;
  }
}
</style>
