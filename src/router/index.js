import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "@/components/samples/sample_views/viewsDashboard.vue"
import Settings from "@/components/samples/sample_views/viewsSettings.vue"
import Menu1 from "@/components/samples/sample_views/viewsMenu1.vue"
import Menu2 from "@/components/samples/sample_views/viewsMenu2.vue"
import Menu3 from "@/components/samples/sample_views/viewsMenu3.vue"
import Menu4 from "@/components/samples/sample_views/viewsMenu4.vue"
import Menu5 from "@/components/samples/sample_views/viewsMenu5.vue"
import Menu6 from "@/components/samples/sample_views/viewsMenu6.vue"
import Menu7 from "@/components/samples/sample_views/viewsMenu7.vue"
import Sub1 from "@/components/samples/sample_views/viewsSub1.vue"
import Sub2 from "@/components/samples/sample_views/viewsSub2.vue"
import samplesHome from "@/components/samples/samplesHome.vue"

const routes = [
  { path: "/board", name: "board", component: Dashboard },
  { path: "/viewsSettings", name: "viewsSettings", component: Settings },
  { path: "/TIMELINE", name: "viewsMenu1", component: Menu1 },
  { path: "/OPERRATION", name: "viewsMenu2", component: Menu2 },
  { path: "/SERACH", name: "viewsMenu3", component: Menu3 },
  { path: "/REPORT", name: "viewsMenu4", component: Menu4 },
  { path: "/ALERT", name: "viewsMenu5", component: Menu5 },
  { path: "/CONFIG", name: "viewsMenu6", component: Menu6 },
  { path: "/SETTING", name: "viewsMenu7", component: Menu7 },
  { path: "/SUB1", name: "viewsSub1", component: Sub1 },
  { path: "/SUB2", name: "viewsSub2", component: Sub2 },
  { path: "/samplesHome", name: "samplesHome", 
    children: [
      { path: "/board", name: "board", component: Dashboard },
      { path: "/viewsSettings", name: "viewsSettings", component: Settings },
      { path: "/VUEX-1", name: "viewsMenu1", component: Menu1 },
      { path: "/VUEX-2", name: "viewsMenu2", component: Menu2 },
      { path: "/CHART", name: "viewsMenu3", component: Menu3 },
      { path: "/REPORT", name: "viewsMenu4", component: Menu4 },
      { path: "/ALERT", name: "viewsMenu5", component: Menu5 },
      { path: "/CONFIG", name: "viewsMenu6", component: Menu6 },
      { path: "/SETTING", name: "viewsMenu7", component: Menu7 },
      { path: "/SUB1", name: "viewsSub1", component: Sub1 },
      { path: "/SUB2", name: "viewsSub2", component: Sub2 },],component: samplesHome },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
