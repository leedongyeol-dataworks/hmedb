<template>
  <div>
    <h1>Vue 3 Datepicker - Date Range Example</h1>

    <!-- 시작 날짜 선택기 -->
    <label for="from">From:</label>
    <Datepicker
      id="from"
      v-model="fromDate"
      :format="dateFormat"
      :max-date="today"
      :disabled-date="disabledStDate"
      placeholder="Select start date"
    />

    <!-- 종료 날짜 선택기 -->
    <label for="to">To:</label>
    <Datepicker
      id="to"
      v-model="toDate"
      :format="dateFormat"
      :max-date="today"
      :disabled-date="disabledEdDate"
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
import dayjs from 'dayjs';

export default {
  components: {
    Datepicker,
  },
  setup() {
    const dateFormat = 'YYYY-MM-DD'; // 날짜 포맷 설정
    const today = new Date(); // 오늘 날짜

    // 선택된 'from' 및 'to' 날짜 상태 정의
    const fromDate = ref(null);
    const toDate = ref(null);

    // 시작 날짜 비활성화 로직
    const disabledStDate = (date) => {
      return (
        dayjs(date).isAfter(dayjs()) || // 오늘 이후의 날짜는 비활성화
        dayjs(date).isBefore(dayjs().subtract(1, 'year')) // 1년 이전 날짜는 비활성화
      );
    };

    // 종료 날짜 비활성화 로직
    const disabledEdDate = (date) => {
      return (
        dayjs(date).isAfter(dayjs()) || // 오늘 이후의 날짜는 비활성화
        (fromDate.value && dayjs(date).isBefore(fromDate.value)) // 시작 날짜 이전 날짜 비활성화
      );
    };

    return {
      fromDate,
      toDate,
      dateFormat,
      today, // 최대 날짜로 오늘 날짜 설정
      disabledStDate, // disabled-date 로직을 setup 함수 내에서 반환
      disabledEdDate, // disabled-date 로직을 setup 함수 내에서 반환
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
