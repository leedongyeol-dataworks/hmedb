<template>
  <header class="header">
    <div class="nav_title">
      <h1
        ref="title"
        :class="{ wait: sub[0].name === globalTitle && activeIndex }"
      >
        {{ globalTitle }}
      </h1>
      <ul class="sub_list" v-if="sub[0].name === globalTitle">
        <li
          v-for="(item, index) in sub[0].list"
          :key="index"
          :class="{ active: activeIndex === index }"
          @click="toggleActive(index)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="count">
        <li>red : {{ globalColor.red }}</li>
        <li>yellow : {{ globalColor.yellow }}</li>
        <li>blue : {{ globalColor.blue }}</li>
      </ul>
    </div>
    <!-- <div
      class="alert_nav state"
      :class="{ active: alertState, warning: warning }"
    >
      <ul class="troble_state_board" @click="alert_toggle">
        <li><span></span>state : BW / BDW</li>
        <li><span></span>state : BW / PFD</li>
        <li><span></span>state : BW / PDF</li>
      </ul>
      <ul class="trouble_list">
        <li :class="{ check: isChecked }">
          <span @click="changeGroupSid(changedTitle, changedChildName)">
            {{ changedTitle }}
            /
            {{ changedChildName }}</span
          >
          <i class="xi-check" @click="trouble_toggle"></i>
        </li>
      </ul>
    </div> -->
    <div
      class="alert_nav"
      :class="{ active: alertState, warning: warning }"
      v-if="alertState || warning"
    >
      <ul class="troble_state_board" @click="alert_toggle">
        <li @click="highTabSubmit">
          <span></span>high_trouble : {{ highSum.length }}
        </li>
        <li @click="mediumTabSubmit" class="medium">
          <span></span>medium_trouble :
          {{ mediumSum.length }}
        </li>
      </ul>
      <ul class="trouble_list">
        <li :class="{ check: isChecked }">
          <span @click="changeGroupSid(changedTitle, changedChildName)">
            {{ changedTitle }}
            /
            {{ changedChildName }}</span
          >
          <i class="xi-check" @click="trouble_toggle"></i>
        </li>
      </ul>
    </div>
    <!-- 탭스타일 -->
    <div class="alert_wrap">
      <ul>
        <li>
          <ul>
            <li
              v-for="item in highTab"
              :key="item.name"
              :class="{ close: item.closed }"
            >
              <button @click="changeGroupSid(item.title, item.name)">
                {{ item.title }} / {{ item.name }}
              </button>
              <button
                class="xi-close"
                @click="tabClose('highTab', item.name)"
              ></button>
            </li>
            <li
              v-for="item in mediumTab"
              :key="item.name"
              class="medium"
              :class="{ close: item.closed }"
            >
              <button @click="changeGroupSid(item.title, item.name)">
                {{ item.title }} / {{ item.name }}
              </button>
              <button
                class="xi-close"
                @click="tabClose('mediumTab', item.name)"
              ></button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <nav>
      <ul class="global_wrap">
        <li class="btn_wrap">
          <button class="xi-eye" @click="fullGroupMenuToggle" />
          <ul class="fullGroupMenu" :class="{ active: fullGroupMenuState }">
            <li v-for="(item, index) in getGlobalDataState" :key="index">
              <button @click="changeGroupSid(item.title, 'BDW')">
                {{ item.title }}
              </button>
              <ul v-if="item.child" class="child">
                <li v-for="child in item.child" :key="child">
                  <template v-if="child.used">
                    <button @click="changeGroupSid(item.title, child.name)">
                      {{ child.name }}
                    </button>
                    <span
                      class="value"
                      :class="getStateClass(child.value)"
                    ></span>
                  </template>
                </li>
              </ul>
            </li>
          </ul>
          <span class="value" :class="`state${pointState}`"></span>
          <button
            class="xi-close closeBtn"
            v-if="fullGroupMenuState"
            @click="fullGroupMenuToggle"
          ></button>
        </li>
        <li class="btn_wrap settingBtn">
          <button class="xi-user"></button>
        </li>
      </ul>
    </nav>
  </header>
  <nav>
    <ul class="global_wrap">
      <li :class="{ off: globalGroupSidDisabled }">
        <select v-model="globalGroupSid">
          <option value="[BW]BDW" selected>[BW]BDW</option>
          <option value="[BW]BW">[BW]PFD</option>
          <option value="[Te st]BDW">[Te st]BDW</option>
          <option value="[Te st]PFD">[Te st]PFD</option>
          <option value="[Te st]BW">[Te st]BW</option>
          <option value="[CLOUD]TR2">[CLOUD]TR2</option>
          <option value="[CLOUD]HCT">[CLOUD]HCT</option>
          <option value="[ERP]BDW">[ERP]BDW</option>
          <option value="[ERP]PFD">[ERP]PFD</option>
          <option value="[default]BDW">[default]BDW</option>
          <option value="[default]PFD">[default]PFD</option>
        </select>
      </li>
      <li :class="{ off: globalGroupDisabled }">
        <select v-model="globalGroup">
          <option value="BW" selected>BW</option>
          <option value="TEST">Te st</option>
          <option value="CLOUD">CLOUD</option>
          <option value="ERP">ERP</option>
          <option value="DEFAULT">default</option>
          <option value="NONE">None</option>
        </select>
      </li>
      <li :class="{ off: globalSidDisabled }">
        <select v-model="globalSid">
          <option value="BDW" selected>BDW</option>
          <option value="PFD">PFD</option>
          <option value="PDF">PDF</option>
          <option value="BW">BW</option>
          <option value="TR2">TR2</option>
          <option value="HCT">HCT</option>
          <option value="NIS">NIS</option>
        </select>
      </li>
      <li :class="{ off: globalDatabaseDisabled }">
        <select v-model="globalDatabase">
          <option value="All" selected>All</option>
          <option value="PFD">PFD</option>
          <option value="SYSTEMDB">SYSTEMDB</option>
        </select>
      </li>
      <li :class="{ off: globalTimeFromDisabled }">
        <input type="time" v-model="globalTimeFrom" />
      </li>
      <li :class="{ off: globalTimeToDisabled }">
        <input type="time" v-model="globalTimeTo" />
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex"
import TextScramble from "@/assets/TextScramble"

