# GRPC

- 구글에서 만든 오픈소스 범용 RPC 프레임워크 
- C/C++, Java, Ruby, Node.js, Python등 대부분의 모던 프로그래밍 언어를 지원
  - 폴리그랏 형태의 개발 가능
  - MSA에 적합
- MSA와 물려서, RPC를 하나의 서비스로 배포할 수 있음
- REST의 단방향의 한계를 극복하고 HTTP2 기반의 Streaming을 지원
- REST대비 빠른 성능을 지원함
- 높은 생산성과 효율적인 유지보수
  - 코딩의 양이 적고 간단
- 단점
  - 네이티브 프로토콜의 한계로, 데이터 포맷 변환이 런타임시 자유롭지 못함
  - 중간에 메세지를 열어서 라우팅이나 메디에이션을 하는 API GATEWAY도입이 어려운 구조
- 비지니스 로직에 집중하여 빠른 개발이 가능





### 참고자료

> https://bcho.tistory.com/1011

> https://medium.com/@goinhacker/microservices-with-grpc-d504133d191d

> https://velog.io/@kyusung/grpc-web-example