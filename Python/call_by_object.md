# 파이썬 값 저장 방식

### call by object reference

- 자바는 call by value
  - 자세한건 [C++_Java_비교.md](./Java/C++_Java_비교.md) 참고

- C는 call by reference , call by value 

  - call by reference
    - pointer 사용

- 파이썬은 원시타입 조차도 **객체**

  > https://lee-seul.github.io/concept/python/2018/05/02/python-call-by-object-reference.html

  - 모든 것이 객체
  - 단, 문자와 숫자는 불변 객체
  - **할당 진행시 모두 객체에 대한 참조를 할당**
    - 고로, 다중 할당 시 조심해야 함
    - 다중할당 사용 안할 시, 값이 변경될 우려가 있음
      - 오히려 순차적으로 할당시, 문제 발생할 수 있음

