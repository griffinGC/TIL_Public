# 200102 TIL Openstack Day3

> Openstack 과정 중 3일차



## 0. 인스턴스 접속 방법

> 버그로 인해 직접적인 ssh접속이 어려움. 그로인해 controller에서 접속

### 0.1 아이디와 패스워드 이용 접속

```shell
//qrouter이하에 오는 번호를 복사하여 이용하여 접속
$ ip netns
//FloatingIP & FixedIP 둘다 사용가능
$ ip netns exec qruoter~ ssh 유저id@FloatingIP
//또는
$ ip netns exec qruoter~ ssh 유저id@FixedIP
```



### 0.2 키를 이용하여 접속

키를 이용할때는 중간에 키 파일 이름을 넣어서 접속!

```shell
$ ip netns exec qrouter~ ssh -i 키파일명.pem 유저명@FloatingIP
$ ip netns exec qrouter~ ssh -i 키파일명.pem 유저명@FixedIP
```

``.pem``파일이 필요 하므로 디렉토리 밑으로 이동한 후 실행. 파일 권한을 others가 사용할 수 없도록 660또는 600으로 바꾼후 이용.

> 파일 이동은 VM의 경우 앞서 사용했던 폴더 공유방식 이용!




## 1. Snapshot

> restore하기 위한 방식

Storage Migration에 사용

### 1.1 Volume snapshot

- Cinder에 있는 볼륨을 스냅샷
- 볼륨을 스냅샷 해서 기존 또는 다른 곳에 연결 가능!

### 1.2 Instance snapshot

- root 디스크를 백업하는 용도

- volume을 연결했다면 연결된 volume은 snapshot 찍히지 않음



## 2. Object Storage Service (Swift = AWS의 S3)

- Private은 나만 접근 가능, Public은 다른 사용자들도 접근 가능!



## 3. Keystone

- 통합 인증 서비스로써, 사용자 관리, 서비스 카탈로그 제공
- 서비스 카탈로그란 서비스 이름과 맵정보를 관리해 주는 것을 뜻함.
- tenant = project (사용자 그룹, 리소스 쿼터 적용)
- Credentials  
  - 자격증명 데이터. 누군지 증명하기 위한 사용자 데이터 (id, 비번)
  - 토큰 발급 하고 DB (MariaDB) 에 저장
  - 토큰은 임의의 랜덤 text bit, expire time이 존재함
- 서비스 요청할때는 end point로 요청
- mariaDB 설치되어있지만 실제로는 mysqld로 서비스중
  - ``mysql -uroot `` 실행 시 ``MariaDB[(admin)]`` 이라고 뜸
  - 여기서 ``use 데이터베이스명`` 이용해서 데이터베이스 접근 가능
  - All-In-One으로 설치 되어 있을 경우 데이터베이스에 nova, neutron, cinder, glance가 자동으로 생성되어  있음
  - ``cli``를 이용해서도 바로 DB접근 가능



## 4. DB접근 (CLI 이용)

### 4.0 먼저 접근하기 위해서는 먼저``keystonerc_admin``파일을 적용시켜줘야함 

```shell
$ source keystonerc_admin
//or
$ . keystonerc_admin
//제대로 실행됬다면 아래와 같은 화면으로 변경됨
[root@controller ~(keystone_admin)]$
```

### 4.1 openstack DB접근 명령어

```shell
//유저 리스트 확인
$ openstack user list
//프로젝트 리스트 확인
$ openstack project list
//역할 리스트 확인
$ openstack role list
//서비스 리스트 확인
$ openstack service list
//특정 프로젝트에서 사용자의 role 확인
$ openstack role list --user 사용자명 --project 프로젝트명

//사용자 생성
$ openstack project create --description "프로젝트 설명" 프로젝트 이름
$ openstack user create --password 패스워드 --project 프로젝트이름 사용자명
$ openstack role add --project 프로젝트명 --user 유저명 _member_ //유저를 멤버로 지정
$ openstack role list --project 프로젝트명 --user 유저명 //생성 확인
```

### 4.2 권한 해제 방법

- export 시킨것들 일일이 unset 
- 스크립트 파일 이용하여 한번에 unset
- 콘솔창 disconnect 했다가 다시 접속

