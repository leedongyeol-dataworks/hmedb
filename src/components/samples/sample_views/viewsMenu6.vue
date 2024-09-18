<template>
  <div ref="sortableContainer" class="container">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['box', item.type]"
    >
      {{ item.name }}
      <LineChart :options="item.chartOptions" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LineChart from "@/components/chart/lineChart.vue";

export default {
  components: {
    LineChart,
  },
  setup() {
    const items = ref([
      {
        id: 1,
        name: "Line Chart",
        type: "box-1",
        chartOptions: getChartOptions("line"),
      },
      {
        id: 1,
        name: "Line Chart",
        type: "box-1",
        chartOptions: getChartOptions("area"),
      },
    ]);

    function getChartOptions(type) {
      return {
        chart: {
          type: type,
        },
        title: {
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
        },
        xAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        yAxis: {
          title: {
            text: "Values",
          },
        },
        series: [
          {
            name: "Sample Data",
            data: [1, 3, 2, 4, 6, 8, 10],
          },
        ],
      };
    }

    return {
      items,
    };
  },
};
</script>

<style>
#app .container {
  position: relative;
  width: 100%; /* Container width */
  height: 100%; /* Container height */
  border: 1px solid #ddd;
  background: #f9f9f9;
  overflow: hidden; /* Ensure no overflow during dragging */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#app .box-1 {
  background-color: #ddd;
  width: calc(25% - 1rem);
  font-size: 12px;
  margin-bottom: 1rem;
  height: 15rem;
}

.box-4 {
  background-color: #f99;
}

.box.selected {
  border: 2px solid blue; /* 선택된 박스 스타일 */
}
</style>
