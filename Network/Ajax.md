# Ajax

Ajax (Asynchronous JavaScript and XML)은 비동기 적인 웹 애플리케이션의 제작을 위해 사용하는 웹 개발 기법

이 기술을 이용하면 중복되는 HTML을 다시 한번 전송 받을 필요가 없다.

- SOAP나 XML기반의 웹 서비스 프로토콜이 사용됨
  - 웹 서버의 응답을 처리하기 위해 클라이언트 쪽에서 자바스크립트 사용

- 즉, 기존의 방식에서는 무조건 HTTP 통신후에 서버에서 리소스를 HTML로 제공하기 때문에 무조건 새로운 창을 만들거나 페이지를 이동했었음
  - 하지만, Ajax를 이용하면 **동일한 웹페이지 내에서 DOM을 변경**

### 동작 방식

1. 페이지에서 요청
2. Javascript는 해당 이름과 내용이 쓰여진 DOM 을 읽음
3. **XMLHttpRequest** 객체를 통해 웹서버에 해당 이름과 내용 전송
4. 웹서버에서 요청을 처리
5. **XML, Text 혹은 JSON**을 XMLHttpRequest 객체에 전송
6. Javascript가 해당 응답 정보를 DOM에 씀

### 장점 

- **페이지 이동 없이 고속 화면 전환 가능**
- **서버 처리 기다리지 않고, 비동기 요청 가능**
- **수신하는 데이터 양을 줄일 수 있고, 클라이언트에게 처리 위임 가능**

### 단점

- Ajax를 쓸 수 없는 브라우저 존재
- HTTP 클라이언트의 기능이 한정되어 있음
- 보안상의 문제
  - XSS
  - 자바스크립트를 사용하기 대문에 악의적인 요청으로 민감한 데이터 유출 가능성 있음
- 지원하는 Charset이 한정되어있음
- 요청 남발시 역으로 서버 부하 증가
- **여전히 클라이언트의 요청이 없을때도, 서버로 부터 응답을 받는 상황에서는 힘듬**
  - 즉, 서버와 브라우저가 **자유로운 양방향 통신 불가**
  - 이러한 문제점을 WebSocket이 해결



### 예시

```javascript
function ajax(){
    var aReq = new XMLHttpRequest();
    aReq.addEventListener("load", function(){
        console.log(this.responseText);
    });
    
    aReq.open("GET", "http://www.example.org/example.txt");
    aReq.send();
}
```

코드 실행시 4번째 라인의 익명함수는 밑에있는 open과 send보다 나중에 실행된다.

이 익명함수는 비동기로 실행되고, 이벤트 큐에 보관되었다가 **load 이벤트 발생 시** call stack에 실행되고 있는 함수가 없어서 비어있다면 stack에 올라와서 수행됨. (비동기 callback 함수이기 때문!)

***비동기 callback함수는 Event Queue에서 대기중이다가 Call Stack 이 비어있을때 실행 됨**



### Ajax 응답처리

서버로 부터 받아온 JSON 데이터는 문자열 형태로 존재

따라서 **문자열을 Javascript 객체로 변환**해야함. 이를 위해서는 문자열 파싱을 일일이 해야함

브라우저에서는 JSON 객체 제공. 이를 활용하여 Javascript 객체로 변환 가능

1. string => json객체

   => `JSON.parse(문자열)`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>what is it?</button>    
    <div class="outside">what i like is ...</div>
</body>
<script>
    let btn = document.querySelector("button");
    //버튼 클릭시 동작하도록 설정
    btn.addEventListener("click", function(){
        var aReq = new XMLHttpRequest();

        //load 했을시 동작하도록 => aReq.open(), aReq.send() 실행 후, 실행 됨
        //서버로부터 데이터를 브라우저가 받으면
        aReq.addEventListener("load", function(){
            //불러온 json값을 보여줌 => string형태
            console.log(this.responseText);
            console.log(typeof this.responseText);

            //현재 string 형태로 되어있는 json 값을 json object로 파싱
            var jsonObj = JSON.parse(this.responseText);
            console.log(jsonObj);
            console.log(typeof jsonObj);

            console.log(jsonObj.favorites[1]);
            let outside = document.querySelector(".outside");
            outside.innerHTML += "<span>" + jsonObj.favorites[1] + "</span>";
        })
        //json.txt안에는 json형태로 존재해야함
        aReq.open("GET","./json.txt");
        aReq.send();
    })
</script>
</html>
```

```json
{
    "name" : "min",
    "favorites" : ["grape", "orange"]
}
```

2. javascript값, 객체 => JSON문자열 (문자열)

   => JSON.stringify(JSON객체)



## 참고자료

https://ko.wikipedia.org/wiki/Ajax