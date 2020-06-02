# PrintWriter && BufferedWriter

> https://stackoverrun.com/ko/q/345483
>
> 

- 파일 출력시, PrintWriter, BufferedWriter 2개 모두 사용 가능
  - 기능상의 약간의 차이가 존재



## PrintWriter

- 다양한 출력 함수를 제공
  - ex. `print()`, `println()`, `printf()`, `printInt()`
  - `printXXX` 형태의 함수를 제공

- 바로 직접 출력
  - 버퍼에 저장하지 않음
  - 버퍼에 저장했다가 출력하는 것보다 느림 
  - 비효율적



## BufferedWriter

- 버퍼에 저장했다가 출력
- 좀 더 효율적으로 사용 가능

