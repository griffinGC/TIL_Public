# List_Tuple_Dictionary



## List 형태

```python
리스트명 = [요소1, 요소2, 요소3, ...]
```



## List 인덱싱



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
- 정렬
  - `sort()` 함수 이용
  - `리스트명.sort()`
    - 오름차순 정렬
  - `리스트명.reverse()`
    - 내림차순 정렬
- 위치반환
  - `index()` 함수 이용
  - `리스트명.index(값)`
    - 값이 리스트에서 위치한 index 리턴
- 특정 위치에 삽입
  - `insert()` 함수 이용
  - `리스트명.insert(index, 값)`
  - index 위치에 값을 삽입
  - 삽입되면 한칸씩 뒤로 밀려남
- 요소 꺼내기
  - `pop()` 함수 이용
  - `리스트명.pop()`
  - 제일 마지막 요소 리턴하고 그 요소는 삭제
- 요소 갯수 세기
  - `count()` 함수 이용
  - `리스트명.count(값)`
  - 값이 리스트에 몇개 존재하는지 카운트 함

### collections.Counter

- 사용하기 전에 `import collections` 를 해야 함
- 딕셔너리 형태로 각각의 요소를 카운트해서 리턴해줌



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