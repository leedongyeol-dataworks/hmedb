<template>
  <highcharts :options="chartOptions" />
</template>

<script>
export default {
  props: {
    chartOptions: {
      type: Object,
      required: true,
    },
  },
};
</script>
