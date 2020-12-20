# 3 way hand shake & 4 way hand shake

> https://gyoogle.dev/blog/computer-science/network/TCP%203%20way%20handshake%20&%204%20way%20handshake.html
>
> https://www.geeksforgeeks.org/tcp-3-way-handshake-process/
>
> https://gyoogle.dev/blog/interview/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC.html
>
> https://mindnet.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-22%ED%8E%B8-TCP-3-WayHandshake-4-WayHandshake

## 3 way hand shake - 연결 성립

- Client (왼쪽) - Server (오른쪽)

![3WAYHANDSHAKE](https://media.geeksforgeeks.org/wp-content/uploads/TCP-connection-1.png)

- TCP 서버와 클라이언트 사이에 전송을 위해 **연결을 성립**하는 과정

  - 신뢰성 확보 가능

- SYN

  - 연결 요청 플래그

- ACK

  - 응답

- 순서

  ### STEP 1 (SYN) (Client -> Server)

  - **클라이언트**가 서버와 커넥션을 연결하기 위해 **SYN**(Synchronize Sequence Number) 패킷을 보냄
    - SYN(X)
      - 클라이언트가 통신을 하기 원한다는 의사와 함께 세그먼트가 시작하는 순서의 숫자를 보냄
  - **클라이언트는 SYN_SENT** 상태
    - SYN/ACK 응답을 기다림

  ### STEP 2 (SYN + ACK) (Server -> Client)

  - **서버**가 클라이언트에게 요청을 수락한다는 **ACK(X + 1)와 SYN(Y) 세트를 응답**함
    - ACK(X + 1)
      - 서버가 받은 세그먼트의 응답 번호 + 1
    - SYN(Y)
      - 세그먼트를 시작할 순서의 번호
  - 서버는 **SYN_RECEIVED** 상태

  ### STEP 3 (ACK) (Client -> Server)

  - **클라이언트**가 서버의 응답을 받고 **ACK(Y+1)**을 서버로 전송
  - 커넥션 성립
    - 이후 부터는 데이터 전송



## 4 way hand shake - 연결 종료

- 연결 종료시 사용

  ### STEP 1 (FIN) (Client -> Server) 

  - **클라이언트**가 연결 종료 하겠다는 **FIN** 플래그 전송

  ### STEP 2 (ACK) (Server -> Client)

  - **서버**는 클라이언트의 요청(FIN) 받고, 알겠다는 **메세지 (ACK) 응답**
    - **데이터를 모두 보낼때까지 잠시 TIME_OUT**

  ### STEP 3 (FIN) (Server -> Client)

  - **서버**에서 데이터를 모두 보냈다면, 연결이 종료되었다고 클라이언트에게 **FIN**플래그 전송

  ### STEP 4 (ACK) (Client -> Server)

  - **클라이언트**는 FIN메세지를 받고 확인했다는 **ACK 전송**

  #### 연결 종료

  1. 서버는 ACK 메세지를 받고 소켓 연결을 닫음
  2. 클라이언트는 서버로 부터 못받은 데이터 대비해서 일정 시간동안 세션을 남겨둠 (**TIME_WAIT**)

  

