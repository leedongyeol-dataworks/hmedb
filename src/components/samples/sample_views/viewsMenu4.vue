<template>
  <div ref="sortableContainer" class="container">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="['box', item.type]"
      :style="getBoxStyle(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Sortable from 'sortablejs';

export default {
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
      { id: 13, name: 'Item 13', type: 'box-4' }
    ]);

    const sortableContainer = ref(null);

    onMounted(() => {
      Sortable.create(sortableContainer.value, {
        animation: 150,
        filter: '.box-4', // '4' 박스는 드래그 불가능
        onEnd(evt) {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;

          if (oldIndex !== newIndex) {
            // 두 상자의 위치와 크기 교환
            const itemMoved = items.value[oldIndex];
            const itemTarget = items.value[newIndex];

            // 교환할 아이템의 크기와 위치 교환
            const temp = {
              ...itemMoved,
              type: itemTarget.type,
            };
            items.value[oldIndex] = {
              ...itemTarget,
              type: itemMoved.type,
            };
            items.value[newIndex] = temp;
            // `.box-4` 박스를 형제들 중 가장 뒤로 이동
          }
        },
      });
      const box4Index = items.value.findIndex(item => item.type === 'box-4');
      if (box4Index !== -1) {
        const box4 = items.value.splice(box4Index, 1)[0];
        items.value.push(box4);
      }
    });

    const getBoxStyle = (index) => {
      const item = items.value[index];
      const isBox4 = item.type === 'box-4';
      return {
        position: 'absolute',        
        left: `${(index % 4) * (isBox4 ? 200 : 100) + (index % 4) * 10}px`, // 여백 추가
        top: `${Math.floor(index / 4) * (isBox4 ? 100 : 100) + Math.floor(index / 4) * 10}px`, // 여백 추
        width: isBox4 ? '430px' : '100px', // '4' 박스는 전체 너비
        height: isBox4 ? '100px' : '100px',
        margin: '5px', // 여백
        backgroundColor: isBox4 ? '#f99' : '#ddd',
        cursor: isBox4 ? 'default' : 'grab',
        boxSizing: 'border-box', // 여백 포함하여 크기 계산
        zIndex: isBox4 ? 1 : 2, // 박스의 z-index를 조정
      };
    };

    return {
      items,
      sortableContainer,
      getBoxStyle,
    };
  },
};
</script>

<style>
.container {
  position: relative;
  width: 500px; /* Container width */
  height: 500px; /* Container height */
  border: 1px solid #ddd;
  background: #f9f9f9;
  overflow: hidden; /* 자식 요소가 부모를 넘지 않도록 설정 */
}

.box-1 {
  background-color: #ddd;
}

.box-4 {
  background-color: #f99;
}
</style>
