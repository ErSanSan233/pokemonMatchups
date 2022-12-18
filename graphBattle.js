
// supplement interactions
function pyDictListToLinks(pyDictList) {
    var _links = [];
    pyDictList.forEach(item => {
        _links.push(createLink(
                fromNode(item.from),
                item.to,
                item.effect));

        _links.push(createLink(
            item.from,
            toNode(item.to),
            item.effect));
    });
    return _links;
}

// nodes
let xFrom = 0;
let x = 200;
let xTo = 400;

let yFrom = 0;
let yStep = 20;

function fromNode(_type) {
    return 'from' + _type;
}

function toNode(_type) {
    return 'to' + _type;
}

function createNodes() {
    pokemonTypeNodes = [];
    pokemonTypeCategories = [];

    for (var i = 0; i < typeList.length; i++) {
        var _y = yFrom + i * yStep;
        pokemonTypeNodes.push({
            name: typeList[i],
            category: typeList[i],
            x: x,
            y: _y,
            itemStyle: {

            }
        });

        pokemonTypeNodes.push({
            name: fromNode(typeList[i]),
            x: xFrom,
            y: _y,
            itemStyle: {
                color: typeColor[i],
            }
        });

        pokemonTypeNodes.push({
            name: toNode(typeList[i]),
            x: xTo,
            y: _y,
            itemStyle: {
                color: typeColor[i],
            }
        });

        pokemonTypeCategories.push({
            name: typeList[i],
        });
    }
}

// links
function superEffectiveLineStyle() {
    return {
        color: 'green',
        // width: 3,
    };
}

function notVeryEffectiveLineStyle() {
    return {
        color: 'red',
        // width: 3,
    };
}

function notEffectiveLineStyle() {
    return {
        color: 'black',
        type: 'dashed',
        // width: 3,
    };
}

function createLink(_fromNode, _toNode, _effect) {
    var _linkType = function () {
        switch (_effect) {
            case '效果绝佳':
                return superEffectiveLineStyle();
                break;
            case '效果不好':
                return notVeryEffectiveLineStyle();
                break;
            case '没有效果':
                return notEffectiveLineStyle();
                break;
            default:
                return {};
        }
    }

    return {
        source: _fromNode,
        target: _toNode,
        lineStyle: _linkType(),
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

var allLinks = allMatchups;
var pokemonTypeNodes = [];
var pokemonTypeCategories = [];

createNodes();
option = {
    color: typeColor,
    title: {
        text: '属性相克表：易于理解的版本'
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
            layout: 'none',
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
            emphasis: {
                scale: true,
                focus: 'adjacency'
            },

            //links
            edgeSymbol: ['', 'arrow'],
            force: {
                repulsion: 1000,
                layoutAnimation: true,
                gravity: 0.1,
                friction: 0.1,
                edgeLength: [100, 130]
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