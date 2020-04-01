# Computed Property Names

- 변수를 객체 생성시 `[`와 `]`을 이용하여 감싸서 key 값으로 사용할 수 있게 해준다.

  ```javascript
  let i = 0;
  let a = {
      ['foo' + ++i] : i,
      ['foo' + ++i] : i,
      ['foo' + ++i] : i
  }
  // foo에다가 i의 값을 1증가시켜 붙인다.
  // 그것을 [] 을 이용하여 객체의 키 값으로 사용한다.
  console.log(a.foo1) //1
  console.log(a.foo2) //2
  console.log(a.foo3) //3
  
  let param = 'size'
  let config = {
      [param] : 12
  }
  console.log(config)
  // output
  // {size : 12}
  // param의 값을 size로 설정하였으므로 size가 key 값으로 들어간다.
  ```



### 참고자료

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names