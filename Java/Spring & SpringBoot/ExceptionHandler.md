# ExceptionHandler

### 예외 처리 방법

- try-catch

- 요구 사항에 의한 예외 처리
- 스프링 시큐리티에서 인터셉터로 잡아서 예외 처리

### @ExceptionHandler

- @Controller, @RestController가 적용된 Bean내에서 발생하는 예외를 잡아서 하나의 메서드에서 처리해주는 기능
- 사용방식
  - 함수 위에 `@ExceptionHandler(예외클래스.class)`
  - ex. @ExceptionHandler(NullPointerExcetption.class)
  - 예외 클래스로 여러개 등록 가능
- 주의 사항
  - @Controller와 @RestController에만 적용 가능 (@Service 같은데서는 사용 불가)
  - 



### 참고자료

> https://jeong-pro.tistory.com/195