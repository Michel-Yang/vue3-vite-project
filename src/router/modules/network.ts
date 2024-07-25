// import { $t } from "@/plugins/i18n";

export default {
  path: "/network",
  redirect: "/network/vpn",
  meta: {
    icon: "ri:bar-chart-line",
    title: "网络管理",
    rank: 8
  },
  children: [
    {
      path: "/network/vpn",
      name: "vpn",
      component: () => import("@/views/inner/networkManagement/vpn/Index.vue"),
      meta: {
        icon: "",
        title: "VPN配置"
      }
    },
    {
      path: "/network/wechat",
      name: "wechat",
      component: () =>
        import("@/views/inner/networkManagement/wechat/Index.vue"),
      meta: {
        icon: "",
        title: "微信管理"
      }
    },
    {
      path: "/network/ngrok",
      name: "ngrok",
      component: () =>
        import("@/views/inner/networkManagement/ngrok/Index.vue"),
      meta: {
        icon: "",
        // showLink: false,
        title: "Ngrok管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
