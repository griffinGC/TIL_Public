# SQL Cheat Sheet

> MySQL을 기반으로 작성 됨

- SQL 쿼리 

![sql](https://cdn.sqltutorial.org/wp-content/uploads/2016/04/SQL-Cheet-Sheet-1.png)

![mysql](https://zentut.com//wp-content/uploads/2012/10/sqlcheatsheet.jpg)





## SELECT

- 데이터를 가져올때 사용하는 쿼리

```mysql
SELECT 컬럼명1, 컬럼명2, 컬럼명3 ... FROM 테이블명;
```

- 데이터를 검색해서 가져오기

```mysql
SELECT 컬럼명1, 컬럼명2, 컬럼명3 ... FROM 테이블명 WHERE 컬럼명 LIKE '%패턴%';
```



### LIKE

- 패턴을 검색할때 사용



### IN

- 집합안의 값이 존재하는지 여부 판단할때 사용
- WHERE구에서 사용
  - OR를 대체 가능
- 집합에는 값이 들어갈 수도 있고, **서브쿼리**가 들어갈 수도 있음

```mysql
열명 IN (집합)

SELECT * FROM 테이블명 WHERE 컬럼명1 IN (집합);

// number가 3 혹은 5인 경우
SELECT * FROM table1 WHERE number IN (3, 5);

// 서브쿼리 사용
SELECT * FROM table1 WHERE number IN (SELECT number2 FROM table2);
```





## UPDATE

- 데이터를 업데이트(수정) 할 때 사용하는 쿼리

```mysql
UPDATE 테이블명 SET 필드명1=값1, 필드명2=값2, 필드명3=값3 ... WHERE 조건;
UPDATE 테이블1, 테이블2 SET 필드명1=값1, 필드명2=값2, ... WHERE 테이블1.ID1=테이블2.ID2 AND 조건;
UPDATE 테이블1, 테이블2 INNER JOIN 테이블1 ON 테이블1.필드명1=테이블2.필드명2 SET 필드명1=값1 WHERE 조건;
```



## INSERT

- 데이터를 삽입할때 사용하는 쿼리

```mysql
INSERT INTO 테이블명(컬럼명1, 컬럼명2, 컬럼명3) VALUES(값1, 값2, 값3);
```



## DELETE

- 데이터를 삭제할때 사용하는 쿼리

```mysql
DELETE FROM 테이블명 WHERE 조건;
```

- 여러 테이블에 있는 데이터를 한번에 삭제할때

  - JOIN 이용

  ```mysql
  // 여러 테이블에 있는 데이터를 동시에 삭제
  DELETE 테이블1, 테이블2 FROM 테이블1 INNER JOIN 테이블2 ON 테이블1.필드명1=테이블2.필드명2 WHERE 조건;
  ```



## JOIN

- 여러 테이블을 합칠때 사용하는 쿼리

![JOIN](https://4.bp.blogspot.com/-_HsHikmChBI/VmQGJjLKgyI/AAAAAAAAEPw/JaLnV0bsbEo/s1600/sql%2Bjoins%2Bguide%2Band%2Bsyntax.jpg)

- LEFT JOIN
  - **테이블1의 데이터 + (테이블2에 있는 데이터 중에 테이블1을 가진 데이터)** 보여줌
    - 단, 테이블2에 있는 컬럼의 데이터도 추가적으로 합쳐서 보여줌
    - 즉, 테이블2에 있는 데이터 중에 테이블1에 키 값과 매치되는 데이터들의 **컬럼 값들을 테이블1에 붙여서 보여줌**
  - 만약, 테이블2의 KEY를 NULL로 표시하면, 테이블1만을 가진 차집합을 보여줌

```MYSQL
// 왼쪽 차집합 + (테이블1 교집합 테이블2)
SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1 LEFT OUTER JOIN 테이블2 ON 테이블1.키=테이블2.키

// A만을 가진 데이터 => 차집합 => 테이블2의 컬럼 내용들은 NULL로 표시가 됨
SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1 LEFT OUTER JOIN 테이블2 ON 테이블1.키=테이블2.키 WHERE 테이블2.키 IS NULL
```

- RIGHT JOIN
  - LEFT JOIN과 비슷한 개념이지만 테이블은 반대
  - **테이블2의 데이터 + (테이블1에 있는 데이터 중에 테이블2의 키와 매칭되는 데이터)** 보여줌
    - 즉 테이블1에 있는 데이터 중에 테이블2의 값과 매치되는 데이터들의 컬럼 값들을 테이블2에 붙여서 보여줌
  - 만약, 테이블1의 KEY를 NULL로 표시하면 테이블2만을 가진 차집합을 보여줌

```mysql
// 오른쪽 차집합 + (테이블1 교집합 테이블2)
SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1 RIGHT OUTER JOIN 테이블2 ON 테이블1.KEY=테이블2.KEY

SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1 RIGHT OUTER JOIN 테이블2 ON 테이블1.KEY=테이블2.KEY WHERE 테이블1.KEY IS NULL
```

- INNER JOIN
  - 두 테이블의 교집합을 나타냄
  - 테이블1과 테이블2의 교집합 데이터
  - ON 대신 WHERE 쓸 수 있음

```mysql
SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1 JOIN 테이블2 ON 테이블1.KEY=테이블2.KEY

SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1, 테이블2 WHERE 테이블1.KEY=테이블2.KEY
```

- CROSS JOIN
  - 두 테이블의 곱집합
    - 두 테이블에서 하나씩 고른 두 데이터의 순서쌍의 집합
    - 두 테이블의 데이터를 곱하는 것처럼 생각 (테이블A(10), 테이블B(5) => CROSS JOIN 테이블(50))

```mysql
SELECT 테이블1.컬럼명, 테이블2.컬럼명 FROM 테이블1 OUTER JOIN 테이블2 ON 테이블1.KEY=테이블2.KEY
```

- FULL OUTER JOIN

  > https://stackoverflow.com/questions/4796872/how-to-do-a-full-outer-join-in-mysql

  - 두 테이블의 합집합

```mysql
SELECT 테이블1.컬럼명1, 테이블1.컬럼명2 FROM 테이블1 LEFT JOIN 테이블2 ON 테이블1.KEY=테이블2.KEY
UNION
SELECT 테이블2.컬럼명1, 테이블2.컬럼명2 FROM 테이블2 LEFT JOIN 테이블1 ON 테이블2.KEY=테이블1.KEY
```



# 내부 조건 처리

- GROUP BY
- HAVING
- DISTINCT
- ORDER



## 내부 조건 처리 순서

### WHERE 구 => GROUP BY 구 => SELECT 구(HAVING 포함) => ORDER BY 구

- WHERE구에는 집계함수 사용 불가
- SELECT하기 전에 HAVING 구로 필터링 수행!



## GROUP BY

- 그룹화하여 데이터 조회하는 방법
  - 컬럼에 따라 그룹화 되는 것
  - 예를 들어 `SELECT name FROM 테이블1 GROUP BY name` 을 하게 된다면, name이라는 컬럼에 따라 그룹핑한다는 것
    - name이라는 컬럼에 '홍길동', '임윤아', '송강호', '박열' 이렇게 4명이 있다면 이 4명의 이름이 데이터로 출력되게 됨

```mysql
SELECT * FROM 테이블명 GROUP BY 열1, 열2 ...;

// COUNT 함수를 이용해서 name이라는 컬럼의 각각의 데이터들의 갯수를 알 수 있음 
SELECT COUNT(name) FROM 테이블 GROUP BY name;

// 이름으로 그룹핑되고 각각의 이름, 각 이름이 나온 갯수, 각 이름 데이터의 quantity의 합을 반환
SELECT name, COUNT(name), SUM(quantity) FROM tableA GROUP BY name;
```



- GROUP BY 와 DISTINCT 차이

  > http://intomysql.blogspot.com/2011/01/distinct-group-by.html

  - 내부적으로는 동일한 처리를 수행
  
  - 하지만, GROUP BY는 **그룹핑 + 정렬**
    - GROUP BY를 **집계함수**와 함께 사용하지 않으면 크게 차이 없음
    - **집계함수와 사용하는 경우에는 GROUP BY 사용할 것!**
    
    `SELECT 컬럼1, MIN(컬럼2), MAX(컬럼3) FROM 테이블1 GROUP BY 컬럼1; `
    
  - DISTINCT는 **그룹핑 만** 수행
  
    - DISTINCT를 집계함수의 인수로는 사용할 수 있음



## DISTINCT

- DISTINCT는 함수가 아니라 **키워드**

  `SELECT COUNT(DISTINCT 컬럼명1) FROM 테이블1;`

  - `컬럼명1` 의 갯수를 세는 쿼리

- DISTINCT는 맨 마지막에 적는게 아니라, SELECT하는 곳에 원하는 컬럼명 바로 앞에 적음
- 정렬하지 않고 가져오기 때문에 GROUP BY 에 비해 성능은 좋음





## HAVING

- 그룹화한 결과에 조건을 거는 방법
  - WHERE구와 동일하게 조건을 지정하는 역할
- **WHERE는 그룹화 하기전에 조건을 거는 것이고, HAVING은 그룹화 한 이후에 조건을 거는 것**
  - WHERE구와 함께쓰면 지정된 조건으로 검색하는 2단 구조로 됨
  - **그렇기 때문에 GROUP BY 구 뒤에 위치**
    - GROPU BY가 있어야 HAVING 사용가능!
- 그룹화가 필요한 **집계함수에 조건을 지정**할 때 사용
- **SELECT명령에 HAVING구 존재**

```mysql
SELECT 컬럼명1, 집계함수(컬럼명2) FROM 테이블명1 (WHERE 컬럼명1=값1) GROUP BY 컬럼명2 HAVING 집계함수(컬럼명2) 부등호 값;

SELECT name, count(name) FROM table1 GROUP BY name HAVING count(name) > 2;
```



## ORDER BY

- 맨 마지막에 위치
  -  GROUP BY나 HAVING 뒤에 위치
- 차순
  - DESC : 내림차순
  - ASC : 오름차순 (기본 Default이기 때문에 생략 가능)
- 컬럼명 대신에 컬럼이 위치하는 순서를 적어도 됨

```mysql
SELECT 컬럼1, 컬럼2 FROM 테이블1 ORDER BY 컬럼1 차순, 컬럼2 차순...;
```





## 집계함수

> https://www.everdevel.com/MySQL/total-function/

- `count(필드명)`

  - null 값이 아닌 레코드의 수
  - 각 필드명의 데이터의 갯수를 리턴

- `sum(필드명)`

  - 필드명의 값들의 합

  ```mysql
  // 지역별로 묶고 지역별 인구 합
  SELECT district, sum(population) FROM citykorea GROUP BY district
  ```

  

- `avg(필드명)`

  - 필드명의 값들의 평균

- `max(필드명)`

  - 필드명의 값들 중 가장 큰 값

- `min(필드명)`

  - 필드명의 값들 중 가장 작은 값

- `count(*)`

  - 레코드의 개수



## 결과 행 제한

- 결과 행 갯수를 제한할때는 맨 뒤에 `LIMIT 행수` 입력

```mysql
SELECT 컬럼명1 FROM 테이블1 WHERE 조건식 ORDER BY 컬럼명1 LIMIT 행수
```



## 시간 구하는 함수

- `HOUR(컬럼명)`
  - 컬럼 데이터의 시간만을 추출
- `DAY(컬럼명)`
  - 컬럼 데이터의 날짜만을 추출





## 출처

> https://devhints.io/mysql
>
> https://www.mysqltutorial.org/mysql-cheat-sheet.aspx
>
> https://www.sqltutorial.org/sql-cheat-sheet/
>
> https://extbrain.tistory.com/56
>
> https://www.everdevel.com/MySQL/total-function/
>
> https://galid1.tistory.com/609