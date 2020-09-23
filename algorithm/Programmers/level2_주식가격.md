# [프로그래머스 level2] 주식 가격

> https://programmers.co.kr/learn/courses/30/lessons/42584

### 해결방안

- for문 한개와 while문 한개 사용
  - (다른 사람들이 for문 2개를 쓴것과는 큰 차이가 없지만, Queue혹은 Stack을 이용해서 해결하고 싶었음)
- 다른 사람들 같은 경우는 for문 2개를 이용하거나, stack을 이용해서 해결한 것 같다.
- 15분에서 20분정도 고민



### 알고리즘 순서

1. 일단 모든 원소를 Queue에 삽입
2. Queue에서 원소를 하나 뽑음
3. 뽑은 애와 Queue의 원소 비교
   1. **다음 원소가 있다면 일단 count증가**
      - **무조건 처음에는 가격이 떨어지지 않음**
   2. 뽑은 원소와 다음 원소의 값을 비교
      1. 뽑은 원소가 더 크거나 같다면 count 증가
      2. 뽑은 원소가 더 작을 경우 반복문 탈출
4. Queue의 원소가 비어있을 때까지 2,3 반복



### 핵심 팁

- 3-1번을 고려하는게 중요했었다.
- 어떻게 하면 값은 유지하면서 마지막의 경우 0이 나올지 고민했음



### 코드

```java
import java.util.LinkedList;
import java.util.Queue;
class Solution {
    public int[] solution(int[] prices) {
        int[] result = new int[prices.length];

        Queue<Integer> q = new LinkedList<>();
        for(int i = 0; i < prices.length; i++){
            q.add(prices[i]);
        }
        int i = 0;
        while(!q.isEmpty()){
            int pollData = q.poll();
            int count = 0;
            for(int data : q){
                count++;
                if(pollData > data){
                    break;
                }
            }
            result[i] = count;
            i++;
        }
        return result;
    }
}
```



*퍼가신다면 출처와 댓글 부탁드립니다.

*더 많은 자료는 아래 github에 있습니다

> https://github.com/griffinGC/Java_Algoritm
>
> https://github.com/griffinGC/TIL_Public