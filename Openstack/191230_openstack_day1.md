# 191230 TIL Openstack Day1

> openstack 과정중 1일차



## 0. 클라우드 컴퓨팅

### 0.1 정의

 : 컴퓨터의 자원이나 데이터를 사용자가 이용하는 기기로 제공하는 인터넷 기반의 컴퓨팅 환경 on-premise와 반대개념



### 0.2 구분

| 종류 | 사용자                                                    |
| ---- | --------------------------------------------------------- |
| IaaS | it 관계자들이 주로 사용 (DIY 방식)                        |
| PaaS | 개발자들이 주로 사용 (하나의 플랫폼으로 자동화 시키는것!) |
| SaaS | EndUser들이 주로 사용 (회사 또는 일반 사용자 모두를 칭함) |










## Openstack (Day 1)

#### 진행 방식 - 각 서비스 한번씩 이용하면서 훑고 차례대로 깊이있게 사용하는 방식으로 학습 예정 (CentOS기반으로 학습 예정)



### 1. 설명

AWS를 본따서 시작한 오픈소스 project! 현재 거의 산업표준이 됨. NASA(Nova)와 Rackspace(Swift)로 부터 코드를 기증받아서 시작함. public, private 클라우드 구축하기 위한 오픈소스. 클라우드는 selfservice가 들어가기 때문에 가격이 저렴함. openstack을 기반으로 한 서비스로는 NHN의 TOAST가 존재



#### 1.1 특징

- 교재 - 오픈스택 관리 바이블 (정철 저)
- 오픈소스 클라우드 프로젝트.
  - 그로인해, 같은 버전이더라도 의도치 않게 작은것이 update되어서 오류 발생할 수 있음
- 여러 서비스의 융합
- Packstack (CentOS) 기반 All -in - One 사용할 예정
- 서비스 이해를 통한 trouble shooting등을 가능하게 하기 위해 manual 설치 할 예정
- Rocky 버전 사용. (릴리즈 버전은 알파벳순)
- 총 4개의 part중 1,2,3 part까지만 학습



#### 1.2 Openstack의 서비스 설명 및 AWS와 서비스 비교

| 서비스   | 설명                                                   | 유사서비스           |
| -------- | ------------------------------------------------------ | -------------------- |
| Keystone | 사용자 관리 (인증 서비스)                              | IAM (AWS)            |
| Nova     | 가상머신 관리 (컴퓨트 서비스)                          | EC2 (AWS)            |
| Glance   | 가상 이미지 관리 (이미지 서비스)                       |                      |
| Horizon  | 웹 브라우저를 이용한 GUI 콘솔 제공 (대시보드)          |                      |
| Swift    | Object 기반 스토리지 제공<br />(클라우드 저장 storage) | S3 (AWS)             |
| Cinder   | Block 기반 스토리지 제공<br />(가상머신 저장 storage)  | EBS (AWS)            |
| Neutron  | 네트워크 관리                                          |                      |
| Heat     | 자동화 도구                                            | cloud formation(AWS) |
| Ironic   | 물리 서비스. bare mental 설치 가능하도록 도와줌        |                      |



#### 1.3 Storage 유형

- Object 기반 (Swift / S3)
  - RESTful API 이용 접근
- Block 기반 (Cinder / EBS)
  - 장치 file을 할당 받음
- File 기반 (Manila / NFS / EFS)
  - 가장 일반적인 시스템 
  - 특정 디렉토리로 마운트해서 사용하는 방식 
- Database 기반 (RDBMS, No SQL)



---



### 2. 서비스 소개

#### 2.1 Keystone (인증 서비스)

- 사용자 및 API에 대한 인증 및 권한 설정 서비스 제공
- Openstack 서비스들을 위한 통합 인증 시스템



#### 2.2 Glance (이미지 관리 서비스)

- Hypervisor에 의존 
- 이미지는 Nova가 사용하고 Swift에 이미지 저장됨.
- Swift가 고가용성 (High Availability) 가능하기 때문
  - 고가용성이란 오랜기간동안 지속적으로 정상 운영이 가능한 성질 / 고장나지 않음 / 빠른 복구가 가능함
- 가상 디스크 이미지 저장 / 등록 / 관리 서비스



#### 2.3 Neutron (네트워크 서비스)

- 소프트웨어 기반 네트워킹 서비스

- 침입탐지 시스템, 로드밸런싱, 방화벽, VPN지원

