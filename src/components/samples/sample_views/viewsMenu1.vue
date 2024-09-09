<template>
  <div>
    <h2>vuex 1번파일</h2>
    <ul>
      <li><button @click="colorCount('red')">red</button></li>
      <li><button @click="colorCount('yellow')">yellow</button></li>
      <li><button @click="colorCount('blue')">blue</button></li>
    </ul>
    <div class="form">
      <ul class="img_form">
        <li>
          <div class="count">1</div>
          <div class="img_box">
            <img src="@/components/samples/assets/img/vuex_ex1.png" alt="">
          </div>
          <span>store의 state는 스토어의 중심으로 어플리케이션의 데이터를 저장하는 곳이며, 여러 컴포넌트에 공유 될 수 있다.</span>
        </li>
        <li>
          <div class="count">2</div>
          <div class="img_box">
            <img src="@/components/samples/assets/img/vuex_ex2.png" alt="">
          </div>
          <span>
            저장된 data는 this.$store.state.[DATANAME]또는 mapState 헬퍼를 사용해 가져올 수 있다
            computed에서 ...mapState(["globalColor"]) 헬퍼 방식으로 가져올 수도 있지만 get()방식을 사용하면 추가적인 데이터 처리 등 확장성이 있고 접근에 명확한 의도를 표현할 수 있다.
          </span>
        </li>
        <li>
          <div class="count">3</div>
          <div class="img_box">
            <img src="@/components/samples/assets/img/vuex_ex3.png" alt="">
          </div>
          <span>
            mutations는 vuex에서 상태를 변경하는 유일한 방법이다.
            동기적으로 실행되며 commit 메서드를 통해 호출된다, 2개의 인자중 첫번째는 상태이고 두번째는 페이로드
          </span>
        </li>
        <li>
          <div class="count">4</div>
          <div class="img_box">
            <img src="@/components/samples/assets/img/vuex_ex3-2.png" alt="">
          </div>
          <span>
            actions는 mutation과 비슷하지만 비동기 작업을 수행 할 수 있다. 
            (비동기 로직을 포함하고  mutation을 호출하는것)
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex"

export default {
  methods: {
    ...mapActions(["initGlobalTimeline", "updateGlobalTitle", "updateGlobalColor"]),
    ...mapMutations(["colorCount"]),
  },
  mounted() {
    this.initGlobalTimeline()
    this.updateGlobalTitle("TIMELINE")
  },
}
</script>
