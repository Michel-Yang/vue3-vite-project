import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const baseURL = import.meta.env.VITE_APP_BASE_URL

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})
const router = useRouter()

service.defaults.headers.post['Content-Type'] = 'application/json'

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
  },
  (error) => {
    if (error.response.status === 401) {
      // TODO: handle unauthorized error
      ElMessage({
        message: '401:登录状态失效，请重新登录',
        type: 'error'
      })
      router.push('/login')
      
    } else if (error.response.status === 403) {
       // TODO: handle forbidden error
      ElMessage({
        message: '403:登录已过期, 重新登录中',
        type: 'error'
      })
      router.push('/login')
     
    } else if (error.response.status === 404) {
       // TODO: handle not found error
      ElMessage({
        message: '404:网络请求不存在',
        type: 'error'
      })
     
    } else if (error.response.status === 500) {
      // TODO: handle server error
      ElMessage({
        message: '500: 服务器内部错误',
        type: 'error'
      })
      
    } else {
      // TODO: handle other error
      return Promise.reject(error)
    }
  }
)

export default service