- 필요한 네트워크 생성, 트래픽 관리, 다른 장치로 연결 가능

- Floating IP 지원

  - 트래픽을 동적으로 관리하여 내부 다른 시설로 리다이렉팅 가능

    

#### 2.4 Nova (컴퓨팅 서비스)

- 가상머신 라이프사이클 관리자 (IaaS의 핵심 서비스)
- Qemu와 KVM이 존재함 (성능은 커널 기반인 KVM이 더 좋음)
- Qemu는 하드웨어에 의존 하지 않음. 하지만 KVM은 가상화 지원하는 CPU에서만 사용 가능
- 서비스 이름에 Xen들어간 것들은 반가상화



#### 2.5 Cinder (Block 기반 저장 서비스)

- 클라이언트에 장치 파일 형태로 제공 
  - 용도에 맞게 포맷가능
- VM이 Disk Storage가 부족해서 쓰는 시스템
- 가상머신에 마운트 되어 사용됨



#### 2.6 Swift (Object 기반 저장 서비스)

- End User가 Storage 부족할때 쓰는 시스템
- redundant 고가용성을 위해 Glance와 사용
- 대규모 확장성과 중복 없는 객체 저장 가능



#### 2.7 Horizon (대시보드)

- 웹 기반의 사용자 인터페이스 환경 제공
- 아파치 웹 서버 사용
- 파이썬 장고 프레임웍으로 구현됨



---



### 3. 설치

> 메뉴얼 설치와 자동화 툴을 이용한 설치 2가지가 존재함

CM 도구로는 Chef, Puppet, ansible, salt 등이 존재함



#### 3.1 자동화 툴을 이용한 설치방식

- Redhat
  - Packstack : 소규모 10 ~ 15 개 정도의 컴퓨터를 이용한 구축에 적합함. 중간에 실패하면 이미 설치한 부분 건너뛰고 설치
  - Foreman / Openstack Platform Director : 20대 이상의 컴퓨터 구축에 적합

- Canonical
  - Juju (서비스 모델링 서비스)  / Maas / Charms (package archive)
  - 모듈 프로젝트시 시도해보는것도 좋을 듯

- Mirantis
  - HA (High Availability) 가 적용 되게끔 실제 설치 가능한 모델
  - Web UI 형태
  - 고가용성 아키텍쳐 사용
  - Fuel

- Ubuntu

  - Devstack : 쉘 스크립트 기반. 중간에 실패하면 clean up 하고 처음부터 다시 설치. Panstack이 성능이 훨씬 좋음

  - Conjure-up : 융통성이 떨어짐
  - OSA (Openstack on Ansible) : ansible 이용 설치 

- Kolla : 커널공유방식 LXC 이미지 이용

- openstack-helm : 배포 도와줌



#### 3.2 오픈스택 Architecture

##### 3.2.1 All - In - One (pdf p.44)

- 설치 하기에 앞서서 네트워크 환경 먼저 해주어야함
  - br-int : 통합 bridge (backbone switch)
  - br-ex : 외부망. 물리적 interface 연결. ens33과 연결됨
- Network-layout design 하는게 중요
- 하나의 VM안에 컨트롤러와 compute 모두 설치 되어 있는 구조

##### 3.2.2 Two nodes

- 컨트롤러와 컴퓨트 노드 2개로 구성됨
- 대부분의 서비스는 Controller Node가 처리함
- 컴퓨트 노드는 추가 가능
- network interface는 원래 분리하여햐 하나 한개로 사용할 예정
- Management network interface는 필수

##### 3.2.3 Three nodes

- 컨트롤러, 컴퓨트, 네트워크 노드 3개로 구성됨
- 상황에 따라 컴퓨트 노드나 스토리지 노드는 부족하면 확장가능
- 네트워크 노드는 부족해도 확장할 수 는 없음 => active standy



#### 3.2 Packstack 이용 All-In-One설치 (PDF P.49 ~)

- 설치 시 주의점
  - custom설치 이용
  - 파티션 설정시 Home 파티션 줄일 것 
  - 네트워크 static으로 변경 시켜야함

- CentOS 설치 후 업데이트 & 최적화 (방화벽 해제)

  ```shell
  $ yum -y update
  $ systemctl stop firewalld
  $ systemctl disable firewalld
  $ systemctl stop NetworkManager
  $ systemctl disable NetworkManager
  ```

  - CentOS 버전에 따라 서비스 레벨에서 차이 존재

  - Packstack이 나머지 처리해주기 때문에 firewalld disable까지만 셋팅해줌

  - NetworkManager가 enable 되면 원하지 않는 형태로 ip 변경 될 수 있음

  - SELinux 확인 및 끄기

    ```shell
    $ getenforce
    //작동 시 Enforcing 
    //꺼짐 시 Permissive 
    ```

    

