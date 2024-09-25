import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "@/components/samples/sample_views/viewsDashboard.vue"
import Settings from "@/components/samples/sample_views/viewsSettings.vue"
import Menu1 from "@/components/samples/sample_views/vuex-1.vue"
import Menu2 from "@/components/samples/sample_views/vuex-2.vue"
import TimeBar from "@/components/samples/sample_views/high-TimeBar.vue"
import Menu4 from "@/components/samples/sample_views/sort-layout.vue"
import Menu5 from "@/components/samples/sample_views/el-datepicker.vue"
import Menu6 from "@/components/samples/sample_views/dashboard-chart.vue"
import Menu7 from "@/components/samples/sample_views/ag-table.vue"
import Menu8 from "@/components/samples/sample_views/tree-queryplan.vue"
import Menu9 from "@/components/samples/sample_views/popup-page.vue"
import Sub1 from "@/components/samples/sample_views/viewsSub1.vue"
import Sub2 from "@/components/samples/sample_views/viewsSub2.vue"
import samplesHome from "@/components/samples/samplesHome.vue"

const routes = [
  { path: "/board", name: "board", component: Dashboard },
  { path: "/viewsSettings", name: "viewsSettings", component: Settings },
  { path: "/TIMELINE", name: "viewsMenu1", component: Menu1 },
  { path: "/OPERRATION", name: "viewsMenu2", component: Menu2 },
  { path: "/SERACH", name: "viewsMenu3", component: TimeBar },
  { path: "/REPORT", name: "viewsMenu4", component: Menu4 },
  { path: "/ALERT", name: "viewsMenu5", component: Menu5 },
  { path: "/CONFIG", name: "viewsMenu6", component: Menu6 },
  { path: "/SETTING", name: "viewsMenu7", component: Menu7 },
  { path: "/SUB1", name: "viewsSub1", component: Sub1 },
  { path: "/SUB2", name: "viewsSub2", component: Sub2 },
  { path: "/samplesHome", name: "samplesHome",component: samplesHome,
    children: [
      { path: "/board", name: "board", component: Dashboard },
      { path: "/viewsSettings", name: "viewsSettings", component: Settings },
      { path: "/VUEX-1", name: "viewsMenu1", component: Menu1 },
      { path: "/VUEX-2", name: "viewsMenu2", component: Menu2 },
      { path: "/TIMEBAR", name: "TimeBar", component: TimeBar },
      { path: "/LAYOUT", name: "viewsMenu4", component: Menu4 },
      { path: "/DATEPICKER", name: "viewsMenu5", component: Menu5 },
      { path: "/CHART", name: "viewsMenu6", component: Menu6 },
      { path: "/TABLE", name: "viewsMenu7", component: Menu7 },
      { path: "/QueryPlan", name: "viewsMenu8", component: Menu8 },
      { path: "/popup", name: "viewsMenu9", component: Menu9 },
      { path: "/popupPage1", name: "popupPage1", props: {content: '데이터1'}, component: {popupDiv: () => import('@/components/views/popup/popup-page1.vue')} },
      { path: "/popupPage2", name: "popupPage2", props: {content: '데이터2'}, component: {popupDiv: () => import('@/components/views/popup/popup-page2.vue')} },
      { path: "/SUB1", name: "viewsSub1", component: Sub1 },
      { path: "/SUB2", name: "viewsSub2", component: Sub2 },
    ] 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
