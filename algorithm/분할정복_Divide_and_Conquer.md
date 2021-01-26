# Divide and Conquer (분할정복)

## 기본 개념

### 1. 기본단계를 해결 (가능한 한 간단한 문제여야함)

### 2. 문제가 기본단계가 될 때까지 나누거나 작게 만듬



### 예시

- 농장을 가장 큰 정사각형 모양의 토지로 나누는 방법

  1. 가장 작은 단계 찾기

     - 긴 변이 짧은 변의 2배가 되어야 함

  2. 주어진 문제를 줄여 기본단계가 될때까지 작게 나누기

     - 긴변을 짧은 변으로 나눈 나머지와 짧은 변을 인자로 넣는 함수를 리턴

  3. Code (python)

     ```python
     # 농장을 가장 큰 정사각형으로 토지를 나누는 방법
     def cal_area(a, b):
         min_length = min(a,b)
         max_length = max(a,b)
         # 넓은 변의 길이가 짧은 변의 길이의 2배가 될때 끝남
         small = max_length % min_length
         if 2*min_length == max_length:
             print(min_length)
             return 
         else:
             # 변 중 짧은 부분과 짧은 부분으로 나누고 남은 부분
             return cal_area(min_length, small)
     
     cal_area(1680, 640)
     ```

     