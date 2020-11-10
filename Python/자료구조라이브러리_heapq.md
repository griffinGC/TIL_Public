# 자료구조 라이브러리 참고자료

- Deque
	
	> https://dongdongfather.tistory.com/72



## heapq

> https://medium.com/@yhmin84/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%ED%81%90-priority-queue-%EB%A5%BC-%EC%9C%84%ED%95%9C-heapq-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95-b33c4e0ef2b1

- 우선순위 큐

- 사용법

  1. 리스트 생성
  2. 생성된 리스트에 값 삽입 혹은 값 추출

  ```python
  import heapq
  
  list = []
  heapq.heappush(list, 값)
  # 혹은 아래와 같이 튜플을 넣을 수도 있음
  # 값에 따라 데이터 추출됨
  heapq.heappush(list, (priority, task1, task2,...))
  
  # 값 추출
  heqpq.heqppop(list)
  ```

  

- **작은 것을 가장 앞에 놓음**

  - 기본적으로 **최소힙**
  - 최대 힙으로 원할때는 넣을때 **음수**부호 붙여서 넣기
  - 나올때도 작은것부터 나옴

- 값 삽입

  - heapq.heappush(리스트명, 값)

  - 힙에 넣는 값은 tuple 가능

    > https://docs.python.org/3/library/heapq.html#heapq.heappush

    - 값 비교할때 유용
    - (priority, task)
      - priority에 따라 task 비교 가능
      - 

- 값 추출

  - heapq.heappop(리스트명)
  - n번째 큰 값 추출
    - `heapq.nlargest(n, nums)[-1]`
  - n번째 작은 값 추출
    - `heapq.nsmallest(n, nums)[-1]`

- 리스트를 힙으로 변경
  
  - heap.heapify(리스트명)
    - 이후에 하나라도 값을 추가하면 다시 힙 특성이 깨짐

- PriorityQueue도 있지만 내부는 heapq를 사용함
  - PriorityQueue는 스레드 세이프 -> locking으로 인해 락킹오버헤드 발생
  - heapq는 스레드 세이프 보장하지 못함