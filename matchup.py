#! /usr/bin/env python3
# _*_ coding: utf-8 _*_

import pandas as pd
import dfsTest

pd.set_option('display.unicode.east_asian_width', True)
typeMatchups = pd.read_csv("typeMatchups/typeMatchups.csv")
typeArray = typeMatchups.to.unique()
matchupDictArray = typeMatchups.to_dict('records')

# TODO 属性相克的邻接矩阵，用于核对CSV的数据是否正确

# 克抗关系，即A对B效果绝佳，B对A效果不好
bidirectionalEffect = dfsTest.Graph()
for _attack in matchupDictArray:
    for _defence in matchupDictArray:
        if _attack['from'] == _defence['to'] and _attack['to'] == _defence['from'] and \
            _attack['effect'] == '效果绝佳' and _defence['effect'] == '效果不好':
            bidirectionalEffect.addEdge(_attack['from'], _attack['to'])

for _type in typeArray:
    bidirectionalEffect.dfs(_type)
    print('======')
    bidirectionalEffect.dfsReset()
