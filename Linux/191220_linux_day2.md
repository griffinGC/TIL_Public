# 191220 TIL Linux Day2

> Linux 과정 중 2일차



## Runlevel

> 리눅스 시스템의 관리 용이함을 위해 서비스의 실행을 단계별로 구분하여 적용하는 것

1. `who -r` : 현재 런레벨 확인
2. `0` : halted
3. `1` : single user
4. `2` : multi user
5. `3` : multi user (주로 default)
6. `4` : multi user
7. `5` : Desktop ( X-windows )

8. `6` : Reboot

9. runlevel 변경

   ```shell
   init 숫자
   ```



## 시스템 종료

```shell
$ poweroff
# 자동으로 전원까지 off
$ halt -p
$ init 0
# shutdown 명령어 사용 권장 (기본1분뒤 종료)
$ shutdown
```



## 시스템 재부팅

```shell
$ shutdown -r now
$ reboot
$ init 6
```



## ip 확인

1. `ip a` 또는 `ip addr show`
2. `ifconfig`
3. `hostname -i`
4. 도커에서는 `docker inspect` 이용 ip 확인 가능



## kernel 버전 확인

​	`uname -a`



## 네트워크 재시작

```shell
# centOS
$ systemctl restart network
# ubuntu
$ systemctl restart networking
```



## 사용자 변경

```shell
# su - 이용시 switch는 가상 터미널 & 쉘 이기 때문에 depth가 깊어짐
# 고로, 나올때 반드시 exit (ctrl + d 또는 exit) 해야 한다.
# 루트 사용자의 비밀번호를 물어봄
$ su -
# 현재 사용자의 비밀번호 쳐서 루트 접속
$ sudo -i 
```



## vi 

- 입력 모드와 명령 모드로 구분 됨

1. vi 시작

   ```shell
   vi 파일이름
   ```



2. 입력모드 전환 명령어

   - `i` : 커서 앞에 입력

   - `a` : 커서 뒤에 입력
   - `o` : 커서 위치한 행의 다음 행에 입력
   - `I(대문자 i)` : 커서가 위치한 행의 첫 칼럼으로 이동 입력
   - `A` : 커서가 위치한 행의 마지막 칼럼으로 이동하여 입력
   - `O` : 커서가 위치한 행의 이전 행에 입력

   => `i` 와 `a`





cw : change word 단어 변경









### 기타

- NAT : outbound지원, 일반적인 서버처럼 사용 어려움

  ​		  포트 설정하면 서버처럼 사용가능하긴 함. default로는 사용 불가

  ​		  (ssh는 외부가 아닌 host이기 때문에 가능)

  