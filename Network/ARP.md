# ARP (Address Resolution Protocol)

> https://ko.wikipedia.org/wiki/%EC%A3%BC%EC%86%8C_%EA%B2%B0%EC%A0%95_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C
>
> https://blockdmask.tistory.com/189?category=257298
>
> https://www.sciencedirect.com/topics/computer-science/address-resolution=

- IP 주소를 물리적 네트워크 주소(MAC)로 대응(bind) 시키기 위해 사용되는 프로토콜
  - TCP/IP 3계층(네트워크 계층)의 IP 주소를 2계층 (데이터 링크 계층)의 MAC 주소로 대응 시킬때 사용하는 프로토콜
  - **2계층에서 수행됨**
    - 이더넷 헤더의 유형에 ARP들어감
- MAC주소 물리적 네트워크 주소
  - 이더넷, 토큰링의 48비트 네트워크 카드 주소
- **즉, IP 주소를 이용하여 MAC주소를 알아내는 프로토콜**
    - 데이터를 보내기 위해서는 IP 주소와 MAC 주소 모두 필요하기 때문
- DNS Server, Router 등의 MAC주소를 알아내기 위해 반복적으로 계속 수행될 수 있음



## ARP Request

- 목적지 주소를 모르기 때문에 **MAC주소를 알아내기 위해 네트워크에 브로드캐스트 하는 행위**

- ARP 모듈에 알고자 하는 IP를 보내면 MAC 주소 반환 (DNS와 유사하게 동작)
  - DNS와 유사하지만 차이점으로는 같은 호스트와 라우터가 서브넷이어야 가능함
  - 만약 서울에 있는 노드가 부산에 있느 노드의 ARP 요청하면 에러 발생
    - 서로 다른 LAN으로 전송하는 경우는 아래에 기술해 놓음



## ARP Reply (Response)

- 지정된 IP 주소를 가진 컴퓨터가 MAC주소를 반환하는 것
  - 반환된 MAC주소를 이용하여 **이더넷 프레임**을 만들 수 있음



## ARP Packet

- 수신자, 발신자 IP, MAC 주소 가지고 있는 패킷
- ARP Request, ARP Respone시 이용하는 패킷 



## ARP Table

- MAC 주소와 IP 주소의 매핑 정보를 메모리에 보관하는 장소
  - ARP Cache로 저장 => 일정시간 지나면 삭제하고 다시 ARP 요청 전송
  - 가장 최근에 변환한 `IP : MAC주소` 로 매핑하여 보관하고 있는 램의 영역
- 이후 통신은 컴퓨터에 보관된 ARP 테이블을 참고하여 전송



## 서로 다른 LAN으로 데이터 전송할 경우

- 가정
  - A
    - 시작지 
    - IP : 111.111.111.111
    - MAC : 12-34-9C-E8-FF-55
  - B
    - 도착지
    - IP :222.222.222.222
    - MAC : 49-8C-D2-C7-56-3A
  - R
    - SUBNET1
      - IP : 111.111.111.110
      - MAC : E6-E9-00-17-BB-4B
    - SUBNET2
      - IP : 222.222.222.220
      - MAC : 1A-23-F9-CD-06-9B
- 데이터 전송 순서
  1. A에서 데이터 생성 및 SUBNET1으로 전송
     - 시작지 MAC : A의 MAC주소
     - 도착지 MAC : **SUBNET1의 MAC주소**
       - 도착지를 B의 맥주소가 아닌 SUBNET1의 맥주소로 설정함
       - **이때 ARP사용!**
     - 시작지 IP : A의 IP
     - 도착지 IP : B의 IP
  2. R의 SUBNET1에서 데이터 받고 프레임을 ip 계층으로 올려보냄
  3. R에서 IP 시작점을 A의 주소로 하고, IP 도착지를 B의 주소로 설정된 것 확인하교 subnet2로 넘김
  4. R에서 새로운 Link-layer frame 생성
     1. B의 MAC주소를 도착지 MAC주소로 설정
        - **ARP 이용하여 알아냄**
     2. 시작지 MAC주소를 SUBNET2의 MAC 주소로 설정
     3. IP는 기존에 설정된 것과 동일하게 유지
        1. 시작지 IP : A
        2. 도착지 IP : B
  5. 이렇게 완성된 MAC주소를 바탕으로 기기를 찾아감