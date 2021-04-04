# 장고 기본 Django Basic

> http://pythonstudy.xyz/Python/Django
>
> https://tutorial.djangogirls.org/ko/django/
>
> https://velog.io/@matisse/Django-2

## 장고 Django

- 파이썬 기반 웹 어플리케이션 프레임워크
- 서버로 요청들어올때 동작 원리
  1. 웹 서버에 요청이 장고로 전달됨
  2. 장고 `urlresolver` 가 웹 페이지의 주소를 가져 옴
  3. 패턴 목록에서 url과 맞는지 처음부터 하나씩 대조
  4. 일치하는 패턴이 있다면 해당 요청을 관련된 **함수(view)**에 넘겨줌
- 모든 작업은 View 함수에서 처리하고 응답함
  - `views.py`

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

        - 프로젝트 환경 및 구성 설정이 있는 파일

      - `urls.py`

        - `urlresolver` 가 사용하는 패턴 목록을 포함하고 있음

      - `asgi.py`

        - asgi 이용해서 배포할때 사용

      - `wsgi.py`

        > https://docs.djangoproject.com/ko/3.1/howto/deployment/wsgi/

        > https://developside.tistory.com/39

        - 프로젝트를 서비스 하기 위한 WSGI 호환 웹 서버의 진입점
        - 배포할때 사용

      - `__init__.py`

        - 디렉토리를 패키지처럼 다루라고 알려주는 용도의 **단순한 빈 파일**

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



### 장고 모델 (Django Model)

> http://pythonstudy.xyz/python/article/310-Django-%EB%AA%A8%EB%8D%B8-API
>
> https://docs.djangoproject.com/en/3.1/topics/db/models/

- 데이터 서비스를 제공하는 레이어

- Django App 안에 생성되는 `models.py` 모듈 안에 정의

- `models.py`

  - 하나 이상의 모델 클래스 정의 가능
  - **하나의 모델 클래스는 하나의 테이블에 해당 됨**
  - **클래스는 동시에 객체를 나타냄**

- 모델의 필드는 클래스의 Attribute로 표현되고 테이블의 컬럼에 해당 됨

  - PK가 지정되지 않으면, 이 역할을 하는 id 필드가 자동으로 추가됨

- 모델 클래스는 필드를 정의하기 위해 인스턴스 변수가 아닌 클래스 변수 사용

  - 변수가 내용이 아닌 메타 데이터 이기 때문

- 필드 타입

  - 필드 클래스마다 반드시 지정해주어야 하는 옵션 존재

  | Field Type    | 설명                                                         |
  | :------------ | :----------------------------------------------------------- |
  | CharField     | 제한된 문자열 필드 타입. 최대 길이를 **max_length 옵션에 지정**해야 한다. 문자열의 특별한 용도에 따라 CharField의 파생클래스로서, 이메일 주소를 체크를 하는 EmailField, IP 주소를 체크를 하는 GenericIPAddressField, 콤마로 정수를 분리한 CommaSeparatedIntegerField, 특정 폴더의 파일 패스를 표현하는 FilePathField, URL을 표현하는 URLField 등이 있다. |
  | TextField     | 대용량 문자열을 갖는 필드                                    |
  | IntegerField  | 32 비트 정수형 필드. 정수 사이즈에 따라 BigIntegerField, SmallIntegerField 을 사용할 수도 있다. |
  | BooleanField  | true/false 필드. Null 을 허용하기 위해서는 NullBooleanField를 사용한다. |
  | DateTimeField | 날짜와 시간을 갖는 필드. 날짜만 가질 경우는 DateField, 시간만 가질 경우는 TimeField를 사용한다. |
  | DecimalField  | 소숫점을 갖는 decimal 필드                                   |
  | BinaryField   | 바이너리 데이타를 저장하는 필드                              |
  | FileField     | 파일 업로드 필드                                             |
  | ImageField    | FileField의 파생클래스로서 이미지 파일인지 체크한다.         |
  | UUIDField     | GUID (UUID)를 저장하는 필드                                  |

