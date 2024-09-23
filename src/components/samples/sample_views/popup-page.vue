<template>
    <div>
      <p>Popup is {{ globalPopup ? 'Open' : 'Closed' }}</p>
      <button @click="togglePopup">Toggle Popup from Child</button>
      <br>
      {{globalPopup}}globalPopup
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