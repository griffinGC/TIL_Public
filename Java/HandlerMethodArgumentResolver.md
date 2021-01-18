# HandlerMethodArgumentResolver

- 조건에 맞는 경우, 메소드가 있다면 `HandlerMethodArgumentResolver`의 구현체가 지정한 값으로 해당 메소드의 파라미터로 넘길 수 있음

- `supportsParameter()`
  - 컨트롤러 메서드의 특정 파라키터를 지원하는지 판단
- `resolveArgument()`
  - 파라미터에 전달할 객체를 생성

- HandlerMethodArgumentResolver는 항상 WebMvcConfigurer의 **addArgumentResolvers()**를 통해 추가해야 함

