from collections import defaultdict

# 查找所有环算法 cf. https://www.freesion.com/article/9695621669/
# 环的数据结构 cf. https://blog.csdn.net/qq_38204302/article/details/104823470
class Graph:
    def __init__(self):
        # for graph
        # self.cyc = []
        self.graph = defaultdict(list)
        self.dfsReset()

    def dfsReset(self):
        # variables for DFS
        self.visitedVertex = []
        self.trace = []
        self.hasCircle = False
        
    def addEdge(self, fromVertex, toVertex):
        self.graph[fromVertex].append(toVertex)
    
    # 该DFS算法与起始点有关
    def dfs(self, starterVertex):
        if(starterVertex in self.visitedVertex):
            if(starterVertex in self.trace):
                self.hasCircle = True
                traceStartIndex = self.trace.index(starterVertex)
                for _i in range(traceStartIndex, len(self.trace)):
                    print(self.trace[_i] + ' ', end='')
                print('\n', end='')
                return
            return
        
        self.visitedVertex.append(starterVertex)
        self.trace.append(starterVertex)

        if (starterVertex != ''):
            childrenGraph = self.graph[starterVertex]
            for _child in childrenGraph:
                self.dfs(_child)
        self.trace.pop()


# g = Graph(7)
# g.addEdge('0', '1')
# g.addEdge('0', '2')
# g.addEdge('1', '3')
# g.addEdge('2', '5')
# g.addEdge('3', '4')
# g.addEdge('4', '2')
# g.addEdge('5', '4')
# g.addEdge('5', '6')
# g.addEdge('6', '0')
# g.addEdge('6', '2')

# g.dfs('1')