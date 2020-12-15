# ARP (Address Resolution Protocol)

> https://ko.wikipedia.org/wiki/%EC%A3%BC%EC%86%8C_%EA%B2%B0%EC%A0%95_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C

- IP 주소를 물리적 네트워크 주소(MAC)로 대응(bind) 시키기 위해 사용되는 프로토콜
  - 물리적 네트워크 주소
    - 이더넷, 토큰링의 48비트 네트워크 카드 주소
- **즉, IP 주소를 이용하여 MAC주소를 알아내는 프로토콜**
    - 데이터를 보내기 위해서는 IP 주소와 MAC 주소 모두 필요하기 때문
- DNS Server, Router 등의 MAC주소를 알아내기 위해 반복적으로 계속 수행될 수 있음



## ARP Request

- 목적지 주소를 모르기 때문에 **MAC주소를 알아내기 위해 네트워크에 브로드캐스트 하는 행위**



## ARP Reply

- 지정된 IP 주소를 가진 컴퓨터가 MAC주소를 반환하는 것
  - 반환된 MAC주소를 이용하여 **이더넷 프레임**을 만들 수 있음



## ARP Cache

- 가장 최근에 변환한 `IP : MAC주소` 로 매핑하여 보관하고 있는 램의 영역



## ARP Table

- MAC 주소와 IP 주소의 매핑 정보를 메모리에 보관하는 장소
  - ARP Cache로 저장 => 일정시간 지나면 삭제하고 다시 ARP 요청 전송
- 이후 통신은 컴퓨터에 보관된 ARP 테이블을 참고하여 전송