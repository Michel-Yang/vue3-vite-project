
import service from '@/utils/service'

/** 获取历史日志列表 */
export const vpnInfo = (data?: object) => {
 
   return service.get('/api/vpninfo', data)
};

export const vpnConfig = (data?: object) => {
 
   return service.get('/api/vpnconfig', data)
};

export const setVpnconfig = (data?: object) => {
 
   return service.post('/api/vpnconfig', data)
};

export const vpnAction = (data?: object) => {
 
   return service.post('/api/vpnaction', data)
};

export const wechatConfig = (data?: object) => {
 
   return service.get('/api/wechatConfig', data)
};
export const wechatInfo = (data?: object) => {
 
   return service.get('/api/wechatInfo', data)
};

export const setWechatconfig = (data?: object) => {
 
   return service.post('/api/setWechatconfig', data)
};

export const wechatAction = (data?: object) => {
 
   return service.post('/api/wechatAction', data)
};

export const ngrokConfig = (data?: object) => {
 
   return service.get('/api/ngrokConfig', data)
};

export const ngrokInfo = (data?: object) => {
  
   return service.get('/api/ngrokInfo', data)
};
export const setNgrokconfig = (data?: object) => {
 
   return service.post('/api/setNgrokconfig', data)
};
export const ngrokAction = (data?: object) => {
 
   return service.post('/api/ngrokAction', data)
};
