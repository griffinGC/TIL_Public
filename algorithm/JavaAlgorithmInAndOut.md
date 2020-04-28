# Java Algorithm In and Out

> 자바기반 알고리즘 문제해결을 하기 위한 라이브러리 정리

## 출력

1. System.out.println()

   - 출력하고 줄 바꿈

   ```java
   System.out.println("Hello World!");
   ```

2. System.out.print()

   - 출력하고 줄 바꾸지 않음

   ```java
   System.out.print("Hello World!");
   ```

3. System.out.printf()

   - C 언어 출력처럼 사용

   - 출력 후 줄바꿈 하지 않음 (줄바꿈은 `%n`)
   - 출력 서식, 출력내용을 입력 (마치, printf 처럼)

   ```java
   String name = "Choi";
   System.out.printf("내 이름은 %s입니다.%n", name);
   ```



## 입력

### 1. Scanner (java.util.Scanner)

- 입력을 편하게 받을 수 있음

- `next자료형()` 을 이용하여 입력을 받을 수 있음

  ```java
  Scanner sc = new Scanner(System.in);
  // next자료형 중 하나인 nextInt()를 이용하여 값을 입력받음
  int number = sc.nextInt();
  ```

- `hasNext자료형()` 을 이용하여 해당 자료형을 입력 받는지여부를 체크할 수 있음

  ```java
  Scanner sc = new Scanner(System.in);
  int sum = 0;
  while(sc.hasNextInt()){
    sum += sc.nextInt();
  }
  System.out.println(sum);
  sc.close();
  ```

  - `hasNext()` 함수의 경우 데이터가 있는지 여부를 확인함 true, false로 리턴

- Scanner를 사용할 경우, 데이터를 입력 후 Enter키를 누르면 동작함

- Scanner를 사용할때 `nextInt()` 사용 후, `nextLine()`을 사용할 경우 에러 발생

  - `nextInt()` 를 사용하고 Enter를 칠 경우, 입력받은 정수형은 리턴해서 출력하지만 Enter는 그대로 남아 있다.

  - 그렇기 때문에, `nextLine()` 은 Enter를 기준으로 종료 시키기 때문에 바로 다음에 `nextLine()` 이 올 경우, 바로 Enter를 인식하고 다음문으로 넘어간다.

    - 이를 해결하기 위해서는 2가지 방법이 존재 한다.

      1. `nextInt()`  를 사용할 경우, 바로 다음에 단어만을 입력 받는다면 `next()` 를 이용해서 입력 받으면 된다.
      2. 문장을 입력 받고 싶다면, `nextInt()` 다음에 `nextLine()` 을 사용하고, 그 뒤에 `nextLine()` 을 이용하여 입력 받는다.

      ```java
      Scanner sc = new Scanner(System.in);
      int number = sc.nextInt();
      sc.nextLine();
      String str = sc.nextLine();
      ```

- `next()` 와  `nextLine()` 의 공통점 및 차이

  - 둘 다 String 타입을 리턴해 줌
  - `nextLine()` 은 Enter를 치기 전까지 쓴 모든 문자열을 리턴
  - `next()`는 공백(Space)를 치기 전까지 입력받은 문자열을 리턴



### 2. BufferedReader (java.io.BufferedReader)

- Scanner는 사용은 쉽지만 속도가 느림
- 입력이 많을 경우 용이
- 단일 스레드 뿐만 아니라 스레드가 여러개일때도 사용할 수 있음
  - String 보다 효율이 좋음!
- `InputStreamReader` 에 버퍼링 기능이 추가된 것!
- `read()` 와 `readLine()` 이라는 메소드 2개만 존재함
  - `InputStreamReader` 와 함께 사용
    - `InputStreamReader` 는 입력을 Character로 읽어들임 (키보드로 입력하는 글자 한개)
      - 줄단위로 받으려면 `BufferedReader` 사용
- `readLine()` 은 개행문자(`\n`) 또는 `\r` 을 기준으로 나누어서 한줄 읽어옴. 문자열을 리턴함
  - `\r` : 그 줄 맨 앞으로 가는 것을 뜻함
