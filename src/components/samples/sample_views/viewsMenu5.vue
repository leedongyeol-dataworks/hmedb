<template>
  <div>
    <h1>Element Plus Datepicker - Date Range Example</h1>

    <!-- 시작 날짜 선택기 -->
    <div class="date_wrap">
      <label for="from" class="date_label">From</label>
      <el-date-picker
        v-model="fromDate"
        type="datetime"
        format="YYYY-MM-DD HH:mm"
        :disabled-date="disabledStDate"
        placeholder="Select start date"
      ></el-date-picker>

      <!-- 종료 날짜 선택기 -->
      <label for="to" class="date_label">To</label>
      <el-date-picker
        v-model="toDate"
        type="datetime"
        format="YYYY-MM-DD HH:mm"
        :disabled-date="disabledEdDate"
        placeholder="Select end date"
      ></el-date-picker>
    </div>
    <div class="date_wrap">
      <el-select
        v-model="timeOption"
        placeholder="Select time range"
        @change="setDateByOption"
      >
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-date-picker
        v-model="selectedDate"
        type="datetime"
        format="YYYY-MM-DD HH:mm"
        placeholder="Pick a date"
        :disabled-date="disabledStDate"
      >
      </el-date-picker>
    </div>

    <!-- 선택된 날짜 출력 -->
    <p>From: {{ fromDate }}</p>
    <p>To: {{ toDate }}</p>
    <p>Selected Date: {{ selectedDate }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElDatePicker } from "element-plus";
import dayjs from "dayjs";

export default {
  components: {
    ElDatePicker,
  },
  data() {
    return {
      timeOption: null,
      selectedDate: dayjs().toDate(), // 단일 달력에서 선택된 날짜
      options: [
        { value: "3hours", label: "3 Hours Ago" },
        { value: "1day", label: "1 Day Ago" },
        { value: "3days", label: "3 Days Ago" },
        { value: "1week", label: "1 Week Ago" },
        { value: "1month", label: "1 Month Ago" },
      ],
    };
  },
  methods: {
    // 셀렉트 박스 옵션에 따라 날짜 자동 설정
    setDateByOption() {
      const now = new Date();
      let newDate = new Date();

      switch (this.timeOption) {
        case "3hours":
          newDate.setHours(now.getHours() - 3);
          break;
        case "1day":
          newDate.setDate(now.getDate() - 1);
          break;
        case "3days":
          newDate.setDate(now.getDate() - 3);
          break;
        case "1week":
          newDate.setDate(now.getDate() - 7);
          break;
        case "1month":
          newDate.setMonth(now.getMonth() - 1);
          break;
      }

      this.selectedDate = newDate;
    },
  },
  setup() {
    const today = dayjs();
    const fromDate = ref(today.toDate());
    const toDate = ref(today.toDate());

    // 시작 날짜 비활성화 로직
    const disabledStDate = (time) => {
      return (
        time.getTime() > today.toDate().getTime() ||
        time.getTime() < dayjs().subtract(1, "year").toDate().getTime()
      );
    };

    // 종료 날짜 비활성화 로직
    const disabledEdDate = (time) => {
      return (
        time.getTime() > today.toDate().getTime() ||
        (fromDate.value && time.getTime() < new Date(fromDate.value).getTime())
      );
    };

    return {
      fromDate,
      toDate,
      disabledStDate,
      disabledEdDate,
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
