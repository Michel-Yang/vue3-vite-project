import { $t } from "@/plugins/i18n";

export default {
  path: "/inner",
  redirect: "/inner/systemLog",
  meta: {
    icon: "ri:information-line",
    // showLink: false,
    title: $t("menus.logManage"),
    rank: 9
  },
  children: [
    {
      path: "/inner/systemLog",
      name: "403",
      component: () =>
        import("@/views/inner/systemManagement/systemLog/index.vue"),
      meta: {
        title: $t("menus.logManage")
      }
    }
  ]
} satisfies RouteConfigsTable;
