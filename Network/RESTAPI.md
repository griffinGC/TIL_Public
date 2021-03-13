# REST API

> https://m.blog.naver.com/PostView.nhn?blogId=complusblog&logNo=220986337770&proxyReferer=https:%2F%2Fwww.google.com%2F
>
> https://round-round.tistory.com/entry/REST-API%EC%9D%98-%EB%8B%A8%EC%A0%90-3%EA%B0%80%EC%A7%80
>
> https://gofnrk.tistory.com/23
>
> https://www.geeksforgeeks.org/rest-api-architectural-constraints/#:~:text=Client%2DServer%3A%20REST%20application%20should,user%20interface%20or%20user%20state.
>
> https://ijbgo.tistory.com/20

- 이전에는 SOAP(Simple Object Access Protocol) 방식사용

  - SOAP는 좀 더 복잡하고 무거움
  - REST는 유연한 구현, SOAP는 XML메시징 같은 특정 요건이 있는 프로토콜

  > https://blog.bearer.sh/what-is-a-rest-api/#:~:text=Before%20REST%2C%20the%20main%20approach,Wide%20Web%20Consortium%20(W3C).
  >
  > https://www.redhat.com/ko/topics/integration/whats-the-difference-between-soap-rest

### 리소스

- 수행대상이 되는 리소스는 **URI**로 정의 됨

- JSON, XML, JPG, MP4등 다양한 것이 될 수 있음

- **리소스는 URI에 의해 표현됨**

  `https://search.naver.com/search.naver?where=nexearch&query=%EC%BD%B4%EB%8B%A4&sm=top_lve.agallgr0mamsimenmspm&ie=utf8`

  - URL은 URI의 한 종류
  - URL은 특정 문서의 위치를 나타내는데 사용

### 메소드

- REST API에서는 다루는 대상에 상관없이 같은 메소드에 의해 다뤄짐

| HTTP 메소드 | 방식                     |
| ----------- | ------------------------ |
| GET         | 리소스 가져오기 (Read)   |
| POST        | 리소스 등록하기 (Create) |
| PUT         | 리소스 교체 (Replace)    |
| PATCH       | 리소스 수정 (Update)     |
| DELETE      | 리소스 삭제 (Delete)     |

### 표현

- **HTTP메소드 + URI + Body(Payload)**



### 특징

