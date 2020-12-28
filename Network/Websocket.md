# Websocket

> https://www.joinc.co.kr/w/man/12/websocket
> https://developer.mozilla.org/ko/docs/WebSockets/Writing_WebSocket_servers

- 서버와 클라이언트가 자유롭게 **양방향 통신 가능**하게 해줌

  - 웹소켓 등장에는 Comet 이란 방식이 존재 했었음
    - Comet은 HTTP상에서 데이터를 push 하기위한 방식 자체를 일걷는 기술 모두를 뜻함
    - 웹서버로 HTTP요청을 보내면, 웹서버에서 데이터가 있을때까지 대기하고 데이터가 생기면 그때 HTTP응답하고 응답 받으면 웹브라우저가 HTTP연결 끊는 형태 (반복)

- full-duplex 통신 (전이중, 쌍방향)

- OSI 중 7계층에 존재, L4 tcp에 의존
  - HTTP 프록시 및 중간층을 지원하도록 설계
  - **TCP 위에서 메시지 스트리밍 가능**
  - TCP 통신방식으로 서버와 클라이언트 사이에 데이터를 주고 받는 기술
  
- Byte 스트림 사용하지 않고, 오로지 **UTF8 포맷의 메시지 스트림만 가능**

- HTTP 기반으로 동작

  - **웹소켓 연결(핸드쉐이크)을 맺는 과정에서 HTTP 개입**
    - HTTP 업그레이드 헤더(헤더 속성이 `Upgrade`)를 이용
      - HTTP헤더 
        - Connection에 Upgrade
        - Upgrade에 websocket
    - HTTP프로토콜 => 웹소켓 프로토콜 (**Protocol Switching**)
      - 이 과정이 끝나면 HTTP 대신 **ws, wss** 프로토콜 사용



### 장점

- 서버와 클라이언트간의 양방향 통신 가능
  - 클라이언트의 요청 없이도 통신 가능
- 실시간 소통을 빠르게 가능
  - 데이터 교환이 지속적으로 이뤄져야하는 서비스에 적합
- 한번 연결된 통신 라인으로 데이터를 가져올 수 있음
  - 매번 헤더 정보를 실어서 새로 요청할 필요가 없음
  - Ajax에 비해 빠름



## Websocket 동작 과정

1. 브라우저에서 웹서버에 사용 가능한지 확인 (HTTP 통신 이용)

   - 클라이언트 => 서버 (핸드쉐이크 요청)
   ```shell
   # 요청
   GET /Chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
   Sec-WebSocket-Protocol: chat, superchat
   Sec-WebSocket-Version: 13
   Origin: http://example.com
   ```
   
2. 서버에서 핸드쉐이크에 응답 (http => ws로 protocol switching 이루어짐)

   ```shell
   # 응답
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
   Sec-WebSocket-Protocol: chat 
   ```
   
   - 웹소켓 서버는 이미 연결된 클라이언트들의 반복적인 연결(핸드쉐이크)를 막기위해 **클라이언트의 소켓 상태를 추적**
   
3. 데이터 프레임 교환

4. 클로싱 핸드쉐이크 

   - 데이터 전송 교환 완료시 수행