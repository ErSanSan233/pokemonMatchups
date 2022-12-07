#! /usr/bin/env python3
# _*_ coding: utf-8 _*_

import pandas as pd
import graphDfs

pd.set_option('display.unicode.east_asian_width', True)
typeMatchups = pd.read_csv("typeMatchups/typeMatchups.csv")
typeList = typeMatchups.to.unique()
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
bidirectionalEffect.getNonLoopGraph()

# 自指关系，即自己打自己时的特殊关系
selfAttack = []
for _attack in matchupDictList:
    if _attack['from'] == _attack['to']:
        selfAttack.append(_attack)

for _ in selfAttack:
    matchupDictList.remove(_)

print(f'Self Attack  : {len(selfAttack)}')
print(f'>Current Left: {len(matchupDictList)}')

print()
