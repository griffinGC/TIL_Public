# Ethernet 이더넷

> http://blog.naver.com/PostView.nhn?blogId=haeri056&logNo=220805367585
>
> https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%8D%94%EB%84%B7

- 빛의 전달물질 에테르(ether)에서 유래됨
- 일반적으로 LAN, MAN 및 WAN에서 가장 많이 활용되는 기술
  - LAN (Local Area Network)
    - 근거리 통신망
  - MAN (Metropolitan Area Network)
    - 도시 지역 통신망
  - WAN (Wide Area Network)
    - 광역 통신망

- 물리계층에서 신호와 배선, 데이터 링크 계층에서 MAC패킷과 프로토콜의 형식 정의
- 데이터 링크 계층에서 네트워크 장비 간에 **신호를 주고 받는 규칙** 중 하나
  - 즉, **네트워크를 만드는 방식 중 하나**
  - 이더넷 외에도 토큰링, FDDI, ATM 방식등 다른 형식으로 네트워크를 구성하는 방식 존재
- 허브와 같은 장비에 연결된 컴퓨터와 데이터를 주고 받을때 사용
- 네트워크에 연결된 각 기기들이 가진 **MAC주소(48비트)를 사용하여 상호간에 데이터를 주고 받을 수 있도록 만드는 기술**

- 이더넷은 데이터 충돌을 막기 위한 규칙으로 **CSMA/CD** 방식을 사용
- 데이터 링크 계층에서 물리 계층으로 가기 전에 **이더넷 헤더**와 **트레일러**를 붙여서 **프레임**을 만듬
  - 프레임을 가지고 캡슐화가 일어나고 이것을 물리계층으로 보내고 물리계층에서 전기신호로 변환하여 전송함



### Ethernet Header 이더넷 헤더

- 목적지의 MAC주소(6 Byte), 출발지 MAC주소(6 Byte), 유형(2 Byte) 으로 구성됨
- 이더넷 유형
  - **상위 계층 프로토콜**의 종류 나타냄
  - IPv4(0800), ARP(0806), RARP(8035), SNMP over Ethernet(814C), IPv6(86DD) 

![ethernet_frame](https://t1.daumcdn.net/cfile/tistory/99C73C4A5BF433E222)

### 장점

> https://security-nanglam.tistory.com/192

- 적은 용량의 데이터를 전송할 경우 성능이 우수
- 설치 비용이 저렴하고 관리 용이
- 네트워크 구조 단순

### 단점

- 신호 때문에 충돌 발생
- 충돌 발생시 지연 발생
- 부하가 증가하면 충돌도 계속 증가



### CSMA/CD

> Carrier Sense Multiple Access with Collision Detection 
>
> 반송파 감지 다중 접속 및 충돌 탐지

- **이더넷에서 데이터 전송 시점을 늦추는 방법**
  - 데이터가 동시에 케이블을 지나가면 충돌 발생시 사용
- CS (Carrier Sense)
  - 데이터를 보내려고 하는 컴퓨터가 케이블에 신호가 흐르는지 여부 확인
- MA (Multiple Access)
  - 케이블에 데이터가 흐르고 있지 않다면 데이터를 보내도 된다는 규칙
  - 두 개 이상의 PC나 서버가 동시에 네트워크 상에 데이터를 실어 보내는 경우
- CD (Collision Detection)
  - 충돌이 발생하고 있는지 확인
- 케이블이 사용되고 있다면 대기
- **스위치**를 이용하면 충돌이 일어나지 않기 때문에 **현재는 거의 사용하지 않음**

