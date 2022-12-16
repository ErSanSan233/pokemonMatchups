

// supplement interactions
var isOn = {
    loop: true, //抗克环
    noLoopBidirectional: true, //抗克
    _self: true, //显示为节点
    superEffective: true,
    notVeryEffective: true,
    notEffective: true,
    _freeDrag: false,
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

function switchEffective(_name) {
    isOn[_name] = !isOn[_name];
    createNodes();
    option.series[0].data = pokemonTypeNodes;
    option.series[0].links = pyDictListToLinks(allLinks);
    myChart.setOption(option);
}

var _force = {
    repulsion: 1000,
    layoutAnimation: true,
    gravity: 0.1,
    friction: 0.1,
    edgeLength: [100, 130]
}

var _emphasis = {
    scale: true,
    focus: 'adjacency'
}

function freeDrag() {
    isOn._freeDrag = !isOn._freeDrag;
    if (isOn._freeDrag) {
        option.series[0].force = {
            repulsion: 0,
            layoutAnimation: true,
            gravity: 0,
            friction: 0.1,
            edgeLength: [100, 130]
        };

        option.series[0].emphasis = {
            scale: true,
            focus: 'none'
        }

    } else {
        option.series[0].force = _force;
        option.series[0].emphasis = _emphasis;
    }
    option.series[0].links = pyDictListToLinks(allLinks);
    myChart.setOption(option);
}

// nodes
function selfBorderColor(_type) {
    var _color;
    if (!isOn._self) return _color;
    selfMatchups.forEach((matchup) => {
        if (matchup.from == _type) {
            switch (matchup.effect) {
                case '效果绝佳':
                    _color = 'green';
                    break;
                case '效果不好':
                    _color = 'red';
                    break;
                case '没有效果':
                    _color = 'black';
                    break;
                default:
                    _color = 'yellow';
            }
        }
    });

    return _color;
}

function createNodes() {
    pokemonTypeNodes = [];
    pokemonTypeCategories = [];

    for (var i = 0; i < typeList.length; i++) {
        pokemonTypeNodes.push({
            name: typeList[i],
            category: typeList[i],
            itemStyle: {
                borderColor: selfBorderColor(typeList[i]),
                borderWidth: 5,
                borderType: 'dotted'
            }
        })

        pokemonTypeCategories.push({
            name: typeList[i],
        })
    }
}

// links
function loopLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'purple',
            width: 3,
            // curveness: 0.2
        };
    } else {
        return {
            color: 'purple',
            width: 2,
            // curveness: 0.2,
            opacity: 0.1,
        };
    }
}

function noLoopBidirectionalLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'blue',
            width: 3,
        };
    } else {
        return {
            color: 'blue',
            width: 2,
            opacity: 0.1,
        };
    }
}

function superEffectiveLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'green',
            width: 3,
            // curveness: 0.1
        };
    } else {
        return {
            color: 'green',
            width: 2,
            opacity: 0.1,
            // curveness: 0.1,
        };
    }
}

function notVeryEffectiveLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'red',
            width: 3,
            // curveness: 0.1,
        };
    } else {
        return {
            color: 'red',
            width: 2,
            // curveness: 0.1,
            opacity: 0.1,
        };
    }
}

function notEffectiveLineStyle(_isOn) {
    if (_isOn) {
        return {
            color: 'black',
            type: 'dashed',
            width: 3,
            curveness: 0.1,

        };
    } else {
        return {
            color: 'grey',
            type: 'dashed',
            width: 2,
            curveness: 0.1,
            opacity: 0.1,
        };
    }
}

var defaultLineStyle = {

}

function createLink(_fromNode, _toNode, _effect) {
    var _linkType = function () {
        switch (_effect) {
            case '抗克环':
                return {
                    lineStyle: loopLineStyle(isOn.loop),
                    ignoreForceLayout: isOn._freeDrag | !isOn.loop
                };
                break;
            case '抗克':
                return {
                    lineStyle: noLoopBidirectionalLineStyle(isOn.noLoopBidirectional),
                    ignoreForceLayout: isOn._freeDrag | !isOn.noLoopBidirectional
                };
                break;
            case '效果绝佳':
                return {
                    lineStyle: superEffectiveLineStyle(isOn.superEffective),
                    ignoreForceLayout: isOn._freeDrag | !isOn.superEffective
                };
                break;
            case '效果不好':
                return {
                    lineStyle: notVeryEffectiveLineStyle(isOn.notVeryEffective),
                    ignoreForceLayout: isOn._freeDrag | !isOn.notVeryEffective
                };
                break;
            case '没有效果':
                return {
                    lineStyle: notEffectiveLineStyle(isOn.notEffective),
                    ignoreForceLayout: isOn._freeDrag | !isOn.notEffective
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

// graph
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};
var option;

var allLinks = ordinaryMatchups.concat(selfMatchups).concat(loopMatchups).concat(noLoopBidirectionalMatchups);
var pokemonTypeNodes = [];
var pokemonTypeCategories = [];

createNodes();
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

            //nodes
            symbolSize: 40,
            label: {
                show: true,
            },
            roam: true,
            draggable: true,
            emphasis: _emphasis,

            //links
            edgeSymbol: ['', 'arrow'],
            force: _force,

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