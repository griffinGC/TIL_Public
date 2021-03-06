# 파이썬 lambda

> https://wikidocs.net/64

- 람다 함수를 쓸 수 있게 해줌
  - 일종의 간단한 함수라고 생각하면 됨
- filter, map, reduce 이외에도 sort할때도 유용하게 사용 가능
## map(함수, 리스트)
- 함수와 리스트를 인자로 받음
- 각 원소를 주어진 수식에 따라 변형하여 **새로운 리스트를 반환**
- 함수자리에 람다식을 넣으면 됨
  ```python
  a = (lambda x,y : x+y)(10,20)
  # 30
  print(a)
  
  # 맵함수를 이용해서 계산하고 list 형태로 변경해줌 -> 맵의 2번째 인자는 반복가능한 것
  b = list(map(lambda x: x**2, range(4)))
  # [0, 1, 4, 9]
  print(b)
  ```

## reduce(함수, 시퀀스)
- 시퀀스(문자열, 리스트, 튜플)의 원소들을 누적해서 함수에 적용시킴
- 차례대로 앞 2개의 원소를 가지고 연산. 연산의 결과가 또 다음 연산의 입력으로 진행됨. 따라서 마지막까지 진행되면 최종 출력은 한개의 값만 남게 됨

## filter(함수, 리스트 or 딕셔너리)

- 함수에 따라 리스트 값을 필터링 해줌
- 특정 조건을 만족하는 요소만 남기고 필터링

```python
over_30_dict = dict(filter(lambda elem:elem[1]>=30, score_dict.items()))
```

