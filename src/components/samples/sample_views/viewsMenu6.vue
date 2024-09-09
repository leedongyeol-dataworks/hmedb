<template>
  <div>
    <h2>CONFIG</h2>
    <p>여기는 메뉴4의 페이지입니다.</p>
  </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
  methods: {
    ...mapActions(["initGlobalConfig", "updateGlobalTitle"]),
  },
  mounted() {
    this.initGlobalConfig()
    this.updateGlobalTitle("CONFIG")
  },
}
</script>
