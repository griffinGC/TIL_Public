# OSI 7 Layer

> https://gyoogle.dev/blog/computer-science/network/OSI%207%EA%B3%84%EC%B8%B5.html
>
> https://gyoogle.dev/blog/interview/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC.html
>
> https://velog.io/@xldksps4/OSI-7%EA%B3%84%EC%B8%B5
>
> https://shlee0882.tistory.com/110

## 계층을 나누는 목적

- **통신이 일어나는 과정을 단계별로 파악 가능**
- **에러 발생시 원인 파악 가능**
  - **트러블 슈팅 용이**
  - 특정한 곳에 이상이 생기면 그곳만 확인하면 됨

![osi7](https://1.bp.blogspot.com/-wtMZmsd3Wdw/W5Y8_ZlJzvI/AAAAAAAAAew/70nsmVdODV47cWgVAVOqFA6_0uGo0LunACLcBGAs/s640/%25EA%25B7%25B8%25EB%25A6%25BC4.PNG)

![osi7_2](https://media.vlpt.us/images/xldksps4/post/980fe5d0-fcfe-4395-9148-0a110475ba26/image.png)



## 계층별로 다루는 데이터 형식

> https://blockdmask.tistory.com/193
>
> [모두의네트워크](http://www.yes24.com/Product/Goods/61794014)

- **데이터 송수신은 이것들을 헤더로 붙이고 떼는 방식의 캡슐화와 역캡슐화를 이용하여 이루어짐**
  
- Transport (전송 계층)

  - Segment (세그먼트)

    - TCP, UDP 에 따라 헤더 붙음
    - 네트워크를 통한 실질적인 전송을 위하여 적절한 크기로 분리한 것
    - **포트 번호**를 가지고 있음
      - SP : Source Port
      - DP : Destination Port

    > https://www.netmanias.com/ko/post/blog/5372/ethernet-ip-ip-routing-network-protocol/packet-header-ethernet-ip-tcp-ip

    ![SEGMENT](https://www.netmanias.com/ko/?m=attach&no=2021)

    

- Network (네트워크 계층)
  - **IP Packet (패킷), Datagram**
    
    ![IP_PACKET](https://www.netmanias.com/ko/?m=attach&no=2020)
    
  - 분할된 세그먼트에 목적지까지의 전달을 위해 IP Header (Source IP, Destination IP)를 붙인 형태
  
  - **IP Datagram** 이라고도 부름
  
  - 헤더와 데이터로 구성됨
  
    > https://m.blog.naver.com/PostView.nhn?blogId=printf7&logNo=10170430212&proxyReferer=https:%2F%2Fwww.google.com%2F
  
- Data Link (링크 계층)
  - Ethernet Frame (프레임)
    
    > https://butter-shower.tistory.com/6
    
    ![ethernet_frame](https://t1.daumcdn.net/cfile/tistory/99C73C4A5BF433E222)
    
    - 패킷에 **Ethernet Header**(맥 어드레스 포함)와 FCS를 위한 **Trailer**가 붙은 메세지
    - Ethernet header
      - 목적지 MAC 주소(6 Byte), 출발지 MAC 주소(6 Byte), 유형(2 Byte)
        - **유형은 상위 계층 프로토콜의 종류를 뜻함**
          - IPv4, **ARP**, RARP, SNMP over Ethernet, IPv6
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
    - 사설 IP의 경우 외부에서 공인 IP만 보이기 때문에 정확한 목적지 확인을 위해 MAC 주소 필수!
- IP 주소
  - 호스트나 라우터 장비의 인터페이스에 할당된 32 비트 주소 (IPv4, IPv6)
    - **네트워크 인터페이스**
      - **하드웨어 장비, 물리 연결 장비**
  - IP 주소를 통해서 장치들이 서로 인식하고 통신 가능
- **데이터를 통신하기 위해서는 MAC주소와 IP주소 둘다 필요**
  - 사설 IP의 경우 **IP는 아파트 하나의 동**이 되는것이고 그 내부에서 식별할때 고유한 주소를 가진 **MAC주소를 호**수처럼 사용하면 됨
  - 즉, 사설 IP를 사용할 경우 전송된 데이터는 공인 IP이기 때문에 어떤 컴퓨터로 가야할지 모르지만 이때, MAC 주소를 알고 있으면 이것은 고유한 주소이기 때문에 IP에 구애받지 않고 주소를 잘 찾아갈 수 있음 



## Physical Layer (물리 계층, L1)

- 랜 카드

  - 물리계층에서 전기 신호로 변환 할때 사용
- 허브
  - 약해지거나 파형이 뭉그러진 신호를 복원시키고, 해당 전기 신호를 전달받은 포트를 제외한 나머지 포트에 전달

- 데이터를 **전기 신호**로 변환해서 **주고 받는 기능을 수행**하는 곳
  - **데이터 전송하는데 필요한 기능 제공**
- **시스템간의 물리적 연결과 전기 신호를 변환 및 제어, 전기신호로 바꾸어 전송하는 역할 수행**

## Data Link Layer (링크 계층, L2)

- Ethernet 이더넷
  - 데이터를 주고 받기 위한 규칙 중 하나
- **브릿지, 스위치**
- **프레임 (Frame)**
- 링크 레이어 스위치는 링크 레이어 주소가 없음
  - 호스트와 라우터 사이에 데이터 운반하는 역할만 수행
- **MAC 주소**를 이용하여 통신
  - 물리적 주소
- **Frame에 MAC주소 부여**
- **정보의 오류와 흐름 관리**
  - **에러검출**
  - **송수신 확인 및 재전송**
  - **흐름제어 진행**
    -  CSMA/CD
- 네트워크 기기간에 **데이터 전송 및 물리 주소 결정**

## Network Layer (네트워크 계층, L3)

- **라우터**

- **IP 패킷, 데이터그램**

- **데이터를 목적지 까지 안전하고 빠르게 전송**(논리적 경로) => 라우팅

- 라우터를 이용해 **이동할 경로 선택하여 IP 주소 지정, 경로에 따라 패킷 전송**

- **라우팅**

- **흐름제어**

- **오류제어**

- **세그멘테이션**

  > **https://www.sciencedirect.com/topics/computer-science/network-segmentation**

  - **네트워크를 작은 네트워크로 쪼개는 것**
    - 서브넷으로 쪼개는 것
  - 네트워크의 성능과 보안성을 높임

- 다른 네트워크와 통신하기 위한 **경로 설정** 및 **논리 주소(IP)** 결정

  - 인터넷이 가능하게 해줌
  - 네트워크 관리자가 직접 주소를 할당하는 구조
  - 계층적

## Transport Layer (전송 계층, L4)

> https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EA%B3%84%EC%B8%B5
>
> https://movefast.tistory.com/24

- **TCP / UDP**
- **세그먼트 (Segment)**
- **프로토콜을 통해 통신을 활성화**
- **포트 열어두고** 프로그램들이 전송을 할 수 있도록 제공
- **종단간 통신 (end to end)**
  - 송신 호스트 : 메세지를 세그먼트로 분해해 네트워크 계층(L3)으로 전송
  - 수신 호스트 : 세그먼트들을 메세지로 재조립해서 응용 계층(tcp/ip에서) 으로 전송
- **TCP **
  - 흐름제어 (Flow Control)
    - 시퀀스 넘버 기반의 오류제어 방식 사용(ack등...)
  - 혼잡제어 (Congestion Control)
  - 다중화
  - 연결 지향적 (연결 기반) - Connection Setup
  - **신뢰할 수 있는 통신 구현**
    - IP의 단점 보완
  - 패킷들의 전송이 유효한지 확인하고 전송 실패한 패킷들을 재전송
- **UDP** 
  - 비신뢰성
  - 비연결성
  - 순서 보장 안됨
  - 실시간
  - 동영상, 영상통화시 사용

## Session Layer (세션 계층, L5)

- API, Socket
- 데이터가 통신하기 위한 **논리적 연결** 담당
  - **연결이 손실되는 경우 연결 복구 시도**
  - 응용프로그램의 관점에서 봐야함
- 세션 설정, 유지, 종료, 전송 중단시 복구 등
- **동기화**
  - 통신하는 사용자 동기화
- **TCP/IP 세션 만들고 없애는 책임 가짐**
  - 3 way hand shake
  - 4 way hand shake

## Presentation Layer (프레젠테이션 계층, L6)

- JPEG, MPEG
- **서로 다른 응용프로세스의 데이터 표현에 대한 독립성 제공**, **암호화** 역할 수행
  
  - HTTPS => SSL?
- 세션 계층간의 주고 받는 인터페이스 일관성 있게 제공
  - 파일 인코딩, 명령어를 포장, 압축, 암호화등의 데이터 변환
  
    - MIME인코딩
  
    - 해당 데이터가 어떤 형태인지 구분, 인코딩 등의 역할 수행
  
  - **응용프로그램 형식 준비 또는 네트워크 형식으로 변환**

## Application Layer (응용 계층, L7)

- HTTP, FTP, DNS 등
- 최종 목적지 (사용자)
- 응용 프로세스(브라우저 등)와 직접 관계하여 **일반적인 응용 서비스 수행** => 메일 서비스 같은거 가능하게 해줌
- 사용자 인터페이스, 전자우편, 데이터베이스 관리등의 서비스 제공

- 어플리케이션에 대한 서비스 제공

