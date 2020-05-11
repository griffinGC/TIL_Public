# Two Pointer Algorithm

- 배열의 특정구간을 연속적으로 처리할때 사용하는 기법

- start 와 end를 각각의 위치를 매번 기록하면서 연속된 구간합을 처리하는 것

- 선형시간이 소요됨

- 기법예시

  - 합이 M이되는 수열의 개수 구하기
  - 부분합 크기 M

  1. Start Point와 End Point를 둘다 0으로 잡음
  2. 현재 부분합이 M과 같다면 카운트
  3. 현재 부분합이 M보다 작거나 같다면 End point를 1 증가
  4. 현재 부분합이 M보다 크다면 Start Point를 1증가
  5. 모든 경우를 확인할때까지 2부터 4를 반복

  ```python
  # 데이터 개수 n, 부분 수열의 합 m
  # 만족하는 부분 수열의 개수 count
  n, m = 5, 5
  
  data = [1,2,3,2,5]
  
  count = 0
  summary = 0
  end = 0
  
  for start in range(n):
      while summary < m and end < n:
          summary += data[end]
          end += 1
      if summary == m:
          count += 1
      summary -= data[start]
  
  print(count)
  ```

  

### 참고문제

- 백준 2003

  > https://www.acmicpc.net/problem/2003



## 출처

> https://www.youtube.com/watch?v=rI8NRQsAS_s&t=375s