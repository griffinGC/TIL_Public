# lambda

> https://wikidocs.net/64

- 람다 함수를 쓸 수 있게 해줌

  - map 함수를 이용해서 사용 가능

  ```python
  a = (lambda x,y : x+y)(10,20)
  # 30
  print(a)
  
  # 맵함수를 이용해서 계산하고 list 형태로 변경해줌 -> 맵의 2번째 인자는 반복가능한 것
  b = list(map(lambda x: x**2, range(4)))
  # [0, 1, 4, 9]
  print(b)
  ```



## filter(함수, 리스트 or 딕셔너리)

- 함수에 따라 리스트 값을 필터링 해줌

```python
over_30_dict = dict(filter(lambda elem:elem[1]>=30, score_dict.items()))
```

