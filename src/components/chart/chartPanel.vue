<template>
  <div ref="chartContainer" class="chart-panel"></div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import Highcharts from 'highcharts';

export default {
  props: {
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chart = ref(null); // Highcharts 인스턴스

    onMounted(() => {
      renderChart(); // DOM이 마운트된 후에 차트를 렌더링합니다.
    });

    watch(
      () => props.chartOptions,
      (newOptions) => {
        if (chart.value) {
          chart.value.update(newOptions); // 차트 옵션이 변경되면 차트를 업데이트합니다.
        }
      }
    );

    const renderChart = () => {
      chart.value = Highcharts.chart(
        // chartContainer는 DOM이 마운트된 후 접근 가능합니다.
        document.querySelector('.chart-panel'),
        props.chartOptions
      );
    };

    return {
      renderChart,
    };
  },
};
</script>

<style>
.chart-panel {
  width: 100%;
  height: 300px;
}
</style>
