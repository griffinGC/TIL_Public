# Permutation

> https://gorakgarak.tistory.com/522
>
> http://www.eandbsoftware.org/print-all-permutations-of-a-given-string/
> https://minusi.tistory.com/entry/%EC%88%9C%EC%97%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Permutation-Algorithm
>
> - 가장 이해 잘된 코드 (baaarking dog)
>
>   https://blog.encrypted.gg/732

- 재귀를 이용해서 구현
    - 백트래킹
- 맨 앞에 인자부터 순서대로 교환한다.
  - 처음으로 교환하는 것은 맨 처음 원소와 맨 처음 원소를 비교하는 것 부터 시작
- 배열은 계속 해서 들고 다니면서 교환되는 배열
- 인자가 서로 교환된 상태라면 그걸 고정시키고 DFS처럼 재귀를 이용하여 depth를 추가하며 깊이 들어가게된다.
  - 그리고 더이상 교환할 수 없는 depth에 도달하게 되면 출력하는 형식이다.
  - 출력한 이후에는 함수를 종료시키고 재귀를 빠져나오며 교환했던 부분을 원상복구 시킨다.
- 트리 형태로 생각
    ![트리](http://www.eandbsoftware.org/wp-content/uploads/2013/07/NewPermutation.gif)
- 구현 코드
  - 뒤에서 부터 변경
- 수학 공식
    - nPr = n! / (n-r)!

```java
package Search;

import java.util.Arrays;

public class Permutation {
    static void perm(int[] arr,int depth,  int n, int k){
        // depth를 검사해서 k와 같으면 더이상 출력하지 않음
        // k개의 길이를 가진 것을 출력
        if(depth == k){
            System.out.println("출력");
            print(arr, k);

            return;
        }
        System.out.println("Start! depth: " + depth + " / N : " + n + " / K : " + k);
        for(int i = depth; i<n; i++){
            // 위치를 변경
            System.out.println("위 swap");
            swap(arr, i, depth);
            System.out.println("i : " + i + " depth : " + depth);
            System.out.println("swap: " + Arrays.toString(arr));
            perm(arr, depth+1, n, k);
            // depth가 계속 커져서 끝까지 갔을 경우 실행됨
            // 전 단계를 기억하고 전 단계로 초기화
            // 없다면 바뀐 상태로 수행되기 때문에 난장판이 됨
            System.out.println("아래 swap");
            swap(arr, i, depth);
            System.out.println("swap before : " + Arrays.toString(arr));
        }

    }
    static void print(int[]arr, int k){
        for(int i = 0; i<k ; i++){
            if(i == k-1)
                System.out.println(arr[i]);
            else
                System.out.print(arr[i] + ",");
        }
    }
    static void swap(int[] arr, int a, int b){
        System.out.println("swap a : " + a + " / b : " + b);
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    public static void main(String[] args) {
        int[] arr = {1,2,3,4};
        perm(arr, 0, 4, 4);
    }
}
```

### 예제 문제

- N과 M (1)

  > https://www.acmicpc.net/problem/15649

  ```java
  package Baekjoon;
  
  import java.util.Scanner;
  
  public class problem15649_NandM {
      static void permutation(int[] arr, boolean[] isUsed, int n, int k, int count){
          if(count == k){
              printArray(arr);
              System.out.println();
              return;
          }
          for(int i = 0; i<n; i++){
              if(!isUsed[i]){
                  arr[count] = i+1;
                  isUsed[i] = true;
                  permutation(arr, isUsed, n, k, count+1);
                  isUsed[i] = false;
              }
          }
      }
      static void printArray(int[] arr){
          for(int ele : arr){
              System.out.print(ele + " ");
          }
      }
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          int n = sc.nextInt();
          int k = sc.nextInt();
          boolean[] isUser = new boolean[n];
          int[] arr = new int[k];
          // 넣을 index, depth, 현재 들어간 갯수
  
          permutation(arr, isUser, n, k, 0);
      }
  }
  ```

  