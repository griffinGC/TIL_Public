# Vue model (v-model)

- Vue는 DOM으로 접근 안함

  - document.querySelector 같은것 사용 안함

- `v-model` 을 통해 HTML form input과 textarea element의 **양방향 데이터 바인딩** 생성 가능

  ```vue
  <input type="text" v-model="message">
  <p>
     메시지 : {{message}}
  </p>
  ```

  