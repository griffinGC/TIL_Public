# 191231 TIL Openstack Day2

> openstack 과정중 2일차



## openvswitch

- 가상 bridge br-int, br-tun, br-ex 3개가 생성됨

- 정보가 ip가 위로 br-ex로 올라옴 (확인 필요)

- `/etc/sysconfig/network-scripts/` 의 위치에 `ifcfg-br-ex` 자동 생성됨

- `ifcfg-ens33` 의 device 파라미터가 물리적인 interface의 이름과 매칭 되어야 함

- `DEVICETYPE` 중요 (ovs는 openvswitch 의미)

- `ifcfg-br-ex` 의 의미

  prefix 는 netmask 주소

  DEVICE는 br-ex

  TYPE은 OVSBridge

```shell
$ ovs-vsctl show
```



## Keystone 정보

- Home 디렉토리에 `keystonerc_사용자명` 형태로 키스톤 파일 존재
- Horizon 이용 로그인



## 오픈스택 Network

1. 용어

   - Floating IP : 공인 IP (AWS의 EIP)
   - Fixed IP : 사설 IP

2. 네트워크 순서

   1. Floating IP가 Provider에게 공인 IP 요청

   2. Provider가 공인 IP 할당

   3. 할당된 공인 IP로 외부에서 접근 가능

      

## 프로젝트 생성 및 수행

__** **프로젝트에서 어떤 role을 부여 받느냐에 따라 할 수 있는것이 다름**__

1. 프로젝트 생성 (권한 `admin`, `__member__`)

2. 쿼터 변경

3. 유저 생성 (`stack1`, `mgr1`)

   ** **`admin` 관리자 권한 가지고 있으면 로그인 시 관리메뉴 확인 가능**

4. flavor 생성

   flavor 접근 권한 설정 시 그 project만 접근 가능! 접근 권한 설정 안할 시 any로 모두나 접근 가능

5. network 생성















---



### 기타

- br-ex : external switch
- ~br-ex:ens33 => 자동으로 연결해준 것
- openvswitch 사용

- 프로젝트와 그룹의 차이

  : 프로젝트도 일종의 그룹 그러나 프로젝트는 멤버들이 사용 할 수 있는 resource에 대한 쿼터가 설정되어 있는 사용자 그룹. 그로인해 리소스 사용에 대한 제한을 걸어야 함

- 서비스 계정들이 packstack에 의해서 자동으로 생성됨

- 하이퍼바이저 기반으로 VM올라감

- 가용성 존

  : AWS의 가용성 존과 유사 (A-Z).  사용자가 선택 할 수 있는 단위.

- Master, Slave가 다른 존에 있어야 HA (High Availability) 가능

- 호스트 집합 

  : 사용자 x, compute host를 관리하기 위한 목적

- AWS의 인스턴스 타입 = 오픈스택 flavor (t1.micro 같은 것)

- 시스템 정보 : compute 서비스, state 부분이 반드시 up이 되어 있어야 함

- 네트워크 에이전트 : L3 agent = router

- 사용 목적이면 프로젝트, 관리목적이면 관리로 생성

- 네트워크 보안 그룹 = AWS의 포트 관리

- 오브젝트 스토리지 = AWS의 S3

  

  

