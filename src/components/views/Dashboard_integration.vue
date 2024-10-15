<template>
    <div class="warp" :class="{ active: sideState }">
      <layoutSidebar
        class="sidebar"
        @sideToggle="sideToggle"
      ></layoutSidebar>
      <div class="layout">
        <layoutHeader />
        <main>
          <router-view />
        </main>
      </div>
    </div>
</template>
<script setup>
import layoutSidebar from '../layout/layoutSidebar.vue';
import layoutHeader from '../layout/layoutHeader.vue';
</script>
<script>
export default {
  data() {
    return {
      sideState: true,
    }
  },
  methods: {
    sideToggle() {
      this.sideState = !this.sideState
    },
  },
}
</script>

<style lang="scss">
</style>