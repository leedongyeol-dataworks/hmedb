<template>
  <div class="choice">
    <router-link :to="'/samplesHome'">samplesHome</router-link>
    <router-link :to="'/integration'">Home</router-link>
  </div>
  <router-view />
  <popup-window> <!-- 팝업 창 -->
    <component :is="popupFrom" :content="popupContent"/>
  </popup-window>
</template>
<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import popupWindow from './components/samples/views/popup-window.vue';

const store = useStore();
const popupFrom = computed(() => store.getters.popupFrom); // 동적으로 렌더링할 컴포넌트
const popupContent = computed(() => store.getters.popupContent); // 팝업의 내용
</script>
<script>

export default {
  mounted() {
    
  }
}
</script>
<style lang="scss">
@import "@/styles/sample/common.scss";
@import "@/styles/reset.css";

.choice {position: fixed; display: flex; width: 150px; justify-content: space-between;
  top: 2remw; right: 50%;
}
</style>
