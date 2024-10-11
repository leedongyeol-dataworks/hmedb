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
        <button @click="sizeChange4x5">Size 4x5</button>
        <button @click="sizeChange5x6">Size 5x6</button>
      </div>
    </div>
    <!-- 4x6 Container -->
    <div class="container" ref="scrollContainer">
      <draggable v-model="blocks" :class="draggableClass" group="blocks" @end="onDragEnd" item-key="id">
        <template #item="{ element }">
          <div :id="`block-${element.id}`" 
            class="blockStyle"
            :style="getBlockStyle(element.size)"
            :class="[
              { focused: element.id === focusBlock }
            ]">
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
    const draggableClass = ref('size-4x5'); // 기본 클래스
    const totalColumns = ref(4); // 기본값 4열
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
      { id: 2, name: 'Block-2', size: '3x3', resource : '', chartType : 'line'},
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
      { id: 30, name: 'Block-30', size: '1x1', resource : '', chartType : 'line'},
      { id: 31, name: 'Block-31', size: '1x1', resource : '', chartType : 'line'},
      { id: 32, name: 'Block-32', size: '1x1', resource : '', chartType : 'line'},
      { id: 33, name: 'Block-33', size: '1x1', resource : '', chartType : 'line'},
      { id: 34, name: 'Block-34', size: '2x1', resource : '', chartType : 'line'},
      { id: 35, name: 'Block-35', size: '2x1', resource : '', chartType : 'line'},
      { id: 37, name: 'Block-37', size: '4x2', resource : '', chartType : 'line'},
    ]);

    // 배열중 가장 마지막 id 찾음
    let blockIdCounter = ref(Math.max(...blocks.value.map(block => block.id)) + 1);
    // 블록 크기에 따라 동적 스타일을 반환
    const getBlockStyle = (size) => {
      const [colSpan, rowSpan] = size.split('x').map(Number);
      return {
        'grid-column': `span ${colSpan}`,
        'grid-row': `span ${rowSpan}`
      };
    };

    const sizeChange4x5 = () => {
      totalColumns.value = 4; // 4열로 설정
      draggableClass.value = 'size-4x5';
    };

    const sizeChange5x6 = () => {
      totalColumns.value = 5; // 5열로 설정
      draggableClass.value = 'size-5x6';
    };

    const parseBlockSize = (size) => {
      const [cols, rows] = size.split('x').map(Number); // '3x2' -> [3, 2]
      return { cols, rows };
    };

    // 첫 번째 열의 블럭들만 가져오는 함수
    const getLeftColumnBlocks = () => {
      if (!containerElement) {
        console.error('containerElement is null');
        return [];
      }

      let currentColumn = 0; // 현재 열의 위치를 추적
      const leftColumnBlocks = [];

      // 블록들을 순회하면서 첫 번째 열에 있는 블록만 필터링
      blocks.value.forEach((block) => {
        const { cols } = parseBlockSize(block.size); // 블록의 크기 (열 수)

        // 첫 번째 열에 있는 블록만 배열에 추가
        if (currentColumn % totalColumns.value === 0) {
          leftColumnBlocks.push(block);
        }

        // 각 블록의 크기에 따라 열을 이동
        currentColumn += cols;

        // 현재 열이 전체 열 수를 초과하면 첫 번째 열로 초기화
        if (currentColumn >= totalColumns.value) {
          currentColumn = 0;
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
      if (blocks.value.length === 0) return;

      // 현재 블럭의 크기를 기반으로 이동
      const currentBlock = blocks.value[currentIndex];
      const sizeClass = currentBlock.size;

      // 'sizeClass'가 있는지 확인 후 파싱
      if (sizeClass) {
        const { cols } = parseBlockSize(sizeClass);

        // 다음 블럭으로 이동 (현재 블럭의 컬럼 수만큼 이동)
        currentIndex += cols;

        // 인덱스가 배열 길이를 넘어갈 경우 처음으로 돌아감
        if (currentIndex >= blocks.value.length) {
          currentIndex = 0;
        }

        const nextBlock = blocks.value[currentIndex];
        focusBlock.value = nextBlock.id;

        const nextBlockElement = document.getElementById(`block-${nextBlock.id}`);
        if (nextBlockElement) {
          nextBlockElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    const scrollToPreviousBlock = () => {
      if (blocks.value.length === 0) return;

      // 현재 블럭의 크기를 기반으로 이동
      const currentBlock = blocks.value[currentIndex];
      const sizeClass = currentBlock.size;

      // 'sizeClass'가 있는지 확인 후 파싱
      if (sizeClass) {
        const { cols } = parseBlockSize(sizeClass);

        // 이전 블럭으로 이동 (현재 블럭의 컬럼 수만큼 이동)
        currentIndex -= cols;

        // 인덱스가 0보다 작아질 경우 마지막으로 돌아감
        if (currentIndex < 0) {
          currentIndex = blocks.value.length - 1;
        }

        const prevBlock = blocks.value[currentIndex];
        focusBlock.value = prevBlock.id;

        const prevBlockElement = document.getElementById(`block-${prevBlock.id}`);
        if (prevBlockElement) {
          prevBlockElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    // 블럭 스타일을 크기에 따라 설정

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
      draggableClass,
      parseBlockSize,
      sizeChange4x5,
      sizeChange5x6,
      totalColumns,
      getChartOptions,
      getBlockStyle,
      onDragEnd,
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
