// graph
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};
var option;

// nodes
var pokemonTypeNodes = [];
var pokemonTypeCategories = [];

function selfBorderColor(_type){
    //TODO
    return 'green'
}

for (var i = 0; i < typeList.length; i++) {
    pokemonTypeNodes.push({
        name: typeList[i],
        category: typeList[i],
        itemStyle: {
            borderColor: selfBorderColor(),
            borderWidth: 3,
            lineStyle: 'dashed'
        }
    })

    pokemonTypeCategories.push({
        name: typeList[i],
    })
}

// supplement interactions
var isOn = {
    loop: true, //抗克环
    noLoopBidirectional: true, //抗克
    self: true, //显示为节点
    superEffective: true,
    notVeryEffective: true,
    notEffective: true,
}

//TODO
function switchEffective(_name){
    isOn[_name] = !isOn[_name];
    option.series[0].links = pyDictListToLinks(allLinks);
    myChart.setOption(option);
}

// links
function loopLineStyle(_isOn){
    if (_isOn) {
        return {
            color: 'purple',
            width: 3,
            curveness: 0.2
        };
    } else {
        return {
            color: 'purple',
            width: 1,
            curveness: 0.2,
            opacity: 0.3,
        };
    }
}

function noLoopBidirectionalLineStyle(_isOn){
    if (_isOn) {
        return {
            color: 'blue',
            width: 3,
            curveness: 0.1
        };
    } else {
        return {
            color: 'blue',
            width: 1,
            curveness: 0.1,
            opacity: 0.3,
        };
    }
}

function superEffectiveLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'green',
            width: 3,
        };
    } else {
        return {
            color: 'green',
            width: 1,
            opacity: 0.3,
        };
    }
}

function notVeryEffectiveLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'red',
            width: 3,
        };
    } else {
        return {
            color: 'red',
            width: 1,
            opacity: 0.3,
        };
    }
}

function notEffectiveLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'black',
            type: 'dashed',
            width: 3,
            curveness: 0.2,
            
        };
    } else {
        return {
            color: 'grey',
            type: 'dashed',
            width: 1,
            curveness: 0.2,
            opacity: 0.3,
        };
    }
}

var defaultLineStyle = {

}

// tests
// var links = [
//     { source: '格斗', target: '一般', lineStyle: superEffectiveLineStyle },
// ];

function createLink(_fromNode, _toNode, _effect) {
    var _linkType = function () {
        switch (_effect) {
            case '抗克环':
                return {
                    lineStyle: loopLineStyle(isOn.loop),
                    ignoreForceLayout: !isOn.loop
                };
                break;
            case '抗克':
                return {
                    lineStyle: noLoopBidirectionalLineStyle(isOn.noLoopBidirectional),
                    ignoreForceLayout: !isOn.noLoopBidirectional
                };
                break;
            case '效果绝佳':
                return {
                    lineStyle: superEffectiveLineStyle(isOn.superEffective),
                    ignoreForceLayout: !isOn.superEffective
                };
                break;
            case '效果不好':
                return {
                    lineStyle: notVeryEffectiveLineStyle(isOn.notVeryEffective),
                    ignoreForceLayout: !isOn.notVeryEffective
                };
                break;
            case '没有效果':
                return {
                    lineStyle: notEffectiveLineStyle(isOn.notEffective),
                    ignoreForceLayout: !isOn.notEffective
                };
                break;
            default:
                return { lineStyle: defaultLineStyle, ignoreForceLayout: true };
        }
    }

    return {
        source: _fromNode,
        target: _toNode,
        lineStyle: _linkType().lineStyle,
        ignoreForceLayout: _linkType().ignoreForceLayout,
    };
}

function pyDictListToLinks(pyDictList) {
    var _links = [];
    pyDictList.forEach(item => {
        _links.push(
            createLink(item.from, item.to, item.effect)
        );
    });
    return _links;
}

var allLinks = ordinaryMatchups.concat(selfMatchups).concat(loopMatchups).concat(noLoopBidirectionalMatchups);

//TODO: 属性自己和自己相克的逻辑
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
            layout: 'force',
            // layout: 'circular',
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
            links: pyDictListToLinks(allLinks),//links,
        }
    ]
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);