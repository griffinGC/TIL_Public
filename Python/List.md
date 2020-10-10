# List_Tuple_Dictionary



## List 형태

```python
리스트명 = [요소1, 요소2, 요소3, ...]
```

- 일반적으로 다른언어에 있는 배열과 비슷

  - 일반적으로 다른 언어에 있는 배열은 배열을 처음 설정하면 크기를 변경할 수 없지만, 파이썬의 리스트는 변경가능
  - 동적 배열

- 파이썬의 리스트는 다른 언어의 **배열 + 리스트** (동적 배열)

- 2차원 배열

  - `adj = [[0 for i in node] for j in node]`
  - node * node 의  갯수만큼 만듬
  
  

## List 인덱싱

### 위치

- `index()` 함수 이용
- `리스트명.index(값)`
  - 값이 리스트에서 위치한 index 리턴
- 특정 위치에 삽입
  - `insert()` 함수 이용
  - `리스트명.insert(index, 값)`
  - index 위치에 값을 삽입
  - 삽입되면 한칸씩 뒤로 밀려남

## List 수정 삭제

- 수정

  - 직접 값에 접근해서 수정
  - 배열

- 삭제

  - `del` 함수 이용
  - `del 리스트명[인덱스]`
    - 리스트에 있는 요소 삭제되고 한칸씩 앞으로 당겨짐

  ```python
  a = [1,2,3]
  del a[1]
  # a= [1,3]
  ```

  - `remove()` 함수 이용
  - `리스트명.remove(value)`
    - 값중에 제일 처음에 등장하는 요소 삭제 후, 한칸씩 당겨짐

- 추가
  - `append()` 함수 이용
  - `리스트명.append(요소값)`
  - 리스트에 리스트를 추가할 수도 있음
  - 그냥 바로 원소를 추가 가능
    - `리스트명 += [요소값]`
  - 리스트끼리 더할 수 있음
    - 결과 리스트 = 리스트A **+** 리스트B

### 정렬

- `sort()` 함수 이용

- key에 정렬 순서를 넣을 수 있음

  - 예를 들어 `sort(key=len)` 설정시, 길이로 정렬

- `리스트명.sort()`
  
  - 오름차순 정렬
  - 결과 반환 안함
  - `sorted(리스트명)`
    - 결과 반환하고 본체는 바꾸지 않음
  
- `리스트명.sort(reverse=True)`
  
  - 내림차순 정렬
  - 저장하려면 `sorted()` 이용하고 `reverse()` 이용해서 바꾸기
  
- 리스트 뒤집기
  - `리스트명.reverse()`
  - 리스트 거꾸로 뒤집음
  - 결과 반환하지 않음
  - `결과 값 = reversed(리스트명)`
    - 결과 반환하고 순서 뒤집음
    - 단, 이걸 확인하기 위해서는 결과 값에 다시 `list(결과값)` 을 해주어야함
    - 하지만, 새로운 리스트에 넣을때는 `list(결과값)`으로 안해줘되 됨
  
  ```python
  x = [3,5,1,2]
  # [3, 5, 1, 2]
  print(x)
  
  y = reversed(x)
  
  a = [_ for _ in x]
  # [3, 5, 1, 2]
  print(a)
  c = [i for i in y]
  # [2, 1, 5, 3]
  print(c)
  
  # 아무것도 안들어감
  b = [_ for _ in list(y)]
  # []
  print(b)
  ```
  
  



### 추출

- `pop()` 함수 이용
- `리스트명.pop()` 
  - 제일 마지막 요소 리턴하고 그 요소는 삭제
- 큐처럼 사용가능
  - 맨 앞 원소 제거는 `리스트명.pop(0)`
  - 혹은 `dequeue`를 import해서 사용
- 요소 갯수 세기
  - `count()` 함수 이용
  - `리스트명.count(값)`
  - 값이 리스트에 몇개 존재하는지 카운트 함

### collections

- 사용하기 전에 `import collections` 를 해야 함

- Counter(리스트명)

  - 딕셔너리 형태로 각각의 요소를 카운트해서 리턴해줌

  ```python
  >>> import collections
  >>> list = ['aa', 'bb', 'aa', 'cc', 'bb']
  >>> collections.Counter(list)
  Counter({'aa': 2, 'bb': 2, 'cc': 1})
  >>> ans = collections.Counter(list)
  >>> ans
  Counter({'aa': 2, 'bb': 2, 'cc': 1})
  >>> ans['aa']
  2
  ```

  - Counter의 메소드
    - most_commons()
      - 인자로 값을 넣을수도 안넣을 수도 있음
      - 인자 없을 시, 요소들 중 빈도수 높은순으로 가장 많은 것부터 내림 차순으로 `[('값', 개수)]` 출력
    - update(리스트명)
      - 기존 리스트에 리스트 추가



## list 초기화

1. c 처럼 초기화

   ```python
   # 0으로 초기화
   list = []
   for i in range (n+1):
     list.append(0)
   ```

2. 파이썬만의 방식으로 초기화

   ```python
   # 0으로 초기화
   # n+1 번 초기화 해서 넣음
   list = [0 for _ in range(n+1)]
   
   ```





## 튜플 (Tuple)

- 튜플은 값을 변경 불가
- 대괄호가 아닌 소괄호 () 로 나타냄
- set에 넣을때는 오직 튜플만 넣을 수 있음



## 출처

> https://wikidocs.net/14



## 공부할것 

> https://hero0926.tistory.com/15
>
> https://www.daleseo.com/python-collections-counter/
>
> https://wikidocs.net/15
>
> https://itmining.tistory.com/116
>
> https://excelsior-cjh.tistory.com/94