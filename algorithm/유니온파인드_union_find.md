# Union Find (유니온 파인드)

> https://gmlwjd9405.github.io/2018/08/31/algorithm-union-find.html
>
> https://ssungkang.tistory.com/entry/Algorithm-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9CUnion-Find

- Kruskal 알고리즘을 구현할때 사용됨

- **Disjoint Set**을 표현할때, 사용하는 알고리즘으로 트리 구조를 활용하는 알고리즘
  - **노드들 중에 연결된 노드를 찾거나, 노드들을 서로 연결(합칠)때 사용**
  - Disjoint Set
    - **서로 중복되지 않는 부분집합**들로 나눠진 원소들에 대한 정보를 저장하고 조작하는 자료 구조
    - 공통 원소가 없는 **서로소**로 나눠진 원소들에 대한 자료구조
    - Disjoint Set = **서로소 집합 자료구조**
- Disjoint Set 구현
  - **트리구조**를 이용하여 구현

### find 연산

- find(x)

  - x가 어떤 집합에 속해 있는지 찾는 연산
  - O(N)

- 구현

  ```python
  # 초기화
  max = 10000000
  root = [i for i in range(max)]
  
  # 재귀 사용
  def find(x):
      if root[x] == x:
          return x
      else:
          # 경로 압축 (Path Compression)
          # find하면서 만난 모든 값의 부모 노드를 root로 만든다
          root[x] = find(root[x])
          return root[x]
  ```

  

### union 연산

- union(x, y)
  - x와 y가 속한 집합을 합치는 연산
  - O(N-1)

- 구현

  - union 연산 최적화
    - union by rank (union by height)
  - rank에 트리의 높이를 저장
  - **항상 높이가 더 낮은 트리를 높은 트리 밑에 넣음**
    - 트리가 계속 깊어지는 것을 막아줌
  - rank는 높이 역할 수행
  
  ```python
  # 트리의 높이 초기화
  rank = [0 for i in range(max)]
  
  def union(x, y):
      x = find(x)
      y = find(y)
      if x == y:
          return
      # 높이가 더 낮은 트리(x)를 높이가 높은 트리(y) 밑에 넣는다.
      # 즉, 높이가 더 높은 쪽을 root로 삼음
      if rank[x] < rank[y]:
          root[x] = y
      else:
          root[y] = x
          # 같을 경우, x를 현재 y의 root로 잡았으니까, x의 랭크를 하나 추가해줌
          # 랭크가 높을 수록 root로 하기 때문!
          if rank[x] == rank[y]:
              rank[x] += 1
  
  def simple_union(x, y):
      x = find(x)
      y = find(y)
      root[y] = x
              
  node_count = [1 for i in range(max)]
  
  def union_count2(x, y):
      x = find(x)
      y = find(y)
  
    if x != y:
          # y의 root를 x로 변경
          root[y] = x
          # 루트인 x에 노드 카운트 추가
          node_count[x] += node_count[y]
          # 기존 y는 1로 초기화
          node_count[y] = 1
  
      return node_count[x]
  
  ```
  
  