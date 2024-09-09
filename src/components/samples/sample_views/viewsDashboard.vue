<template>
  <div>
    <h2>Dashboard</h2>
    <p>대쉬보드에선 글로벌 time을 사용하지 않습니다</p>
  </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
  methods: {
    ...mapActions(["initGlobalDashboard", "updateGlobalTitle"]),
  },
  mounted() {
    this.initGlobalDashboard()
    this.updateGlobalTitle("DASHBOARD")
  },
}
</script>
