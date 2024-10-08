<template>
  <div class="sort-layout-wrap">
    <div class="funcButton">
      <label for="chartTypeSelect">차트 타입 선택:</label>
      <select id="chartTypeSelect" v-model="selectedChartType">
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      {{ selectedChartType }} ;
      <button @click="addBlock('1x1')">Add 1x1 Block</button>,
      <button @click="addBlock('2x1')">Add 2x1 Block</button>,
      <button @click="addBlock('4x2')">Add 4x2 Block</button>
      <!-- 추가된 업 & 다운 버튼 -->
      <div>
        <button @click="scrollToFirstBlock">[first]</button>
        <button @click="scrollToPreviousBlock">[▲]</button>
        <button @click="scrollToNextBlock">[▼]</button>
      </div>
    </div>
    <!-- 4x6 Container -->
    <div class="container" ref="scrollContainer">
      <draggable v-model="blocks" group="blocks" @end="onDragEnd" item-key="id">
        <template #item="{ element, index }">
          <div :id="`block-${element.id}`" 
            class="blockStyle"
            :class="[
              getBlockClass(element.size),
              { focused: element.id === focusBlock }
            ]">
            <div class="block_info">
              <span>{{ element.name }}</span>
              <button @click="removeBlock(index)">Delete</button>
            </div>
            <chartPanel :chartOptions="getChartOptions(element.chartType)" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick} from 'vue';
import draggable from 'vuedraggable';
import chartPanel from '@/components/chart/chartPanel.vue';