- 필드 옵션

  | 필드 옵션                           | 설명                                                         |
  | :---------------------------------- | :----------------------------------------------------------- |
  | null (Field.null)                   | null=True 이면, Empty 값을 DB에 NULL로 저장한다. DB에서 Null이 허용된다. 예: models.IntegerField(null=True) |
  | blank (Field.blank)                 | blank=False 이면, 필드가 Required 필드이다. blank=True 이면, Optional 필드이다. 예: models.DateTimeField(blank=True) |
  | **primary_key (Field.primary_key)** | 해당 필드가 Primary Key임을 표시한다. 예: models.CharField(max_length=10, primary_key=True) |
  | **ForeignKey**                      | 다른 테이블을 참조하는 필드. **(Many-to-One)** on_delete 옵션을 가지고 있음. models.ForeignKey('Manufacturer', on_delete=models.CASCADE) 는 Manufacturer 모델을 참조한다는 의미 |
  | ManyToManyField                     | ForeignKey와 동일한 역할 수행                                |
  | OneToOneField                       | ForeignKey에 unique=True 옵션을 추가한것과 동일한 작업 수행  |
  | unique (Field.unique)               | 해당 필드가 테이블에서 Unique함을 표시한다. 해당 컬럼에 대해 Unique Index를 생성한다. 예: models.IntegerField(unique=True) |
  | default (Field.default)             | 필드의 디폴트값을 지정한다. 예: models.CharField(max_length=2, default="WA") |
  | db_column (Field.db_column)         | 컬럼명은 디폴트로 필드명을 사용하는데, 만약 다르게 쓸 경우 지정한다. |
  | choices                             | 필드를 선택하기 위해 사용하는 2개짜리 튜플들의 시퀀스. ('S', 'Small') 이 있다면 'S'를 선택하면 Small을 나타냄 |

  - on_delete 옵션
    - CASCADE
      - 삭제되면 FK로 얘를 가진애도 삭제
    - PROTECT
      - ProtectedError를 발생시켜서 참조된 객체의 삭제를 막음
    - RESTRICT (DJANGO 3.1)

- 예시코드

  ```python
  from django.db import models
  
  class Musician(models.Model):
    	first_name = models.CharField(max_length=50)
      last_name = models.CharField(max_length=50)
      instrument = models.CharField(max_length=100)
  
  class Album(models.Model):
    	# 내부에 메서드 지정 가능
    	artist = models.ForeignKey(Musician, on_delete=models.CASCADE)
      name = models.CharField(max_length=100)
      release_date = models.DateField()
      num_stars = models.IntegerField()
  ```

#### 테이블 만들기

1. `models.py` 에 객체 정의

2. 마이그레이션 생성

   ```zsh
   (env) ~/djangoTest$ python manage.py makemigrations 앱이름
   ```

3. 마이그레이션 수행

   ```zsh
   (env) ~/djangoTest$ python manage.py migrate 앱이름
   ```

### Django ORM

> https://velog.io/@magnoliarfsit/ReDjango-7.-ORM%EA%B3%BC-Queryset

- QuerySet (쿼리셋)
  - **전달받은 모델의 객체 목록**
  - 데이터베이스로부터 데이터를 읽고 필터를 걸거나 정렬 등 가능
  - queryset은 데이터 베이스의 여러 레코드를 나타냄
  - view함수에서 queryset 변수에 `objects(객체)`를 어떻게 가져올지 지정 가능
    - queryset을 어떻게 지정하느냐에 따라 가져올 데이터 지정 가능
    - 전체를 가져올때
      - `queryset = 객체이름.objects.all()`
      - 반환되는 객체가 `QuerySet`
  - `objects`는 ModelManager
    - 

```python
from .models import Blog
Blog.objects.all()
```



# Django Rest Framework

## api 생성 순서

### 1. model 정의

### 2. Serializer 정의

### 3. Views 추가

> https://www.django-rest-framework.org/api-guide/generic-views/

#### Generic view 사용법

- `Retrieve`가 접두사로 붙은 api
  - retrieve 는 아이디 값만 볼 수 있음
- `Destroy`
  - destroy는 값을 삭제할 수 있음
- `Update`
  - update는 정보수정

#### Viewset 사용법

- viewset
  - retrieve, update, delete

### 4. url 추가

- 라우터에 View 추가