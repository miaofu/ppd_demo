
(function (bidDiv){

option = {
    title : {
        text: '性别分布',
        textStyle:{"fontFamily":"Georgia"},
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []//['Null','男','女','保密']
    },
    series : [
        {
            name: 'Gender',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:221946, name:'男'},
                {value:106607, name:'女'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

var myChart = echarts.init(document.getElementById(bidDiv) );
myChart.setOption(option);
})("P2_user_stat_gender");

(function (bidDiv,datapath){
$.get(datapath).done(function (data) {
    data = JSON.parse(data)
    option = {
    title : {
        text: '年龄分布图',
        subtext: '数据来源：LC'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['年龄']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : data["keys"]//['1月','2月','3月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'年龄',
            type:'bar',
            data:data["values"],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};
                    
                    
var myChart = echarts.init(document.getElementById(bidDiv) );
myChart.setOption(option);
});
})("P2_user_stat_province","http://diting.tech/ppd/php/userstat.php");


(function(bidDiv){
    option = {
    title: {
        text: ''
            },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data: ['<=A','<=B','<=C','<=D','<=E','<=F'],
        textStyle:{"fontFamily":"Georgia"},

    },
    series: [
        {
            name: 'process',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
                normal: {
                    formatter: '{b}'
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}: {c}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7
                }
            },
            data: [
                {value: 3, name: '<=A'},
                {value: 13, name: '<=B'},
                {value: 53, name: '<=C'},
                {value: 94, name: '<=D'},
                {value: 99, name: '<=E'},
                 {value: 100, name: '<=F'}
            ]
        }
    ]
};
var myChart = echarts.init(document.getElementById(bidDiv) );
myChart.setOption(option);

})("P2_user_stat_possess");
/*
(function (bidDiv,datapath){
$.get(datapath).done(function (data) {
option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:data["type"],
                textStyle:{"fontFamily":"Georgia"}

    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : data["category"]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : data["data"]
};
var myChart = echarts.init(document.getElementById(bidDiv) );
myChart.setOption(option);
});
})("P2_user_stat_count","data/user_stat_count.json");
*/
