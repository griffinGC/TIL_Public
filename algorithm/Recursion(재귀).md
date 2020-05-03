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