<template>
  <div class="vpn-content">
    <!-- <div class="breadcrumb-path">
      网络设置 /<span class="breadcrumb-path-now">VPN管理</span>
    </div> -->
    <div class="page-title">
      <img
        src="@/assets/images/inner/vpn.png"
        class="page-title-icon mr10"
      />OpenVPN
    </div>
    <el-collapse v-model="activeNames" class="my-collapse">
      <el-collapse-item name="1">
        <template v-slot:title>
          <span class="collapse-name">基础信息</span>
        </template>
        <el-form
          :model="formInline"
          label-position="right"
          label-width="90px"
          class="form-inline mt20"
        >
          <el-form-item label="模式">
            <el-select v-model="formInline.mode" disabled style="width: 100%">
              <el-option label="客户端" value="client" />
              <el-option label="服务端" value="server" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="formInline.enableStatus"
              disabled
              style="width: 100%"
            >
              <el-option label="启用" :value="true" />
              <el-option label="停用" :value="false" />
            </el-select>
          </el-form-item>
          <el-form-item label="连接状态">
            <el-select
              v-model="formInline.conStatus"
              disabled
              style="width: 100%"
            >
              <el-option label="连接" :value="true" />
              <el-option label="断开" :value="false" />
            </el-select>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="formInline.ip" disabled size="small" />
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template v-slot:title>
          <span class="collapse-name">配置信息</span>
        </template>
        <el-form
          v-loading="loading"
          :model="setVpnMes"
          label-position="right"
          label-width="90px"
          class="form-inline mt20"
        >
          <el-form-item label="协议类型">
            <el-select v-model="setVpnMes.proto" style="width: 100%">
              <el-option label="TCP" :value="1" />
              <el-option label="UDP" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="服务端口">
            <el-input v-model="setVpnMes.serverPort" size="small" />
          </el-form-item>
          <el-form-item label="服务IP">
            <el-input v-model="setVpnMes.serverIp" size="small" />
          </el-form-item>
          <el-form-item label="CA证书">
            <el-input
              v-model="setVpnMes.ca"
              size="small"
              @focus="focus('CA证书')"
            />
          </el-form-item>
          <el-form-item label="客户端证书">
            <el-input
              v-model="setVpnMes.clientCert"
              size="small"
              @focus="focus('客户端证书')"
            />
          </el-form-item>
          <el-form-item label="客户端密钥">
            <el-input
              v-model="setVpnMes.clientKey"
              size="small"
              @focus="focus('客户端密钥')"
            />
          </el-form-item>
          <el-form-item label="TLS密钥">
            <el-input
              v-model="setVpnMes.tlsAuth"
              size="small"
              @focus="focus('TLS密钥')"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setVpnconfig">保存配置</el-button>
            <el-button
              v-if="formInline.enableStatus"
              class="btn-main w100"
              @click="vpnAction(false)"
              >关闭服务</el-button
            >
            <el-button v-else class="btn-main w100" @click="vpnAction(true)"
              >开启服务</el-button
            >
            <el-button class="btn-main w100" @click="focus('导入配置')"
              >导入配置</el-button
            >
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <My-Dialog
      :visible="showDialog"
      :dialog-data="dialogData"
      @saveData="saveData"
    />
  </div>
</template>

<script>
import { vpnInfo, vpnConfig, setVpnconfig, vpnAction } from "@/api/network";
import MyDialog from "./MyDialog.vue";
export default {
  components: {
    MyDialog
  },
  data() {
    return {
      activeNames: ["1", "2"],
      showDialog: false,
      title: "",
      formInline: {
        mode: "client"
      },
      setVpnMes: {},
      loading: false,
      dialogData: {
        title: ""
      }
    };
  },
  mounted() {
    this.vpnInfo();
    this.vpnConfig();
  },
  methods: {
    focus(title) {
      this.showDialog = true;
      this.dialogData.title = title;
    },
    saveData(data) {
      this.setVpnMes = {
        ...this.setVpnMes,
        ...data
      };
      this.showDialog = false;
    },
    async vpnInfo() {
      let res = await vpnInfo();
      if (res.status == "success") {
        this.formInline = res.data;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async vpnConfig() {
      let res = await vpnConfig();
      if (res.status == "success") {
        this.setVpnMes = res.data;
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async setVpnconfig() {
      this.loading = true;
      let res = await setVpnconfig(this.setVpnMes);
      if (res.status == "success") {
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
      this.loading = false;
    },
    async vpnAction(state) {
      let res = await vpnAction({
        enableService: state
      });
      if (res.status == "success") {
        this.formInline = res.data;
        this.formInline.mode = "client";
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
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
  width: 28px;
  margin-right: 18px;
}

.my-collapse {
  // width: 70%;
  margin: 0 auto;
  color: rgb(0 0 0) !important;
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
