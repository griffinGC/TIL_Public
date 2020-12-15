# OSI 7 Layer

## 계층을 나누는 목적

- 통신이 일어나는 과정을 단계별로 파악 가능
- 에러 발생시 원인 파악 가능
  - **트러블 슈팅 용이**

![osi7](https://1.bp.blogspot.com/-wtMZmsd3Wdw/W5Y8_ZlJzvI/AAAAAAAAAew/70nsmVdODV47cWgVAVOqFA6_0uGo0LunACLcBGAs/s640/%25EA%25B7%25B8%25EB%25A6%25BC4.PNG)

![osi7_2](https://media.vlpt.us/images/xldksps4/post/980fe5d0-fcfe-4395-9148-0a110475ba26/image.png)



## 계층별로 다루는 데이터 형식

- Transport (전송 계층)
  
  - Segment (세그먼트)
    
    - TCP, UDP 에 따라 헤더 붙음
    
    > https://www.netmanias.com/ko/post/blog/5372/ethernet-ip-ip-routing-network-protocol/packet-header-ethernet-ip-tcp-ip
    
    ![SEGMENT](https://www.netmanias.com/ko/?m=attach&no=2021)
    
    - 네트워크를 통한 실질적인 전송을 위하여 적절한 크기로 분리한 것
  
- Network (네트워크 계층)
  - IP Packet (패킷)
    
    ![IP_PACKET](https://www.netmanias.com/ko/?m=attach&no=2020)
    
    - 분할된 세그먼트에 목적지까지의 전달을 위해 IP Header (Source IP, Destination IP)를 붙인 형태
    
    - IP Datagram 이라고도 부름
    
    - 헤더와 데이터로 구성됨
    
      > https://m.blog.naver.com/PostView.nhn?blogId=printf7&logNo=10170430212&proxyReferer=https:%2F%2Fwww.google.com%2F
  
- Data Link (링크 계층)
  - Ethernet Frame (프레임)
    
    > https://butter-shower.tistory.com/6
    
    ![ethernet_frame](https://t1.daumcdn.net/cfile/tistory/99C73C4A5BF433E222)
    
    - 패킷에 **Ethernet Header**(맥 어드레스 포함)와 FCS를 위한 **Trailer**가 붙은 메세지
    - Ethernet header
      - 목적지 MAC 주소(6 Byte), 출발지 MAC 주소(6 Byte), 유형(2 Byte)
        - 유형은 프로토콜의 종류를 뜻함
          - IPv4, ARP, RARP, SNMP over Ethernet, IPv6
    - **FCS** (Frame Check Sequence)
      - 데이터 전송 도중 오류가 발생하는지 확인하기 위한 용도
  
- 기본적으로 데이터 전송하는 단위를 **패킷** 이라고 통칭하여 부름
  1. Application 계층에서 HTTP 패킷 생성 (A라고 부름)
  2. Transport 계층에서 A에 TCP헤더 추가 (B = 세그먼트 라고 부름)
  3. Network 계층에서 B에 IP헤더 추가 (C = 패킷 이라고 부름)
  4. DataLink 계층에서 C에 MAC헤더 추가



### MAC Address VS IP Address

> http://melonicedlatte.com/network/2018/12/24/161629.html
>
> https://blockdmask.tistory.com/186

- MAC 주소
  - 데이터 링크 계층 에서 사용하는 네트워크 인터페이스 카드(NIC)에 할당된 고유 물리적 주소
  - NIC 를 만든 하드웨어 회사에서 할당해서 하드웨어에 저장
  - 다른 MAC 주소와 겹치지 않는 고유의 주소 48 비트
    - 고유하기 때문에 **사설 IP를 사용할때 중요한 역할 수행**
    - 사설 IP의 경우 외부에서 공인 IP만 보이기 때문
- IP 주소
  - 호스트나 라우터 장비의 인터페이스에 할당된 32 비트 주소 (IPv4, IPv6)
  - IP 주소를 통해서 장치들이 서로 인식하고 통신 가능
- **데이터를 통신하기 위해서는 MAC주소와 IP주소 둘다 필요**
  - 사설 IP의 경우 **IP는 아파트 하나의 동**이 되는것이고 그 내부에서 식별할때 고유한 주소를 가진 **MAC주소를 호**수처럼 사용하면 됨
  - 즉, 사설 IP를 사용할 경우 전송된 데이터는 공인 IP이기 때문에 어떤 컴퓨터로 가야할지 모르지만 이때, MAC 주소를 알고 있으면 이것은 고유한 주소이기 때문에 IP에 구애받지 않고 주소를 잘 찾아갈 수 있음 



## Physical Layer (물리 계층, L1)

#### 랜 카드

 물리계층에서 전기 신호로 변환 할때 사용

### 허브

약해지거나 파형이 뭉그러진 신호를 복원시키고, 해당 전기 신호를 전달받은 포트를 제외한 나머지 포트에 전달



## Data Link Layer (링크 계층, L2)

- Ethernet 이더넷



## Network Layer (네트워크 계층, L3)



## Transport Layer (전송 계층, L4)



## Session Layer (세션 계층, L5)



## Presentation Layer (프레젠테이션 계층, L6)



## Application Layer (응용 계층, L7)





## TCP/IP

- OSI7 레이어를 단축 시킨 모델

![osi7_2](https://media.vlpt.us/images/xldksps4/post/980fe5d0-fcfe-4395-9148-0a110475ba26/image.png)

- 총 4개의 계층으로 구성됨
  - Application Layer
    - Application + Presentation + Session
  - Transport Layer
  - Internet Layer
  - Network Access Layer
    - DataLink + Physical Layer
- 계층이 7개나 되기 때문에 지금은 다 사용하지 않고 TCP/IP Protocol을 주로 많이 사용함