- `Scanner` 와 다르게 여러가지 형태의 자료형을 받을 수 없다.
  - 오직 문자열만 받을 수 있다.
- `StringTokenizer` 클래스와 함께 사용하면 편리함

```java
InputStreamReader isr = new InputStreamReader(System.in);
BufferedReader br1 = new BufferedReader(isr);
// 또는
BufferedReader br2 = new BufferedReader(new InputStreamReader(System.in));
```



### 3. split 함수

- 문자열을 쪼개는데 사용하는 함수

- 정규 표현식을 구분자로 해서 문자열 분리 후, 배열에 저장하고 리턴

- 사용형식

  - `String[] result = "문자열".split("정규표현식");`
  - 특수 문자의 경우 `\\` 을 붙여서 처리 할 수 있도록 만들어 준다.

  ```java
  package InAndOut;
  
  public class SplitTest {
      public static void main(String[] args) {
         String text = "Hello World Korea";
        // 공백을 기준으로 문자열 쪼개서 result라는 배열에 저장
         String[] result = text.split(" ");
  //        Hello
  //        World
  //        Korea
         for(String ele : result){
             System.out.println(ele);
         }
      }
  }
  ```

### 4. substring 함수
- 문자열을 자를때 유용하게 사용할 수 있는 함수
- 2가지가 존재함
  1. `String substring(int index)`
      - 자르고자 하는 문자열의 시작위치를 나타냄
      - `index` 위치부터 끝까지 잘라서 리턴함 
  2. `String substring(int beginIndex, int endIndex)`
      - 문자열의 `beginIndex` 부터 `endIndex` 바로 앞부분을 지정
      - **시작** 부분부터 **끝 부분 바로 앞**까지 자른것을 리턴
  

### 4. StringTokenizer (java.util.StringTokenizer)

- 문자열이 한 종류의 구분자일 경우 유용

- 첫번째 매개값으로 전체 문자열, 두번째로 구분자

  - `StringTokenizer st = new StringTokenizer("문자열", "구분자");`

  ```java
  package InAndOut;
  
  import java.util.StringTokenizer;
  
  public class StringTokenizerTest {
      public static void main(String[] args) {
          String text = "Let's/go/to/the/Hangang!";
          StringTokenizer st = new StringTokenizer(text, "/");
  //        Let's
  //        go
  //        to
  //        the
  //        Hangang!
        // 다음 토큰이 있는동안 출력!
          while(st.hasMoreTokens()){
              System.out.println(st.nextToken());
          }
  
      }
  }
  ```

- `nextToken()` : 토큰을 하나씩 꺼내와서 `String` 형식으로 리턴
- `countTokens()` : 남아있는 토큰의 수를 `int` 형식으로 리턴
- `hasMoreTokens()` : 토큰이 남아있는지의 여부를 `boolean` 형식으로 리턴함



### 5. StringBuilder

- 출력할 것이 많은 경우에 이용

- `+` 연산자를 이용하여 String 객체를 더하는 것보다 메모리 효율이 높음

  - 속도도 빠르고 부하가 적음
  - 새로운 객체 생성이 아닌 기존의 데이터에 더하는 방식이기 때문
  - `+` 연산자를 사용할 경우 문자를 추가할때 그때 그때마다 하나씩 추가하기 때문에 부하가 크게 걸림

- 클래스안에 배열공간을 미리 만들어놓고 해당 배열공간에 바로 추가하다가 공간이 부족할때만 복사하기 때문에 복사의 횟수가 현저히 줄어든다.

- 여러번 출력하는것보다 StringBuilder를 이용해 출력하는것이 용이

- 단일 스레드 환경에서만 사용가능

- `append("문자열" 또는 '문자')` : StringBuilder뒤에 추가하는 함수

- 버퍼를 저장할때, 문자열의 형태로 저장되는것이 아닌 데이터의 형태로 저장됨.

- 문자열로 출력하기 위해서는  `toString()` 함수에 의해서 문자열로 반환시킬 수 있음

