# Index (인덱스)

- RDBMS에서 검색 속도 향상을 위해 사용하는 기술
  - **select 의 성능이 향상됨**
- 해당 Table의 컬럼을 색인화(indexing)하여 따로 저장
- 검색 시 Table 레코드 전체를 스캔하는 것이 아닌 **색인화(Indexing) 되어 있는 index 만을 검색** 하기 때문에 **검색 속도가 빠름**
- Tree구조로 색인화
  - B-tree

- 주기적으로 index를 리빌드 하는 작업이 필요
- index 걸면, index를 거는 컬럼을 기준으로 새로운 자료구조 (B-Tree)등을 생성해서 별도의 디스크 공간에 저장



## MySQL Index 종류

- 여기서 말하는 인덱스는 테이블에서 추가하는 index가 아닌 개념적인 인덱스(색인)을 뜻함
- PRIMARY KEY, UNIQUE, INDEX, FULLTEXT
  - FULLTEXT는 테이블이 InnoDB구조일때는 사용 불가하고, MyISAM구조에서만 사용 가능



## 저장 구조

- 메모리 영역에 일종의 목차 저장
  - 속도가 빠름
- Column의 값과 해당 레코드가 저장된 주소를 키와 값의 쌍으로 구성됨
  - 키는 한개 뿐만 아니라 여러개로 지정 가능! 
    - name, phone 등등 여러개로 지정 가능

- **인덱스의 두번째 컬럼은 첫번째 칼럼에 의존해서 정렬 됨**
- index 성능 향상은 **디스크에 얼마나 덜 접근**하느냐에 달려 있음
  - Root에서 Leaf 까지 **오고가는 횟수를 줄여야 함**

- **페이지 단위**로 관리
  - **페이지가 많아지면 성능 떨어짐**
  - 인덱스에서 선택하는 컬럼의 갯수가 많아지면 페이지는 늘어남
    - 인덱스는 한 페이지에 16kb 만을 저장하기 때문



## B - Tree 인덱스 구조

- database index 에서 사용하기 위한 자료구조
- 항상 정렬 유지
- 매치나 범위 같은 것을 빠르게 검색 가능하게 함
- 여러 Child(자식)을 가질 수 있음
  - 이진 트리와 다름 (이진 트리는 2개의 자식만 가질 수 있음)
  - 2진 트리의 확장 버전
- 탐색은 `Root -> Branch -> Leaf -> 데이터 파일` 순으로 진행
  - Root, Branch, Leaf는 메모리
  - 데이터 파일은 Disk 는 저장소
- index의 개수는 3~4개가 적당
  - 너무 많을 시, 새로운 Row를 추가할때마다 B-Tree에 인덱스를 추가해야하고, 수정 및 삭제시에도 인덱스 수정이 필요하므로 **성능 이슈 발생**
  - index 갯수가 많아지면 차지하는 공간도 늘어남
- index가 너무 많으면 옵티마이저가 잘못된 index 선택할 확률 높음
- HashTable이 아닌 B-Tree를 사용하는 이유
  - select의 경우 부등호 연산도 포함하는데, HashTable의 경우 등호 연산만 가능



### 인덱스 키 값의 크기

> InnoDB 기준

- 페이지의 크기는 16kb로 고정되어 있음
  - 인덱스 키의 크기가 16byte, 자식 노드의 주소 크기가 12byte 라면
  - (16 * 1000) / (16 + 12) = 585 (한 페이지에 585 개의 인덱스 저장 가능)
  - (16kb) / (인덱스 키 크기 + 자식 노드의 주소 크기) = 한 페이지에 저장가능한 인덱스 갯수
- **페이지가 많아지면 성능 떨어짐**
- 인덱스 키가 길면 성능상의 이슈 발생



### 인덱스 컬럼 선택 기준

- 카디널리티(cardinality)가 높은 것을 선택해야 함
  - 즉, **중복된 수치가 적은 것**
  - 인덱스는 많은 부분을 걸러내기 위한 것이기 때문에 카디널리티가 높은 것을 선택해야함
- 선택도가 낮을 수록 좋음
  - 컬럼의 특정 값의 row 수 / 테이블의 총 row 수  * 100
  - 컬럼의 값들의 평균 row 수 / 테이블의 총 row 수 * 100

- 활용도가 높을 수록 좋음
  - 자주 사용될 수록 좋음



## Index 장점

- index 컬럼으로 지정한 것을 조건으로 이용하여 검색, 정렬 속도 향상
  - B - Tree 사용하기 때문
  - 키 값을 기초로 하기 때문에 속도가 빠름
- 여러 필드를 index로 사용하게 되면, 첫 필드로 값이 같은 레코드도 구분 가능
  - 마치 PK로 여러 Column을 지정하는 것처럼



## Index 단점

