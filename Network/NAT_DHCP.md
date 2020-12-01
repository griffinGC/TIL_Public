# NAT & DHCP

> https://wedul.site/205
>
> https://jwprogramming.tistory.com/30
>
> https://m.blog.naver.com/PostView.nhn?blogId=hyunjong_oh&logNo=110184561115&proxyReferer=https:%2F%2Fwww.google.com%2F
>
> https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%EC%A3%BC%EC%86%8C_%EB%B3%80%ED%99%98
>
> https://peemangit.tistory.com/34



## NAT (Network Address Translation)

- 라우터를 통해 네트워크 트래픽의 패킷의 TCP/UDP 포트 숫자와 소스 및 목적지의 IP와 포트를 바꿔(재기록)가며 데이터를 주고 받는 기술
  - 이 기술을 사용하면 IP나 TCP/UDP의 체크섬도 다시 계산 되어 재기록 필요
  - IP의 헤더 부분을 체크하여 NAT 테이블에 의해 해당주소로 바꾼 다음, cheksum을 계산하여 ip 헤더를 바꾸는 방식
- 공인 IP를 사설 IP로 변환 및 그 반대 작용
  - 공인 IP(외부망) -> 사설 IP(내부망)
    - 들어올때는 공인IP 타고 들어옴
  - 사설 IP(내부망) -> 공인 IP(외부망)
    - 나갈때는 공인IP로 나감
  - **이 기술을 사용함으로써 1개의 공인 IP로 여러개의 사설 IP 사용 가능**
- **인터넷과 사설망 사이에 방화벽 설치하여 외부의 공격으로부터 내부 사용자 보호 가능**
  - 이 기술을 사용하면 라우터는 외부 IP 주소만 외부로 알려주기 때문에 내부에 있는 사용자의 IP를 알 수 없으므로 보호 가능 
  - 외부에서 내부를 알 수 없음

- 어떻게 외부IP를 타고 들어온 데이터가 내부에서 어디로 가야할지 앎?
  - 어차피 외부에서 라우팅되서 올때는 IP 주소 + 맥 주소 를 사용하기 때문에 상관 없는 것인가?
  - PAT사용



### PAT

- Dynamic NAT의 한 종류
  - 내부의 다수 IP **포트**들을 공인 IP의 **포트**로 변환해주는 기술 (역으로도 가능)
- 변환된 IP 주소 만으로는 내부망 호스트들을 구분할 수 없기 때문에 포트 번호 부여
- 포트포워딩과는 다름
  - 포트포워딩은 **공인 포트 번호** =>  **(사설IP + PORT)**
    - 포트간 맵핑
  - PAT는 **(공인IP + PORT)** => **(사설 IP + PORT)** 



## DHCP (Dynamic Host Configuration Protocol)

- IP를 중앙에서 관리하고 다른 기기들에 자동으로 IP 할당하는 역할
  - 가상 IP가 아닌 실제 IP 할당 (하지만 라우터가 만들 사설 IP 할당 가능)
- AP에서 수행
- 주어진 IP 주소가 일정시간동안 컴퓨터에 유효하도록 IP를 일종의 **임대**해주는 기능