- 속도면에서 String 보다는 **StringBuffer**(동기화 - 멀티스레드 환경에서 사용) , **StringBuilder**(비동기화)를 사용하는 것을 추천

  ```java
  package InAndOut;
  
  public class StringBuilderTest {
      public static void main(String[] args) {
          String[] strList = {"Hello", "World", "Friends"};
          StringBuilder sb = new StringBuilder();
          for(int i = 0; i<strList.length; i++){
              sb.append(strList[i]).append(" ");
          }
          // toString() 함수를 사용하지 않으면 
        	// String이 아니기 때문에 String에 넣을 수 없음!
          String result = sb.toString();
  //        Hello World Friends
          System.out.println(result);
      }
  }
  
  ```



### 6. 문자열 치환 (replace)

- 문자열을 치환할때 사용하는 함수

- `replace([기존문자], [바꿀문자])`

  - `저장될 문자열 = 문자열.replace([기존문자], [바꿀문자]);`

  ```java
  package InAndOut;
  
  public class ReplaceTest {
      public static void main(String[] args) {
          String replaceTest = "Hello World!";
          String result = replaceTest.replace("o", "e");
        // Helle Werld!
          System.out.println(result);
      }
  }
  ```

- `replaceAll([기존문자], [바꿀문자])`

  - `replace()` 메소드와 동일하게 사용가능
  - 차이점은 `replace()` 는 특수문자로도 치환이 가능하지만, `replaceAll()` 사용하면 문자열 전체가 치환됨
  - `replaceAll()` 은 정규식 사용 가능

  1. 숫자만 가져오는 법
     - `str.replaceAll("[^0-9]", "");`
  2. 숫자 지우는 법
     - `str.replaceAll("[0-9]", "");`



### 7. 큰 따옴표와 작은 따옴표 차이

- 큰 따옴표는 문자열로 인식하기 때문에 `String` 클래스 사용
- 작은 따옴표는 `Integer`로 형변환됨 -> `Char` 사용 
  - 아스키 코드 처럼 사용가능!



### 8. 문자열 접근

- `문자열.charAt(index)`

  ```java
  String str = new String("Hello World!");
  System.out.println(str.indexOf(4));
  // o
  ```

### 9. 배열 출력
- 한번에 모든 배열의 원소 출력하기 위해서는 `Arrays.toString(배열)` 을 사용하면 됨
  ```java
  int[] data = {1,2,3};
  Arrays.toString(배열);
  System.out.println(Arrays.toString(배열));
  ```
  
### 10. 문자열 양 끝 공백 제거 함수
- `trim()` 을 이용하면 문자열 양 끝에 존재하는 공백을 제거 할 수 있음
- `str.trim()` 
  ```java
  String str = " Hello, World! ";
  str.trim();
  //  Hello, World! 
  // trim() 사용할 경우 아래와 같은 결과 발생
  // Hello,World!
  ```

### 11. 문자 -> 문자열 변환
- 문자(Character)를 문자열(String)으로 변환할때는 `Character.toString(문자)` 를 사용함
  ```java
  String temp = "";
  char a = 'a';
  temp += Character.toString(a);
  // a
  ```

## 아스키 코드

1. 숫자
   - 0 ~ 9 == [48 ~ 57]
   - `charAt(index) - ' '` 

2. 알파벳
   - A ~ Z == [65 ~ 90] (대문자)
   - a ~ z == [97 ~ 122] (소문자)




## 출처 정리

- 기본정리

  > https://velog.io/@jakeseo_me/Algorithm-Study-With-Java-1
  >
  > https://velog.io/@jakeseo_me/Algorithm-Study-With-Java-2-JAVA-COLLECTIONS

- 출력

  > https://keep-cool.tistory.com/15

- 입력

  > http://neatfish.cafe24.com/wp/archives/tag/hasnextint
  >
  > Scanner 출력시 오류 정리
  >
  > - https://deftkang.tistory.com/55

- StringBuilder
  > https://www.youtube.com/watch?v=gc7bo5_bxdA