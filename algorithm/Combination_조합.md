# Combination
> https://gorakgarak.tistory.com/523
> https://bcp0109.tistory.com/15


- 조합 알고리즘
- 수학 공식
    - n**C**r = n! / (r! (n-r)!)
    - n**P**r / r!
    - 조합을 선택하고자 하는 숫자의 팩토리얼로 나눈다.
    - n**C**r = n-1**C**r-1 + n-1**C**r
- n 과 r 이 같은 경우와 r이 0인 경우는 1로 처리하고, 나머지는 재귀로 처리
    ```java
    public int combination(int n, int r ){
        if(r == 0 || n == r){
            return 1;
        }
        return combination(n - 1, r - 1) + combination(n - 1, r);
    }
    ```
