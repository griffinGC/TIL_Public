# Prefix Sum (구간 합)

- 특정 구간의 데이터의 합을 구하는 방법
- 시간 복잡도
  - O(n + m)
  - n은 원소의 갯수, m은 쿼리의 갯수

- 리스트의 앞부터 특정위치까지의 합

  - R = Right, L = Left

  - P[R] - P[L-1]

  - 코드

    ```python
    n = 5
    data = [10, 20, 30, 40, 50]
    
    # Prefix 구간 계산
    summary = 0
    prefix_sum = [0]
    for i in data:
        summary += i
        prefix_sum.append(summary)
    
    left = 3
    right = 4
    # 구간 3부터 4까지 합
    print(prefix_sum[right] - prefix_sum[left -1])
    ```

    



## 출처

>  https://www.youtube.com/watch?v=rI8NRQsAS_s&t=375s