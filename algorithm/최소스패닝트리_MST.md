# 최소스패닝트리 (Minimum Spanning Tree)

> https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html
>
> https://gmlwjd9405.github.io/2018/08/29/algorithm-kruskal-mst.html
>
> https://www.fun-coding.org/Chapter20-prim-live.html
>
> https://www.fun-coding.org/Chapter20-kruskal-live.html
>
> https://chanhuiseok.github.io/posts/algo-33/

- 주어진 그래프의 모든 정점을 연결하는 부분 그래프 중에 그 가중치의 합이 최소인 트리

## 해결방안

### Kruskal 알고리즘

- 시간복잡도 O(elog2e)
  - e는 edge
  - **간선들을 정렬하는 시간에 좌우됨**
  - 그래프 내에 **적은 숫자의 간선**만을 가지는 희소 그래프 (Sparse Graph)의 경우 적합

- Greedy(그리디) 이용하여 네트워크의 모든 정점을 최소 비용으로 연결하는 최적 해답 찾는 방식

- 각 단계에서 **사이클을 이루지 않는 최소 비용 간선 선택**
  
- 간선 선택을 기반으로 하는 알고리즘
  
- 이전 단계에서 만들어진 신장 트리와는 상관없이 무조건 **최선의 간선**만을 선택

- 조건

  - 본래의 그래프의 모든 노드를 포함해야 함
  - 모든 노드가 서로 연결되어야 함
  - 트리의 속성을 만족시켜야 함

- 과정
  1. 그래프의 간선들을 가중치의 오름차순으로 정렬
  2. 정렬된 간선 리스트에서 순서대로 **사이클을 형성하지 않는 간선**을 선택
     - 가장 낮은 가중치를 먼저 선택
- 사이클을 형성하는 간선은 제외
     - **사이클을 형성하는지 체크해야 함**
       - union - find를 이용하여 간선 양끝 정점이 같은 집합에 속해 있는지 확인
  3. 해당 간선을 현재의 MST 집합에 추가

- 코드 예시

  - 각 노드에 대해서 집합 초기화 : O(V)

  - 모든 간선을 비용을 기준으로 정렬 및 비용이 작은 간선부터 양 끝의 정점 비교

    => 퀵소트 이용시 O(nlogn) => O(ElogE)

  - 두 정점의 최상위 정점을 확인하고, 서로 다를 경우 두 정점 연결: O(E)

  - 따라서 최악의 경우인 **O(ElogE)**가 시간 복잡도가 됨

  ```python
  # https://www.fun-coding.org/Chapter20-kruskal-live.html
  parent = dict() # root 역할
  rank = dict()
  
  def find(x):
      if parent[x] != x:
          parent[x] = find(parent[x])
          return parent[x]
      else:
          return x
  
  def union(x, y):
      root1 = find(x)
      root2 = find(y)
      # rank가 더 높은 쪽을 parent로 삼음
      if rank[root1] > rank[root2]:
          parent[root2] = root1
      else:
          parent[root1] = root2
          if rank[root1] == rank[root2]:
              rank[root2] += 1
  def make_set(node):
      parent[node] = node
      rank[node] = 0
  
  def kruskal(graph):
      mst = list()
      # 초기화
      for node in graph['vertices']:
          make_set(node)
  
      edges = graph['edges']
      edges.sort()
  
      for edge in edges:
          weight, node_v, node_u = edge
          if find(node_v) != find(node_u):
              union(node_v, node_u)
              mst.append(edge)
      return mst
  
  
  print(val)
  ```

  

### Prim 알고리즘

- 시간복잡도 O(n^2)
  - n은 정점의 갯수
  - 그래프에 **간선이 많이 존재**하는 밀집 그래프 (Dense Graph)의 경우 적합
  
- 하지만 **최소힙**을 이용하는 경우 시간 복잡도을 O(ElogN) 으로 줄일 수 있음
  
- 시작 정점에서 출발하여 신장트리 집합을 단계적으로 확장해나가는 방법
  - **정점 선택 기반**
  - **이전 단계**에서 만들어진 신장트리 **확장**
  
- 과정
  1. 시작 단계에서는 **시작 정점**만이 MST 집합에 포함됨
     - 무엇을 넣든 관계 없음
  2. 앞 단계에서 만들어진 MST 집합에 인접한 정점들중에서 **최소 간선**으로 연결된 정점을 선택하여 트리 확장
     - 가장 낮은 가중치를 선택
  3. 위의 과정을 트리가 N-1개의 간선을 가질때까지 반복 혹은 들어있는 노드의 갯수가 전체 노드의 갯수와 일치할때까지 수행해도 됨

- 코드 예시

  - 최초 key 생성 시간 복잡도 O(V)
  
  - while 구문 시간복잡도 (O(V)) * 최소 힙에서 노드 정보 추출 시(pop)의 시간 복잡도 (O(logV))
  
    => O(VlogV)
  
  - for 구문의 시간 복잡도 O(ElogV)
  
    - while 구문 반복시에 결과적으로 간선의 수 만큼 수행 : O(E)
    - 노드에 값이 없을 경우 heap에 삽입할때마다 수행되는 시간 복잡도 : O(logV)
  
    => O(E) * O(logV) = O(ElogV)
  
  - 따라서 총 시간 복잡도는 가장 최악의 경우인 **O(ElogV)**가 됨
  
  ```python
  # https://makefortune2.tistory.com/37
  # https://www.fun-coding.org/Chapter20-prim-live.html
  import sys
  import heapq
  from collections import defaultdict
  input = sys.stdin.readline
  v, e = map(int, input().split())
  # e개의 입력
  # 튜플의 리스트로 저장하는데 (가중치, 노드)
  # 양방향 넣어 줘야 함
  d = defaultdict(list)
  for _ in range(e):
      a, b, c = map(int, input().split())
      heapq.heappush(d[a], (c, b))
      heapq.heappush(d[b], (c, a))
  
  val = 0
	# priority Queue 이용
  q = []
  nodes = {1}
  q.extend(d[1])
  # 가능 => 기존의 다른 코드에서는 while q: 사용하지만 시간 복잡도의 경우는 `len(nodes) < v` 가 훨씬 빠름
  while len(nodes) < v:
      cost, des = heapq.heappop(q)
      if des in nodes:
          continue
      nodes.add(des)
      val += cost
      for edge in d[des]:
          if edge[1] not in nodes:
              heapq.heappush(q, edge)
  print(val)

  ```