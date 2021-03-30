# 장고 기본 Django Basic

> http://pythonstudy.xyz/Python/Django
>
> https://tutorial.djangogirls.org/ko/django/

## 장고 Django

- 파이썬 기반 웹 어플리케이션 프레임워크
- 서버로 요청들어올때 동작 원리
  1. 웹 서버에 요청이 장고로 전달됨
  2. 장고 `urlresolver` 가 웹 페이지의 주소를 가져 옴
  3. 패턴 목록에서 url과 맞는지 처음부터 하나씩 대조
  4. 일치하는 패턴이 있다면 해당 요청을 관련된 함수(view)에 넘겨줌
- 모든 작업은 View 함수에서 처리하고 응답함

### 장고 프로젝트 (Django Project)

#### 프로젝트 생성

1. 가상환경 생성

2. 가상환경 실행

3. 장고 설치

4. 장고 어드민으로 프로젝트 생성

   - 프로젝트명으로 된 디렉토리에 프로젝트 생성 됨

   1. 그 디렉토리 안에는 `manage.py` 파일과 프로젝트명으로 된 디렉토리가 있음

      - `manage.py`
        - 사이트 관리 도와주는 역할
        - 다른 설치 없이 컴퓨터에서 웹서버 실행 가능

   2. 프로젝트 명으로 된 디렉토리 안에 여러 파일 존재

      - `settings.py`

        - 웹사이트 설정이 있는 파일

      - `urls.py`

        - `urlresolver` 가 사용하는 패턴 목록을 포함하고 있음

      - `wsgi.py`

        > https://docs.djangoproject.com/ko/3.1/howto/deployment/wsgi/

        > https://developside.tistory.com/39

        - **웹서버와 파이썬을 사용한 웹어플리케이션 개발 환경 간의 인터페이스에 대한 규칙**

      - `__init__.py`

        

```sh
~$ mkdir 디렉토리명
~$ cd 디렉토리명
~/디렉토리명/$ python3 -m venv 가상환경명
~/디렉토리명/$ source 가상환경명/bin/activate
~/디렉토리명/$ pip install django
~/디렉토리명/$ django-admin startproject 프로젝트명
```

