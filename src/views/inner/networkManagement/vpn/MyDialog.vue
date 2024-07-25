<!-- @format -->

<template>
  <el-dialog
    v-model="localValue"
    v-drag
    class="my-dialog"
    width="700px"
    :modal="true"
    @open="open"
    @close="close"
  >
    <template v-slot:title>
      <div class="el-dialog__title">{{ dialogData.title }}</div>
    </template>
    <vue-scroll>
      <div class="main-content">
        <el-input
          v-if="textarea"
          v-model="textarea"
          type="textarea"
          :rows="14"
          placeholder="请输入内容"
        />
        <el-upload
          v-else
          class="upload-demo mt10 h300"
          style="width: 100%"
          drag
          action="#"
          :accept="accept"
          :on-change="handleChange"
          :limit="1"
          :auto-upload="false"
          :show-file-list="false"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </vue-scroll>
    <template v-slot:footer>
      <div class="tc">
        <el-button class="btn-main w100" @click="sublime">确 定</el-button>
        <el-button class="btn-default w100" @click="close">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default() {
        return {
          title: "",
          code: ""
        };
      }
    }
  },
  data() {
    return {
      textarea: "",
      fileList: [],
      formData: {}
    };
  },
  computed: {
    localValue: {
      get() {
        return this.visible; // 从 prop 获取值
      },
      set(newValue) {
        this.$emit("update:visible", newValue); // 当本地值改变时，通知父组件更新 prop 的值
      }
    },
    accept() {
      if (this.dialogData.title.includes("证书")) {
        return ".cer,.crt,.pem";
      } else if (this.dialogData.title.includes("密钥")) {
        return ".key";
      } else {
        return ".ovpn";
      }
    }
  },
  methods: {
    open() {
      this.textarea = "";
    },
    close() {
      this.$emit("saveData", this.formData);
    },
    handleChange(file) {
      let that = this;
      const reader = new FileReader();
      reader.onload = function (evt) {
        let str = evt.target.result;
        if (that.dialogData.title == "导入配置") {
          //获取证书密钥字段
          that.formData.clientKey = that.getStr(str, "<key>", "</key>");
          that.formData.clientCert = that.getStr(str, "<cert>", "</cert>");
          that.formData.ca = that.getStr(str, "<ca>", "</ca>");
          that.formData.tlsAuth = that.getStr(str, "<tls-auth>", "</tls-auth>");
          //获取IP端口协议字段
          const regex =
            /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s+\d{1,5}\b/;
          let linkstr = str.match(regex);
          that.formData.serverIp = linkstr[0].split(" ")[0];
          that.formData.serverPort = linkstr[0].split(" ")[1];
          that.formData.proto = str.indexOf("udp") > -1 ? "udp" : "tcp";
        } else if (that.dialogData.title == "CA证书") {
          that.formData.ca = str;
        } else if (that.dialogData.title == "客户端证书") {
          that.formData.clientCert = str;
        } else if (that.dialogData.title == "客户端密钥") {
          that.formData.clientKey = str;
        } else if (that.dialogData.title == "TLS密钥") {
          that.formData.tlsAuth = str;
        }

        that.textarea = evt.target.result;
      };
      reader.readAsText(file.raw);
    },
    getStr(str, startStr, endStr) {
      const startIndex = str.indexOf(startStr) + startStr.length;
      const endIndex = str.indexOf(endStr);
      return str.slice(startIndex, endIndex);
    },
    sublime() {
      this.$emit("saveData", this.formData);
    }
  }
};
</script>

<style lang="scss" scoped>
:deep .el-dialog__body {
  padding: 0 !important;
}

.main-content {
  padding: 5px 10px;
}

:deep .el-upload {
  width: 100%;
  height: 100%;

  .el-upload-dragger {
    width: 100%;
    height: 100%;
  }
}
</style>
