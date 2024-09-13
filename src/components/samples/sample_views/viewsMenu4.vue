<template>
  <div ref="sortableContainer" class="container">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="['box', item.type, { selected: selectedItems.includes(index), swapping: isSwapping }]"
      :style="getBoxStyle(index)"
    >
    {{ item.name }}
    <highcharts
      :options="chartOptions"
      style="width: calc(100% - 5px); height: calc(100% - 20px); padding: 10px;"
    />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue';
import Sortable from 'sortablejs';

export default {
  components: {
  },
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
      { id: 12, name: 'Item 12', type: 'box-1' },
      { id: 13, name: 'Item 13', type: 'box-4' },
    ]);

    const selectedItems = ref([]);
    const isSwapping = ref(false);

    const sortableContainer = ref(null);

    onMounted(() => {
      Sortable.create(sortableContainer.value, {
        animation: 150,
        filter: '.box-4', // '4' 박스는 드래그 불가능 (받는건 가능함)
        onStart() {
          isSwapping.value = true; // 드래그 시작 시 스왑 비활성화
        },
        onEnd(evt) {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;

          if (oldIndex !== newIndex) {
            // 두 상자의 위치와 크기 교환
            const itemMoved = items.value[oldIndex];
            const itemTarget = items.value[newIndex];

            // 교환할 아이템의 크기와 위치 교환, 다른 영역 침범 및 영향을 주지 않음
            const temp = {
              ...itemMoved,
              type: itemTarget.type,
            };
            items.value[oldIndex] = {
              ...itemTarget,
              type: itemMoved.type,
            };
            items.value[newIndex] = temp;

            // 드래그 종료 시 스왑 활성화
            isSwapping.value = false;
          }
        },
      });
    });

    // Watch to detect changes in items and handle .box-4 position
    watch(items, () => {
      nextTick(() => {
        moveBox4ToEnd();
      });
    }, { deep: true });

    const swapSelectedItems = () => {
      if (selectedItems.value.length === 2) {
        const [index1, index2] = selectedItems.value;

        // 스왑 애니메이션 시작
        isSwapping.value = true;

        // 현재 박스들의 스타일을 저장
        const box1 = document.querySelector(`.box:nth-child(${index1 + 1})`);
        const box2 = document.querySelector(`.box:nth-child(${index2 + 1})`);
        
        const box1Style = getComputedStyle(box1);
        const box2Style = getComputedStyle(box2);

        // 스타일을 변경하여 박스가 위치를 변경하도록 함

        box1.style.left = box2Style.left;
        box1.style.top = box2Style.top;
        box2.style.left = box1Style.left;
        box2.style.top = box1Style.top;

        nextTick(() => {
          setTimeout(() => {
            // 박스 위치를 교체하고 애니메이션 상태를 초기화
            [items.value[index1], items.value[index2]] = [items.value[index2], items.value[index1]];
            box1.style.transition = '';
            box2.style.transition = '';
            isSwapping.value = false; // 애니메이션 비활성화
          }, 500); // 애니메이션 지속 시간
        });

        // 선택된 항목 초기화
        selectedItems.value = [];
      }
    };

    const getBoxStyle = (index) => {
      const item = items.value[index];
      const isBox4 = item.type === 'box-4';
      
      const totalColumns = 4; // 총 열 개수
      const columnWidthPercent = 98 / totalColumns; // 각 열의 너비 백분율
      const marginPercent = 1; // 요소 간 여백을 위한 백분율 (필요에 따라 조정)

      return {
        position: 'absolute',
        left: `${(index % totalColumns) * (columnWidthPercent + marginPercent)}%`, // left를 %로 설정
        top: `${Math.floor(index / totalColumns) * (isBox4 ? 20 : 20)}%`, // top은 필요에 따라 설정, 현재 픽셀을 %로 변환한 예제
        width: isBox4 ? '100%' : `${columnWidthPercent - marginPercent}%`, // 'box-4'는 전체 너비 차지, 나머지는 비율로 설정
        height: isBox4 ? '40%' : '18%', // 각 요소의 높이 설정
        margin: '0 auto', // 여백은 가운데 정렬을 위해 사용 가능
        backgroundColor: isBox4 ? '#f99' : '#ddd',
        cursor: 'pointer',
        boxSizing: 'border-box', // 여백 포함하여 크기 계산
        zIndex: isBox4 ? 1 : 2, // 박스의 z-index를 조정
        border: selectedItems.value.includes(index) ? '2px solid blue' : 'none', // 선택된 경우 스타일
      };
    };

    const moveBox4ToEnd = () => {
      // DOM 요소를 직접 조작하여 .box-4를 마지막으로 이동 (차트 드래그 오작동 방지)
      const container = sortableContainer.value;
      const box4 = container.querySelector('.box-4');
      if (box4) {
        container.appendChild(box4); // .box-4를 컨테이너의 마지막 자식으로 이동
      }
    };

    return {
      items,
      selectedItems,
      swapSelectedItems,
      getBoxStyle,
      isSwapping,
      sortableContainer,
    };
  },
};
</script>


<style>
.container {
  position: relative;
  width: 100%; /* Container width */
  height: 100%; /* Container height */
  border: 1px solid #ddd;
  background: #f9f9f9;
  overflow: hidden; /* Ensure no overflow during dragging */
}

.box-1 {
  background-color: #ddd;
}

.box-4 {
  background-color: #f99;
}

.box.selected {
  border: 2px solid blue; /* 선택된 박스 스타일 */
}

</style>
