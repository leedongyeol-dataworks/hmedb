<template>
  <div class="dashboard">
    <button @click="openModal">Add Chart</button>

    <!-- 차트 박스를 표시 -->
    <div class="chart-boxes">
      <div v-for="(item, index) in chartItems" :key="index" class="chart-container">
        <!-- 각 차트 패널에 차트 옵션 전달 -->
        <chart-panel :chartOptions="item.chartOptions" />
      </div>
    </div>

    <!-- 차트를 선택할 수 있는 모달 -->
    <select-modal v-if="isModalOpen" @close="closeModal" @select="addChart" />
  </div>
</template>

<script>
import ChartPanel from '@/components/samples/chart/chartPanel.vue';
import SelectModal from '@/components/samples/views/selectModal.vue';

export default {
  components: { ChartPanel, SelectModal },
  data() {
    return {
      isModalOpen: false,
      chartItems: [], // 추가된 차트 박스 목록
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    addChart(chartOptions) {
      // 새로운 차트를 리스트에 추가
      this.chartItems.push({ chartOptions });
      this.closeModal();
    },
  },
};
</script>

<style>
.dashboard {
  padding: 20px;
}
.chart-boxes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.chart-container {
  width: 300px;
  height: 300px;
  border: 1px solid #ddd;
}
</style>