- 기존에 돌고있는 SQL에 악영향을 미칠 수 있음
  - 잘못만든 Index를 지운다해도 복구 불가
  - index를 추가하기 전에는 백업 필수

- **DML**(UPDATE, INSERT, DELETE)의 성능은 떨어질 수 있음
  - row에서 index로 지정된 column의 값을 삽입, 삭제, 변경시 B-Tree를 업데이트 해야 하기 때문
- Index를 위한 추가적인 공간이 필요



## Index 사용 시기

- 데이터 양이 많고, 검색이 변경보다**(검색 > 변경)** 빈번한 경우
- 인덱스를 걸고자 하는 필드의 값이 다양한 값을 가지는 경우



## Primary Index, Clustered Index

### Primary Key

- 기본키(PK)는 자동으로 인덱스가 적용됨
  - 여기서 말하는 인덱스는 개념적인 index (검색을 위한 index)
  - MySQL에서는 `show index from 테이블명` 으로 조회 불가
  - MsSQL에서는 조회 가능
- PK 라고 따로 **물리적 저장**이 되지는 않음
  - index는 튜플들의 유일성을 보장하지는 않음

### Clustered Index

- **(물리적으로)** 비슷한 것들을 묶어서 저장하는 형태
- 테이블 당 한개만 생성 가능
- Primary Index와 유사하지만 동일한 것은 아님

### Primary Index

- Unique pk를 가진 필드를 포함하는 index 집합



## 실습

- 인덱스 정보 값
  - key_name
    - 인덱스 이름
    - 여러 컬럼을 index key로 지정 가능
    - 인덱스가 해당 테이블의 기본키라면 PRIMARY라고 표시
    - pk를 여러개의 column으로 지정하는 것보다 index를 이용하는게 select시 성능 유리
      - B-Tree 사용하기 때문
  - Cardinality
    - 인덱스에 저장된 유일한 값들의 수를 표시함

- 특정 인덱스 사용시 쿼리에 `use index (인덱스 명)` 사용
  - 사용 안할 시, 옵티마이저가 인덱스 자동 선택

- 인덱스 생성 (중복 허용)

  ```sql
  CREATE INDEX 인덱스명 ON 테이블명 (컬럼명1, 컬럼명2...)
  ```

- 인덱스 정보 보기

  ```sql
  SHOW INDEX FROM 테이블명
  ```

- UNIQUE INDEX 생성

  - 중복값을 허용하지 않는 인덱스

  ```sql
  CREATE UNIQUE INDEX 인덱스명 ON 테이블명 (컬럼명1, 컬럼명2...)
  ```

  - PK 처럼 사용 가능

- 인덱스 정렬 

  - 인덱스 생성 시, 인덱스에 포함되는 필드의 정렬 방식 설정 가능
  - DESC 내림차순, ASC 오름차순

  ```sql
  CREATE INDEX 인덱스이름 ON 테이블명 (컬럼명 정렬순서)
  ```

  



## Index 사용시 유의 사항

- 여러 컬럼으로 인덱스 구성시, **카디널리티가 높은 것에서 작은것 순**으로 적어야 함 **(높은것 -> 작은것)**
  - 인덱스 생성 시, 제일 앞에 설정한 컬럼은 쿼리 수행시 반드시 조건에 넣어주어야 함
    - 만약 안넣어주면 인덱스로 조회 안함
    - 나머지 애들은 조건에 없어도 인덱스 사용 가능
- 범위 조건이 들어간 컬럼은 인덱스 수행하지만, 그 뒤에 있는 컬럼은 인덱스 수행 안됨
  - **쿼리문 순서는 중요하지 않음, 선언시 순서가 중요**
- `=`, `in` , `null`은 사용 가능
- `AND`는 Row를 줄이지만, `OR` 은 Row를 늘려서 Full Scan 할 확률 높음
- 인덱스로 사용된 컬럼은 값 그대로 사용해야 함
  - `where salary * 10 > 15000;` (수행 불가)
  - `where salary > 15000 / 10;` (수행 가능)
- **인덱스 컬럼 순서와 조회 컬럼 순서를 지킬 필요는 없으나, 맞추면 좋음**



## 참고자료

> https://github.com/WooVictory/Ready-For-Tech-Interview/blob/master/Database/%EC%9D%B8%EB%8D%B1%EC%8A%A4(INDEX).md
>
> https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Database#index
>
> https://jojoldu.tistory.com/243
>
> https://ra2kstar.tistory.com/96
>
> https://yurimkoo.github.io/db/2020/03/14/db-index.html
>
> https://sksstar.tistory.com/88
>
> http://www.tcpschool.com/mysql/mysql_index_create
>
> https://goodgid.github.io/Index-vs-Primary-Key/
>
> https://stackoverflow.com/questions/42820697/primary-index-vs-clustered-index



