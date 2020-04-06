# Reflection (리플렉션)

- 객체를 통해 클래스 정보를 분석해 내는 프로그래밍 기법

- 객체의 형(type) 에 대해 모를때 사용 하는 방식



### Java에서의 Reflection

- 구체적인 클래스 타입을 몰라도 그 클래스의 메소드, 타입, 변수들을 접근 할 수 있도록 하는 API

  ```java
  public class Bike{
    public void ride(){
      // ride Bike
    }
  }
  
  public class Main{
    public static void main(STring[] args){
      Object bk = new Bike();
      // bk가 Object 자료형이지만 Object라는 클래스의 메소드와 변수만 사용 가능
      bk.ride();
    }
  }
  ```

  



### Go에서의 Reflection

- Runtime에 인터페이스나 구조체 등의 타입 정보를 얻어내거나 결정하는 기능

- Go에서는 인터페이스 자료형을 함수를 이용하여 넘기고 사용하는 과정에서 자료형을 명시해야하는 할때 유용하게 사용 가능

  - reflection을 사용하는 패턴을 피하는게 맞긴 함

- Go에서는 기본 패키지에서 리플레션 제공

  - `reflect.TypeOf` 함수를 이용하면 일반 자료형이나 구조체의 타입을 알 수 있음
  - `reflect.ValueOf` 함수를 이용하면 값 정보를 알 수 있음

  ```go
  import{
    "reflect"
  }
  
  func main(){
    var f float64 = 1.3
    // f의 타입정보를 t에 저장
    t := reflect.TypeOf(f)
    // f의 값 정보를 v에 저장
    v := reflect.ValueOf(f)
  }
  ```

  



## 출처

> [https://vallista.tistory.com/entry/Tip-What-is-the-Reflection-%EB%A6%AC%ED%94%8C%EB%A0%89%EC%85%98-%EC%9D%B4%EB%9E%80](https://vallista.tistory.com/entry/Tip-What-is-the-Reflection-리플렉션-이란)
>
> http://pyrasis.com/book/GoForTheReallyImpatient/Unit36
>
> https://4whomtbts.tistory.com/33
>
> https://brunch.co.kr/@kd4/8