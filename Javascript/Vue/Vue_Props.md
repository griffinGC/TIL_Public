# Vue Props

- 부모로부터 자식 component에 전달되는 data

  - 타입 지정 가느

- 부모파일 내부

  ```vue
  <child
  	:msg = "msg"
    :author = "author"
  >
  </child>
  ```

- 자식파일 내부

  ```vue
  props:[
  		'msg',
  		'author'
  ]
  props:{
  	msg:string,
  	author:string
  }
  ```

  