# Annotation

> 어노테이션 생성에 관련한 글

- 같은 코드가 반복되지 않게 하기 위함

- 예시

  ```java
  package com.griffin.glog.springboot.config.auth;
  
  import java.lang.annotation.ElementType;
  import java.lang.annotation.Retention;
  import java.lang.annotation.RetentionPolicy;
  import java.lang.annotation.Target;
  
  @Target(ElementType.PARAMETER)
  @Retention(RetentionPolicy.RUNTIME)
  public @interface LoginUser {
  }
  ```

  - `@interface`
    - 파일을 어노테이션 클래스로 지정하는 것
  - `@Target(ElementType.PARAMETER)`
    - 어노테이션이 생성될 수 있는 위치 지정
    - PARAMETER로 지정한 것은, 메소드의 파라미터로 선언된 객체에서만 사용 가능
  - `@Retention`
    - 어느 시점까지 어노테이션의 메모리를 가져갈지 설정하는 것
    - `RetentionPolicy`를 지정함으로써 어노테이션의 메모리 보유 범위가 결정 됨



- 어노테이션을 이용하여 **메소드 인자**로 값을 가져오는 방법

  1. 원하는 annotation 클래스 생성
  2. HandlerMethodArgumentResolver를 구현한 구현체 생성
     - 구현체가 지정한 값으로 해당 메소드의 파라미터를 넘기는 역할 수행
  3. WebMvcConfigurer에 `addArgumentResolvers()` 함수를 이용하여 `HandlerMethodArgumentResolver`타입을 리스트로 가지는 것에 추가
     - 스프링에서 구현체 인식 가능
     - 다른 HandlerMethodArgumentResolver가 필요하다면 동일한 방식 사용하면 됨

  4. 필요한 곳에서 생성한 어노테이션 지정

  