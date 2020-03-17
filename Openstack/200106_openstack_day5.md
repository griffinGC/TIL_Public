# 200106 TIL Openstack Day5

>Openstack 과정 중 5일차



## 1. Neutron (네트워크 서비스)

### 1.0 특징

- 각 사용자마다 내부 네트워크, 라우터, 서브넷 구현가능하도록 도와줌

- 구조

  1. Controller node : openvswitch 사용

  2.  Network node(라우터)

     : 라우터 역할을하기 때문에 오버헤드가 큼. 그래서 외부에서 

  3. Compute node : Scale-out 가능, linux-bridgeagent 사용

- 컨트롤러 노드와 컴퓨트 노드의 switch 매커니즘이 달라도 ML2를 이용하면 서로 사용 가능

  ML2는 모든 컴포넌트에 존재

- TypeDriver는 각각의 switch간에 통신할 수 있도록 도와줌

- Flat 방식

  : 모든 compute node에 올라가는 instance를 하나의 거대한 망으로 연결해서 쓰는 방식 (단일 network형태)



### 기타

- ``$ flush privileges`` : MySQL에서 계정의 비밀번호 바꾸고 바로 즉시 적용할때 사용
- ``--perment`` : 방화벽 ``firewall-cmd``명령어를 사용할때 방화벽 수정할때 사용
