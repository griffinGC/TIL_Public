# package 관리

- `package.json` 파일에 npm 종속성 포함됨

- 버전을 제대로 관리하기위해서는 `package.json` 과` package-lock.json` 모두 필요함

  > https://hyunjun19.github.io/2018/03/23/package-lock-why-need/
  >
  > https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5

  - `package.json` 파일에는 `version range`가 사용됨

    - 즉, 특정 버전이 아니라 버전의 범위를 의미
    - **`node_modules` 없이 배포하는 경우 반드시 필요!**

    ```javascript
      "dependencies": {
        "bootstrap": "^4.6.0",
        "bootstrap-vue": "^2.21.2",
        "core-js": "^3.6.5",
        "vue": "^2.6.12",
        "vue-router": "^3.5.1"
      },
    ```

    - `^3.5.1` 같은것은 범위를 나타냄 이후에 업데이트 된 버전이 설치됨

- 버전 기호 차이

  - <주(Major) 번호 번호><부(Minor) 번호 번호><패치(Patch) 레벨 번호>

  > https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json
  >
  > https://velog.io/@slaslaya/npm-semver-%ED%8B%B8%ED%8A%B8-%EB%B2%94%EC%9C%84%EC%99%80-%EC%BA%90%EB%9F%BF-%EB%B2%94%EC%9C%84

  - `~version`
    - tilde (틸드)
    - 마이너 버전이 지정되어있다면 patch level 변경 허용 
      - 그렇지 않은 경우 minor-level 변경 허용
    - ~1.2.3
      - 마이너 버전이 지정되어있으니 patch level 변경 허용
      - `>=1.2.0 < 1.3.0`
  - `^version`
    - caret (카렛)
    - 모든 minor/patch 버전 업데이트 사용
    - ^1.2.3
      - `< 2.0.0`

