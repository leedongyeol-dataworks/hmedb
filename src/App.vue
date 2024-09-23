<template>
  <div class="choice">
    <router-link :to="'/samplesHome'">samplesHome</router-link>
    {{ globalPopup }}
  </div>
  <router-view />
  <popupWindow v-if="globalPopup"/>
</template>
<script setup>
import { useStore  } from 'vuex';
import popupWindow from './components/views/popup-window.vue';
import { computed } from 'vue';

const store = useStore();
const globalPopup = computed(() => store.getters.globalPopup);

</script>

<style lang="scss">
@import "@/styles/sample/common.scss";
@import "@/styles/reset.css";

.choice {position: fixed;}
</style>
