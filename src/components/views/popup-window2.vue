<template>
  <div>
    <p>Popup is {{ globalPopup ? 'Open' : 'Closed' }}</p>
    <button @click="togglePopup">Toggle Popup from Child</button>
    <br>
    <popup-window v-if="globalPopup">
      <component :is="currentPopupComponent"></component>
    </popup-window>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const globalPopup = computed(() => store.getters.globalPopup);


// Function to toggle the popup visibility
const togglePopup = () => {
store.dispatch('togglePopup');
};

// Example function to switch content dynamically
</script>