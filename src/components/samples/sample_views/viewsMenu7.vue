<template>
  <div>
    <h2>SETTING</h2>
    <p>여기는 메뉴4의 페이지입니다.</p>
  </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
  methods: {
    ...mapActions(["initGlobalSetting", "updateGlobalTitle"]),
  },
  mounted() {
    this.initGlobalSetting()
    this.updateGlobalTitle("SETTING")
  },
}
</script>
