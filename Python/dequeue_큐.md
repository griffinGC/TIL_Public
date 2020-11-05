# deque

- 파이썬에서 queue대신 사용가능
- 양방향으로 사용가능
  - 양방향 모두 O(1)에 삽입, 삭제 가능
- `from collections import deque`
- 맨 뒤 삽입
  - `이름.append(값)`
- 맨 앞 삽입
  - `이름.appendleft(값)`
- q = dequeue()
- 맨 앞 값 삭제
  - `이름.popleft()`
- 맨 뒤 값 삭제
  - `이름.pop()`
- PriorityQueue도 있지만 내부는 heapq를 사용함
  - PriorityQueue는 스레드 세이프 -> locking으로 인해 락킹오버헤드 발생
  - heapq는 스레드 세이프 보장하지 못함