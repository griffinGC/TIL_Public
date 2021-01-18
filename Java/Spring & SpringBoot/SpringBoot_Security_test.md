# Spring Boot Security Test

1. `build.gradle` 에 `testCompile` 추가

   ```groovy
   testCompile('org.springframework.security:spring-security-test')
   ```

2. test 파일에 임의 사용자 인증 추가

   ```java
   @Test
   @WithMockUser(roles="USER")
   public void Posts_test() throws Exception{
       ...
   }
   ```

3. `@SpringBootTest`에서 MockMvc 사용하도록 변경

   1. `@Before` 설정

      - 매번 테스트가 시작되기 전에 MockMvc 인스턴스 생성

      ```java
      @Autowired
      private WebApplicationContext context;
      
      private MockMvc mvc;
      
      @Before
      public void setup(){
          mvc = MockMvcBuilders
              .webAppContextSetup(context)
              .apply(springSecurity())
              .build();
      }
      ```

   2. mvc.perform

      - 테스트 수행할 함수에 추가

      - 생성된 MockMvc를 통해 API 테스트
      - 본문 영역을 문자열로 표현하기 위해 ObjectMapper를 통해 문자열 JSON으로 변환

      ```java
      mvc.perform(post(url)
      	.contentType(MediaType.APPLICATION_JSON_UTF8)
      	.content(new ObjectMapper().writeValueAsString(requestDto)))
          .andExpect(status().isOk());
      
      ```

      