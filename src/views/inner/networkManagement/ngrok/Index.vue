<template>
  <div class="vpn-content">
    <!-- <div class="breadcrumb-path">
      网络设置 /<span class="breadcrumb-path-now">NGROK管理</span>
    </div> -->
    <div class="page-title">NGROK管理</div>
    <el-collapse v-model="activeNames" v-loading="loading" class="my-collapse">
      <el-collapse-item name="1">
        <template v-slot:title>
          <span class="collapse-name">配置信息</span>
        </template>
        <el-form
          ref="form"
          :model="ngrokMes"
          label-width="100px"
          size="medium"
          class="form-inline mt20"
        >
          <el-form-item label="状态">
            <el-input
              :value="enableStatus == true ? '已连接' : '未连接'"
              readonly
            />
          </el-form-item>
          <el-form-item label="URL">
            <el-input :value="url" readonly />
          </el-form-item>
          <el-form-item label="服务器地址">
            <el-input
              v-model="ngrokMes.serverUrl"
              placeholder="请输入服务器地址"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item label="服务端口">
            <el-input
              v-model="ngrokMes.clientPort"
              placeholder="请输入服务端口"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item label="APPID">
            <el-input
              v-model="ngrokMes.appId"
              placeholder="请输入appId"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              v-model="ngrokMes.authUser"
              placeholder="请输入用户名"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="ngrokMes.authPass"
              type="password"
              placeholder="请输入密码"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setNgrokconfig"
              >保存配置</el-button
            >
            <el-button
              v-if="enableStatus"
              class="btn-main w100"
              @click="ngrokAction(false)"
              >关闭服务</el-button
            >
            <el-button v-else class="btn-main w100" @click="ngrokAction(true)"
              >开启服务</el-button
            >
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {
  ngrokInfo,
  ngrokConfig,
  setNgrokconfig,
  ngrokAction
} from "@/api/network";
export default {
  data() {
    return {
      activeNames: ["1"],
      enableStatus: true,
      url: "",
      loading: false,
      ngrokMes: {
        serverUrl: "",
        authUser: "",
        authPass: "",
        clientPort: "",
        appId: ""
      }
    };
  },
  mounted() {
    // this.ngrokInfo();
    // this.ngrokConfig();
  },
  methods: {
    async ngrokInfo() {
      let res = await ngrokInfo();
      if (res.status == "success") {
        this.enableStatus = res.data.enableStatus;
        this.url = res.data.url;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async ngrokConfig() {
      let res = await ngrokConfig();
      if (res.status == "success") {
        this.ngrokMes = res.data;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async setNgrokconfig() {
      this.loading = true;
      let res = await setNgrokconfig(this.ngrokMes);
      if (res.status == "success") {
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
      this.loading = false;
    },
    async ngrokAction(state) {
      this.loading = true;
      let res = awaitngrokAction({
        enableService: state
      });
      if (res.status == "success") {
        this.enableStatus = res.data.enableStatus;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.my-collapse {
  // width: 70%;
  margin: 0 auto;
}

.form-inline {
  width: 60%;
  margin: 0 auto;
}

.collapse-name {
  font-size: 16px;
  font-weight: 500;
}
</style>
