<template>
  <div>
    <p>Popup is {{ globalPopup ? 'Open' : 'Closed' }}</p>
    <button @click="togglePopup">Toggle Popup from Child</button>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <!-- 메뉴에서 항목을 클릭할 때마다 데이터를 전달 -->
    <button @click="showPopup('데이터 1', popupPage1)">메뉴 1</button>
    <br>
    <button @click="showPopup('데이터 2', popupPage2)">메뉴 2</button>
    <br>
    <button @click="showPopup('데이터 3')">메뉴 3</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, 
  // ref 컴포넌트 방식
 } from 'vue';
import popupPage1 from '@/components/samples/views/popup/popup-page1.vue';
import popupPage2 from '@/components/samples/views/popup/popup-page2.vue';
// const currentPopupComponent = ref(popupPage1);
  
const store = useStore();
const globalPopup = computed(() => store.getters.globalPopup);

// Default content for the popup

// Function to toggle the popup visibility
const togglePopup = () => {
  store.dispatch('togglePopup', true);
};
const showPopup = (content, from) => {
  togglePopup()
  store.dispatch('setPopupContent', { content, from });
};

// Example function to switch content dynamically
// const switchToPage2 = () => {
//   currentPopupComponent.value = popupPage2;
// };
  </script>