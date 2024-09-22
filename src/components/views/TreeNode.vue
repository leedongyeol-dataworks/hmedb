<template>
    <li>
      <div>
        <span @click="toggle" style="cursor: pointer;">
          {{ isExpanded ? '[ - ]' : '[ + ]' }}
        </span>
        {{ node['Node Type'] }} (Cost: {{ node['Startup Cost'] }} - {{ node['Total Cost'] }})
      </div>
      <!-- 해당 노드에 자식이 존재할 경우 본 컴포난트를 재귀호출함 -->
      <ul v-if="isExpanded && node.Plans && node.Plans.length">
        <tree-node v-for="(child, index) in node.Plans" :key="index" :node="child" />
      </ul>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      node: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isExpanded: true // 기본 자식노드 펼쳐놓기
      };
    },
    methods: {
      toggle() {
        this.isExpanded = !this.isExpanded;
      }
    }
  };
  </script>
  
  <style scoped>
  li {
    margin-left: 20px;
  }
  
  li div {
    display: flex;
    align-items: center;
  }
  </style>
  