module.exports = {
    bar: {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            },
            marginTop: 80,
            marginRight: 40
        },
        title: {
            text: '消费数据统计'
        },
        xAxis: {
            categories: ['螺狮粉', '海底捞', '米线', '香肠', '香蕉']
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '消费收入'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
        series: [{
            name: '小张',
            data: [5, 3, 4, 7, 2],
            stack: 'male'
        }, {
            name: '小王',
            data: [3, 4, 4, 2, 5],
            stack: 'male'
        }, {
            name: '小彭',
            data: [2, 5, 6, 2, 1],
            stack: 'female'
        }, {
            name: '小潘',
            data: [3, 0, 4, 4, 3],
            stack: 'female'
        }]
      }
   }