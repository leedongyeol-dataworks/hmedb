<template>
  <div>
    <h2>vuex 2번파일</h2>
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
            <img src="@/components/samples/assets/img/vuex_ex4-1.png" alt="">
          </div>
          <span>다른 컴포넌트에서 사용할 경우</span>
        </li>
        <li>
          <div class="count">1</div>
          <div class="img_box">
            <img src="@/components/samples/assets/img/vuex_ex4.png" alt="">
          </div>
          <span>mapMutations을 호출하고 사용하면 된다. * 업데이트 반영까지 위하여 mapActions까지</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex"

export default {
  methods: {
    ...mapActions(
      ["initGlobalOperation", "updateGlobalTitle", "updateGlobalColor"]
    ),
    ...mapMutations(["colorCount"])
  },
  mounted() {
    this.initGlobalOperation()
    this.updateGlobalTitle("OPERATION")
  },
}
</script>
