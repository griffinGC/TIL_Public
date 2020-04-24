# Equals 와 '==' 의 차이

- 값 비교를 할때는 `equals()` 함수와 `==` 연산자 2가지가 존재함
- 객체를 비교 할때는 `equals()` 를 이용하여 비교하고, 원시 데이터 형을 비교할때만 `==`을 사용한다.

## `==`
- 객체의 경우 두 객체가 일치하는지 여부를 확인
    - 즉, 객체가 같은 메모리를 참조하는지 확인하는 것과 동일
- 문자열 (`String`) 의 경우 `==`을 사용하면 같은 객체인지 확인함
    - 같은 문자열이더라도 new 로 생성된 객체는 `==` 연산자로 비교하면 다른 값을 가리킴


##  `equals()`
- 객체가 같은 메모리를 참조하는지 비교할때 사용하는 것
- 문자열에서는 같은 내용을 나타내는지 확인 (메모리 주소 확인 x)

## `equals()`와 `==` 용도 차이
- 문자열 클래스의 경우, 두 객체의 문자열이 같은지 비교할때는 `equals()` 를 사용
- 문자열 이외의 클래스의 경우, 두 객체가 같은 객체인지 확인할때 `equals()` 사용
- `equals()`는 문자열 비교할때 유리

```java
public class test {
    public static void main(String[] args) {
    String str1 = "Hello";
    String str2 = "Hello";
    String str3 = new String("Hello");

    // 같은 문자열은 같은 메모리를 참조하기 때문에 true 
    System.out.println(str1 == str2);
    // String 클래스에서 equals는 같은 문자열임을 확인하는 것이기 때문에 true 리턴
    System.out.println(str1.equals(str2));
    // new로 str3를 새로 만든 것이므로 false 리턴
    System.out.println(str1 == str3);
    }
}
```

***String 클래스의 경우 new 로 생성한 것이 아닌 문자열을 할당하듯이 값을 지정하면 같은 문자열은 같은 메모리 값을 참고한다.***