- **Uniform Interface**

  > https://stackoverflow.com/questions/25172600/rest-what-exactly-is-meant-by-uniform-interface
  >
  > https://codewords.recurse.com/issues/five/what-restful-actually-means

  - URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍쳐 스타일
  - 가장 큰 특징으로 아래와 같은 4가지의 원칙(인터페이스)를 따름
    - **기기나 어플리케이션의 타입(웹, 모바일앱)등에 구애 받지 않고 상호작용 하는 동일한 방법 사용 해야 함**

  1. **리소스(URI)로 구분됨**

     - 모든 리소스가 URI로 구분됨

  2. **표현(Representation)을 통해서 리소스 조작**

     > https://sookocheff.com/post/api/how-rest-constraints-affect-api-design/#:~:text=2.-,Manipulation%20of%20Resources%20Using%20Representations,client%20can%20understand%20and%20manipulate
     >
     > https://blog.npcode.com/2017/04/03/rest%EC%9D%98-representation%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/

     - REST 기반시스템에서는 Representation(표현) 을 통해 리소스의 모든 작업수행 가능

       - **이를 통해 서버의 코드에 관계없이 client 구현 가능하고, 서버의 수정에 거의 영향을 받지 않음**
       - Representation이 Header를 가지고 있기 때문에 그것을 가지고 Resource 가져올 수 있음
         - Representation에는 HTTP메소드와 URI 정보 등이 포함 됨
       - 클라이언트가 보내는 Representation에 GET, POST, DELETE 같은 것과 헤더에는 어떤 형식으로 응답 받을지(**응답 형태**) 등을 포함해서 보내고 그것을 통해서 리소스 조작가능

     - 표현 (Representation) 이란, 클라이언트가 이해하고 조작할 수 있는 형식으로 **리소스의 현재 상태**

       > https://tools.ietf.org/html/rfc7231#section-3

       - Representation Metadata 와 Representation Data로 구성되어 있음
         - ex. `Context-Type : text/plain ` 같은 것이 Metadata
       - 어떤 리소스의 특정 시점의 상태를 반영하는 정보

       ```shell
       GET /user/1234
       Accept: text/plain
       ```

       - 서버가 응답하는 것은 resource가 아닌 Representation

       ```shell
       Content-Type: text/plain
       Content-language: en
       
       Hello
       ```

  3. **Self-descriptiveness** (자체 표현 구조)
     - **REST API 메시지 그 자체로 쉽게 이해 가능**
     - 요청에 메시지의 처리 절차를 표현하는 정보를 가지고 있어야 함
       - 서버가 이것을 분석해서 어떤 타입을 반환해야 하는지 알 수 있어야 함
       - jpg, json, etc...

  4. **HATEOAS** (Hypermedia as the Engine of Application State)

  > https://wallees.wordpress.com/2018/04/19/rest-api-hateoas/
  >
  > https://dzone.com/articles/rest-api-what-is-hateoas

  - **결합도 낮춰줌**

    - 모든 리소스 URL에 대해서 하드코딩했다면 결합도가 매우 높음
    - 대신, URL들을 리턴하면 이것을 사용할 수 있어 결합도가 낮아짐
      - 특정 URL에 대한 의존도가 낮아짐

  - **현재 리소스와 연관된 자원 상태 정보를 제공**

    - **다음 단계로 할 작업을 알려줌**

  - 클라이언트가 서버와 동적인 상호작용이 가능하도록 하는 것

    - **서버는 현재 리소스와 연관된 링크 정보를 제공**
    - **클라이언트는 연관된 링크 정보를 바탕으로 리소스에 접근**

  - 상태(State)를 변화시킬수 있는 URI를 서버로부터 받고, 그 URI로 State를 변화시키는 것

    - 응답으로 받은 링크를 이용하여 그 URI로 State 변화

  - **요청보낼 URI가 변경되더라도 클라이언트에서 동적으로 생성된  URI를 사용함으로써, 클라이언트가 URI 수정에 따른 코드를 변경하지 않아도 됨**

    - 즉, URI가 나중에 변경되더라도 클라이언트는 이미 URI를 링크로 받아온 것을 사용하면 되기 때문에 URI 변경되었다고 코드를 수정하지 않아도 됨

  - **즉, 응답의 리소스에 서로 연관된 리소스들 링크도 함께 반환 되는 것**

    ```shell
    {
    	"account":{
    		"account_number": 11111,
    		"balance":{
    			"currenty": "won",
    			"value" : 1000
    		},
    		"links": {
    			"deposit": "/accounts/11111/deposit",
    			"withdraw": "/accounts/11111/withdraw",
    			"transfer": "/accounts/11111/transfer",
    		}
    	}
    }
    ```

- **Stateless**

  - **서버측에서 Context를 저장하지 않음**
  - **이전에 어떤 요청을 요청했는지 같은 정보를 저장하지 않음**
  - 문맥(Context)처리가 필요하다면 클라이언트가 자체적으로 관리해야함
    - 쿼리 파라미터, 헤더, URI등으로
  - 세션정보를 서버에 유지하지 않음
  - 클라이언트가 한번에 많은 데이터를 서버에 보낼때는 단점으로 작용함

