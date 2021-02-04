# 파라매트릭 서치 (Parametric Search)

> https://www.crocus.co.kr/1000
>
> https://sarah950716.tistory.com/16

- **최적화 문제를 결정 문제로 바꾸어 푸는 것**
  - ex. 나이순으로 정렬된 상태에서, 치맥을 좋아하는 가장 어린사람을 찾는경우
  - 치맥을 좋아하는 가장 어린사람 => 치맥을 좋아하나? 나이 up & down
  - 이진 탐색과 유사함
- 아래의 조건을 만족할때 사용
  - **결정 문제** 정의했을 때 쉽게 풀 수 있는 경우
    - 해당 값이 정답이 될 수 있는 값인지 아닌지를 쉽게 판단 할 수 있어야 함
  - 정답이 될 수 있는 값들이 **연속적**일때

- 예시 문제 

  - [나무자르기](https://www.acmicpc.net/problem/2805)

  ```python
  # m이 필요한 나무의 길이
  n, m = map(int, input().split())
  # 나무의 높이들
  # 이진 탐색과 크게 다를 바 없음
  trees = list(map(int, input().split()))
  # 굳이 정렬하지 않음 => 정렬하는데 시간이 많이 소요되기 때문
  right = max(trees)
  left = 0
  ans = 0
  while left <= right:
      mid = (left + right) // 2
      total = 0
      for t in trees:
          if t > mid:
              total += t - mid
      # 이부분이 결정문제이기때문에 파라메트릭 서치라고 볼 수 있음
      if total >= m:
          ans = mid
          left = mid + 1
      else:
          right = mid - 1
  print(ans)
  ```

  