# Java Lambda (자바 람다식)

- 식별자 없이 실행가능한 함수 표현식
- 기존의 불필요한 코드를 줄이고 가독성을 향상 시키기 위함 
- 자바스크립트의 화살표 함수와 비슷하게 작동
- 함수형 인터페이스(Functionl interface)에서만 사용 가능 
  
  - 함수형 인터페이스는 **추상메서드를 1개**만 가진 것을 뜻함
- 재귀 람다식의 호출이 까다로움

  - 재귀에 부적합

  

## 사용방식

- `(파라미터A, 파라미터B) -> {표현식}`

```java
// 기존 함수
int sum(int a, int b){
  return a + b;
}

// 람다식
(int a, int b) -> return a + b;
```



## 참고자료

> https://jdm.kr/blog/181
>
> https://coding-factory.tistory.com/265