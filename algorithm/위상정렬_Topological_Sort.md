# 위상정렬 Topological Sorting

> https://gmlwjd9405.github.io/2018/08/27/algorithm-topological-sort.html

- 유향 그래프(방향이 있는 그래프)의 꼭지점들을 변의 방향을 거스르지 않도록 나열하는 것을 의미
  - 과목을 수강하기 위한 선수과목부터 수강하기 위해 정렬하는 것과 동일한 방식
- 즉, 일의 **순서**를 찾는 알고리즘
- 선행 순서를 위배하지 않으면서 모든 정점을 나열하는 것
- **답이 여러가지가 나올 수 있음!!**
- **순환되는 그래프에서는 사용불가!!**

## 구현

- 스택을 이용하는 방식과 큐를 이용하는 방식, 2가지가 있음
  - 아래 예시에서는 큐를 이용하는 방식 설명
- 시간 복잡도는 O(V + E)

1. indegree가 0인 것을 찾아서 모두 큐에 삽입
   - indegree가 0인 것이 없다면 위상정렬알고리즘 수행 불가
3. 큐에서 원소를 뽑음
3. 뽑은 원소가 가리키는 간선들을 제거
4. indegree가 0인 것을 큐에 넣음
5. 큐에 아무것도 남지 않을때까지 2~4 반복

**큐에 들어간 순서가 위상정렬 순서**

```python
import sys
from collections import defaultdict, deque
input = sys.stdin.readline
n, m = map(int, input().split())
# 앞에 있는 것이 뒤에있는 원소보다 먼저 서야함
# 선수과목이라고 생각

# 초기화 시켜줌
stu = defaultdict(list)
indegree = [0] * (n + 1)
indegree[0] = 100000
for _ in range(m):
    a, b = map(int, input().split())
    stu[a].append(b)
    indegree[b] += 1
# indegree가 가장 작은 원소 찾아냄 0 이어야만 함 => 반드시 1개일 필요는 없음
q = deque()
for i in range(n + 1):
    if indegree[i] == 0:
        q.append(i)

result = []
while q:
    now = q.popleft()
    result.append(now)
    for e in stu[now]:
        # 들어오는 숫자 삭제
        indegree[e] -= 1
        if indegree[e] == 0:
            q.append(e)

for r in result:
    print(r, end=" ")
```

