# Vue 반복문

- `v-for(:key="key이름")`

  - key 반드시 필요
  - v-bind가 생략된 것
  - index나 item의 id 지정해야 함 (:key 로써 지정)

  ```vue
  <li v-for="item in itmes" :key="item.id">
  	{{item.name}}
  </li>
  ```

  - `item` 은 단수요소, `items` 는 복수요소, `name`은 property