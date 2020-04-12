# Javascript 특수 함수



## forEach

순차적으로 배열의 데이터를 보여줄때 사용 (순차적인 데이터 접근)

```javascript
let array = [50, 203, 227, 2, 158, 34, 23, 6, 256, 10];
array.forEach(function(element){
   console.log(element);
})
```



## Map

배열 내의 모든 요소 각각에 대해 주어진 함수를 호출한 결과를 모아 **새로운 배열**을 반환

기본형 : `arr.map(callback(currentValue[,index[,array]])[, thisArg])`

callback : 새로운 배열 요소를 생성하는 함수

currentValue : 현재 처리할 요소

index (optional) : 처리할 현재의 인덱스

array (optional) : map()을 호출한 배열 

thisArg (optional) : callback 실행시 this로 사용되는 값

```javascript
//배열 선언
const array1 = [1,4,9,16]

//array1의 각 원소에 대하여 *2 를 하여 map1에 새로운 배열 넣음
const map1 = array1.map(x=> x*2);

//[2, 8, 18, 32]
console.log(map1);

```





## Reduce

배열의 각 요소에 대해 주어진 reducer 함수를 실행하고, **하나의 결과값**을 반환

단순히 더하는 것에서만 사용되는 것은 아님

reducer함수는 4개의 인자를 가짐 : 누산기(acc), 현재 값(cur), 현재 인덱스(idx), 원본 배열(src)

- reducer 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 



기본형 : `arr.reduce(callback[,initialValue])`

callback : 배열의 각 요소에 대해 실행할 함수

- accumulator : 콜백의 반환값을 누적

- currentValue : 처리할 현재 요소
- currentIndex (optional) : 처리할 현재 요소의 인덱스
- array (optional) : reduce()를 호출한 배열

initialValue (optional) : callback의 최초 호출에서 첫 번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫번째 요소를 초기값으로 사용함

```javascript
//우선 reducer 함수를 정의 해야함
//1번째 reducer 함수 : reducer1
const reducer1 = (acc, cur) => acc + cur;

const array1 = [1,2,3,4];

// reducer1 사용 => 10 반환
console.log(array1.reduce(reducer1));

//2번째 reducer 함수 : reducer2
const reducer2 = (acc2, cur2) => acc2 + cur2 + 1;

// reducer2 사용 => 14 반환 (초기값으로는 첫번째 원소인 1 사용하고 총 3번 더했으므로)
console.log(array1.reduce(reducer2));

// 초기값으로 5를 사용 => 5에다가 더해나감
console.log(array1.reduce(reducer1, 5));
// expected output: 15
```



## Filter

주어진 함수의 테스트를 통과하는 모든 요소를 모아 **새로운 배열**로 반환

기본형 : `arr.filter(callback(element[, index[,array]])[, thisArgs])`

callback : 각 요소를 시험할 함수. true를 반환하면 요소를 유지하고 false를 반환하면 버림 (요소를 건너 띔)

- element : 처리할 요소
- index (optional) : 처리할 요소의 현재 인덱스
- array (optional) : filter를 호출한 배열

thisArg (optional) : callback을 실행할때 this로 사용하는 값

***filter()는 호출되는 배열을 변환시키지는 않는다.***

```javascript
//10보다 큰 값만 반환
function isBig(value){
    return value >= 10;
}

const array = [12, 5, 8, 130, 45];

//filter의 callback으로 10보다 큰 값만 반환하는 isBig 사용
const filtered = array.filter(isBig);

//[12, 130, 45];
console.log(filtered);
```

***Map과 Filter의 차이는 Map은 규칙을 적용시켜 새로운 배열을 리턴하는 것이고, Filter는 배열을 만족시키지 못하는 원소들을 걸러낸다.***



## 참고자료

https://www.zerocho.com/category/JavaScript/post/5acafb05f24445001b8d796d

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array

