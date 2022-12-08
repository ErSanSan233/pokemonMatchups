var dom = document.getElementById('container');

var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var option;



var linkTypeList = {
    double: 'x2',
    half: 'x0.5',
    normal: 'x1',
    useless: 'x0'
};

// 不同系的属性自己打自己有3种情况
var pokemonTypeNodes = [];
var pokemonTypeCategories = [];

// nodes
for (var i = 0; i < typeList.length; i++) {
    pokemonTypeNodes.push({
        name: typeList[i] + '攻',
        category: typeList[i],
    })

    pokemonTypeNodes.push({
        name: typeList[i] + '防',
        category: typeList[i],
    })

    pokemonTypeCategories.push({
        name: typeList[i],
    })
}

// x2 links
var x2LineStyle = {
    color: 'green',
    width: 2,
    curveness: 0, //节点连线的曲率，0-1 越大越弯。

};

// x0.5 links
// var halfLineStyle = {
//     color: 'red',
//     width: 2,
//     curveness: 0,
// };

var links = [
    { source: '格斗攻', target: '一般防', lineStyle: x2LineStyle },
    // { source: '水攻', target: '火防', lineStyle: x2LineStyle },
    // { source: '地面攻', target: '火防', lineStyle: x2LineStyle },
    // { source: '岩石攻', target: '火防', lineStyle: x2LineStyle },
    // { source: '电攻', target: '水防', lineStyle: x2LineStyle },
    // { source: '草攻', target: '水防', lineStyle: x2LineStyle },
    // { source: '地面攻', target: '电防', lineStyle: x2LineStyle },
    // { source: '火攻', target: '草防', lineStyle: x2LineStyle },
    // { source: '冰攻', target: '草防', lineStyle: x2LineStyle },
    // { source: '毒攻', target: '草防', lineStyle: x2LineStyle },
    // { source: '飞行攻', target: '草防', lineStyle: x2LineStyle },
    // { source: '虫攻', target: '草防', lineStyle: x2LineStyle },
    // { source: '火攻', target: '冰防', lineStyle: x2LineStyle },
    // { source: '格斗攻', target: '冰防', lineStyle: x2LineStyle },
    // { source: '岩石攻', target: '冰防', lineStyle: x2LineStyle },
    // { source: '钢攻', target: '冰防', lineStyle: x2LineStyle },
    // { source: '飞行攻', target: '格斗防', lineStyle: x2LineStyle },
    // { source: '超能攻', target: '格斗防', lineStyle: x2LineStyle },
    // { source: '妖精攻', target: '格斗防', lineStyle: x2LineStyle },
    // { source: '地面攻', target: '毒防', lineStyle: x2LineStyle },
    // { source: '超能攻', target: '毒防', lineStyle: x2LineStyle },
    // { source: '水攻', target: '地面防', lineStyle: x2LineStyle },
    // { source: '草攻', target: '地面防', lineStyle: x2LineStyle },
    // { source: '冰攻', target: '地面防', lineStyle: x2LineStyle },
    // { source: '电攻', target: '飞行防', lineStyle: x2LineStyle },
    // { source: '冰攻', target: '飞行防', lineStyle: x2LineStyle },
    // { source: '岩石攻', target: '飞行防', lineStyle: x2LineStyle },
    // { source: '虫攻', target: '超能防', lineStyle: x2LineStyle },
    // { source: '幽灵攻', target: '超能防', lineStyle: x2LineStyle },
    // { source: '恶攻', target: '超能防', lineStyle: x2LineStyle },
    // { source: '火攻', target: '虫防', lineStyle: x2LineStyle },
    // { source: '飞行攻', target: '虫防', lineStyle: x2LineStyle },
    // { source: '岩石攻', target: '虫防', lineStyle: x2LineStyle },
    // { source: '水攻', target: '岩石防', lineStyle: x2LineStyle },
    // { source: '草攻', target: '岩石防', lineStyle: x2LineStyle },
    // { source: '格斗攻', target: '岩石防', lineStyle: x2LineStyle },
    // { source: '地面攻', target: '岩石防', lineStyle: x2LineStyle },
    // { source: '钢攻', target: '岩石防', lineStyle: x2LineStyle },
    // { source: '幽灵攻', target: '幽灵防', lineStyle: x2LineStyle },
    // { source: '恶攻', target: '幽灵防', lineStyle: x2LineStyle },
    // { source: '冰攻', target: '龙防', lineStyle: x2LineStyle },
    // { source: '龙攻', target: '龙防', lineStyle: x2LineStyle },
    // { source: '妖精攻', target: '龙防', lineStyle: x2LineStyle },
    // { source: '格斗攻', target: '恶防', lineStyle: x2LineStyle },
    // { source: '虫攻', target: '恶防', lineStyle: x2LineStyle },
    // { source: '妖精攻', target: '恶防', lineStyle: x2LineStyle },
    // { source: '火攻', target: '钢防', lineStyle: x2LineStyle },
    // { source: '格斗攻', target: '钢防', lineStyle: x2LineStyle },
    // { source: '地面攻', target: '钢防', lineStyle: x2LineStyle },
    // { source: '毒攻', target: '妖精防', lineStyle: x2LineStyle },
    // { source: '钢攻', target: '妖精防', lineStyle: x2LineStyle },
    // { source: '火攻', target: '火防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '火防', lineStyle: halfLineStyle },
    // { source: '冰攻', target: '火防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '火防', lineStyle: halfLineStyle },
    // { source: '钢攻', target: '火防', lineStyle: halfLineStyle },
    // { source: '妖精攻', target: '火防', lineStyle: halfLineStyle },
    // { source: '火攻', target: '水防', lineStyle: halfLineStyle },
    // { source: '水攻', target: '水防', lineStyle: halfLineStyle },
    // { source: '冰攻', target: '水防', lineStyle: halfLineStyle },
    // { source: '钢攻', target: '水防', lineStyle: halfLineStyle },
    // { source: '电攻', target: '电防', lineStyle: halfLineStyle },
    // { source: '飞行攻', target: '电防', lineStyle: halfLineStyle },
    // { source: '钢攻', target: '电防', lineStyle: halfLineStyle },
    // { source: '水攻', target: '草防', lineStyle: halfLineStyle },
    // { source: '电攻', target: '草防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '草防', lineStyle: halfLineStyle },
    // { source: '地面攻', target: '草防', lineStyle: halfLineStyle },
    // { source: '冰攻', target: '冰防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '格斗防', lineStyle: halfLineStyle },
    // { source: '岩石攻', target: '格斗防', lineStyle: halfLineStyle },
    // { source: '恶攻', target: '格斗防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '毒防', lineStyle: halfLineStyle },
    // { source: '格斗攻', target: '毒防', lineStyle: halfLineStyle },
    // { source: '毒攻', target: '毒防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '毒防', lineStyle: halfLineStyle },
    // { source: '毒攻', target: '地面防', lineStyle: halfLineStyle },
    // { source: '岩石攻', target: '地面防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '飞行防', lineStyle: halfLineStyle },
    // { source: '格斗攻', target: '飞行防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '飞行防', lineStyle: halfLineStyle },
    // { source: '格斗攻', target: '超能防', lineStyle: halfLineStyle },
    // { source: '超能攻', target: '超能防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '虫防', lineStyle: halfLineStyle },
    // { source: '格斗攻', target: '虫防', lineStyle: halfLineStyle },
    // { source: '地面攻', target: '虫防', lineStyle: halfLineStyle },
    // { source: '一般攻', target: '岩石防', lineStyle: halfLineStyle },
    // { source: '火攻', target: '岩石防', lineStyle: halfLineStyle },
    // { source: '毒攻', target: '岩石防', lineStyle: halfLineStyle },
    // { source: '飞行攻', target: '岩石防', lineStyle: halfLineStyle },
    // { source: '毒攻', target: '幽灵防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '幽灵防', lineStyle: halfLineStyle },
    // { source: '火攻', target: '龙防', lineStyle: halfLineStyle },
    // { source: '水攻', target: '龙防', lineStyle: halfLineStyle },
    // { source: '电攻', target: '龙防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '龙防', lineStyle: halfLineStyle },
    // { source: '幽灵攻', target: '恶防', lineStyle: halfLineStyle },
    // { source: '恶攻', target: '恶防', lineStyle: halfLineStyle },
    // { source: '一般攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '草攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '冰攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '飞行攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '超能攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '岩石攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '龙攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '钢攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '妖精攻', target: '钢防', lineStyle: halfLineStyle },
    // { source: '格斗攻', target: '妖精防', lineStyle: halfLineStyle },
    // { source: '虫攻', target: '妖精防', lineStyle: halfLineStyle },
    // { source: '恶攻', target: '妖精防', lineStyle: halfLineStyle },
];



function createLink(fromNode, toNode, linkType) {
    return {
        source: fromNode,
        target: toNode,
    }
}


//TODO 属性自己和自己相克的逻辑


option = {
    color: typeColor,

    title: {
        text: '属性相克表'
    },

    legend: [
        {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            data: typeList,
        }
    ],

    series: [
        {
            type: 'graph',
            // layout: 'force',
            layout: 'circular',
            categories: pokemonTypeCategories,
            legendHoverLink: false, // 这一项似乎有bug？不管hover哪个legend高亮的都一样
            //legendHoverLink: true, 


            //节点
            symbolSize: 40,
            label: {
                show: true,
            },
            roam: true,
            draggable: true,
            emphasis: {
                scale: false,
                focus: 'adjacency'
            },

            //连线
            edgeSymbol: ['', 'arrow'],
            force: {
                repulsion: 800, //节点间斥力
                layoutAnimation: true,
                friction: 0.3, //刷新时节点的移动速度，越大越快，0 - 1 之间
                edgeLength: [100, 130] //两节点之间的距离
            },

            //数据
            data: pokemonTypeNodes,
            links: links,
        }
    ]
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);