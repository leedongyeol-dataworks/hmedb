<template>
  <tr>
    
    <td>{{ node['Plan Rows'] }}</td>
    <td>
      <div class="cost_value_wrap">
        <span class="full_value"></span>
        <span class="cost_value" :style="{ width: node['Total Cost'] ? (node['Startup Cost'] / node['Total Cost'] * 100).toFixed(0) + '%' : '0px' }"></span>
      </div>
      {{ (node['Startup Cost'] / node['Total Cost'] * 100).toFixed(1) }} %</td>
    <td :style="{ paddingLeft: depth * 20 + 'px' }">
      <span @click="toggle" style="cursor: pointer;">
        {{ isExpanded ? '[ - ]' : '[ + ]' }}
      </span>
      {{ node['Node Type'] }}
    </td>
  </tr>
  
  <!-- 자식 노드가 있을 경우 재귀적으로 호출 -->
  <template v-if="isExpanded && node.Plans && node.Plans.length">
    <tree-node
      v-for="(child, index) in node.Plans"
      :key="index"
      :node="child"
      :depth="depth + 1"
    />
  </template>
</template>
  
  <script>
  export default {
    props: {
      node: {
        type: Object,
        required: true
      },
      depth: {
        type: Number,
        default: 0 // 기본 깊이를 0으로 설정
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
  