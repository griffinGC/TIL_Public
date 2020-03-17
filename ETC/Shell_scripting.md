# Shell Scripting

쉘에서 수행가능한 스크립팅



## 1. 파일 생성

파일생성방법으로는 2가지가 존재

1. touch

2. vim

   => 둘다 공통적으로 생성가능 확장자는 `.sh` 사용

   ```shell
   $ touch test.sh
   $ vim test.sh
   ```

## 2. 파일 작성

1. 파일 작성의 시작

   ```shell
   #! /bin/bash
   ```

   `#! /bin/bash` 로 파일을 시작해야함 (bash 쉘을 이용하겠다는 의미!)

2. `vi` 또는`vim` 에디터를 이용해 작성



## 3. 파일 실행

1. 파일 실행전에 수행 권한을 주어야함

   `chmod +x` 이용

   ```shell
   $ chmod +x test.sh
   ```

2. 실행방법

   `./쉘스크립트파일명` 을 이용해서 파일 실행

   ```shell
   // 파일 실행
   $ ./test.sh 
   ```



## 4. 기본 문법

1. 변수 선언 및 변수 사용

   변수 선언 : `=` 을 이용해서 변수 선언 **(단, 공백 없이 사용)**

   변수 사용 : `$` 을 이용해서 변수 사용. `""` 와 `{}` 도 함께 사용

   ```bash
   a=10
   b=$a
   c="${a}"
   //a의 값은 10, b의 값은 10, c의 값은 10
   ```



2. 배열

   배열 선언 

   - `배열이름=(원소1, 원소2...)` 
- 배열의 인덱스는 0부터 시작
   - `배열이름[@]` 와 `배열이름[*]`  은 배열의 모든 원소 의미
- 쉼표로 구분하지 않고 공백으로 구분함
   
배열 원소 추가
   
- `+=` 이용하여 원소 추가
   
배열 원소 삭제
   
- `/` 사용하여 해당 문자열 부분 있으면 삭제, 삭제하고픈 문자나 문자열이 포함된 모든 부분 삭제
   - `unset` 을 이용하여 삭제 추천
   
```bash
   #!bin/bash
   
   arr_test=("abc" "def" "abcd")
   arr_test2="${arr_test[@]}"
   # abc def abcd
   echo "${arr_test2[@]}"
   
# abc def abcd inserted
   arr_test2+=("inserted")
   echo "${arr_test2[@]}"
   
   # abc  abcd inserted => def 삭제됨
   arr_test2=("${arr_test2[@]/"def"}")
   echo "${arr_test2[@]}"
   ```
   



3. 조건문

   3.1 조건 선언방식

   - `if[조건];then... elif[조건];then... else`

   - `if((산술연산));then... elif((산술연산));then... else`

   3.2 조건

   ```bash
   if [ 조건 ]
   then
     명령문
   elif [ 조건 ]
   then 
     명령문
   else
   	명령문
   fi
   ```

   - 문자 비교

     ==, !=, -z 문자 (문자가 null이면 참), -n 문자 (문자가 null이 아니면 참), 

   - 수치 비교 (값1 과 값2 사이에 넣음 `값1 -eq 값2`)

     -eq (값이 같음 equal), -ne (값이 같지 않음 not equal)

     -lt (값1이 값2 보다 작음), -le (값1이 값2보다 작거나 같음)

     -gt (값1이 값2보다 큼), -ge (값1이 값2보다 크거나 같음)

   - 파일 검사 (참 일 조건)

     -e (파일 존재), -d (파일이 디렉토리), -h (심볼릭 링크파일), -f (일반파일), -s (크기가 0), -r (읽기 가능), -u (set-user-id 설정), -w (쓰기 가능), -x (실행 가능)

   - 논리 연산

     -a (AND), -o (OR), &&, ||, !, true, false

   __*띄어 쓰기 주의!!*__

   ```bash
   if_test=5
   if [ "${if_test}" -eq 1 ]
   then
       echo "1입니다.."
   elif [ "${if_test}" -lt 3 ]
   then
       echo "3보다 큽니다.."
   else
       echo "잘 모르겠습니다."
   fi
   # 잘 모르겠습니다.
   ```

   

4. 반복문

   4.1 while문

   ```bash
   while 조건문
   do
     명령문
   done
   ```

   ```bash
   cnt=0
   
   while (("${cnt}" < 5))
   do
       echo "${cnt}"
       ((cnt = "${cnt}" + 1))
   done
   # 0
   # 1
   # 2
   # 3
   # 4
   ```

   

   4.2 for 문

   ```bash
   for 변수 in 변수1, 변수2 ...(또는 배열)
   do 
     명령문
   done
   ```

   ```bash
   for_test=(1 2 3 4 5)
   for i in "${for_test[@]}"
   do
       echo "${i}"
   done
   # 1
   # 2
   # 3
   # 4
   # 5
   ```



5. 연산자

   - 숫자 계산시 `expr` 사용
   - `expr` 사용시 백틱(`)을 사용해야함
   - 연산자 *과 ()앞에는 역슬래쉬 \ 를 사용해야함
   - 연산자와 숫자, 변수, 기호 사이에는 공백이 필요함
   - 숫자와 변수의 연산은 `(())` 을 필요로 함

   ```bash
   num=5
   numCal=`expr \( 6 / 3 \) \* 3`
   echo calCulate number is "${numCal}" 
   # calCulate number is 6
   ```

   



## 참고자료

>https://twpower.github.io/131-simple-shell-script-syntax
>
>https://kangsecu.tistory.com/54
>
>https://www.fun-coding.org/linux_basic3.html