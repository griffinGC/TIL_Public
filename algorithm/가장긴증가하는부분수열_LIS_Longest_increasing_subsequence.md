# LIS (Longest Increasing Subsequence)

> https://jason9319.tistory.com/113
>
> https://shoark7.github.io/programming/algorithm/3-LIS-algorithms

- 가장 긴 증가하는 수열 찾기
  - 수열에서 몇개의 원소를 삭제하였을때 나오는 최장 긴 수열
  - 배열 [10, 20, 40, 25, 20, 50, 30, 70, 85] 라면 LIS는 [10,20,40, 50, 70, 85]
- 부분 수열의 길이가 최대 길이가 되는 곳 찾기

## 1. 이중 반복문 O(N^2)

- DP 이용해서 구현 (10만까지 만 가능, 그 이상은 너무 커짐)
  - 수열의 크기 구하기

  ```java
  for(int i = 0; i < n ; i++){
    if(dp[i] == 0) dp[i] = 1;
    // 계속 0부터 다시 시작
    for(int j = 0; j < i; j++){
      if(arr[i] > arr[j]){
        // 이전것이 아닌 처음부터 조회 함
        // dp[i] < dp[j] + 1 을 넣어주는 이유는 가장 최근에 나온 것이 이전에 나온 작은 것보다 값이 작았을 경우 무시하고 최고로 작았을때를 고려하기 위함
        if(dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1
        }
      }
    }
  }
  ```

  ```python
  def basic_double(arr):
      dp = [0 for _ in range(len(arr))]
      print(dp)
      for i in range(len(arr)):
          dp[i] = 1
          for j in range(0, i):
              if arr[i] > arr[j]:
                  if dp[i] < dp[j] + 1:
                      dp[i] = dp[j] + 1
    print(dp)
  ```
  
  



## 2. 이진 탐색

- 이진 탐색을 이용하면 O(longN)의 시간 복잡도를 가지기 때문에 총 O(NlongN)의 시간 복잡도를 가지게 됨

- 방법
  1. 리스트 하나를 생성
  2. 가장 작은 값을 삽입 (맨 처음 원소)
  3. 이후 매번 수열을 볼때마다 리스트의 **마지막 원소**와 **현재 보고 있는 수열의 원소**를 비교하여 **수열의 원소가 더 클때,** 벡터에 삽입해준뒤 LIS의 크기를 1 증가 시켜줌
     1. **마지막 원소 < 현재의 원소** -> 삽입
  4. 만약 수열의 원소가 벡터의 맨 뒤 원소보다 작을 경우 **이진 탐색을 이용**하여 최적의 자리를 찾은 뒤 그 자리의 값을 해당 수열의 원소로 교체해 버림
     1. **마지막 원소 > 현재의 원소**
        1. 이진탐색으로 삽입할 위치 검색
  
  ```python
  import bisect
  def binary_search(arr):
      res = []
      for i in arr:
          if len(res) == 0:
              res.append(i)
              continue
          if res[-1] < i:
              res.append(i)
          else:
              index = bisect.bisect_left(res, i)
              res[index] = i
      print(res)
  ```
  
  