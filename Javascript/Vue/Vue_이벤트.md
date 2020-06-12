# 이벤트 처리

- `v-on:click`  혹은 `@click`

  - `v-on:` 생략가능 대신 `@` 사용

  ```vue
  <button @click="updateScore()">
    버튼입니다.
  </button>
  ```

  		- 함수에 인자 없으면 샹략가능
  		- 메소드는 밑에서 선언해주어야 함

- `v-on:이벤트.수식어`

  - 수식어는 공식문서 참조
  - 수식어 prevent
    - prevent 뒤에오는 함수 말고 나머지 동작은 막음

