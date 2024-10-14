<template>
  <div class="sort-layout-wrap">
    <div class="funcButton">
      <label for="chartTypeSelect">차트 타입 선택:</label>
      <select id="chartTypeSelect" v-model="selectedChartType">
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      {{ selectedChartType }} ;
      <button @click="addBlock('25x20')">Add 25x20 Block</button>,
      <button @click="addBlock('50x20')">Add 50x20 Block</button>,
      <button @click="addBlock('100x40')">Add 100x40 Block</button>
      <!-- 추가된 업 & 다운 버튼 -->
      <div>
        <button @click="scrollToFirstBlock">[first]</button>
        <button @click="scrollToPreviousBlock">[▲]</button>
        <button @click="scrollToNextBlock">[▼]</button>
      </div>
    </div>
    <!-- 4x6 Container -->
    <div class="container" ref="scrollContainer">
      <draggable
        v-model="blocks"
        :class="draggableClass"
        group="blocks"
        @end="onDragEnd"
        item-key="id"
      >
        <template #item="{ element }">
          <div
            :id="`block-${element.id}`"
            class="blockStyle"
            :style="getBlockStyle(element.size)"
            :class="[{ focused: element.id === focusBlock }]"
          >
            <chartPanel :chartOptions="getChartOptions(element.chartType)" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import draggable from "vuedraggable";
import chartPanel from "@/components/samples/chart/chartPanel.vue";

