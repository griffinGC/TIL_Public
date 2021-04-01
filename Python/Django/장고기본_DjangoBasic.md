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

   ```zsh
   (env) ~/djangoTest$ python3 -m venv 가상환경명
   ```

2. 가상환경 실행

3. 장고 설치

   ```zsh
   (env) ~/djangoTest$ pip install django
   ```

4. 장고 어드민으로 프로젝트 생성

   ```zsh
   (env) ~/djangoTest$ django-admin startproject 프로젝트명
   ```

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

5. 장고 migrate

   - migrate하지 않으면 에러 발생

   ```zsh
   (env) ~/djangoTest$ python mange.py migrate
   ```

6. 장고 실행

   ```zsh
   (env) ~/djangoTest$ python mange.py runserver
   ```

```sh
~$ mkdir 디렉토리명
~$ cd 디렉토리명
~/디렉토리명/$ python3 -m venv 가상환경명
~/디렉토리명/$ source 가상환경명/bin/activate
~/디렉토리명/$ pip install django
~/디렉토리명/$ django-admin startproject 프로젝트명
```



### 장고 앱 (Django App)

> http://pythonstudy.xyz/python/article/305-Django-App

- 장고에서 사용하는 **파이썬 패키지**
- **자신의 model, view, template, URL 매핑 등을 독자적으로 가지고 있음**
- **하나의 장고 프로젝트는 하나 이상의 장고 앱으로 이루어져 있음**
- 규모가 큰 장고 프로젝트는 보통 여러개의 장고 앱들을 모듈화하여 구성
  - 개발 및 유지보수가 효율적

#### 사용법

1. 장고 앱 (Django App) 생성 

   ```zsh
   (env) ~/djangoTest$ ./manage.py startapp 앱이름
   or
   (env) ~/djangoTest$ django-admin startapp 앱이름
   ```

   - 앱 이름으로 디렉토리가 생성되고 그 안에 기본 파일들이 생성됨
   - 앱 위치는 db.sqlite3의 위치와 동일

2. `settings.py` 에 추가

   - `INSTALLED_APPS` 리스트에 **Django App이름** 추가

   ```python
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
     	'앱이름',
   ]
   ```

3. `urls.py` 에 사용할 패턴 추가

   - 정규표현식 `^$` 는 빈 문자열 (루트) 가리킴
   - `url(r'^$', views.index)` 혹은 `path('home', views.index)`
     - url 혹은 path를 사용하면 됨
     - url 사용하려면 `from django.conf.urls import url` 필수

   ```python
   urlpatterns = [
       path('admin/', admin.site.urls),
     	url(r'^$', views.index),
     	or
     	path('home', views.index)
   ]
   ```

   