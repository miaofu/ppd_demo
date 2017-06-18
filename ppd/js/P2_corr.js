(function (bidDiv,datapath) {
$.get(datapath).done(function (data) {
// Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
var schema = [
    {name: 'AQIindex', index: 1, text: '正常还款期数'},
    {name: 'AQIindex2', index: 2, text: '借款金额'},
    {name: 'PM25', index: 3, text: '借款期限'},
    {name: 'PM10', index: 4, text: '利率'},
    {name: 'CO', index: 5, text: '日期'},
    {name: 'NO2', index: 6, text: '年龄'},
    {name: '等级', index: 7, text: '历史逾期还款期数'}
];

/*
var rawData = [
    [55,9,56,0.46,18,6,"良", "北京"],
    [187,143,201,1.39,89,53,"中度", "上海"]
];
*/
data = JSON.parse(data)
var rawData = data["data"]
var CATEGORY_DIM_COUNT = 6;
var GAP = 1;
var BASE_LEFT = 5;
var BASE_TOP = 10;
// var GRID_WIDTH = 220;
// var GRID_HEIGHT = 220;
var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
var CATEGORY_DIM = 7;
var SYMBOL_SIZE = 3;

function retrieveScatterData(data, dimX, dimY) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var item = [data[i][dimX], data[i][dimY]];
        item[CATEGORY_DIM] = data[i][CATEGORY_DIM];
        result.push(item);
    }
    return result;
}

function generateGrids(option) {
    var index = 0;

    for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
        for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
            if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
                continue;
            }

            option.grid.push({
                left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                width: GRID_WIDTH + '%',
                height: GRID_HEIGHT + '%'
            });

            option.brush.xAxisIndex && option.brush.xAxisIndex.push(index);
            option.brush.yAxisIndex && option.brush.yAxisIndex.push(index);

            option.xAxis.push({
                splitNumber: 3,
                position: 'top',
                axisLine: {
                    show: j === 0,
                    onZero: false
                },
                axisTick: {
                    show: j === 0,
                    inside: true
                },
                axisLabel: {
                    show: j === 0
                },
                type: 'value',
                gridIndex: index,
                scale: true
            });

            option.yAxis.push({
                splitNumber: 3,
                position: 'right',
                axisLine: {
                    show: i === CATEGORY_DIM_COUNT - 1,
                    onZero: false
                },
                axisTick: {
                    show: i === CATEGORY_DIM_COUNT - 1,
                    inside: true
                },
                axisLabel: {
                    show: i === CATEGORY_DIM_COUNT - 1
                },
                type: 'value',
                gridIndex: index,
                scale: true
            });

            option.series.push({
                type: 'scatter',
                symbolSize: SYMBOL_SIZE,
                xAxisIndex: index,
                yAxisIndex: index,
                data: retrieveScatterData(rawData, i, j)
            });

            option.visualMap.seriesIndex.push(option.series.length - 1);

            index++;
        }
    }
}


var option = {
    animation: false,
    brush: {
        brushLink: 'all',
        xAxisIndex: [],
        yAxisIndex: [],
        inBrush: {
            opacity: 1
        }
    },
    visualMap: {
        type: 'piecewise',
        categories: ["F", "E","D","C","B","A"],
        dimension: CATEGORY_DIM,
        orient: 'horizontal',
        top: 0,
        left: 'center',
        inRange: {
            color: ['#c23531','#2f4554','#61a0a8', '#d48265', '#91c7ae','#749f83']
        },
        outOfRange: {
            color: '#ddd'
        },
        seriesIndex: [0]
    },
    tooltip: {
        trigger: 'item'
    },
    parallelAxis: [
        {dim: 0, name: schema[0].text},
        {dim: 1, name: schema[1].text},
        {dim: 2, name: schema[2].text},
        {dim: 3, name: schema[3].text},
        {dim: 4, name: schema[4].text},
        {dim: 5, name: schema[5].text},
        {dim: 6, name: schema[6].text}

        /*{dim: 5, name: schema[5].text,
            type: 'category', data: [False, True]
        }*/
    ],
    parallel: {
        bottom: '5%',
        left: '5%',
        height: '31%',
        width: '55%',
        parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            splitNumber: 3,
            nameTextStyle: {
                fontSize: 14
            },
            axisLine: {
                lineStyle: {
                    color: '#555'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#555'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#555'
                }
            }
        }
    },
    grid: [],
    xAxis: [],
    yAxis: [],
    series: [
        {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.3
                }
            },
            data: rawData
        }
    ]
};

generateGrids(option);

var myChart = echarts.init(document.getElementById(bidDiv) );
myChart.setOption(option);
}
);
//alert(2);
})("P2_corr","php/LC.php");
//})("P2_corr","data/variables.json");
