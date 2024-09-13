<template>
  <div>
    <h1>Vue 3 Datepicker - Date Range Example</h1>

    <!-- 시작 날짜 선택기 -->
    <label for="from">From:</label>
    <Datepicker
      id="from"
      v-model="fromDate"
      :format="dateFormat"
      :disabled-dates="disableFutureDates"
      :to="toDate"
      placeholder="Select start date"
    />

    <!-- 종료 날짜 선택기 -->
    <label for="to">To:</label>
    <Datepicker
      id="to"
      v-model="toDate"
      :format="dateFormat"
      :disabled-dates="disableFutureDates"
      :from="fromDate"
      placeholder="Select end date"
    />

    <!-- 선택된 날짜 출력 -->
    <p>From: {{ fromDate }}</p>
    <p>To: {{ toDate }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import Datepicker from 'vue3-datepicker';

export default {
  components: {
    Datepicker,
  },
  setup() {
    const dateFormat = 'yyyy-MM-dd'; // 날짜 포맷 설정

    // 오늘 날짜까지만 허용
    const today = new Date();
    const disableFutureDates = { to: today, from: null }; // 미래 날짜 비활성화

    // 선택된 'from' 및 'to' 날짜 상태 정의
    const fromDate = ref(null);
    const toDate = ref(null);

    return {
      fromDate,
      toDate,
      dateFormat,
      disableFutureDates,
    };
  },
};
</script>

<style>
/* 선택기 스타일 추가 */
.datepicker-input {
  width: 200px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
