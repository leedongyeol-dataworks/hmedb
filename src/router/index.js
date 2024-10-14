import { createRouter, createWebHistory } from "vue-router"

import Dashboard_integration from "@/components/views/Dashboard_integration.vue"

// sample
import sample_Dashboard from "@/components/samples/sample_views/viewsDashboard.vue"
import sample_Settings from "@/components/samples/sample_views/viewsSettings.vue"
import sample_Menu1 from "@/components/samples/sample_views/vuex-1.vue"
import sample_Menu2 from "@/components/samples/sample_views/vuex-2.vue"
import sample_TimeBar from "@/components/samples/sample_views/high-TimeBar.vue"
import sample_Menu4 from "@/components/samples/sample_views/sort-layout.vue"
import sample_Menu5 from "@/components/samples/sample_views/el-datepicker.vue"
import sample_Menu6 from "@/components/samples/sample_views/dashboard-chart.vue"
import sample_Menu7 from "@/components/samples/sample_views/ag-table.vue"
import sample_Menu8 from "@/components/samples/sample_views/tree-queryplan.vue"
import sample_Menu9 from "@/components/samples/sample_views/popup-page.vue"
import sample_Sub1 from "@/components/samples/sample_views/viewsSub1.vue"
import sample_Sub2 from "@/components/samples/sample_views/viewsSub2.vue"
import sample_samplesHome from "@/components/samples/samplesHome.vue"

const routes = [
  { path: "/integration", name: "integration", component: Dashboard_integration },
  { path: "/samplesHome", name: "samplesHome",component: sample_samplesHome,
    children: [
      { path: "/board", name: "board", component: sample_Dashboard },
      { path: "/viewsSettings", name: "viewsSettings", component: sample_Settings },
      { path: "/VUEX-1", name: "viewsMenu1", component: sample_Menu1 },
      { path: "/VUEX-2", name: "viewsMenu2", component: sample_Menu2 },
      { path: "/TIMEBAR", name: "TimeBar", component: sample_TimeBar },
      { path: "/LAYOUT", name: "viewsMenu4", component: sample_Menu4 },
      { path: "/DATEPICKER", name: "viewsMenu5", component: sample_Menu5 },
      { path: "/CHART", name: "viewsMenu6", component: sample_Menu6 },
      { path: "/TABLE", name: "viewsMenu7", component: sample_Menu7 },
      { path: "/QueryPlan", name: "viewsMenu8", component: sample_Menu8 },
      { path: "/popup", name: "viewsMenu9", component: sample_Menu9 },
      { path: "/popupPage1", name: "popupPage1", props: {content: '데이터1'}, component: {popupDiv: () => import('@/components/samples/views/popup/popup-page1.vue')} },
      { path: "/popupPage2", name: "popupPage2", props: {content: '데이터2'}, component: {popupDiv: () => import('@/components/samples/views/popup/popup-page2.vue')} },
      { path: "/SUB1", name: "viewsSub1", component: sample_Sub1 },
      { path: "/SUB2", name: "viewsSub2", component: sample_Sub2 },
    ] 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
