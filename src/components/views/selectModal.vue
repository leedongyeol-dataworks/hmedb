<template>
  <div class="modal">
    <h3>Select Chart Type</h3>
    <div>
      <label>
        <input type="radio" value="line" v-model="selectedChartType" />
        Line Chart
      </label>
      <label>
        <input type="radio" value="bar" v-model="selectedChartType" />
        Bar Chart
      </label>
    </div>
    <button @click="submit">Submit</button>
    <button @click="$emit('close')">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedChartType: 'line', // 기본 차트 유형
    };
  },
  methods: {
    submit() {
      const chartOptions = {
        chart: {
          type: this.selectedChartType,
        },
        title: {
          text: `${this.selectedChartType.charAt(0).toUpperCase() + this.selectedChartType.slice(1)} Chart`,
        },
        series: [
          {
            data: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      };
      this.$emit('select', chartOptions); // 선택된 차트 옵션을 부모에게 전달
    },
  },
};
</script>

<style>
.modal {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
