<template>
    <div>
      <div id="container" ref="stockChartContainer"></div>
    </div>
  </template>
  <script>
  import { mapActions } from "vuex"
  import Highcharts from 'highcharts/highstock';
  
  export default {
    methods: {
      ...mapActions(["initGlobalSearch", "updateGlobalTitle"]),
      renderStockChart() {
        const minDate = new Date(this.chartData.time[0].time).getTime()
        const maxDate = new Date(this.chartData.time[this.chartData.time.length - 1].time).getTime() // 최대값을 현재 시점으로 설정
        const chart = Highcharts.stockChart(this.$refs.stockChartContainer, {
            chart: {
                height: 250,
                events: {
                    load: function() {
                        // 커스텀 에로우 초기화
                        this.customArrow = null;
                        this.selectedPoint = null;

                        const chart = this;

                        // 차트 이동시 화살표 고정, 하단하고 svg생성값 맞춰줘야댐
                        Highcharts.addEvent(chart, 'redraw', function () {
                            if (chart.selectedPoint && chart.customArrow) {
                                const point = chart.selectedPoint;
                                const x = point.plotX + point.series.xAxis.left;
                                const y = point.plotY + point.series.yAxis.top;
                                const arrowHeight = 4;
                                const arrowWidth = 12;

                                chart.customArrow.animate({
                                    d: [
                                        'M', x - arrowWidth / 2, y - 13,
                                        'L', x + arrowWidth / 2, y - 13,
                                        'L', x, y - arrowHeight,        
                                        'Z'
                                    ]
                                }, {duration: 300});
                            }
                        });
                    }
                }
            },
            rangeSelector: {
                selected: 1,
            },
            title: {
                text: "CPU Usage Over Time",
            },
            buttons: [
            {
                type: "minute",
                count: 1,
                text: "1m",
            },
            {
                type: "hour",
                count: 3,
                text: "3h",
            },
            {
                type: 'day',
                count: 1,
                text: '1d'
            },
            {
                type: 'week',
                count: 1,
                text: '1w'
            },
            {
                type: 'month',
                count: 1,
                text: '1m'
            },
            {
                type: 'year',
                count: 1,
                text: '1y'
            },
            {
                type: 'all',
                text: 'All'
            }
            ],
            xAxis: {
                type: "datetime",
                    minRange: 3600 * 1000, // 최소 줌 범위 설정 (예: 1시간)
                    min: minDate, // xAxis의 최소 범위 설정
                    max: maxDate, // xAxis의 최대 범위 설정
            },
            yAxis: {
                title: {
                    text: "CPU Usage (%)",
                },
            },
            tooltip: {
                useHTML: true,
                shared: true,  // 모든 시리즈에 대해 툴팁을 공유
                style: {
                    fontSize: '14px',  // 폰트 크기를 크게
                    padding: '5px',  // 내부 여백 조정
                    color: '#000',  // 글자 색상 설정
                },
                formatter: function () {
                    const date = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x); // 'time' 포맷 설정
                    return `${date}`;
                },
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                const chart = this.series.chart;

                                // bar 클릭
                                if (chart.selectedPoint) {
                                    chart.selectedPoint.update({
                                        color: chart.selectedPoint.originalColor
                                    });
                                }

                                this.originalColor = this.color;
                                this.update({
                                    color: Highcharts.color(this.color).brighten(0.2).get() // 클릭된 bar 티나게 하기
                                });

                                // 재클릭 화살표 없애기
                                if (chart.customArrow) {
                                    chart.customArrow.destroy();
                                }

                                // 화살표 생성
                                const x = this.plotX + this.series.xAxis.left;
                                const y = this.plotY + this.series.yAxis.top;
                                const initialY = y - 16; // Start slightly above
                                const arrowHeight = 4; 
                                const arrowWidth = 12; 

                                // 화살 svg
                                chart.customArrow = chart.renderer
                                    .path([
                                        'M', x - arrowWidth / 2, initialY - 13,
                                        'L', x + arrowWidth / 2, initialY - 13,
                                        'L', x, initialY - arrowHeight,        
                                        'Z'
                                    ])
                                    .attr({
                                        fill: '#FF0000',
                                        zIndex: 5
                                    })
                                    .add();


                                chart.customArrow.animate({
                                    d: [
                                        'M', x - arrowWidth / 2, y - 13,
                                        'L', x + arrowWidth / 2, y - 13,
                                        'L', x, y - arrowHeight,        
                                        'Z'
                                    ]
                                }, {
                                    duration: 300 // Animation duration in milliseconds
                                });
                                
                                chart.tooltip.refresh(this);
                                chart.selectedPoint = this;
                            }
                        }
                    }
                }
            },
            series: [
                {
                    type: "column", // 막대형 차트
                    name: "Events",
                    data: this.chartData.time.map((item) => ({
                        x: new Date(item.time).getTime(),
                        y: 1, // 모든 막대의 길이를 동일하게
                        color: item.color, // 데이터의 color 값을 사용하여 막대 색상을 지정
                    })),
                    pointWidth: 20, // 막대의 너비
                },
            ],
            navigator: {
                enabled: true, // Navigator (줌 차트) 활성화
                xAxis: {
                    min: minDate,// 줌 차트의 초기 최소 날짜
                    max: maxDate, // 줌 차트의 초기 최대 날짜
                },
                series: {
                    type: "line",
                    enabled: true,
                    data: this.chartData.time.map((item) => ({
                        x: new Date(item.time).getTime(),
                        // color에 따라 막대의 높이를 다르게 설정
                        y: item.color === '#f0a219' ? 3 : 1,
                        color: item.color,
                    })),
                    pointWidth: 4, // 줌 차트 막대의 너비 조정
                },
            },
            scrollbar: {
                enabled: true, // 스크롤바 활성화
            },
        });
  
      // 초기 줌 범위를 좁게 설정
        const min = new Date(this.chartData.time[this.chartData.time.length -1].time).getTime();
        const max = min - 1 * 60 * 60 * 1000; // 줌차트 막대 초기 범위
  
        chart.xAxis[0].setExtremes(min, max);
      },
    },
    data() {
      return {
        chartData: {
          "ctime": "2024-09-09 11:29:00",
          "time": [
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 06:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 07:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 07:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "23",
                  "time": "2024-09-09 07:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 07:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 07:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 07:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 07:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 07:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 07:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 07:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 08:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "19",
                  "time": "2024-09-09 08:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 08:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 08:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 08:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 08:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 08:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 08:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 08:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 08:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 08:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 09:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 09:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 09:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 09:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 09:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 09:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 09:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 09:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "17",
                  "time": "2024-09-09 09:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "19",
                  "time": "2024-09-09 09:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 09:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 09:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "18",
                  "time": "2024-09-09 09:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "16",
                  "time": "2024-09-09 09:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 09:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 09:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 09:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 09:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 09:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 09:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 09:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 09:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 09:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 09:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 09:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 09:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 09:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 09:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 09:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 10:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "26",
                  "time": "2024-09-09 10:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 10:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "23",
                  "time": "2024-09-09 10:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 10:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 10:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 10:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 10:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 10:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 10:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "19",
                  "time": "2024-09-09 10:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 10:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 10:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 10:57:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "24",
                  "time": "2024-09-09 10:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 10:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 11:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 11:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 11:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "23",
                  "time": "2024-09-09 11:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "26",
                  "time": "2024-09-09 11:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 11:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 11:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 11:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 11:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 11:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 11:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 11:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 11:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 11:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 11:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 12:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 12:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 12:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 12:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 12:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 12:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "23",
                  "time": "2024-09-09 12:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 12:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 12:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 12:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 12:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 12:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 12:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 12:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 12:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 12:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 12:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 12:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 12:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 12:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 13:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 13:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "22",
                  "time": "2024-09-09 13:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 13:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 13:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 13:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 13:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 13:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 13:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 13:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 13:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 13:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 13:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 13:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 14:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 14:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 14:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 14:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "23",
                  "time": "2024-09-09 14:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 14:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 14:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "26",
                  "time": "2024-09-09 14:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 14:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 14:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 14:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 14:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 14:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 14:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 14:59:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:00:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:01:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:02:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "25",
                  "time": "2024-09-09 15:03:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 15:04:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:05:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:06:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:07:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:08:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:09:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:10:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:11:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 15:12:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 15:13:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:14:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:15:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:16:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:17:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:18:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:19:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:20:00"
              },
              {
                  "color": "#f0a219",
                  "cpu": "22",
                  "time": "2024-09-09 15:21:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:22:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 15:23:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 15:24:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:25:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:26:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 15:27:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:28:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:29:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:30:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:31:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:32:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "24",
                  "time": "2024-09-09 15:33:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:34:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:35:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:36:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:37:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:38:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:39:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:40:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:41:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:42:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:43:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 15:44:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:45:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:46:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "20",
                  "time": "2024-09-09 15:47:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:48:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:49:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:50:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:51:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:52:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:53:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:54:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "23",
                  "time": "2024-09-09 15:55:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:56:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:57:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "22",
                  "time": "2024-09-09 15:58:00"
              },
              {
                  "color": "#7cb5ec",
                  "cpu": "21",
                  "time": "2024-09-09 15:59:00"
              }
          ]
      },
  }
  
      },
    mounted() {
      this.initGlobalSearch()
      this.updateGlobalTitle("SEARCH")
      this.renderStockChart();
    },
  }
  </script>
  