- **Cacheable**

  - **클라이언트의 응답 캐시 가능**
    - 응답시간, 성능, 서버의 자원 사용률등 **성능 향상 가능**
  - HTTP 기준 웹표준을 그대로 사용하기 때문에, 기존 웹 인프라 그대로 사용가능
    - 그렇기 때문에 캐시 사용 가능
    - HTTP 프로토콜 표준에서 사용하는 Last-modified 혹은 E-Tag 이용해서 캐시 구현가능
      - Client가 get 요청을 Last-modified 와 함께 보냈을때, 컨텐츠 변화가 없다면 **304 Not Modified** 리턴, Client는 캐싱된 값 사용
  - **모든 응답에 응답이 캐시 가능한지 여부와 클라이언트측에서 응답을 캐시할 수 있는 기간이 포함되어야 함**
    - **즉, 같은 URI에 대한 요청이 여러번있을때, URI 리소스를 매번 서버로 요청하지 않고, 클라이언트의 HTTP 캐시에서 미리 가져온 정보 반환**

- **Client-Server architecture**

  - 클라이언트와 서버는 서로 독립적이어야 함
    - 클라이언트는 리소스를 요청만할뿐 저장소나 어떤 서버에 저장되어있는지는 관여하지 않음
  - REST API **서버는 클라이언트에게 API를 제공하기만 함**
  - 서버는 클라이언트의 실행 문맥을 알고 있을 필요가 없어 **독립적인 REST API에 대한 서비스만 제공**
    - **서로 개발해야할 내용이 명확하고 서로 간의 의존성이 줄어듬**

- **Layered System**

  - REST API는 Multi-Layer로 구성 가능
  - 클라이언트는 대상 서버에 직접 붙었는지, 중간에 존재하는 서버와 통신하는지 알 수 없음
    - 중간 서버를 이용해 Security 관리, Encrypt, Load Balancing등을 수행 할 수 있어 **확장성 및 보안 향상 가능**

- **Code on demand** (optional)

  - REST API는 서버에서 수행 스크립트를 받아서 클라이언트 사이드를 수행 가능

### 장점

- **사용이 쉽다**
  - **메시지 자체로 메시지의 본래 의도 파악 쉬움**
  - HTTP 만으로 데이터를 전송하고 처리 가능
  - 요청이 수행 컨텍스트에 독립
  - **해당 URI와 메소드만 독립적으로 이해하면 됨**
- **원하는 데이터 표현 사용 가능**
  - **헤더 부분의 URI에 처리 메소드 명시**하고 필요한 부분은 Body에 표현
  - **페이로드 부분을 다양한 언어로 사용가능**
    - 리소스의 내용은 JSON, XML, YAML등 원하는 표현언어로 사용 가능

- **클라이언트와 서버가 명확히 분리**
  - 클라이언트는 REST API를 통해 서버와 정보를 주고 받음
  - 서버는 클라이언트의 수행 컨텍스트를 유지할 필요가 없음
    - 별도의 세션 필요 없음
  - HTTP Protocol만 서비스 하면 되기 때문에 **플랫폼과 독립적**
  - **각자의 역할이 명확하게 분리 되어 있음**

### 단점

- HTTP 메소드의 한계
  - 간단한 수준의 메소드만 지원
- 표준이 없음
  - REST API는 설계가이드일뿐 표준이 아님
  - HTTP 메소드가 잘못쓰일 수 있음
  - HTTP Response Code를 2,3개만 사용하고 나머지는 사용안 할 수 있음
    - 200, 500 정도만
- RDBMS 표현에 부적합
  - REST API는 리소스를 표현할때 나열하기 용이한 형태를 사용하기 때문에 RDBMS에 표현이 부적합

### RESTful

> https://meetup.toast.com/posts/92

- REST API의 설계 의도를 정확하게 지켜주는 API

- URI 디자인

  - **URI는 자원을 정확하고 인식하기 편하게 표현하는데 집중, 자원에 대한 행위는 Uniform하게 HTTP 메소드 이용**

  1. `/`는 계층관계를 나타내는데 사용
     - 마지막에는 `/`붙이지 않기

  2. 가독성을 위해 `_`는 사용 자제
     - 대신 `-` 하이픈 사용

  3. 파일 확장자는 URI에 포함시키지 않기

  4. URI 에는 명사 위주로 쓰기
  5. URI 경로는 소문자로 나타냄
  6. 리소스간의 관계표현은 `/리소스/리소스ID/관계가있는 리소스`로 설계