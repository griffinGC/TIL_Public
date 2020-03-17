# React Day 02

> React를 이용해서  Contact App 만드는 실습



## React를 이용한 Contact-App 실습

> 연락처를 입력 받아서 화면에 리스트업 해 줄 예정
>
> 그러한 연락처를 위한 component들 필요



#### 1. `create-react-app` 을 이용하여 프로젝트 생성

```shell
$ npx create-react-app contact-app
$ cd contact-app
$ npm start or yarn start
```

#### 2. Component를 관리하기 위한 폴더 `Components` 생성

#### 3. 입력을 받기 위한 `phone_form` 파일 생성

#### 4. 생성한 contact들을 보기 위한 `phone_list` 생성

#### 5. 각각의 contact들을 위한 `phone_item` 생성



## 리액트에서 DOM 관리방법

### Virtual DOM

- 데이터 변경 시 모두 다 다시그리는 것이 아닌, 변경되는 부분만 다시 그림
- DOM은 두고 메모리에 가상의 DOM을 그림. 다른 부분만 다시 그림
- Virtual DOM 사용 시, 빠르게 원하는 부분만 변경 가능





### 기타

- Dependencies는 `node_modules` 에 저장됨.

  - 용량이 크기 때문에, `github`에 올리거나 공유하지 않음
  - 대신, 이를 위한 `package.json`을 공유함
  - `git != github`
  - `github`의 용량은 100메가로 한정되어 있음

- 버전 붙이는 방식

  - 맨 앞 : 메이저 (기능이 완전히 바뀔 경우)
  - 중간 : 마이너 (기능이 소소하게 변경)
  - 마지막 : 디스패치 (디버그나 오류 사항 발생시 변경)

  





