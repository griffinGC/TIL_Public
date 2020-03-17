# C++ String 사용법

### String 배열의 크기 알아내는법

- String 배열의 경우 str.size() 또는 str.length()를 사용할 수 없다.

  - 왜냐하면, str.length()로 배열을 하는것이 아니라 배열의 원소 하나를 가리키는 것이기 때문이다.
  - 고로, 배열의 사이즈를 계산해서 알아내야한다.
  - sizeof(배열) / sizeof(첫번째원소)

  ```c++
  String temp[3] = {"apple", "api", "apps"};
  int size = sizeof(temp) / sizeof(temp[0]);
  calculate(temp, sizeof(temp) / sizeof(temp[0]);
  ```

  - 배열을 함수의 인자로 넘겨줄때, 배열의 크기도 같이 넘겨주어야함
    - 그렇지 않으면 계산할 수가 없음. 
    - 왜냐하면 배열의 크기가 아닌 포인터로 넘어가기 때문

  