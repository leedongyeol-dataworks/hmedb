<template>
  <div class="popup" :class="{ show: globalPopup }">
    <div class="popup-content">
      <button @click="togglePopup">Close</button>
      <!-- Slot for the dynamic popup content -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const globalPopup = computed(() => store.getters.globalPopup);
const togglePopup = () => {
  store.dispatch('togglePopup');
};
</script>

<style scoped>
.popup {
position: fixed;
top: 0;
right: 0;
width: 50%;
height: 100vh;
background-color: white;
box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
transform: translateX(100%);
transition: all 0.3s ease-in;
}
.popup-content {
padding: 20px;
}
.show {
transform: translateX(4rem);
}
</style>
