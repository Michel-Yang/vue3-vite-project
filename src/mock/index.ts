import type { MockMethod } from 'vite-plugin-mock'

const arr: any = []
for (let index = 0; index < 20; index++) {
  arr.push({
    customer_name: 'wade',
    status_text: '登录成功',
    os: 'Windows 10',
    browser: 'Chrome(99.0.4844.51)',
    ip: '192.168.9.110',
    created: '2021-12-14 10:41:02',
    location: '局域网 局域网'
  })
}

const logList = {
  total: 31,
  page: 1,
  page_size: 20,
  list: arr
}

const statusList = {
  data: [
    { label: '全部', value: 0 },
    { label: '待审核', value: 1 }
  ]
}

export default [
  {
    url: '/mock/api/login',
    method: 'post',
    response: () => {
      return {
        code: 1,
        data: {
          token: 'xxxxx',
          id: 1,
          name: 'admin',
          sex: 1,
          email: 'admin@admin.com',
          phone: '13800138000',
          role: 1,
          status: 1,
          created: '2021-12-14 10:41:02',
          updated: '2021-12-14 10:41:02'
        },
        message: '登录成功'
      }
    }
  },
  {
    url: '/mock/api/getStatusList',
    method: 'get',
    response: () => {
      return statusList
    }
  }
] as MockMethod[]
