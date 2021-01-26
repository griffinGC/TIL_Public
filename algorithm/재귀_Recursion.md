# Recursion 재귀

- 기본 단계와 재귀 단계로 구성됨

- 기본 단계
  - 함수가 자기자신을 다시 호출하지 않는 경우
  - 무한 반복으로 빠지지 않게 하는 부분
- 재귀 단계
  - 함수가 자기자신을 호출하는 부분

```python
def countdown(number):
  print number
  if number < 1:
    return 0;
  else :
    return countdown(number -1)
```

- 재귀 함수에서는 호출 스택 사용
  
- 재귀 할때마다 스택에 쌓임
  
- 덧셈 예제

  ```python
  def sum(arr):
      # 배열과 정수를 더할 수 없기 때문에 리턴을 0으로 해줌
      if arr == []:
          return 0
      else:
          return arr[0] + sum(arr[1:])
  
  arr = [2,4,6]
  result = sum(arr)
  print(result)
  ```

  

- 파이썬에서는 재귀를 사용할때 RecursionError 발생할 수 있음

  - 이를 막기위해서 코드 추가해주어야 함

    ```python
    import sys
    sys.setrecursionlimit(1000000)
    ```

    