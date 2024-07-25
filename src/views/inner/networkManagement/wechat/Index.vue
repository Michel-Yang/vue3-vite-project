<template>
  <div class="vpn-content">
    <!-- <div class="breadcrumb-path">
      网络设置 /<span class="breadcrumb-path-now">微信管理</span>
    </div> -->
    <div class="page-title">
      <img
        src="@/assets/images/inner/wechat.png"
        class="page-title-icon mr10"
      />
      微信管理
    </div>
    <el-collapse v-model="activeNames" v-loading="loading" class="my-collapse">
      <el-collapse-item name="1">
        <template v-slot:title>
          <span class="collapse-name">配置信息</span>
        </template>
        <el-form
          ref="form"
          :model="wechatMes"
          label-width="100px"
          size="medium"
          class="form-inline mt20"
        >
          <el-form-item label="模式">
            <el-input :value="enableStatus == true ? '启用' : '停用'" />
          </el-form-item>
          <el-form-item label="服务器地址">
            <el-input
              v-model="wechatMes.serverUrl"
              placeholder="请输入内容"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item label="服务ID">
            <el-input
              v-model="wechatMes.serverId"
              placeholder="请输入服务ID"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item label="服务密钥">
            <el-input
              v-model="wechatMes.serverCert"
              placeholder="请输入服务密钥"
              :disabled="enableStatus == true"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setWechatconfig"
              >保存配置</el-button
            >
            <el-button
              v-if="enableStatus"
              class="btn-main w100"
              @click="wechatAction(false)"
              >关闭服务</el-button
            >
            <el-button v-else class="btn-main w100" @click="wechatAction(true)"
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
  wechatInfo,
  wechatConfig,
  setWechatconfig,
  wechatAction
} from "@/api/network";
export default {
  data() {
    return {
      activeNames: ["1"],
      loading: false,
      enableStatus: true,
      wechatMes: {
        serverCert: "",
        serverId: "",
        serverUrl: ""
      }
    };
  },
  mounted() {
    this.wechatInfo();
    this.wechatConfig();
  },
  methods: {
    async wechatInfo() {
      let res = await wechatInfo();
      if (res.status == "success") {
        this.enableStatus = res.data.enableStatus;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async wechatConfig() {
      let res = await wechatConfig();
      if (res.status == "success") {
        this.wechatMes = res.data;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async setWechatconfig() {
      this.loading = true;
      let res = await setWechatconfig(this.wechatMes);
      if (res.status == "success") {
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
      this.loading = false;
    },
    async wechatAction(state) {
      this.loading = true;
      let res = await wechatAction({
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

.page-title-icon {
  width: 24px;
  margin-right: 18px;
}

.my-collapse {
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
