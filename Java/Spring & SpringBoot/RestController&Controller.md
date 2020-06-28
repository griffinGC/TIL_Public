# RestController & Controller



## @Controller



## @RestController

- @RequestMapping을 이용할경우
  - `@RequestMapping("/경로/*")`
    - `*`은 모든 경로를 의미
  - `@RequestMapping("/경로/{value}")`
    - `{value}` 값으로 아무 값을 넣어도 클래스 내부의 컨트롤러 함수에서 실행되어 클래스 안으로 들어 올 수 있음

