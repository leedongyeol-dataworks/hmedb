<template>
  <div class="choice">
    <router-link :to="'/samplesHome'">samplesHome</router-link>
  </div>
  <router-view />
</template>
<script setup>
</script>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import "@/styles/sample/common.scss";
@import "@/styles/reset.css";

.choice {position: fixed;}
</style>
