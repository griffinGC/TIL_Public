# Java에서 함수의 인자로 배열을 넣었을때 배열이 바뀌는 원리

- 자바에서 배열은 Object임
  - 객체의 값을 전달할때, 그 객체의 reference도 전달함
  - 즉, 객체를 다른 객체로 변경하는 것은 불가능 하지만 객체의 내용을 변경하는 것은 가능하다.
- 자바에서는 불려진 메소드가 배열의 내용을 변경 가능하다. 배열 reference의 복사본을 변경하는 것이 가능하다.



### 참고자료

> https://stackoverflow.com/questions/40480/is-java-pass-by-reference-or-pass-by-value
>
> https://stackoverflow.com/questions/12757841/are-arrays-passed-by-value-or-passed-by-reference-in-java