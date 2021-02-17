# Combination
> https://gorakgarak.tistory.com/523
> https://bcp0109.tistory.com/15
>
> [https://bcp0109.tistory.com/entry/%EC%A1%B0%ED%95%A9-Combination-Java?category=848939](https://bcp0109.tistory.com/entry/조합-Combination-Java?category=848939)


- 조합 알고리즘

- 수학 공식
    - n**C**r = n! / (r! (n-r)!)
    - n**P**r / r!
    - 조합을 선택하고자 하는 숫자의 팩토리얼로 나눈다.
    - n**C**r = n-1**C**r-1 + n-1**C**r

- 자바 같은 경우에는 직접 구현해야 하지만 파이썬이나 c++의 경우 라이브러리를 사용 가능
  
  
  - 파이썬 라이브러리
    
    
    - **1번째 인자로는 list, 2번째 인자로는 뽑을 갯수 (2번째 인자 없으면 자동으로 전체)**
    
    - 튜플의 리스트로 반환
    
      > https://mong9data.tistory.com/32
    
    ```python
    from itertools import combinations
    combi = combinations(리스트, 갯수) # 리스트는 n, 갯수는 m
    ```
    
    
  
- n 과 r 이 같은 경우와 r이 0인 경우는 1로 처리하고, 나머지는 재귀로 처리
    ```java
    public int combination(int n, int r ){
        if(r == 0 || n == r){
            return 1;
        }
        return combination(n - 1, r - 1) + combination(n - 1, r);
    }
    ```

- 조합 코드 ([백준 N과 M (2)](https://www.acmicpc.net/problem/15650))

  ```java
  package Baekjoon;
  
  import java.util.Scanner;
  
  public class problem15650_NandM2 {
      static boolean[] isUsed;
      static int[] arr;
      static int n;
      static int m;
      static void combination(int count, int min){
          if(count == m){
              printArray(arr);
              System.out.println();
              return ;
          }
          for(int i = min; i<n; i++){
              if(!isUsed[i]){
                  arr[count] = i+1;
                  isUsed[i] = true;
                  combination(count+1, i+1);
                  isUsed[i] = false;
  
              }
          }
      }
  
      static void printArray(int[] array){
          for(int ele : array){
              System.out.print(ele + " ");
          }
      }
  
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          n = sc.nextInt();
          m = sc.nextInt();
          isUsed = new boolean[n];
          arr = new int[m];
          combination(0,0);
      }
  }
  ```

  

  