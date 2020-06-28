# Nest-Based-control

> https://dzone.com/articles/java-11-nest-based-access-control-via-reflection
>
> https://blog.naver.com/PostView.nhn?blogId=priince&logNo=221637103611
>
> https://www.baeldung.com/java-nest-based-access-control

- Nest-based Access Controls
  - 물리적으로 다른 java 파일로 떨어진 클래스들을 논리적으로 같은 클래스로 묶어주는 기술
  - 같은 클래스 이므로, private 멤버 조차 쉽게 접근 가능

- nests 는 nested 클래스들이 같은 enclosing 클래스에 속하더라도 다른 클래스 파일들로 컴파일 되도록 만들어 준다.
  - 컴파일러가 synthetic/bridge 메소드 삽입하는것 없이 각각의 다른 private 멤버들에 접근하는 것을 가능하게 해줌

