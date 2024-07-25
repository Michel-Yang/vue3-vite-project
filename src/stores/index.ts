import { defineStore, createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const userStore = defineStore('user', {
  state: () => {
    return { userInfo: {} }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    setUserInfo(data: any) {
      this.userInfo = data
    }
  }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
