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

- python3으로 했을때 시간초과 뜨면 pypy3로 돌려보기
  
  - pypy3가 더 느린듯



## 출력

- 한줄에 출력할때는 뒤에 `end="간격"` 붙임
  - 간격에 공백을 넣음으로써 줄바꿈을 처리하지 않도록 제한 가능
- 값을 출력할때 `,` (콤마) 를 붙이면 한 칸 공백이 디폴트로 설정되어 띄어쓰기로 값을 구분해 줌
- `print("문자열", end="간격")`
- 리스트 출력 할때는 `join()`
- 인덱스와 함께 출력할때는 인자 index를 `{인자index}` 로 나타내고 뒤에 `.format(인자0, 인자1)` 로 표현
  - `print('{0} :  {1}'.format(idx + 1, fruit))`
  - 인자 index 생략 가능
- f-string 방식
  - `.format`에 비해 간결하고 직관적이며 속도도 빠름
  - `print(f'{idx + 1} : {fruit}')`
  - `print( f'{변수명} {변수명}')`
  - 







## 출처

> https://dojang.io/mod/page/view.php?id=2179
>
> https://dojang.io/mod/page/view.php?id=2286