export default {
  computed: {
    ...mapGetters([
      "getGlobalTitle",
      "getGlobalGroupSid",
      "getGlobalGroup",
      "getChangedTitle",
      "getChangedChildName",
      "getGlobalSid",
      "getGlobalDatabase",
      "getGlobalTimeFrom",
      "getGlobalTimeTo",
      "getGlobalGroupSidDisabled",
      "getGlobalGroupDisabled",
      "getGlobalSidDisabled",
      "getGlobalDatabaseDisabled",
      "getGlobalTimeFromDisabled",
      "getGlobalTimeToDisabled",
      "getGlobalDataState",
      "getWarning",
    ]),
    globalDataState() {
      return this.getGlobalDataState
    },
    globalTitle() {
      return this.getGlobalTitle
    },
    globalGroupSid: {
      get() {
        return this.$store.state.globalGroupSid
      },
      set(value) {
        this.updateGlobalGroupSid(value)
      },
    },
    globalGroup: {
      get() {
        return this.$store.state.globalGroup
      },
      set(value) {
        this.updateGlobalGroup(value)
      },
    },
    globalSid: {
      get() {
        return this.$store.state.globalSid
      },
      set(value) {
        this.updateGlobalSid(value)
      },
    },
    globalDatabase: {
      get() {
        return this.$store.state.globalDatabase
      },
      set(value) {
        this.updateGlobalDatabase(value)
      },
    },
    globalColor: {
      get() {
        return this.$store.state.globalColor
      },
    },
    globalTimeFrom: {
      get() {
        return this.$store.state.globalTimeFrom
      },
      set(value) {
        this.updateGlobalTimeFrom(value)
      },
    },
    globalTimeTo: {
      get() {
        return this.$store.state.globalTimeTo
      },
      set(value) {
        this.updateGlobalTimeTo(value)
      },
    },
    globalGroupSidDisabled: {
      get() {
        return this.$store.state.globalGroupSidDisabled
      },
      set(value) {
        this.updateGlobalGroupSidDisabled(value)
      },
    },
    globalGroupDisabled: {
      get() {
        return this.$store.state.globalGroupDisabled
      },
      set(value) {
        this.updateGlobalGroupDisabled(value)
      },
    },
    globalSidDisabled: {
      get() {
        return this.$store.state.globalSidDisabled
      },
      set(value) {
        this.updateGlobalSidDisabled(value)
      },
    },
    globalDatabaseDisabled: {
      get() {
        return this.$store.state.globalDatabaseDisabled
      },
      set(value) {
        this.updateGlobalDatabaseDisabled(value)
      },
    },
    globalTimeFromDisabled: {
      get() {
        return this.$store.state.globalTimeFromDisabled
      },
      set(value) {
        this.updateGlobalTimeFromDisabled(value)
      },
    },
    globalTimeToDisabled: {
      get() {
        return this.$store.state.globalTimeToDisabled
      },
      set(value) {
        this.updateGlobalTimeToDisabled(value)
      },
    },
    highSum() {
      return this.calculateSum(61)
    },
    mediumSum() {
      return this.calculateSum(31, 61)
    },
  },
  data() {
    return {
      fullGroupMenuState: false,
      pointState: "1",
      highTrouble: [],
      mediumTrouble: [],
      highTab: [],
      mediumTab: [],
      isChecked: false,
      warning: false,
      alertState: false,
      activeIndex: null, // 클릭된 아이템의 인덱스를 저장
      isWaiting: false, // `wait` 클래스를 토글할 상태
      sub: [
        {
          name: "OPERATION",
          list: ["Parameters", "Collect Dump", "Server Log"],
        },
      ],
    }
  },
  methods: {
    ...mapActions(["changeRandomChildValue"]),
    ...mapMutations({
      updateGlobalGroupSid: "setGlobalGroupSid",
      updateGlobalGroup: "setGlobalGroup",
      updateGlobalSid: "setGlobalSid",
      updateGlobalDatabase: "setGlobalDatabase",
      updateGlobalTimeFrom: "setGlobalTimeFrom",
      updateGlobalTimeTo: "setGlobalTimeTo",
      updateGlobalGroupSidDisabled: "setGlobalGroupSidDisabled",
      updateGlobalGroupDisabled: "setGlobalGroupDisabled",
      updateGlobalSidDisabled: "setGlobalSidDisabled",
      updateGlobalDatabaseDisabled: "setGlobalDatabaseDisabled",
      updateGlobalTimeFromDisabled: "setGlobalTimeFromDisabled",
      updateGlobalTimeToDisabled: "setGlobalTimeToDisabled",
    }),
    toggleActive(index) {
      this.activeIndex = this.activeIndex === index ? null : index
      this.isWaiting = true // `wait` 클래스 토글
    },
    alert_toggle() {
      this.alertState = !this.alertState
      this.warning = false
    },
    setRandomChildValueTo90() {
      // Vuex 액션을 호출하여 child value를 90으로 설정
      this.changeRandomChildValue()
    },
    init() {
      this.highTab = this.highSum
      this.mediumTab = this.mediumSum
    },
    getStateClass(value) {
      if (value <= 30) return "state1"
      if (value <= 60) return "state2"
      return "state3"
    },
    fullGroupMenuToggle() {
      this.fullGroupMenuState = !this.fullGroupMenuState
    },
    calculateSum(minValue, maxValue = Infinity) {
      let handle = []
      this.globalDataState.forEach((group) => {
        group.child.forEach((item) => {
          if (item.value > minValue && item.value <= maxValue) {
            handle.push({ name: item.name, title: group.title })
          }
        })
      })
      return handle
    },
    changeGroupSid(group, sid) {
      this.globalGroup = group
      this.globalSid = sid

      this.fullGroupMenuState = false
      this.$router.push({ path: "/board" })
    },
    getPointStateClass() {
      const vm = this

      this.getGlobalDataState.forEach((v) => {
        v.child.forEach((i) => {
          if (i.value > 30 && i.value < 61) {
            vm.pointState = "2"
          } else if (i.value > 60) {
            vm.pointState = "3"
            return false
          }
        })
      })
    },
    tabClose(type, name) {
      // this[type]로 접근하여 highTab 또는 mediumTab을 참조합니다.
      const tabList = this[type]

      if (tabList) {
        // 해당 배열에서 name에 해당하는 항목을 제거합니다.
        // name에 해당하는 항목의 closed 속성을 true로 설정
        const item = tabList.find((item) => item.name === name)
        if (item) {
          item.closed = true
        }
      } else {
        console.warn(`Unknown type: ${type}`)
      }
    },
    trouble_toggle() {
      // isChecked 상태를 토글하여 클래스 변경
      this.isChecked = !this.isChecked
    },
    highTabSubmit() {
      this.highTab.forEach((item) => {
        item.closed = false
      })
    },
    mediumTabSubmit() {
      this.mediumTab.forEach((item) => {
        item.closed = false
      })
    },
  },
  watch: {
    globalTitle(newTitle) {
      this.scramble.setText(newTitle)
      this.activeIndex = false
    },
    getChangedTitle(newTitle) {
      this.changedTitle = newTitle
    },
    getChangedChildName(newName) {
      this.changedChildName = newName
    },
    getWarning(newVal) {
      this.warning = newVal
    },
  },
  mounted() {
    this.scramble = new TextScramble(this.$refs.title)
    this.scramble.setText(this.globalTitle)
    this.getPointStateClass()
    this.init()
  },
}
</script>
