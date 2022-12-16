from collections import defaultdict
import copy

def removeEmptyKeys(_dict:dict):
    _result = copy.deepcopy(_dict)
    for _key in _dict:
        if len(_dict[_key]) == 0:
            del _result[_key]
    return _result

# 图的数据结构 cf. https://blog.csdn.net/qq_38204302/article/details/104823470
class Graph:
    def __init__(self):
        # for graph
        self.graph = defaultdict(list)
        self.loops = []
        self.dfsReset()

    def dfsReset(self):
        # variables for DFS
        self.visitedVertex = []
        self.trace = []
        self.hasCircle = False
        
    def addEdge(self, fromVertex, toVertex):
        self.graph[fromVertex].append(toVertex)

    # 判断环方法 by https://www.zhihu.com/question/436242943/answer/1646563490
    def isEqualLoop(self, arr1:list, arr2:list):
        if (arr1 is None) or (arr2 is None):
            return False
        count1 = [arr1.count(x) for x in sorted(set(arr1))]
        count2 = [arr2.count(x) for x in sorted(set(arr2))]
        if count1 != count2:
            return False
        first_item = arr1[0]
        count = arr2.count(first_item)
        if arr2[0] == first_item:
            if arr1 == arr2:
                return True
            count -= 1
        for _ in range(count):
            index = arr2[1:].index(first_item) + 1
            part1 = arr2[index:]
            part2 = arr2[:index]
            part1.extend(part2)
            arr2 = part1
            if arr1 == arr2:
                return True
        return False

    def addLoop(self, newList:list):
        for _loop in self.loops:
            if self.isEqualLoop(_loop, newList):
                return
        self.loops.append(newList)
    
    # 查找所有环 cf. https://www.freesion.com/article/9695621669/
    # 该DFS算法与起始点有关，所以需要遍历各种起始点
    def dfs(self, starterVertex):
        if(starterVertex in self.visitedVertex):
            if(starterVertex in self.trace):
                self.hasCircle = True
                traceStartIndex = self.trace.index(starterVertex)
                traceBuffer = []
                for _i in range(traceStartIndex, len(self.trace)):
                    # print(self.trace[_i] + ' ', end='')
                    traceBuffer.append(self.trace[_i])
                # print('\n', end='')
                self.addLoop(traceBuffer)
                traceBuffer = []
            return
        
        self.visitedVertex.append(starterVertex)
        self.trace.append(starterVertex)

        if (starterVertex != ''):
            childrenGraph = self.graph[starterVertex]
            for _child in childrenGraph:
                self.dfs(_child)
        self.trace.pop()

    def findAllLoops(self, _vertexList:list):
        for _vertex in _vertexList:
            self.dfsReset()
            self.dfs(_vertex)
        return self.loops
    
    def toDict(self, _graph, _effect):
        _dict = []
        for _from in _graph:
            for _to in _graph[_from]:
                _dict.append({'from': _from, 'to':_to, 'effect': _effect})
        return _dict

    #分离在环中和不在环中的Graph
    def getSplitGraph(self):
        _loopGraph = Graph()
        nonLoopGraph = copy.deepcopy(self.graph)
        _pairs = set()
        for _loop in self.loops:
            for _i in range(0, len(_loop)):
                _pairs.add(tuple([_loop[_i - 1], _loop[_i]])) # list is unhashable
                if _loop[_i] in nonLoopGraph[_loop[_i - 1]]:
                    nonLoopGraph[_loop[_i - 1]].remove(_loop[_i])
                    _loopGraph.addEdge(_loop[_i-1], _loop[_i])

        nonLoopGraph=removeEmptyKeys(nonLoopGraph)
            
        return {
            'loop': _loopGraph.graph,
            'nonLoop': nonLoopGraph
        }