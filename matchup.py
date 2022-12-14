#! /usr/bin/env python3
# _*_ coding: utf-8 _*_

import pandas as pd
import graphDfs
import simplejson as json

pd.set_option('display.unicode.east_asian_width', True)
typeMatchups = pd.read_csv("typeMatchups/typeMatchups.csv")
typeList = typeMatchups.to.unique().tolist()
matchupDictList = typeMatchups.to_dict('records')

# TODO 属性相克的邻接矩阵，用于核对CSV的数据是否正确

print(f'Total Effect : {len(matchupDictList)}')

# 克抗关系，即A对B效果绝佳，B对A效果不好
bidirectionalEffect = graphDfs.Graph()
toRemove = []
for _attack in matchupDictList:
    for _defence in matchupDictList:
        if _attack['from'] == _defence['to'] and _attack['to'] == _defence['from'] and \
            _attack['effect'] == '效果绝佳' and _defence['effect'] == '效果不好':
            bidirectionalEffect.addEdge(_attack['from'], _attack['to'])

            # 总列表中删掉克抗关系需要在循环后进行
            toRemove.append(_attack)
            toRemove.append(_defence)

for _ in toRemove:
    matchupDictList.remove(_)

print(f'Bidirectional: {len(toRemove)}')
print(f'>Current Left: {len(matchupDictList)}')
bidirectionalEffect.findAllLoops(typeList)  

loops = bidirectionalEffect.toDict(bidirectionalEffect.getSplitGraph()['loop'], '抗克环')
nonloops = bidirectionalEffect.toDict(bidirectionalEffect.getSplitGraph()['nonLoop'], '抗克')
# print(loops)
# print(nonloops)

# 自指关系，即自己打自己时的特殊关系
selfAttack = []
for _attack in matchupDictList:
    if _attack['from'] == _attack['to']:
        selfAttack.append(_attack)
# print(selfAttack)

for _ in selfAttack:
    matchupDictList.remove(_)

# json件导入查了半天没搞明白，直接写成js文件
with open('typeMatchups/ordinaryMatchups.js', 'w') as f:
    f.write('var ordinaryMatchups = ')
    json.dump(matchupDictList, f)
    f.write(';')

print(f'Self Attack  : {len(selfAttack)}')
print(f'>Current Left: {len(matchupDictList)}')

print()
