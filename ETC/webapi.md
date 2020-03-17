# Web API



## HTTP Method

- 자원에 대한 행위는 HTTP Method로 표현
- URL 중간중간 동사가 등장하면 안됨.
  - GET /members/add (x)
  - POST /members (0)



## URI 표기 방식

- URI 마지막 문자로 슬래시 구분자 포함하지 않음
- 하이픈(-)은 URI 가독성을 높일때 사용
- 언더바(_)는 사용하지 않음
- URI경로는 소문자만 사용
- 파일 확장자는 URI에 포함시키지 않고, Accept Header를 사용



## 상태코드

1. 200 (성공)
2. 400 (클라이언트 오류)
3. 500 (서버 오류)



## Java에서 WebAPI 구현

1. pom.xml 셋팅

   - json을 이용하여 구현시 코드 추가

   - 사용시 `ObjectMapper` 이용

     json 문자열로 바꾸거나, json 문자열을 객체로 변경할 수 있음

     ```xml
     <dependency>
     	<groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
       <version>2.9.4</version>
     </dependency>
     ```

     ```java
     //DB로 부터 데이터를 가져옴
     List<Role> list = dao.getRoles();
     //json으로 변경하기 위한 객체 생성
     ObjectMapper objectMapper = new ObjectMapper();
     //가져온 데이터를 json으로 형태로 만들고 그것을 문자열로 변환
     String json = objectMapper.writeValueAsString(list);
     ```

     

2. `.settings`폴더 내부에 있는  `org.eclipse.wst.common.project.facet.core.xml` 열어서 jst 버전을 servlet 버전에 맞게 설정 후, 이클립스 재시작

3. Properties -> Project Facets 에서 Dynamic Web Module이 설정한 버전으로 바뀌어 있는지 확인

4. annotaion 이용하여 서블릿 설정할 예정이라면 `web.xml` 삭제하면 됨. 

   대신 `pom.xml` 파일도 수정하여야 함

   ```xml
   <properties>
   	<failOnMissingWebXml>false</failOnMissingWebXml>
   </properties>
   ```

5. `response.setContentType("application/json")` 에서 오류가 발생하면 다운로드 형태로 가져오게 됨



## 여러 인자를 사용하여 url을 설정하고 싶을 때

여러 인자를 사용하고 싶다면 뒤에 `/*` 을 붙임

ex) /roles/*

1. `request.getPathInfo()`
2. `pathInfo.split("/")`
3. `pathParts[숫자]` 이용하여 번호 가져옴

```java
String pathInfo = request.getPathInfo();
String[] pathParts = pathInfo.split("/");
String idStr = pathParts[1];
// 가져온 번호를 숫자로 변경
int id = Integer.parseInt(idstr);
```

