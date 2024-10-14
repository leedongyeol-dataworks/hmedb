<template>
  <div ref="chartContainer" class="highchart-container"></div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  props: {
    chartOptions: {
      type: Object,
      required: true
    }
  }, // Accept chart options as a prop
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
        // chartOptions를 깊은 복사하여 원본 prop을 직접 변경하지 않도록 처리
        const customizedOptions = JSON.parse(JSON.stringify(this.chartOptions));

        // 다크 테마 스타일 적용
        customizedOptions.chart = {
          ...customizedOptions.chart,
          backgroundColor: '#181B22' // 배경을 어두운 색(#1e1e1e)으로 설정
        };
        customizedOptions.title = {
          ...customizedOptions.title,
          style: {
            color: '#FFFFFF' // 제목 텍스트를 흰색(#FFFFFF)으로 설정
          }
        };
        customizedOptions.xAxis = {
          ...customizedOptions.xAxis,
          labels: {
            style: {
              color: '#FFFFFF' // x축 레이블을 흰색으로 설정
            }
          },
          lineColor: '#FFFFFF' // x축 선을 흰색으로 설정
        };
        customizedOptions.yAxis = {
          ...customizedOptions.yAxis,
          labels: {
            style: {
              color: '#FFFFFF' // y축 레이블을 흰색으로 설정
            }
          },
          gridLineColor: '#444444' // 그리드 라인을 어두운 회색(#444444)으로 설정
        };
        customizedOptions.tooltip = {
          ...customizedOptions.tooltip,
          backgroundColor: '#2a2a2a', // 툴팁 배경을 어두운 색으로 설정
          style: {
            color: '#FFFFFF' // 툴팁 텍스트를 흰색으로 설정
          },
          borderColor: '#555555' // 툴팁 테두리를 어두운 회색으로 설정
        };
        customizedOptions.legend = {
          ...customizedOptions.legend,
          itemStyle: {
            color: '#FFFFFF' // 범례 텍스트를 흰색으로 설정
          }
        };

        // 수정된 옵션을 사용하여 차트를 렌더링
        Highcharts.chart(this.$refs.chartContainer, customizedOptions);
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