=> 가장 추천하는 방식은 스크립트 파일 이용하여 동작시키는 것

​	사용자 파일 만들어 놓고 그때 그때 바꿔가며 사용하면 됨

- unset 방식

	```shell
unset OS_SERVICE_TOKEN
    unset OS_USERNAME
    unset OS_PASSWORD
    unset OS_REGION_NAME
    unset OS_AUTH_URL
    
  unset OS_PROJECT_NAME
  unset OS_USER_DOMAIN_NAME
  unset OS_PROJECT_DOMAIN_NAME
  unset OS_IDENTITY_API_VERSION
  
  export PS1='[\u@\h \W]\$ '
  ```

- ``keystonerc_admin`` 파일을 복사하여``:%s/export/unset`` 과 ``:%s/=//`` 을 이용하여 수정 (PS1은별도 수정)

### 4.3 토큰 발급 요청

- ```shell
  $ openstack token issue
  ```
  
  

## 5. 수동설치

> 공식 홈페이지 문서를 순차적으로 수행 [여기](https://docs.openstack.org/install-guide/)

### 5.1  수동설치 시 팁

- openssl : 랜덤비번 사용을 위한 유틸리티
- 미리 네트워크 설정에서 ``/etc/sysconfig/network-scripts/ifcfg-ens33`` 파일의 ip와 UUID를 수정해야함
  
- ip의 경우 원하는 ip로 변경하고 UUID는 주석처리
  
- 오픈스택 설치 여부 확인

  ```shell
  //오픈스택 설치여부 확인
  $ rpm -qa | grep openstack
  //다운받는 목록에 들어갔는지 확인
  $ yum repolist
  $ yum install python-openstackclient
  $ yum install openstack-selinux
  ```

- Keystone, Cinder, Neutron, Nova => DB로 관리
- ``/etc/my.cnf.d/openstack.cnf`` 파일 생성 및 수정
  
  - ``bind-address=0.0.0.0`` 이면 모두 허용한다는 의미
- DB 설치후, enable & start (status로 확인 ``systemctl status mariadb.service``)

- 보안 설정시, anonymous 삭제, remote는 때에 따라 삭제, testDB는 삭제, Privileges는 Y

### 5.2 Message queue ([오픈스택관리바이블 p123~](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=143335865))

- 서비스들간의 decoupling을 위해 메소드로 큐를 사용

  - 큐를 이용함으로써 인스턴스를 Scale-out 할 수 있고 이를 통해 트래픽을 유동적으로 관리 가능
  - 그로인해 producer들은 큐를 계속 이용가능

- 가장 심플하고 적용하기 쉬운것은 RabbitMQ, 고가용성을 생각한다면 ZeroMQ

- ``/etc/hosts``파일의 ip를 현재 설정한 ip로 변경

- id 와 비밀번호 설정

  ```shell
  $ rabbitmqctl add_user id명 비밀번호
  ```

- 권한 주기

  ```shell
  $ rabbitmqctl set_permissions openstack ".*" ".*" ".*" 
  ```

### 5.3 Memcached

- 캐시서비스를 하기위해 설치 (DB의 오버헤드를 줄이기 위함)




### 기타

- AWS EC2내려도 과금되는 이유는 저장소를 계속 사용하기 때문에 저장소 사용에 대한 과금을 내는 것임.

- 같은 인스턴스 2개 올리는건 Scale-Out 방식
- 하나의 인스턴스 사용을 올리는건 Scale-Up 방식

- Swift는 이중화가 기본 architecture

- Controller의 Glance가 local 사용
- All-In-One 사용시 안정성 떨어짐
- Provider 버전과 Self-service버전이 존재
  
- Self-service버전은 내부에서 라우팅 할 수 있도록 내부망과 router 지원
  
- 포트 확인

  ```shell
  $ netstat -an | grep 포트번호
  //or
  $ ss -nlp | grep 포트번호 또는 프로세스이름
  ```

- root 용량이 부족하다면 Cinder에서 볼륨 받아서 attach

  - Network를 통해서 스토리지를 로컬에 있는것처럼 리모트로 접근해서 사용하는 방식

- Heat는 IaC (Infa as Code)

  - 쉘 스크립트처럼 코딩하는 방식

