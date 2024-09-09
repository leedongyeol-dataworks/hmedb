import Vuex from "vuex"

export default new Vuex.Store({
  state: {
    globalColor: {
      red : 10, yellow : 10, blue: 10
    },
    globalTitle: "DASHBOARD",
    globalGroupSid: "[BW]BDW",
    globalGroup: "BW",
    globalSid: "BDW",
    globalDatabase: "All",
    globalTimeFrom: "",
    globalTimeTo: "",
    globalGroupSidDisabled: false,
    globalGroupDisabled: false,
    globalSidDisabled: false,
    globalDatabaseDisabled: false,
    globalTimeFromDisabled: false,
    globalTimeToDisabled: false,
    changedTitle: "",
    changedChildName: "",
    warning: false,
    globalDataState: [
      {
        title: "BW",
        child: [
          { name: "PDF", value: 0, used: true },
          { name: "STE", value: 0, used: true },
          { name: "BDW", value: 0, used: false },
          { name: "TR2", value: 0, used: false },
          { name: "HCT", value: 0, used: false },
          { name: "HMJCLOUD", value: 0, used: false },
          { name: "MTE", value: 0, used: false },
          { name: "NIS", value: 0, used: false },
          { name: "PFD", value: 0, used: false },
        ],
      },
      {
        title: "TEST",
        child: [
          { name: "NIS", value: 0, used: true },
          { name: "MTE", value: 0, used: true },
          { name: "STE", value: 0, used: true },
          { name: "BDW", value: 0, used: false },
          { name: "TR2", value: 0, used: false },
          { name: "HCT", value: 0, used: false },
          { name: "HMJCLOUD", value: 0, used: false },
          { name: "PDF", value: 0, used: false },
          { name: "PFD", value: 0, used: false },
        ],
      },
      {
        title: "CLOUD",
        child: [
          { name: "TR2", value: 0, used: true },
          { name: "HCT", value: 0, used: true },
          { name: "BDW", value: 0, used: false },
          { name: "HMJCLOUD", value: 0, used: false },
          { name: "MTE", value: 0, used: false },
          { name: "NIS", value: 0, used: false },
          { name: "PDF", value: 0, used: false },
          { name: "PFD", value: 0, used: false },
          { name: "STE", value: 0, used: false },
        ],
      },
      {
        title: "ERP",
        child: [
          { name: "BDW", value: 0, used: true },
          { name: "PFD", value: 0, used: true },
          { name: "TR2", value: 0, used: false },
          { name: "HCT", value: 0, used: false },
          { name: "HMJCLOUD", value: 0, used: false },
          { name: "MTE", value: 0, used: false },
          { name: "NIS", value: 0, used: false },
          { name: "PDF", value: 0, used: false },
          { name: "STE", value: 0, used: false },
        ],
      },
      {
        title: "DEFAULT",
        child: [
          { name: "HMJCLOUD", value: 0, used: true },
          { name: "PFD", value: 0, used: true },
          { name: "BDW", value: 0, used: false },
          { name: "TR2", value: 0, used: false },
          { name: "HCT", value: 0, used: false },
          { name: "MTE", value: 0, used: false },
          { name: "NIS", value: 0, used: false },
          { name: "PDF", value: 0, used: false },
          { name: "STE", value: 0, used: false },
        ],
      },
    ],
  },
  mutations: {
    colorCount(state, color) {
      if(color in state.globalColor) {
        state.globalColor[color] += 1;
      }
    },
    setGlobalTitle(state, title) {
      state.globalTitle = title
    },
    setGlobalGroupSid(state, value) {
      state.globalGroupSid = value
    },
    setGlobalGroup(state, value) {
      state.globalGroup = value
    },
    setGlobalSid(state, value) {
      state.globalSid = value
    },
    setGlobalDatabase(state, value) {
      state.globalDatabase = value
    },
    setGlobalColor(state, value) {
      state.globalColor = value
    },
    setGlobalTimeFrom(state, value) {
      state.globalTimeFrom = value
    },
    setGlobalTimeTo(state, value) {
      state.globalTimeTo = value
    },
    setGlobalGroupSidDisabled(state, value) {
      state.globalGroupSidDisabled = value
    },
    setGlobalGroupDisabled(state, value) {
      state.globalGroupDisabled = value
    },
    setGlobalSidDisabled(state, value) {
      state.globalSidDisabled = value
    },
    setGlobalDatabaseDisabled(state, value) {
      state.globalDatabaseDisabled = value
    },
    setGlobalTimeFromDisabled(state, value) {
      state.globalTimeFromDisabled = value
    },
    setGlobalTimeToDisabled(state, value) {
      state.globalTimeToDisabled = value
    },
    setGlobalDataState(state, value) {
      state.globalDataState = value
    },
    resetGlobalCommon(state) {
      state.globalGroupSidDisabled = true
      state.globalGroupDisabled = false
      state.globalSidDisabled = false
      state.globalDatabaseDisabled = false
      state.globalTimeFromDisabled = false
      state.globalTimeToDisabled = false
    },
    resetGlobalDashboard(state) {
      state.globalGroupSidDisabled = true
      state.globalGroupDisabled = false
      state.globalSidDisabled = false
      state.globalDatabaseDisabled = false
      state.globalTimeFromDisabled = true
      state.globalTimeToDisabled = true
    },
    resetGlobalTimeline(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = false
      state.globalTimeFromDisabled = false
      state.globalTimeToDisabled = false
    },
    resetGlobalOperation(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = false
      state.globalTimeFromDisabled = false
      state.globalTimeToDisabled = false
    },
    resetGlobalSearch(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = false
      state.globalTimeFromDisabled = false
      state.globalTimeToDisabled = false
    },
    resetGlobalReport(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = true
      state.globalTimeFromDisabled = true
      state.globalTimeToDisabled = true
    },
    resetGlobalAlert(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = true
      state.globalTimeFromDisabled = true
      state.globalTimeToDisabled = true
    },
    resetGlobalConfig(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = true
      state.globalTimeFromDisabled = true
      state.globalTimeToDisabled = true
    },
    resetGlobalSetting(state) {
      state.globalGroupSidDisabled = false
      state.globalGroupDisabled = true
      state.globalSidDisabled = true
      state.globalDatabaseDisabled = true
      state.globalTimeFromDisabled = true
      state.globalTimeToDisabled = true
    },
    updateRandomChildValue(state, groupTitle) {
      // 특정 그룹을 찾습니다.
      const group = state.globalDataState.find(
        (group) => group.title === groupTitle
      )

      if (group) {
        // 그룹의 child 중 하나를 랜덤으로 선택합니다.
        const randomIndex = Math.floor(Math.random() * group.child.length)
        group.child[randomIndex].value = 90 // 선택한 child의 value를 90으로 설정합니다.
        state.changedTitle = groupTitle
        state.changedChildName = group.child[randomIndex].name
        state.warning = true
      }
    },
    updateChildUsedStatus(state, { childName, groupTitle }) {
      // 특정 그룹을 찾습니다.
      const group = state.globalDataState.find(
        (group) => group.title === groupTitle
      )
      if (group) {
        // 해당 그룹의 child 중 일치하는 항목을 찾습니다.
        const child = group.child.find((item) => item.name === childName)
        if (child) {
          // used 값을 토글합니다.
          child.used = !child.used
        }
      }
    },
  },
  actions: {
    updateGlobalTitle({ commit }, title) {
      commit("setGlobalTitle", title)
    },
    updateGlobalGroupSid({ commit }, value) {
      commit("setGlobalGroupSid", value)
    },
    updateGlobalGroup({ commit }, value) {
      commit("setGlobalGroup", value)
    },
    updateGlobalSid({ commit }, value) {
      commit("setGlobalSid", value)
    },
    updateGlobalDatabase({ commit }, value) {
      commit("setGlobalDatabase", value)
    },
    updateGlobalColor({ commit }, value) {
      commit("setGlobalColor", value)
    },
    updateGlobalTimeFrom({ commit }, value) {
      commit("setGlobalTimeFrom", value)
    },
    updateGlobalTimeTo({ commit }, value) {
      commit("setGlobalTimeTo", value)
    },
    updateGlobalDataState({ commit }, value) {
      commit("setlobalDataState", value)
    },
    updateGlobalGroupSidDisabled({ commit }, value) {
      commit("setGlobalGroupSidDisabled", value)
    },
    updateGlobalGroupDisabled({ commit }, value) {
      commit("setGlobalGroupDisabled", value)
    },
    updateGlobalSidDisabled({ commit }, value) {
      commit("setGlobalSidDisabled", value)
    },
    updateGlobalTimeFromDisabled({ commit }, value) {
      commit("setGlobalTimeFromDisabled", value)
    },
    updateGlobalTimeToDisabled({ commit }, value) {
      commit("setGlobalTimeToDisabled", value)
    },
    initGlobalCommon({ commit }) {
      commit("resetGlobalCommon")
    },
    initGlobalDashboard({ commit }) {
      commit("resetGlobalDashboard")
    },
    initGlobalTimeline({ commit }) {
      commit("resetGlobalTimeline")
    },
    initGlobalOperation({ commit }) {
      commit("resetGlobalOperation")
    },
    initGlobalSearch({ commit }) {
      commit("resetGlobalSearch")
    },
    initGlobalAlert({ commit }) {
      commit("resetGlobalAlert")
    },
    initGlobalConfig({ commit }) {
      commit("resetGlobalConfig")
    },
    initGlobalReport({ commit }) {
      commit("resetGlobalReport")
    },
    initGlobalSetting({ commit }) {
      commit("resetGlobalSetting")
    },
    updateChildUsedStatus({ commit }, payload) {
      commit("updateChildUsedStatus", payload)
    },
  },
  getters: {
    getGlobalTitle: (state) => state.globalTitle,
    getGlobalGroupSid: (state) => state.globalGroupSid,
    getGlobalGroup: (state) => state.globalGroup,
    getGlobalSid: (state) => state.globalSid,
    getGlobalDatabase: (state) => state.globalDatabase,
    getGlobalColor: (state) => state.globalColor,
    getGlobalTimeFrom: (state) => state.globalTimeFrom,
    getGlobalTimeTo: (state) => state.globalTimeTo,
    getGlobalDataState: (state) => state.globalDataState,
    getGlobalGroupDisabled: (state) => state.globalGroupDisabled,
    getGlobalSidDisabled: (state) => state.globalSidDisabled,
    getGlobalDatabaseDisabled: (state) => state.globalDatabaseDisabled,
    getGlobalTimeFromDisabled: (state) => state.globalTimeFromDisabled,
    getGlobalTimeToDisabled: (state) => state.globalTimeToDisabled,
    getChangedTitle: (state) => state.changedTitle,
    getChangedChildName: (state) => state.changedChildName,
    getWarning: (state) => state.warning,
  },
})
