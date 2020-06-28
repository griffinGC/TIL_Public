# Java 더블 콜론

- 람다식과 동일한 처리방법을 갖는 표현식이지만 람다 본문을 제공하는 대신 이름으로 **기존 메소드 참조**

  - 즉, 이름을 이용해서 기존 메소드 사용하는 것 
  - 위에서 정의한 메소드를 아래에서 이름만 가지고 참조

  ```java
  private void convertToEmployee(ArrayList<Person> personList) {
  
  		System.out.println("-------Using Lambda Functions--------");
  		
  	//Using Lambda function to call recruit method
    //람다를 이용하여 map내부의 함수 정의
  		personList.stream().map(person -> this.recruit(person))
  				.collect(Collectors.toList()).forEach(s -> System.out.println(s));
  	
  	 System.out.println("-------Using Method Reference--------"); 
  	
  	//Using method reference to call recruit method
    
  	 personList.stream().map(this::recruit).collect(Collectors.toList())
  	.forEach(System.out::println);
  	
  	 } 
  private Employee recruit(Person person) 
  {
    Employee emp = new Employee(person.getName());
    return emp; 
  }
  ```

- 사용방식
  - `부를_메소드_클래스명 :: 부를_메소드`
  - 더블 콜론 앞에는 **부를 메소드의 클래스명**을 입력해 주고 뒤에는 **부를 메소드**를 입력!



## 참고자료

> https://dwenn.tistory.com/65
>
> https://www.javainuse.com/java/java8_method_References
>
> https://c10106.tistory.com/2837