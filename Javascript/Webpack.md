# Webpack

- 자바스크립트 어플리케이션의 **Static Module Bundler**
  - Browsify, Grunt, Gulp등이 존재
- Webpack 실행시, Dependency Graph를 통해 필요한 형태의 **하나 또는 여러개의 Bundle** 생성
  - Bundle
    - 소프트웨어 및 일부 하드웨어와 함께 작동하는데 필요한 모든것을 포함하는 package
- Webpack은 오직 Javascript와 Json만 이해 가능 (단점으로 작용)
  - Loader이용하여 극복
- Node.js가 설치된 환경에서 실행
- 사용 이유
  - 많은 Module Bundler중에 성능이 가장 우수
  - Browsify보다 속도가 빠름
  - 다양한 리소스들이 있을때 사용하기 좋음
  - Grunt, Gulp는 오로지 리소스들에 대한 툴로 사용되며 dependency graph가 없음

## 용어

### Entry

- 빌드의 대상이 되는 입력 소스
- 직/간접적으로 의존성을 가진 모듈들 이해
- 여러개의 Entry 존재 가능
- 기본 값은 `./src/index.js`

### Output

- Webpack이 생성한 bundles의 결과물의 위치를 지정 가능
- 기본 값은 `./dist/main.js`

### Loaders

- 다른 Type의 파일을 Webpack이 이해하고 처리 가능한 모듈로 변환시키는 작업 담당

### Mode

- 다양한 Profile 지정가능
  - development
  - production
  - none
- 기본값은 `production`

### Plugins

- Loader가 변환하는동안 다양한 일 수행



 ## 출처

> https://nesoy.github.io/articles/2019-02/Webpack

> https://velog.io/@yon3115/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%95%84%EC%88%98-Webpack%EC%9D%B4%EB%9E%80

> https://jusungpark.tistory.com/52