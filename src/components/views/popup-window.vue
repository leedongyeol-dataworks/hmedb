<template>
    <div class="popup" :class="{show:showPopup}">
        <div class="popup-content">
        <button @click="togglePopup">Close</button>
        <p>{{globalPopup}}</p>
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
width: 100%;
height: 100vh;
background-color: white;
box-shadow: -2px 0 5px rgba(0,0,0,0.3);
transform: translateX(100%);
transition: transform 0.3s ease-in-out;
}

.popup-content {
padding: 20px;
}

.show{
transform: translateX(0);
}
</style>
  