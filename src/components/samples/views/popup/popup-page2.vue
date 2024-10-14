<template>
    <div>
      page2 안녕 난 팝업 페이지야
      <p>내용: {{ content }}</p> <!-- props로 받은 content 표시 -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        required: true
      }
    }
  }
  </script>
  