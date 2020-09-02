# Kotiln 기본 개념

- 가변 변수

  - var

- 상수 변수 (자바의 final)

  - 재할당 불가
  - val

- 가변객체의 경우 prefix로 mutable이 붙음

  - `mutableListOf(1,2,3)`

  - `MutableList<Int>`

  - prefix가 없으면 일반적으로 불변 객체

    - list.of(1,2,3) 으로 만든 객체에는 add 불가 

      - 대신 plus 라는 다른 메소드 존재

      - plus를 사용하면 값이 들어가있지 않지만, plus한 값 자체를 출력해보면 값 존재

      - 태초에 선언한 값은 변하지않음

      - ```kotlin
        val immutableList: List<Int> = listOf(1,2,3)
        immutableList.add(10) // error
        immutableList.plus(10) // [1,2,3,10]
        println(immutableList) // [1,2,3]
        println(immutableList.plus(10)) // [1,2,3,10]
        ```

- by lazy

  - 붙어 있으면 컴파일하면서 선언 되어 있는 코드를 지나갈때 값을 평가하지 않음
    - 즉, 선언할때 내부 로직 수행 안됨 
  - 즉, 함수가 호출될 때는 수행되지 않고, 사용할때 평가를 수행
  - 시간이 오래걸리거나 메모리를 많이 먹는경우, 저렇게 해놓으면 좋음
    - memoization

- `generateSequence('초기값')`

  - 무한의 자료구조
  - 선언할때는 내부 로직 수행 안되고 , 사용할때 수행됨

- Lazy Evaluation

  - 예시

    ```kotlin
    val lazyValue2: () -> Unit = {
        println("FP")
    }
    
    lazyValue2 // 아무 반응 없음 -> 타입에 접근만하고 값을 평가하지 않음
    lazyValue2 // 아무 반응 없음
    lazyValue2 // 아무 반응 없음
    lazyValue2() // FP 출력
    ```

- tailrec

  - 꼬리재귀
  - 내가 구현한게 꼬리재귀가 아니라도 수행이 됨
    - 워닝은 뜨지만 컴파일에는 문제 없음
  - 스택이 쌓이는 구조를 내부적으로 최적화 시켜줌
  - 가독성 + 퍼포먼스 + 스택오버플로우X

  

