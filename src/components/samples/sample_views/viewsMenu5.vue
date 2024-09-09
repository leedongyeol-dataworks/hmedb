<template>
  <div>
    <h2>ALERT</h2>
    <p>여기는 메뉴5의 페이지입니다.</p>
  </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
  methods: {
    ...mapActions(["initGlobalAlert", "updateGlobalTitle"]),
  },
  mounted() {
    this.initGlobalAlert()
    this.updateGlobalTitle("ALERT")
  },
}
</script>
