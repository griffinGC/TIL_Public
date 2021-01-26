# 플로이드 와샬 알고리즘 (Floyd Warshall)

> https://blog.naver.com/ndb796/221234427842

### 모든 정점에서 모든 정점으로의 최단 경로

- 모든 정점에서 모든 정점으로의 최단 경로를 구할때 사용하는 알고리즘
- 거쳐가는 정점을 기준으로 알고리즘 수행
- 기본적으로 DP(다이나믹 프로그래밍) 기술을 사용

### 구현

- 일종의 테이블을 이용해서 테이블을 업데이트해가는 형태로 수행
  - 테이블은 **현재까지 계산된 최소 비용**을 뜻함

1. 일단 갈 수 있는 정점은 최단 거리로 표시를 하고, 갈 수 없는 정점은 무한(혹은 큰 수)로 표시해 놓음
2. 거쳐가는 정점을 기준으로 계속해서 테이블을 갱신해감

```python
import sys
from collections import defaultdict
input = sys.stdin.readline
# node 와 cost 받아야 함
n, e = map(int, input().split())
table = [[float('inf')] * n for i in range(n)]
for i in range(n):
    for j in range(n):
        if i == j:
            table[i][j] = 0
print(table)
for _ in range(e):
    v1, v2, c = map(int, input().split())
    # 양방향일경우
    table[v1 - 1][v2 - 1] = c
    # 단방향의 경우 아래 코드 삭제
    table[v2 - 1][v1 - 1] = c

for _ in table:
    print(_)
print()
for k in range(n):
    for i in range(n):
        for j in range(n):
            if table[i][k] + table[k][j] < table[i][j]:
                table[i][j] = table[i][k] + table[k][j]
for _ in table:
    print(_)
print()
```

