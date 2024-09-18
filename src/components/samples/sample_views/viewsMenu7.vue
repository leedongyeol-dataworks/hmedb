<template>
  <div>
    <h2>SETTING</h2>
    <p>여기는 메뉴4의 페이지입니다.</p>
  </div>
</template>
<script>
let result = '<select class="form-select mt-2" id="short">';

function pan(item) {
  result += `<option>${item}</option>`;
}

let pants = ["바지 : 28", "바지 : 30", "바지 : 32"];

pants.forEach(pan);

result += "</select>";

console.log(result);
</script>
