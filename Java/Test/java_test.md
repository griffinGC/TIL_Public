# java test

### @RunWith(SpringRunner.class)

- 테스트를 진행할때 JUnit에 내장된 실행자 외에 다른 실행자를 실행
- 인자로 들어간 SpringRunner라는 스프링 실행자 사용
- 즉, 스프링 부트 테스트와 JUnit사이에 연결자 역할

### @WebMvcTest

- Web(Spring MVC)에 집중할 수 있는 어노테이션
- 이것을 사용하면 아래와 같은 어노테이션 사용가능
  - @Controller, @ControllerAdvice와 같은 외부 연동과 관련된 부분만 활성화됨
- WebSecurityConfigurerAdapter, WebMvcConfigurer를 비롯한 @ControllerAdvice, @Controller 읽음
- **@Service, @Component, @Repository는 사용 불가**
- JPA 기능은 테스트 불가
  - JPA기능을 테스트 하기 위해서는 @SpringBootTest 와 TestRestTemplate 사용



### @SpringBootTest()

- JPA테스트 할때 사용

- 인자로 환경 넣기
  - `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)`
    - 랜덤포트 실행 의미



### TestRestTemplate

- JPA기능을 테스트할때 사용

  - `.postForEntity()` 
  - post 기능 수행할때 사용
  - `.exchange(RequestEntity<?> requestEntity, Class<T> responseType)`
    - 주어진 requesteneity에 따라 요청을 실행하고 responseentity를 결과로 리턴
  - `.exchange(String url, HttpMethod method, HttpEntity<?> requestEntity, Class<T> responseType)`
  - 주어진 url에 대해 HTTP 메소드 실행하고, 주어진 request entity를 request(요청)에  작성, 응답으로 ResponseEntity 리턴
  
```java
  @Autowired
  private TestRestTemplate restTemplate;
  ...
      ResponseEntity<Long> responseEntity = restTemplate
      									.postForEntity(url, reauestDto, Long.class)
```

  



### MockMvc

- 웹 API를 테스트 할때 사용
- 스프링 MVC 테스트의 시작점
- HTTP GET, POST등 API 테스트 가능

- `.perform()`
  - 인자로 들어오는것 수행
  - 인자로는 get, post등이 들어올 수 있음
    - `.perform(get("/hello"))` 
      - /hello 주소로 get요청
  - 체이닝을 지원하여 여러 검증 기능을 이어서 선언 가능
- `.andExpect()`
  - `mvc.perform()`의 결과를 예측
  - 인자로 HTTP Header의 Status 검증
    - `.andExpect(status().isOk())`
  - 인자로 결과 검증 가능
    - `.andExpect(content().string(hello))`