export default {
  components: {
    draggable,
    chartPanel
  },
  setup() {
    // 선택한 차트 타입 (기본값 'line')
    const selectedChartType = ref('line');
    // 공통 chartOptions (데이터와 구조를 공유)
    const commonChartOptions = {
      title: {
        text: '공통 차트 제목'
      },
      xAxis: {
        categories: ['1월', '2월', '3월', '4월', '5월']
      },
      yAxis: {
        title: {
          text: '값'
        }
      },
      series: [
        {
          name: '시리즈 1',
          data: [1, 3, 2, 4, 3]
        }
      ]
    };

    // 차트 타입에 따라 chartOptions를 반환하는 함수
    const getChartOptions = (chartType) => {
      return {
        ...commonChartOptions, // 공통 옵션 복사
        chart: {
          type: chartType // 차트 타입 적용 ('line', 'bar' 등)
        }
      };
    };

    let containerElement = null;
    let leftColumnBlocks  = []; // container 안의 모든 블럭 요소들
    let currentIndex = 0; // 현재 스크롤된 블럭의 인덱스
    let focusBlock = ref(0);

    // 휠 이벤트 핸들러
    const preventScroll = (event) => {
      event.preventDefault(); // 휠 스크롤을 막음
    };

    onMounted(() => {
      // .container 요소를 마운트 이후에 직접 참조
      containerElement = document.querySelector('.container');
      if (containerElement) {
        // 첫 번째 열에 있는 블럭들만 가져옴
        leftColumnBlocks = getLeftColumnBlocks();
        scrollToFirstBlock(); // 첫 번째 블럭으로 자동 스크롤
        containerElement.addEventListener('wheel', preventScroll);
      }
    });

    // 드래그 가능한 블럭들 (크기는 1x1 또는 4x2)
    const blocks = ref([
      { id: 1, name: 'Block-1', size: '1x1', resource : '', chartType : 'line'},
      { id: 2, name: 'Block-2', size: '1x1', resource : '', chartType : 'line'},
      { id: 3, name: 'Block-3', size: '1x1', resource : '', chartType : 'line'},
      { id: 7, name: 'Block-7', size: '1x1', resource : '', chartType : 'line'},
      { id: 8, name: 'Block-8', size: '1x1', resource : '', chartType : 'line'},
      { id: 9, name: 'Block-9', size: '1x1', resource : '', chartType : 'line'},
      { id: 4, name: 'Block-4', size: '1x1', resource : '', chartType : 'line'},
      { id: 6, name: 'Block-6', size: '1x1', resource : '', chartType : 'line'},
      { id: 10, name: 'Block-10', size: '1x1', resource : '', chartType : 'line'},
      { id: 11, name: 'Block-11', size: '1x1', resource : '', chartType : 'line'},
      { id: 12, name: 'Block-12', size: '1x1', resource : '', chartType : 'line'},
      { id: 13, name: 'Block-13', size: '1x1', resource : '', chartType : 'line'},
      { id: 14, name: 'Block-14', size: '1x1', resource : '', chartType : 'line'},
      { id: 15, name: 'Block-15', size: '1x1', resource : '', chartType : 'line'},
      { id: 16, name: 'Block-16', size: '1x1', resource : '', chartType : 'line'},
      { id: 17, name: 'Block-17', size: '1x1', resource : '', chartType : 'line'},
      { id: 18, name: 'Block-18', size: '1x1', resource : '', chartType : 'line'},
      { id: 19, name: 'Block-19', size: '1x1', resource : '', chartType : 'line'},
      { id: 20, name: 'Block-20', size: '1x1', resource : '', chartType : 'line'},
      { id: 21, name: 'Block-21', size: '1x1', resource : '', chartType : 'line'},
      { id: 22, name: 'Block-22', size: '1x1', resource : '', chartType : 'line'},
      { id: 23, name: 'Block-23', size: '1x1', resource : '', chartType : 'line'},
      { id: 24, name: 'Block-24', size: '1x1', resource : '', chartType : 'line'},
      { id: 25, name: 'Block-25', size: '1x1', resource : '', chartType : 'line'},
      { id: 26, name: 'Block-26', size: '4x2', resource : '', chartType : 'line'},
      { id: 27, name: 'Block-27', size: '4x2', resource : '', chartType : 'line'},
      { id: 28, name: 'Block-28', size: '4x2', resource : '', chartType : 'line'},
      { id: 29, name: 'Block-29', size: '4x2', resource : '', chartType : 'line'},
      { id: 30, name: 'Block-30', size: '1x1', resource : '', chartType : 'line'},
      { id: 31, name: 'Block-31', size: '1x1', resource : '', chartType : 'line'},
      { id: 32, name: 'Block-32', size: '1x1', resource : '', chartType : 'line'},
      { id: 33, name: 'Block-33', size: '1x1', resource : '', chartType : 'line'},
      { id: 34, name: 'Block-34', size: '2x1', resource : '', chartType : 'line'},
      { id: 35, name: 'Block-35', size: '2x1', resource : '', chartType : 'line'},
      { id: 36, name: 'Block-36', size: '4x2', resource : '', chartType : 'line'},
      { id: 37, name: 'Block-37', size: '4x2', resource : '', chartType : 'line'},
    ]);

    // 배열중 가장 마지막 id 찾음
    let blockIdCounter = ref(Math.max(...blocks.value.map(block => block.id)) + 1);

    // 첫 번째 열의 블럭들만 가져오는 함수
    const getLeftColumnBlocks = () => {
      let currentColumn = 0; // 현재 열의 위치를 추적
      const leftColumnBlocks = [];

      // containerElement 안의 블럭들을 순회하며 첫 번째 열에 위치한 블럭들을 필터링
      [...containerElement.querySelectorAll('[id^="block-"]')].forEach((block) => {
        const blockSize = block.classList.contains('block-4x2') ? '4x2' :
                          block.classList.contains('block-2x1') ? '2x1' : '1x1';

        // 첫 번째 열에 있는 블럭만 배열에 추가
        if (currentColumn % 4 === 0) {
          leftColumnBlocks.push(block);
        }

        // 각 블럭의 크기에 따라 열을 건너뛰기
        switch (blockSize) {
          case '4x2':
            currentColumn += 4; // 4칸을 차지하므로 4칸 이동
            break;
          case '2x1':
            currentColumn += 2; // 2칸을 차지하므로 2칸 이동
            break;
          default:
            currentColumn += 1; // 1칸을 차지하므로 1칸 이동
        }
      });

      return leftColumnBlocks;
    };


    // 블럭 추가 함수
    const addBlock = (size) => {
      blocks.value.push({
        id: blockIdCounter.value,
        name: `Block-${blockIdCounter.value}`,
        size,
        chartType: selectedChartType.value
      });
      blockIdCounter.value++; // 블럭 추가 시 카운터 증가
      nextTick(() => {
        leftColumnBlocks = getLeftColumnBlocks(); // 추가 후 leftColumnBlocks 정리
      });
    };
    // 첫 번째 블럭으로 스크롤하는 함수
    const scrollToFirstBlock = () => {
      if (leftColumnBlocks.length > 0) {
        leftColumnBlocks[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentIndex = 0;
      }
    };

    const removeBlock = (index) => {
      blocks.value.splice(index, 1); // 블럭을 배열에서 제거
      leftColumnBlocks = getLeftColumnBlocks(); // 블럭 삭제 후 업데이트
    };
    // 다음 블럭으로 스크롤하는 함수
    const scrollToNextBlock = () => {
      currentIndex++;
      if (currentIndex >= leftColumnBlocks.length) {
        currentIndex = 0; // 마지막 블럭 이후에는 다시 첫 블럭으로 돌아감
      }
      const blockId = leftColumnBlocks[currentIndex].id
      focusBlock.value = +blockId.replace('block-', '');
      
      leftColumnBlocks[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const scrollToPreviousBlock = () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = leftColumnBlocks.length - 1; // 첫 블럭 이전에는 마지막 블럭으로 이동
      }
      const blockId = leftColumnBlocks[currentIndex].id
      focusBlock.value = +blockId.replace('block-', '');

      leftColumnBlocks[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // 블럭 스타일을 크기에 따라 설정

    const getBlockClass = (size) => {
      switch (size) {
        case '1x1':
          return 'block-1x1';
        case '2x1':
          return 'block-2x1';
        case '4x2':
          return 'block-4x2';
      }
    };

    // 드래그가 끝났을 때 호출
    // 드래그가 끝났을 때 호출되는 함수
    const onDragEnd = () => {

      // 배열에서 해당 블럭을 새로운 위치로 이동
      // leftColumnBlocks를 업데이트 (blocks 배열 기준으로 다시 설정)
      nextTick(() => {
        leftColumnBlocks = getLeftColumnBlocks(); // 블럭 순서를 다시 가져옴
      });
    };

    return {
      blocks,
      leftColumnBlocks,
      focusBlock,
      selectedChartType,
      getChartOptions,
      onDragEnd,
      getBlockClass,
      addBlock,
      scrollToFirstBlock,
      scrollToNextBlock,
      scrollToPreviousBlock,
      preventScroll,
      removeBlock
    };
  }
};
</script>

<style>
</style>
