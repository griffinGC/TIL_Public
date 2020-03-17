# 200103 TIL Openstack Day4

>Openstack 과정 중 4일차



## 1. Glance (이미지 저장 서비스)

Hypervisor에 의존하는 가상머진 이미지를 발견, 등록 및 검색 하는 서비스

### 1.0 특징

- 심플한 구조

- 이미지의 정보인 메타정보는 DB에서 관리, 파일은 DB에 저장하지 않음

- 이미지 파일의 저장위치는 Local 저장소

- 이미지 종류의 확인은 명령어를 이용해 할 수 있다.

  1. ``file 파일명`` command이용 image 종류 확인 가능

  2. ``qemu-img info 파일명`` 을 이용하여 더 자세한 정보를 알 수 있음

     - ``qemu-img`` 를 이용하여 이미지 컨버팅도 가능

       ``qemu-img convert -O 형식 기존파일명 바뀐파일명``

     - ``qemu-img`` 명령어 정보 : ``qemu-img --help`` (qemu-img가 설치 되어 있어야 함!)



### 1.1 Glance CLI 명령어 (p.187 참조)

```shell
$ glance
또는
$ openstack 
```

- ``openstack``은 명령어 통합도구로써 interactive 도구이기도 함. 

  그렇기 때문에 ``openstack``만 입력했을 경우에는 대화창으로 들어감.

  ``openstack help`` 입력시 명령어들 확인 가능

```shell
//생성된 이미지 리스트
$ glance image-list

//glance에 이미지 생성
$ openstack image create "생성할 이미지명" --file 파일명 --disk-format 포맷명 --container-format 포맷명 (--public) //public은 생략가능

//이미지 정보
$ glance image-show 이미지id
$ openstack image show 이미지id
```

- container의 포맷명의 경우 이미지만 올릴경우는 ``bare``

  다른 포맷들은 가상머신 solution에서 export시 만들어지는 아카이브 포맷들 (p.168참조)



### 1.2 Glance 수동설치

- [예시문서](https://docs.openstack.org/glance/rocky/install/install-rdo.html) 보고 그대로 수행할것 (ver.Rocky & RedHat)

- 설치 완료 후, glance 이미지 생성 Test 

  제대로 설치 되었다면 ``$ glance image-list ``를 이용해 이미지 확인 가능!



## 2. Nova (Compute 서비스)

### 2.0 특징

- Iaas의 핵심 서비스
- 인스턴스 개수 제한가능
- 가장 복잡한 Architecture로 구성됨 (p.196)
- Nova-compute : 핵심서비스로써 hypervisor와 통신
- Compute node는 Scale-out 가능. 따라서 여러개 존재 가능
- Nova-console.auth : 로그인 시 인증처리
- Nova에서 Hypervisor와 통신하는 것을 빼고는 거의다 Controller에 설치됨



### 2.1 Instance 작동 확인

```shell
//instance 작동확인
$ virsh list --all

//콘솔접속
$ virsh console 아이디 또는 이름

//연결해제
$ control + "]"
```



### 2.2 리소스 확인 및 Nova 리스트 확인

```shell
//리소스 확인
$ flavor-list

//Nova 리스트 확인
$ openstack server list
//또는
$ nova list

//Nova 수동 설치 후 확인
$ openstack compute service list
```



### 2.3 All-in-one에 Compute Node 확장 (Neutron 설치 제외)

___확장한 노드를 완전히 사용하기 위해서는 Neutron을 이용하여 네트워크를 구축해야함!___


1. 확장할 Nova에 CentOS설치

2. 설치 후 compute Node 설정

3. scopy이용 controller에 있던 conf 파일 복사 (설정 용이함을 위함)

   ``scp controller:/etc/nova/nova.conf /etc/nova/nova.conf``

4. compute노드에서 vi이용하여 복사한 ``nova.conf`` 파일의 ``my_ip`` 와 ``vncserver_proxyclient_address`` 수정

   ```shell
   $ my_ip=10.0.0.101
   $ vncserver_proxyclient_address = 10.0.0.101
   ```

5. controller노드의 iptables 수정하여 포트 열어주기

   ````shell
   $ cd /etc/sysconfig
   $ vi /etc/sysconfig/iptables
   //추가
   #-A INPUT -s 10.0.0.101/32 -p tcp -m multiport --dports 5671,5672 -m comment --comment "001 amqp incoming amqp_10.0.0.101" -j ACCEPT
   #-A INPUT -s 10.0.0.101/32 -p tcp -m multiport --dports 5671,5672 -j ACCEPT
   #-A INPUT -s 10.0.0.100/32 -p tcp -m multiport --dports 5671,5672 -j ACCEPT
   //수정 후 reload
   $ systemctl reload iptables
   ````

6. compute node에서 nova-compute시작

   ```shell
   $ systemctl stop openstack-nova-compute
   $ systemctl start openstack-nova-compute
   ```

7. controller에서 확장 되었는지 확인

   ```shell
   $ . keystonerc_admin
   $ openstack compute service list --service nova-compute
   ```

8. controller에서 mysql에 확장한 노드 discovery 하는 작업 수행

   ```shell
   [root@controller ~(keystone_admin)]$ su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
   ```

   

## 3. Container

- 추세는 Docker -> rkt
- Devops환경 : Kubernetes (k8s)



### 기타

- ``file 파일명`` 명령어를 이용하면 파일의 종류(타입) 확인 가능

- ``wget`` : 인터넷상의 주소를 이용하여 바로 파일 다운 가능하도록 만들어 줌

  ``wget 주소``

- ``libvirt``?, ``libguestfs``?

- ``openstack`` 과``AWS`` 서로 연동 가능 ``Glance``의 백엔드로 여러가지 다른 ``AWS``사용가능

- 각각의 command들은 object 다음 ``-``가 들어감. 통합도구는 한칸 띄고 명령어

  ex) ``glance image-list``와    ``openstack image list``는 동일한 의미로 사용됨

- DB 계정 비번 업데이트하면 ``flush privileges`` 이용하여 적용 시켜 줄 것

- hostname 수정 명령어 ``$ hostnamectl set-name 이름``
