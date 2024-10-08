<template>
  <div ref="chartContainer" class="highchart-container"></div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  props: ['chartOptions'], // Accept chart options as a prop
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      Highcharts.chart(this.$refs.chartContainer, this.chartOptions);
    }
  }
};
</script>

<style scoped>
.highchart-container {
  width: 100%;
  height: 100%;
}
</style>