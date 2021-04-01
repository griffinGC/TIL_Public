# (장고) 마이그레이션 Migration

> https://docs.djangoproject.com/en/3.1/topics/migrations/
>
> https://velog.io/@matisse/Django-migrations-%EC%A7%91%EC%A4%91-%ED%83%90%EA%B5%AC#:~:text=1.%20docs.django,-%EC%9D%BC%EB%8B%A8%20django%20%EA%B3%B5%EC%8B%9D&text=migrations%EB%8A%94%20models.py%EC%97%90%EC%84%9C,%EC%8B%9C%ED%82%A4%EB%8A%94%20%EC%9E%A5%EA%B3%A0%EC%9D%98%20%EB%B0%A9%EB%B2%95%EC%9D%B4%EB%8B%A4.

- 일반적으로 컴퓨터 공학에서 migration은 영어 단어인 migration과 어느정도 유사한 개념
  - 이주하는 것과 같은 개념
  - 어떤 컴퓨터 환경에서 다른 컴퓨터 환경으로 이주하는 것
  - A라는 데이터 베이스에서 B라는 데이터베이스로 옮기는 경우도 가능

### migrations

- `models.py` 에서 **변경한 내용을 데이터베이스 스키마에 전달하는 방식**
  - field 추가 혹은 model 삭제 등
  - 장고는 기본적으로 ORM(Object Relational Mapping)을 지원하기 때문
- 데이터베이스의 구조를 쉽게 변경가능
- 마이그레이션을 일종의 **데이터 베이스 버전 컨트롤**로 생각하면 됨
- migration file은  각각의 app안의 migrations 디렉토리 안에 존재하고, commited 되어 코드로서 분배 되도록 디자인 되어 있음
- 마이그레이션 파일들을 개발환경에 만들고 같은 마이그레이션을 적용하면 다른 컴퓨터에서도 똑같은 마이그레이션을 사용가능
- 마이그레이션은 같은 데이터셋에서 같은 방식으로 동작하고 일관된 결과물을 만듬

### 명령어

- `migrate`
  - migrations을 적용하거나 적용해제
- `makemigrations`
  - models에 적용한 변화를 기반으로 새로운 마이그레이션을 생성
- `sqlmigrate`
  - 마이그레이션에 대한 SQL 문을 보여줌
- `showmigrations`
  - 프로젝트의 마이그레이션과 상태를 보여줌