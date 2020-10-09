# GRPC

- 구글에서 만든 오픈소스 범용 RPC 프레임워크 
  - 원격에 정의된 프로시저 호출
    - 원격프로시저
      - 별도의 원격 제어를 위한 코딩 없이 다른 주소 공간에서 함수나 프로시저를 실행할 수 있게 하는 프로세스 간 통신 기술
- C/C++, Java, Ruby, Node.js, Python등 대부분의 모던 프로그래밍 언어를 지원
  - 폴리그랏 형태의 개발 가능 (여러 언어 섞어서 가능)
  - **MSA**에 적합
- **MSA**와 물려서, RPC를 하나의 서비스로 배포할 수 있음
- REST의 단방향의 한계를 극복하고 HTTP2 기반의 Streaming을 지원
- REST대비 **빠른 성능**을 지원함
- 비지니스 로직에 집중하여 빠른 개발이 가능
- 높은 생산성과 효율적인 유지보수
  - 코딩의 양이 적고 간단
- 단점
  - 네이티브 프로토콜의 한계로, 데이터 포맷 변환이 런타임시 자유롭지 못함
  - 사람의 눈으로 읽기 어려움
  - 중간에 메세지를 열어서 라우팅이나 메디에이션을 하는 API GATEWAY도입이 어려운 구조
- 계약 기반 RPC 서비스
  - 서버와 클라이언트(Stub) 서로 약속을 하는 것임
- 데이터를 주고 받을 때 **프로토콜버퍼(ProtoBuf)** 사용
  - 바이너리 파일로 전송
  - 사람이 읽을 수 없음
  - 파싱을 할 필요가 없음
    - 바이트가 오면 그 바이트 그대로 메모리에 써버리고 객체 레퍼런스가 가리켜 버리면 끝
- 프로토콜 버퍼의 **IDL**만 정의하면 높은 성능을 보장하는 서비스와 메세지에 대한 소스코드가 자동으로 생성됨
  - protoc 컴파일러 사용
  - `.proto`
    - 예전 xml 스키마를 대체하는것
    - proto 파일이 변경되면 proto 파일을 쓰는 애플리케이션이 다시 공유되어야 하고 컴파일 되어야 함
  - IDL (인터페이스 정의 언어)



## 사용법

1. protoc라는 컴파일러 설치
2. `.protoc` 파일에 원하는 데이터를 작성하고 protoc 컴파일러로 컴파일해서 원하는 프로그래밍 언어로 소스 생성
3. 원하는 프로그래밍 언어에서 프로토콜 버퍼 api 라이브러리를 적용해 api 사용







### 참고자료

> https://bcho.tistory.com/1011

> https://medium.com/@goinhacker/microservices-with-grpc-d504133d191d

> https://velog.io/@kyusung/grpc-web-example

> https://docs.microsoft.com/ko-kr/aspnet/core/grpc/comparison?view=aspnetcore-3.1

> https://jeong-pro.tistory.com/190