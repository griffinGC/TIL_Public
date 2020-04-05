# Java Integer 배열 int 배열로 변환

- `stream()` 과 `mapToInt()`, `toArray()`  함수 이용

```java
Integer a[] = {1,2,3,4};
int b[] = Arrays.stream(a).mapToInt(Integer::intValue).toArray();
// 또는
int b[] = Arrays.stream(a).mapToInt(i->i).toArray(); 
```





## 출처

> [https://zetawiki.com/wiki/%EC%9E%90%EB%B0%94_Integer_%EB%B0%B0%EC%97%B4%EC%9D%84_int_%EB%B0%B0%EC%97%B4%EB%A1%9C_%EB%B3%80%ED%99%98](https://zetawiki.com/wiki/자바_Integer_배열을_int_배열로_변환)