# TCP / IP

-  OSI7 레이어를 단축 시킨 모델

![osi7_2](https://media.vlpt.us/images/xldksps4/post/980fe5d0-fcfe-4395-9148-0a110475ba26/image.png)

- 총 4개의 계층으로 구성됨
  - Application Layer
    - Application + Presentation + Session
  - Transport Layer
  - Internet Layer
  - Network Access Layer
    - DataLink + Physical Layer
- 계층이 7개나 되기 때문에 지금은 다 사용하지 않고 TCP/IP Protocol을 주로 많이 사용함

### Network / Link 계층

- 물리 적인 영역의 표준화
- LAN, WAN 같은 네트워크 표준과 관련되 프로토콜 정의

### IP / Internet 계층

- **경로 검색 해주는 계층**
  - 라우팅
- **IP 주소 설정**
- IP는 **비연결지향적(Connectionless)**, **신뢰할 수 없음**는 프로토콜임
  - **신뢰성, 흐름제어 없음 => TCP가 보완해줌**
- 데이터를 전송할때마다 거쳐야할 경로 선택해 줌
  - 경로가 일정하지 않음
- 문제 발생시 데이터가 손실되거나 오류가 발생하는 문제가 발생할 수 있음
  - 오류 발생에 대한 대비가 되어있지 않음

### TCP/UDP / Transport 계층

- 데이터의 실제 송수신 담당
- TCP
  - 데이터 전송시 IP프로토콜 기반
  - IP의 신뢰할 수 없는 문제를 TCP가 해결해줌
    - 데이터의 순서가 올바르게 전송 되었는지 확인해주며 대화를 주고 받음
    - 3 way hand shaking
  - 흐름 제어와 혼잡 제어 지원해서 데이터 순서 보장
    - 흐름 제어
      - 송신과 수신의 데이터 처리 속도 차이를 조절
    - 혼잡 제어
      - 네트워크 내의 패킷 수가 넘치지 않게 방지
  - 정확성 높은 전송을 하기 위해 사용
    - 단, 속도가 느림
    - HTTP, E-MAIL, 파일 전송에 사용
- UDP
  - 간단함
  - 데이터 손실 가능성 있음

### Application 계층

- 서버와 클라이언트를 만드는 과정에서 **프로그램 성격에 따라 송수신 약속이 정해짐**