- NTP 서버 설정

  - log에 시간이 기록되는데 클라우드내에 있는 노드끼리 시간이 맞아야 하기 때문에 모든 노드드링 타임에 대한 동기화가 필요
  - 모든 openstack의 노드는 NTP 서버에 동기화 하는 Client로 등록해야함
  - Controller node가 NTP서버역할 수행
  - ``chrony`` 또는 ``NTP`` 설치  (chrnony가 성능 더 좋음)

  ```shell
  $ yum install chrony -y
  $ vi /etc/chrony.conf
  //파일 수정
  # Use public servers from the pool.ntp.org project.
  # Please consider joining the pool (http://www.pool.ntp.org/join.html).
  #server 0.centos.pool.ntp.org iburst
  #server 1.centos.pool.ntp.org iburst
  #server 2.centos.pool.ntp.org iburst
  server 3.centos.pool.ntp.org iburst
  server 2.kr.pool.ntp.org iburst
  
  server 127.127.1.0
  
  allow 10.0.0.0/24
  .
  .
  .
  //서버 설정
  $ yum install -y ntpdate
  $ grep server /etc/chrony.conf
  $ ntpdate 2.kr.pool.ntp.org
  $ date
  $ systemctl start chronyd
  //$ systemctl restart chronyd
  $ systemctl enable chronyd
  $ chronyc sources
  ```

  - 외부 NTP서버로부터 clock 받아서 노드들에게 동기화 시키겠다는 의미
  - 서버이자 클라이언트인 상태

- 호스트 이름 변경

  ```shell
  $ hostnamectl set-hostname 변경할이름
  ```

- 멤버노드 등록 (추가)

  ```shell
  // ip와 hostname 매칭 해줄 것
  $ vi / etc/hosts
  10.0.0.100 controller
  10.0.0.101 compute1
  ```

- 오픈스택 설치

  ```shell
  $ yum install -y centos-release-openstack-rocky
  $ yum repolist
  $ yum upgrade -y
  ```

  - Packstack은 controller에만 설치!

- Packstack 설치 및 keystone 변경

  ```shell
  $ yum install -y openstack-packstack*
  $ packstack --gen-anser-file=/root/openstack.txt
  //파일 수정
  
  
  //time은 시간이 얼마나 걸리는지 알아보기 위함 => 생략가능
  $ time packstack --anser-file=/root/openstack.txt
  ```



---



### 기타

- 인터넷 OS = AWS, Azure, GCP 와 같은 클라우드 서비스를 뜻함
- S3 과금정책 : 리소스(저장 size) + HTTP건수 + Network bandwidth (traffic)
- on-premise : 시스템 자체를 구매해서 소유하는것. 클라우드 컴퓨팅과 반대 개념
- EC2기반으로 DB설치하면 설치한 사람이 직접 관리 해야 하지만 AWS의 DB 서비스 이용하면 대신 관리해줌
- Persistent Storage : Storage 삭제해도 영구 보관 가능 (Cinder, Nova)
  
  - Cinder에 데이터를 저장해 놓으면 한번 날리고 다시 설치해도 데이터가 남아 있음
- Hypervisor : 가상화 OS 관리자
- 오픈스택은 대부분 Python으로 쓰임
- Scale up : 박스내에서 cpu나 memory resource 증설
- Scale out : 박스 단위로 증설시키는 것
- SELinux
  - redhat 계열에서는 기본적으로 enable 상태
  - 포트 허용했을 경우 접근하는 주체에 Label부여함
  - 디렉토리에도 Label부여함
  - 이로써, 주체와 디렉토리와 Label이 같지 않다면 접근 못하게 함
  - label 확인 방법 ``# ls -Zl``
  - ``/etc/selinux/config`` 파일에서 ``SETLINUX=disabled`` 처리 하면 됨

- 하드웨어 정보표시 

  ```shell
  $ egrep '(vmx|svm)' /proc/cpuinfo
  //또는
  //egrep는 pipe이용해서 'or'가능 grep에서 업그레이드 된 버전 
  $ lscpu
  ```

- compute node 추가할때는 Linux bridge 사용할 예정
