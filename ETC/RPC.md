# RPC (Remote Procedure Call)

- 별도의 원격 제어를 위한 코딩 없이 다른 주소 공간에서 함수나 프로시저를 실행할 수 있게하는 프로세스 간 통신 기술
  - 이를 이용하면 프로그래머는 함수가 실행프로그램에 어느 위치에 있든 동일한 코드를 이용할 수 있음
- 네트워크로부터 떨어져 있는 컴퓨터에서 코드를 실행하는 방식

- 분산 네트워크 환경에서 프로그래밍을 좀 더 쉽게 할 수 있게 해줌

- Client - Server 간의 커뮤니 케이션에 필요한 상세 정보는 최대한 감추고 일반 메서드를 호출하는 것처럼 호출하면 된다.

- Google에서 만든 서비스로는 [GRPC](./GRPC.md)가 있음
- HTTP 기반 REST의 경우, 호출하는 파라미터와 응답 값이 명시적이지 않아서 오류의 여지가 많고, JSON을 통해서 쏘기 때문에 속도가 다소 떨어지는 단점이 있음



### 작동 방식

- 프로그램의 이름과 실행 인자가 필요함
- 양쪽의 인터페이스 규약을 IDL (Interface Definition Language)등의 언어로 정의한 후, 해당 언어가 부를 수 있는 형태의 코드로 생성을 해줘야 함
  - 이를 Skeleton과 Stub코드라고 부름
- XDR 이라는 표준화된 양식에 따라 작성
- Client - Server 패턴
  - Client는 요청하고 기다리고 Server는 요청한 내용을 실행하고 결과값 반환
  - 결과 값이 반환되면 Client는 결과 값을 받아 진행
  - Server로 부터 자료를 받을때는 주로 Socket프로그래밍 이용





### 참고자료

> [https://ko.wikipedia.org/wiki/%EC%9B%90%EA%B2%A9_%ED%94%84%EB%A1%9C%EC%8B%9C%EC%A0%80_%ED%98%B8%EC%B6%9C](https://ko.wikipedia.org/wiki/원격_프로시저_호출)

> https://redcoder.tistory.com/126

> https://nesoy.github.io/articles/2019-07/RPC

> https://www.slideshare.net/WonchangSong1/rpc-restsimpleintro

> https://bcho.tistory.com/1011