export default {
  components: {
    draggable,
    chartPanel,
  },
  setup() {
    // 선택한 차트 타입 (기본값 'line')
    const selectedChartType = ref("line");
    const draggableClass = ref("size-4x5"); // 기본 클래스
    const totalColumns = ref(4); // 기본값 4열
    // 공통 chartOptions (데이터와 구조를 공유)
    const commonChartOptions = {
      title: {
        text: "공통 차트 제목",
      },
      xAxis: {
        categories: ["1월", "2월", "3월", "4월", "5월"],
      },
      yAxis: {
        title: {
          text: "값",
        },
      },
      series: [
        {
          name: "시리즈 1",
          data: [1, 3, 2, 4, 3],
        },
      ],
    };
    // 차트 타입에 따라 chartOptions를 반환하는 함수
    const getChartOptions = (chartType) => {
      return {
        ...commonChartOptions, // 공통 옵션 복사
        chart: {
          type: chartType, // 차트 타입 적용 ('line', 'bar' 등)
        },
      };
    };

    let containerElement = null;
    let leftColumnBlocks = []; // container 안의 모든 블럭 요소들
    let currentIndex = 0; // 현재 스크롤된 블럭의 인덱스
    let focusBlock = ref(0);

    // 휠 이벤트 핸들러
    const preventScroll = (event) => {
      event.preventDefault(); // 휠 스크롤을 막음
    };

    onMounted(() => {
      // .container 요소를 마운트 이후에 직접 참조
      containerElement = document.querySelector(".container");
      if (containerElement) {
        // 첫 번째 열에 있는 블럭들만 가져옴
        leftColumnBlocks = getLeftColumnBlocks();
        scrollToFirstBlock(); // 첫 번째 블럭으로 자동 스크롤
        containerElement.addEventListener("wheel", preventScroll);
      }
    });

    // 드래그 가능한 블럭들 (크기는 25x20 또는 100x40)
    const blocks = ref([
      { id: 1, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 2, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 3, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 4, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 5, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 6, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 7, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 8, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 9, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 10, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 11, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 12, name: "Block-1", size: "25x20", resource: "", chartType: "line" },
      { id: 13, name: "Block-2", size: "100x30", resource: "", chartType: "line" },
      { id: 14, name: "Block-3", size: "25x20", resource: "", chartType: "line" },
      { id: 15, name: "Block-3", size: "25x20", resource: "", chartType: "line" },
      { id: 16, name: "Block-3", size: "25x20", resource: "", chartType: "line" },
      { id: 17, name: "Block-7", size: "25x20", resource: "", chartType: "line" },
      { id: 18, name: "Block-8", size: "100x20", resource: "", chartType: "line" },
      { id: 19, name: "Block-9", size: "25x20", resource: "", chartType: "line" },
      { id: 20, name: "Block-4", size: "25x20", resource: "", chartType: "line" },
      { id: 21, name: "Block-6", size: "25x20", resource: "", chartType: "line" },
      {
        id: 22,
        name: "Block-10",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 23,
        name: "Block-11",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 24,
        name: "Block-12",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 25,
        name: "Block-13",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 26,
        name: "Block-14",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 27,
        name: "Block-15",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 28,
        name: "Block-16",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 29,
        name: "Block-17",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 30,
        name: "Block-18",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 31,
        name: "Block-19",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 32,
        name: "Block-20",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 33,
        name: "Block-21",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 34,
        name: "Block-22",
        size: "25x20",
        resource: "",
        chartType: "bar",
      },
      {
        id: 35,
        name: "Block-23",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 36,
        name: "Block-24",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 37,
        name: "Block-25",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 38,
        name: "Block-26",
        size: "100x40",
        resource: "",
        chartType: "line",
      },
      {
        id: 39,
        name: "Block-27",
        size: "100x40",
        resource: "",
        chartType: "line",
      },
      {
        id: 40,
        name: "Block-30",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 41,
        name: "Block-31",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 42,
        name: "Block-32",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 43,
        name: "Block-33",
        size: "25x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 44,
        name: "Block-34",
        size: "50x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 45,
        name: "Block-35",
        size: "50x20",
        resource: "",
        chartType: "line",
      },
      {
        id: 46,
        name: "Block-37",
        size: "100x40",
        resource: "",
        chartType: "line",
      },
    ]);

    // 배열중 가장 마지막 id 찾음
    let blockIdCounter = ref(
      Math.max(...blocks.value.map((block) => block.id)) + 1
    );
    // 블록 크기에 따라 동적 스타일을 반환
    const getBlockStyle = (size) => {
      const [colSpan, rowSpan] = size.split("x").map(Number);
      return {
        "grid-column": `span ${colSpan}`,
        "grid-row": `span ${rowSpan}`,
      };
    };

    const parseBlockSize = (size) => {
      const [cols, rows] = size.split("x").map(Number); // '3x2' -> [3, 2]
      return { cols, rows };
    };

    // 첫 번째 열의 블럭들만 가져오는 함수
    const getLeftColumnBlocks = () => {
      const totalColumns = 100; // 그리드의 총 열 수
      const grid = []; // 그리드를 2차원 배열로 초기화
      const leftColumnBlocks = []; // 왼쪽 열에 위치한 블록들을 저장할 배열

      let currentRow = 0; // 현재 행
      let currentCol = 0; // 현재 열

      blocks.value.forEach((block) => {
        const { cols, rows } = parseBlockSize(block.size); // 블록의 열 및 행 크기 계산

        // 블록을 배치할 수 있는 행을 찾기
        while (totalColumns) {
          let canPlace = false; // 배치 가능 여부를 판단하는 변수

          // 현재 행에 필요한 공간이 부족하면 그리드에 행을 추가
          while (grid.length <= currentRow + rows) {
            grid.push(Array(totalColumns).fill(null));
          }

          while (currentCol < totalColumns) {
            canPlace = true; // 기본적으로 배치 가능하다고 가정

            // 블록을 배치할 수 있는지 확인
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                if (
                  currentRow + r >= grid.length || // 그리드의 높이를 넘어서면 그리드를 확장
                  currentCol + c >= totalColumns || // 그리드 너비 초과
                  grid[currentRow + r][currentCol + c] !== null // 이미 블록이 차있으면 배치 불가
                ) {
                  canPlace = false;
                  break;
                }
              }
              if (!canPlace) break;
            }

            if (canPlace) {
              // 블록을 그리드에 배치
              for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                  grid[currentRow + r][currentCol + c] = block.id;
                }
              }

              // 첫 번째 열에 배치된 블록인지 확인
              if (currentCol === 0) {
                leftColumnBlocks.push(block);
              }

              // 다음 블록을 위해 현재 열 위치 업데이트
              currentCol += cols;
              break;
            } else {
              // 현재 열에서 배치할 수 없으면 다음 열로 이동
              currentCol += 1;
            }
          }

          // 블록을 배치하지 못했으면 행을 증가시키고 다시 시도
          if (!canPlace) {
            currentRow += 1;
            currentCol = 0;
          } else {
            break;
          }
        }
      });

      console.log(leftColumnBlocks);
      return leftColumnBlocks;
    };




    // 블럭 추가 함수
    const addBlock = (size) => {
      blocks.value.push({
        id: blockIdCounter.value,
        name: `Block-${blockIdCounter.value}`,
        size,
        chartType: selectedChartType.value,
      });
      blockIdCounter.value++; // 블럭 추가 시 카운터 증가
      nextTick(() => {
        leftColumnBlocks = getLeftColumnBlocks(); // 추가 후 leftColumnBlocks 정리
      });
    };
    // 첫 번째 블럭으로 스크롤하는 함수
    const scrollToFirstBlock = () => {
      if (leftColumnBlocks.length > 0) {
        const firstBlockId = leftColumnBlocks[0].id; // 첫 번째 블록의 id 가져오기
        const element = document.getElementById(`block-${firstBlockId}`); // 해당 블록의 DOM 요소 가져오기
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" }); // DOM 요소에 대해 스크롤
        }
        currentIndex = 0; // 인덱스를 0으로 초기화
      }
    };

    const removeBlock = (index) => {
      blocks.value.splice(index, 1); // 블럭을 배열에서 제거
      leftColumnBlocks = getLeftColumnBlocks(); // 블럭 삭제 후 업데이트
    };
    // 다음 블럭으로 스크롤하는 함수
    const scrollToNextBlock = () => {
      if (leftColumnBlocks.length === 0) return;

      currentIndex += 1; // 인덱스 증가

      if (currentIndex >= leftColumnBlocks.length) {
        currentIndex = 0; // 배열을 벗어나면 처음으로 돌아감
      }

      const nextBlockId = leftColumnBlocks[currentIndex].id; // 다음 블록의 id 가져오기
      const element = document.getElementById(`block-${nextBlockId}`); // DOM 요소 가져오기

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" }); // DOM 요소에 대해 스크롤
      }
    };

    const scrollToPreviousBlock = () => {
      if (leftColumnBlocks.length === 0) return;

      currentIndex -= 1; // 인덱스 감소

      if (currentIndex < 0) {
        currentIndex = leftColumnBlocks.length - 1; // 배열을 벗어나면 마지막으로 돌아감
      }

      const prevBlockId = leftColumnBlocks[currentIndex].id; // 이전 블록의 id 가져오기
      const element = document.getElementById(`block-${prevBlockId}`); // DOM 요소 가져오기

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" }); // DOM 요소에 대해 스크롤
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
      totalColumns,
      getChartOptions,
      getBlockStyle,
      onDragEnd,
      addBlock,
      scrollToFirstBlock,
      scrollToNextBlock,
      scrollToPreviousBlock,
      preventScroll,
      removeBlock,
    };
  },
};
</script>

<style></style>
