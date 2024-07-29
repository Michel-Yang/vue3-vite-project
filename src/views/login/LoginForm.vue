<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/login'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores'

const router = useRouter()

const loginForm = ref({
  username: 'admin',
  password: '12345'
})

const user = userStore()
const handleLogin = async () => {
  const res = await loginApi.login(loginForm.value)
  if (res.code === 1) {
    localStorage.setItem('token', res.data.token)
    user.setUserInfo(res.data)
    ElMessage({
      message: res.message,
      type: 'success'
    })
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }

  router.push('/inner')
}
</script>
<template>
  <div class="login">
    <img src="@/assets/images/logo.png" class="logo" />
    <div class="login-form">
      <el-form ref="form" :model="loginForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" size="large">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/login.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  .logo {
    width: 300px;
    margin-top: 100px;
    margin-left: 100px;
  }

  .login-form {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    position: absolute;
    box-shadow: 0 2px 25px 0 rgb(0 17 78 / 8%);
    right: 100px;
    top: 50%;
    h1 {
      margin-top: 50px;
      font-size: 30px;
      color: #333;
      margin: 20px 0;
    }
  }
}
</style>
