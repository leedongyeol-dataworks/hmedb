<template>
  <div>
    <ul>
      <tree-node v-for="(plan, index) in query" :key="index" :node="plan.Plan" />
    </ul>
  </div>
</template>
<script>
// 밑에 from 에러부분 살펴보기
import TreeNode from '@/components/samples/sample_chart/TreeNode.vue'; // root로 경로 설정해도 이럼 화면은 잘나옴..

export default {
  components: {
    TreeNode
  },
  data() {
    return {
      query : [
        {
          "Plan": {
            "Node Type": "Sort",
            "Parallel Aware": false,
            "Startup Cost": 1709163.08,
            "Total Cost": 1718230.73,
            "Plan Rows": 3627058,
            "Plan Width": 48,
            "Sort Key": ["(sum((lineitem.l_extendedprice * ('1'::numeric - lineitem.l_discount)))) DESC", "orders.o_orderdate"],
            "Plans": [
              {
                "Node Type": "Aggregate",
                "Strategy": "Sorted",
                "Partial Mode": "Simple",
                "Parent Relationship": "Outer",
                "Parallel Aware": false,
                "Startup Cost": 155969.79,
                "Total Cost": 1202411.93,
                "Plan Rows": 3627058,
                "Plan Width": 48,
                "Group Key": ["lineitem.l_orderkey", "orders.o_orderdate", "orders.o_shippriority"],
                "Plans": [
                  {
                    "Node Type": "Merge Join",
                    "Parent Relationship": "Outer",
                    "Parallel Aware": false,
                    "Join Type": "Inner",
                    "Startup Cost": 155969.79,
                    "Total Cost": 1102667.84,
                    "Plan Rows": 3627058,
                    "Plan Width": 28,
                    "Inner Unique": false,
                    "Merge Cond": "(orders.o_orderkey = lineitem.l_orderkey)",
                    "Plans": [
                      {
                        "Node Type": "Gather Merge",
                        "Parent Relationship": "Outer",
                        "Parallel Aware": false,
                        "Startup Cost": 155951.87,
                        "Total Cost": 261575.90,
                        "Plan Rows": 906905,
                        "Plan Width": 16,
                        "Workers Planned": 2,
                        "Plans": [
                          {
                            "Node Type": "Sort",
                            "Parent Relationship": "Outer",
                            "Parallel Aware": false,
                            "Startup Cost": 154951.85,
                            "Total Cost": 155896.54,
                            "Plan Rows": 377877,
                            "Plan Width": 16,
                            "Sort Key": ["orders.o_orderkey", "orders.o_orderdate", "orders.o_shippriority"],
                            "Plans": [
                              {
                                "Node Type": "Hash Join",
                                "Parent Relationship": "Outer",
                                "Parallel Aware": true,
                                "Join Type": "Inner",
                                "Startup Cost": 13566.10,
                                "Total Cost": 119946.16,
                                "Plan Rows": 377877,
                                "Plan Width": 16,
                                "Inner Unique": true,
                                "Hash Cond": "(orders.o_custkey = customer.c_custkey)",
                                "Plans": [
                                  {
                                    "Node Type": "Seq Scan",
                                    "Parent Relationship": "Outer",
                                    "Parallel Aware": true,
                                    "Relation Name": "orders",
                                    "Alias": "orders",
                                    "Startup Cost": 0.00,
                                    "Total Cost": 101458.11,
                                    "Plan Rows": 1875011,
                                    "Plan Width": 20
                                  },
                                  {
                                    "Node Type": "Hash",
                                    "Parent Relationship": "Inner",
                                    "Parallel Aware": true,
                                    "Startup Cost": 13093.75,
                                    "Total Cost": 13093.75,
                                    "Plan Rows": 37788,
                                    "Plan Width": 4,
                                    "Plans": [
                                      {
                                        "Node Type": "Seq Scan",
                                        "Parent Relationship": "Outer",
                                        "Parallel Aware": true,
                                        "Relation Name": "customer",
                                        "Alias": "customer",
                                        "Startup Cost": 0.00,
                                        "Total Cost": 13093.75,
                                        "Plan Rows": 37788,
                                        "Plan Width": 4,
                                        "Filter": "(c_mktsegment = 'BUILDING'::bpchar)"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "Node Type": "Index Scan",
                        "Parent Relationship": "Inner",
                        "Parallel Aware": false,
                        "Scan Direction": "Forward",
                        "Index Name": "idx_lineitem_orderkey",
                        "Relation Name": "lineitem",
                        "Alias": "lineitem",
                        "Startup Cost": 0.44,
                        "Total Cost": 757568.18,
                        "Plan Rows": 17997316,
                        "Plan Width": 16
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style>
</style>