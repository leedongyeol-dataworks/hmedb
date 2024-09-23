<template>
  <button class="more_box" @click="openModal">more box</button>
  <div ref="sortableContainer" class="container">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="['box', item.type, { selected: selectedItems.includes(index), swapping: isSwapping }]"
      :style="getBoxStyle(index)"
      @click="toggleSelection(index)"
    >
      {{ item.name }}
      <highcharts
        :options="chartOptions"
        style="width: calc(100% - 5px); height: calc(100% - 20px); padding: 10px;"
      />
    </div>
  </div>

  <!-- Modal Component -->
  <Modal v-if="isModalOpen" :show="isModalOpen" @close="closeModal" @select="addSelectedBox" />
</template>

<script>
import { ref, onMounted, 
  // watch, nextTick
 } from 'vue';
import Sortable from 'sortablejs';
import Modal from '../../views/selectModal.vue'; // 모달 컴포넌트 임포트

export default {
  components: { Modal },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Simple Line Chart'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        yAxis: {
          title: {
            text: 'Values'
          }
        },
        series: [{
          name: 'Sample Data',
          data: [1, 3, 2, 4, 6, 8, 10]
        }]
      }
    }
  },
  setup() {
    const items = ref([
      { id: 1, name: 'Item 1', type: 'box-1' },
      { id: 2, name: 'Item 2', type: 'box-1' },
      { id: 3, name: 'Item 3', type: 'box-1' },
      { id: 4, name: 'Item 4', type: 'box-1' },
      { id: 5, name: 'Item 5', type: 'box-1' },
      { id: 6, name: 'Item 6', type: 'box-1' },
      { id: 7, name: 'Item 7', type: 'box-1' },
      { id: 8, name: 'Item 8', type: 'box-1' },
      { id: 9, name: 'Item 9', type: 'box-1' },
      { id: 10, name: 'Item 10', type: 'box-1' },
      { id: 11, name: 'Item 11', type: 'box-1' },
      { id: 13, name: 'Item 13', type: 'box-4' },
      { id: 12, name: 'Item 12', type: 'box-1' },
      { id: 12, name: 'Item 12', type: 'box-1' },
      { id: 12, name: 'Item 12', type: 'box-1' },
      { id: 12, name: 'Item 12', type: 'box-1' },
      { id: 15, name: 'Item 15', type: 'box-4' },
      { id: 16, name: 'Item 16', type: 'box-1' },
      ]);

    const selectedItems = ref([]);
    const isSwapping = ref(false);
    const isModalOpen = ref(false); // 모달 상태 관리
    const sortableContainer = ref(null);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const addSelectedBox = (type) => {
      const newItem = {
        id: Date.now(),
        name: `New ${type === 'box-1' ? 'Box 1' : 'Box 4'}`,
        type: type,
      };

      // 기존에 있는 .box-4는 그대로 유지하면서 6번째 줄 맨 왼쪽에 .box-1 추가
      let insertIndex = items.value.length; // 기본적으로 마지막에 추가

      // items 배열에 새로운 아이템 추가
      items.value.splice(insertIndex, 0, newItem);
    };

    const toggleSelection = (index) => {
      if (selectedItems.value.includes(index)) {
        selectedItems.value = selectedItems.value.filter(i => i !== index);
      } else {
        if (selectedItems.value.length < 2) {
          selectedItems.value.push(index);
        }
      }
    };

    // box끼리 위치변경
    onMounted(() => {
      Sortable.create(sortableContainer.value, {
        animation: 150,
        filter: '.box-4', // '4' 박스는 드래그 불가능 (받는건 가능함)
        onStart() {
          isSwapping.value = true;
        },
        onEnd(evt) {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;

          if (oldIndex !== newIndex) {
            const itemMoved = items.value[oldIndex];
            const itemTarget = items.value[newIndex];

            const temp = {
              ...itemMoved,
              type: itemTarget.type,
            };
            items.value[oldIndex] = {
              ...itemTarget,
              type: itemMoved.type,
            };
            items.value[newIndex] = temp;

            isSwapping.value = false;
          }
        },
      });
    });

    // watch(items, () => {
    //   nextTick(() => {
    //     moveBox4ToEnd();
    //   });
    // }, { deep: true });

    const getBoxStyle = (index) => {
      const totalColumns = 4; // 전체 칸 수
      let currentColumn = 0; // 현재 열
      let currentRow = 0; // 현재 행

      // 현재 줄에 공간이 있는지 추적

      for (let i = 0; i < index; i++) {
        const prevItem = items.value[i];
        if (prevItem.type === 'box-4') {
          if (currentColumn < totalColumns) {
            currentRow += 1
          }
          currentColumn = 0;
          currentRow += 2;
        } 
        if (prevItem.type === 'box-1') {
          currentColumn += 1;
        
          if (currentColumn === totalColumns) {
            currentColumn = 0;
            currentRow += 1;
          }
        } 
      }
      
      const item = items.value[index];
      const isBox4 = item.type === 'box-4';

      const columnWidthPercent = 98 / totalColumns; // 각 칸의 너비
      const marginPercent = 1; // 여백


      const boxWidth = isBox4 ? '100%' : `${columnWidthPercent - marginPercent}%`;
      const boxHeight = isBox4 ? '36%' : '18%';

      if (isBox4) {
        currentColumn = 0; // box-4는 전체 너비를 차지하므로 현재 열을 0으로 설정
      }

      return {
        position: 'absolute',
        left: isBox4 ? '0%' : `${currentColumn * (columnWidthPercent + marginPercent)}%`,
        top: (() => {
          if (isBox4 && currentColumn < totalColumns) {
            return `${(currentRow + 1) * 20}%`;
          } else {
            return `${currentRow * 20}%`;
          }
        })(),
        width: boxWidth,
        height: boxHeight,
        margin: '0 auto',
        backgroundColor: isBox4 ? '#f99' : '#ddd',
        cursor: 'pointer',
        boxSizing: 'border-box',
        zIndex: isBox4 ? 1 : 2,
        border: selectedItems.value.includes(index) ? '2px solid blue' : 'none',
      };
    };

    // const moveBox4ToEnd = () => {
    //   const container = sortableContainer.value;
    //   const box4 = container.querySelector('.box-4');
    //   if (box4) {
    //     container.appendChild(box4);
    //   }
    // };

    return {
      items,
      selectedItems,
      toggleSelection,
      getBoxStyle,
      isSwapping,
      sortableContainer,
      isModalOpen,
      openModal,
      closeModal,
      addSelectedBox,
    };
  },
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  background: #f9f9f9;
  overflow-x: hidden;
}

.box-1 {
  background-color: #ddd;
}

.box-4 {
  background-color: #f99;
}

.box.selected {
  border: 2px solid blue;
}

.more_box {
  margin-bottom: 10px;
}
</style>
