# input

- 입력 받는 방식 설명하는 문서

- 그냥 `input()` 만 사용하면 하나의 입력값만 받을 수 있음

  - 이를 보완하는 방법으로 `split()` 을 이용하여 여러 값을 동시에 받을 수 있음

- 파이썬에 경우 한번에 여러 변수를 받을 수 있음

  ```python
  # a = 1, b = 2
  a, b = 1,2
  ```

- 여러 수를 입력받을때 변수를 `int` 형이나 `float` 형으로 변환 할 수 있음

  ```python
  # int 형으로 input을 받을 수 있음
  a, b = map(int, input().split())
  ```

- 입력을 받을때 형 변환과 `list()` 함수를 이용해서 리스트 형으로 만들 수 있음

  ```python
  # 입력값으로 들어오는 것을 int 형으로 형변환하고 list 형태로 저장
  a = list(map(int,input().split()))
  ```

  

## 입력 시 시간 초과 막는법

> https://bnzn2426.tistory.com/105

- 일반적으로 input()을 사용하면 시간초과가 뜰 수 있기 때문에 input을 아래와 같이 변경해서 사용한다.

  ```python
  import sys
  input = sys.stdin.readline
  ....
  ...
  ...
  ..
  for _ in range(int(input()))
  ```

  



## 출처

> https://dojang.io/mod/page/view.php?id=2179
>
> https://dojang.io/mod/page/view.php?id=2286