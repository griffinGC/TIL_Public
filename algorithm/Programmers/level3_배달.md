# [프로그래머스 level3] 배달

> https://programmers.co.kr/learn/courses/30/lessons/12978

### 해결방안

- 다른 사람들의 해결방안을 보니 보통 bfs로 이용한 것 같음
  - 다익스트라 역시 2차원 배열로 인접리스트를 이용한 것이라고 생각하면 됨
- 시작점에서 시작하여 모든 값을 확인하면 되니 **다익스트라**를 이용하면 될 것이라고 생각함
  - 다익스트라 알고리즘에 대해서 모른다면 먼저 보고 오는것을 추천



### 알고리즘 순서

1. 기본적으로 인접 리스트를 생성

2. 각 노드까지의 거리를 저장하기 위해 노드의 갯수만큼 배열을 생성 하고 큰 수로 초기화

3. 양방향이기 때문에 양쪽 인접리스트에 모두 거리와 노드를 삽입

4. 시작점에서 출발하는 다익스트라 함수 실행

   1. 기본적으로 출발점의 거리는 0으로 셋팅

   2. 노드를 최소힙에 삽입 (priority queue 혹은 heapq 사용 가능)

   3. 최소힙에서 노드와 노드까지 거리 값을 꺼내오기

   4. 현재 노드의 값과 그 노드까지의 거리를 저장한 값을 비교해서 현재 노드의 값이 작을 경우만 다음 단계 실행

      (그 노드까지의 거리가 클 경우에는 이미 최적이기 때문에 비교할 필요가 없음)

   5. 현재노드와 인접한 각각의 노드들의 거리를 비교

      1. 노드의 거리 값 + 현재까지의 거리 (cost + dist) vs 현재 각 노드까지의 거리가 저장된 곳의 값 (distance[노드])
      2. 노드의 거리 값 + 현재까지의 거리가 작을 경우, 각 노드까지의 거리가 저장된 배열을 업데이트하고 힙에 그 값과 노드를 삽입

5. 4.3 ~ 4.5까지 반복

6. 함수가 종료되면, 2번에서 설정한 각 노드까지의 거리를 저장한 배열을 돌면서 K거리 안에 갈 수 있는 곳을 count

7. count 값 리턴



### 핵심 팁

- 다익스트라를 이용하게 되면 문제 조건에 있는 `두 마을 a,b를 연결하는 도로가 여러개가 있을 수 있습니다.` 라는 조건을 고려하지 않아도 됨
  - 왜?
    - 어차피 값이 들어가져 있다면 번거롭게 처리하지 않아도 (비록 시간은 더 걸릴 수 있지만), 다익스트라는 모든 간선을 고려하여 가장 작은 최적을 찾는 구조기 때문이다.



### 코드

```python
import heapq

def solution(N, road, K):
    answer = 0

    adj = [[] for i in range(N+1)]
    distance = [1e9]* (N+1)
    for i in road:
        a, b, cost = i[0], i[1], i[2]
        # 따로 값을 처리해주지 않아도 어차피 다 들어가서 가장 최소만을 사용해서 최적을 찾음
        adj[a].append([b, cost])
        adj[b].append([a, cost])
    print(adj)
    dijkstra(1, adj, distance)
    for i in range(len(distance)):
        if distance[i] <= K:
            answer += 1
            print("index", i, "distance", distance[i])

    return answer

# a, b(1 ≤ a, b ≤ N, a != b)는 도로가 연결하는 두 마을의 번호이며, c(1 ≤ c ≤ 10,000, c는 자연수)는 도로를 지나는데 걸리는 시간입니다.
def dijkstra(start, adj, distance):
    heap_data = []
    heapq.heappush(heap_data, (0, start))
    distance[start] = 0
    while heap_data:
        dist, node = heapq.heappop(heap_data)
        # 작을때는 제외
        if dist > distance[node]:
            continue
        for i in adj[node]:
            cost = i[1] + dist
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(heap_data, (cost, i[0]))



road = [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2],[2,5,1]]
n = 5
k = 3

result = solution(n, road, k)
print(result)
```



*퍼가신다면 출처와 댓글 부탁드립니다.

*더 많은 다양한 자료는 아래 github에 있습니다

> https://github.com/griffinGC/TIL_Public