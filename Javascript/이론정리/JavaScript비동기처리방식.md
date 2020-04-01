# Javascript 비동기 처리방식 해결

- 크게 3가지로 나뉘어짐
  - 콜백 (Callback)
  - 프로미스 (Promise)
  - async...await
- 자바스크립트의 경우 비동기로 처리가 되도록 엔진이 이루어져있다.
  - 이럴경우, 먼저실행하던 a라는 함수가 끝나기 전에 뒤에 있는 b라는 함수가 수행 되는 경우가 발생 할 수 있다.
  - 이런 사태를 막기위해 비동기 처리해결을 위한 장치들이 존재함

```javascript
function a(){
    console.log("before");
    setTimeout(function (){
        console.log("async function");
    }, 2000);
    console.log("second");
}   

a();

// before
// second
// async function
```



## Callback()

- 비동기를 처리하기 위한 가장 원초적인 방식
- 너무 많이 할 시, 콜백 헬(Callback hell)에 빠질 수 있음
- 콜백을 이용하면, 함수가 완료 되었을때 함수가 완료되었음을 알려주고 콜백에 있는 함수를 수행시킨다.

```javascript
function getData(callbackFunc){
  $.get('https://test/1', function(response){
    callbackFunc();
  });
}

// 함수 실행시 내부에 있는 $.get 를 이용해서 사이트에서 데이터를 가져오는 것을 완료하면, 뒤에 있는 함수가 callbackFunc() 를 실행시킨다. 그리고 처음에 getData에 인자로 넣은 함수가 실행된다.
getData(function(data){
  console.log(data);
})

function b(callback){
    console.log("print b");
    setTimeout(callback, 2000);
}

function c(){
    console.log("print c");
}

console.log("start");
b(c);
console.log("the end?");

// b함수가 먼저 실행되고 비동기로 인해서 b를 출력하고 바로 밑에 있는 'the end?'를 출력하고 b내부에 있는 setTimeout함수가 완료되면 거기 있는 callback함수가 실행되는 구조
// start
// print b
// the end?
// print c
```

## Promise

- Callback hell에 빠지는 것을 보완하기 위해서 등장

- `.then()`을 이용하여 여러개로 chanining이 가능함

- Promise 는 fullfilled 상태와 rejected 상태를 갖는데, fullfill이면 resolve 실행 아닐시 reject 실행!

  - fullfilled 상태가 되면 `.then()` 을 이용하여 처리 결과 값을 받을 수 있음
  - rejected 상태가 되면 `.then()`의 두번째 인자로 오는 reject를 수행하거나 혹은 `.then()` 뒤에 `.catch(reject)`를 넣어서 실패를 받을 수 있음
    - 가급적 `catch()` 이용!

- Promise를 사용하기 위해서는 함수가 `Promise` 객체를 리턴해야 함

  - Promise 안에서 비동기 함수가 실행됨
  - 함수가 성공하고 뒤에 실행될 `resolve` 함수와  `reject` 함수가 필요함
    - resolve와 reject는 단순한 순서로 성공했을때는 1번째 인자, 실패했을때는 2번째 인자가 실행됨
  - 성공하거나 실패했을경우 뒤에 있는 `.then(success, fail)` 이 실행된다.
    - 이 함수는 콜백함수를 실행하는 것과 같은 효과를 만듬
    - 함수를 호출하고 나면 새로운 프로미스 객체가 리턴됨. 고로 Chaining 가능해짐

- 형태

  - `.then(success, fail)`
  - `new Promise(function(resolve, reject){...})`

  - `resolve` 와 `reject`는 함수를 뜻함

```javascript
// Promise를 사용하기 위해서 Promise 객체를 리턴!
function getData(){
    console.log("아직 프로미스 시작 안함");
    return new Promise(function(resolve, reject){
        console.log("프로미스 시작!")
        var number = 100;
        if(number === 100){
            // 값이 맞을 경우 resolve함수를 실행
            console.log("값이 맞아요!");
            resolve(number);
        }else{
            // 값이 틀릴경우 reject 함수를 실행
            reject(new Error("number is wrong!"))
        }
    })
}

console.log("getData실행");
// getData함수를 실행한 이후에 맞을 경우 then 이후에 있는 resolve 함수가 실행되고, 틀릴경우 뒤에 있는 reject함수가 실행
// getData().then(function(data){
//     console.log(data + "받아온 값입니다.");
// }, function(err){
//     console.log(err);
// })

function resolveExample(data){
    console.log(data + " 옳소!");
}
function rejectExample(err){
    console.log("이제 에러가 출력될 것이오!")
    console.log(err);
}
// 성공시 resolveExample 실행, 실패시 rejectExample 실행 됨
getData().then(resolveExample, rejectExample);

// getData실행
// 아직 프로미스 시작 안함
// 프로미스 시작!
// 값이 맞아요!
// 100 옳소!
```



## async & await

- 비교적 최근에 나온 문법

- 콜백 함수와 프로미스의 단점을 보완하기 위해서 등장

- 개발자가 더 읽기 좋은 코드로 비동기문제 처리 가능

- 비동기 처리 메소드가 반드시 프로미스 객체를 반환해야 `await` 이 의도한대로 동작함

  ```javascript
  function fetchItem(){
      return new Promise(function(resolve, reject){
          var item = [1,2,3];
          resolve(item);
      })
  }
  
  async function showItems(){
    // 비동기 처리 함수가 반드시 promise를 리턴해야 async...await 사용가능
      let resultItem = await fetchItem();
      console.log(resultItem);
  }
  ```

  

- 형태

  - `async function 함수명(){ await 비동기처리메소드명();}`

```javascript
// async를 사용할 함수 앞에 async 붙임
// 함수 내부에서 완료될때까지 기다릴 곳 앞에 await 붙임
async function getData_with_async_await(){
    let user = await fetchData("name.com/user/1");
    if(user.id === 1){
        console.log(user.name);
    }
}

// 콜백 사용할 경우
function getData_with_callback(){
  let user = fetchData("name.com/user/1", function(){
    if(user.id === 1){
      console.log(user.name);
    }
  })
}

// 프로미스 사용할 경우 
function getData_with_promise(){
    fetchData("name.com/user/1")
    .then(function(reponse){
        let user = response;
        if(user.id === 1){
            console.log(user.name);
        }
    })
    .catch((err)=>{console.log(err);})
}
```

- 예외처리

  - `try {...} catch(error){..}`

    ```javascript
    async function logTodo(){
      try{
        let user = await fetchUser();
        if(user.id === 1){
          let todo = await fetchTodo();
          console.log(todo.title);
        }
      }catch (error){
        console.log(error);
      }
    }
    ```

    



## 참고자료

> [https://velog.io/@cyranocoding/2019-08-02-1808-%EC%9E%91%EC%84%B1%EB%90%A8-5hjytwqpqj](https://velog.io/@cyranocoding/2019-08-02-1808-작성됨-5hjytwqpqj)
>
> https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
>
> https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
>
> https://joshua1988.github.io/web-development/javascript/js-async-await/