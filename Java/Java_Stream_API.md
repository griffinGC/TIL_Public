# Java Stream API

- 자바 8 부터 추가된 기능

- 컬렉션, 배열등의 저장 요소를 하나씩 참조하며 람다식을 적용하여 반복적으로 처리할 수 있도록 해주는 기능

- 주로 `Collections`, `Arrays` 에 사용 됨

- 스트림 구조

  - `객체집합.스프림생성().중개연산().최종연산()`

    - 최종연산은 사용 잘 안함

    ex. `datas.stream().map(a -> a+1).get()`

    

## 사용법

- Stream API를 사용하기 위해서는 우선 Stream을 불러와야한다.
  - Stream 불러오는 함수
    - `.stream()`
    - `.parallelSteam()`
      - parallelStream은 여러 스레드에서 병렬작업

- 불러온 후, 중개연산 실행

  - 중개 연산 종류

    - forEach

      - stream의 각 원소 순회

    - map

      - 개별 요소마다 연산 가능

    - limit

      - 최초 요소부터 선언한 인덱스까지의 요소를 **추출**하여 새로운 stream 생성

    - skip

      - 최초 요소부터 선언한 인덱스까지의 요소를 **제거**하여 새로운 stream 생성

    - filter

      - 요소마다 비교를 해서 조건을 만족하는 요소만 반환

    - flatMap

      - stream 내부에 있는 객체들을 연결한 stream 반환

    - reduce

      - reducer 이용 (자바스크립트 정리한것 참고)

    - collection

      - Collection 객체를 만들어서 반환

        

## 참고자료

> https://jdm.kr/blog/181
>
> https://jeong-pro.tistory.com/165