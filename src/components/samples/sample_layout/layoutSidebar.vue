<template>
  <div :class="{ active: sidebarFull }">
    <nav>
      <ul class="bar">
        <li class="bar_icon_wrap">
          <RouterLink :to="{ name: 'board' }">home</RouterLink>
          <span class="xi-hamburger-back" @click="toggleSidebar"> </span>
        </li>
        <template v-for="(menu, index) in menuState" :key="index">
          <li v-if="menu.favorite || sidebarFull">
            <router-link :to="`/${menu.name}`" :class="menu.icon">{{
              menu.name
            }}</router-link
            ><span
              class="xi-star-o"
              :class="{ active: menu.favorite }"
              @click="menu.favorite = !menu.favorite"
            ></span>
            <ul class="sub">
              <template v-for="sub in menu.children" :key="sub">
                <li v-if="sidebarFull || sub.favorite || menu.favorite">
                  <router-link :to="`/${menu.name}`">{{
                    sub.name
                  }}</router-link>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
      <div class="server_list">
        <span
          ><i class="xi-server"></i>
          <p>SERVER LIST</p></span
        >
        <ul>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li style="color: red">* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
          <li>* 192.168.10.204 /edb</li>
        </ul>
      </div>
      <ul class="favorites">
        <li>
          <button class="xi-apps" @click="sidebarFullToggle()"></button>
        </li>
        <li class="btn_wrap settingBtn">
          <button
            class="xi-library-add"
            @click="fullGroupSettingToggle"
          ></button>
          <ul class="group_setting_wrap" v-if="fullGroupSettingState">
            <li
              v-for="(item, index) in getGlobalDataState"
              :key="index"
              @click="selectGroupBtn(index)"
              :class="{ active: selectGroup === index }"
            >
              <strong>{{ item.title }}</strong>
              <ul v-if="selectGroup === index">
                <li>
                  <span v-for="(v, num) in dataAllOption" :key="num">
                    <input
                      type="checkbox"
                      :value="v"
                      :id="`${item.title}${v}`"
                      :checked="isChecked(v, item.child)"
                      @change="toggleOption(v, item.title)"
                    />
                    <label :for="`${item.title}${v}`">{{ v }}</label>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"

export default {
  name: "layoutSidebar",
  props: {
    sideState: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getGlobalDataState"]),
  },
  data() {
    return {
      fullGroupSettingState: false,
      selectGroup: 0,
      sidebarFull: false,
      dataAllOption: [
        "BDW",
        "TR2",
        "HCT",
        "HMJCLOUD",
        "MTE",
        "NIS",
        "PDF",
        "PFD",
        "STE",
      ],
      menuState: [
        {
          name: "VUEX-1",
          favorite: true,
          icon: "xi-time",
        },
        {
          name: "VUEX-2",
          favorite: true,
          icon: "xi-equalizer",
          children: [
            {
              name: "SUB1",
              favorite: true,
            },
            {
              name: "SUB2",
              favorite: true,
            },
          ],
        },
        {
          name: "CHART",
          favorite: true,
          icon: "xi-search",
        },
        {
          name: "REPORT",
          favorite: true,
          icon: "xi-paper",
        },
        {
          name: "ALERT",
          favorite: true,
          icon: "xi-volume-up",
        },
        {
          name: "CONFIG",
          favorite: true,
          icon: "xi-view-carousel",
        },
        {
          name: "SETTING",
          favorite: true,
          icon: "xi-cog",
        },
      ],
    }
  },
  methods: {
    ...mapMutations(["updateChildUsedStatus"]),
    fullGroupSettingToggle() {
      this.fullGroupSettingState = !this.fullGroupSettingState
    },
    isChecked(option, children) {
      // 현재 그룹의 child에 해당 option이 있고, used가 true인지 확인
      const child = children.find((child) => child.name === option)
      return child ? child.used : false
    },
    toggleOption(name, groupTitle) {
      // Vuex Mutation을 호출하여 상태를 업데이트
      this.updateChildUsedStatus({ childName: name, groupTitle })
    },
    toggleSidebar() {
      this.$emit("sideToggle")
    },
    sidebarFullToggle() {
      this.sidebarFull = !this.sidebarFull
    },
    selectGroupBtn(index) {
      this.selectGroup = index
    },
  },
}
</script>
