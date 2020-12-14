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
    - 네트워크를 통한 실질적인 전송을 위하여 적절한 크기로 분리한 것
- Network (네트워크 계층)
  - IP Packet (패킷)
    
    - 분할된 세그먼트에 목적지까지의 전달을 위해 IP Header (Source IP, Destination IP)를 붙인 형태
    
    - IP Datagram 이라고도 부름
    
    - 헤더와 데이터로 구성됨
    
      > https://m.blog.naver.com/PostView.nhn?blogId=printf7&logNo=10170430212&proxyReferer=https:%2F%2Fwww.google.com%2F
- Data Link (링크 계층)
  - Ethernet Frame (프레임)
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

