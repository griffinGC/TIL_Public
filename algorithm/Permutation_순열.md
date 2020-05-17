# Permutation

> https://gorakgarak.tistory.com/522
>
> http://www.eandbsoftware.org/print-all-permutations-of-a-given-string/

- 재귀를 이용해서 구현
- 맨 앞에 인자부터 순서대로 교환한다.
  - 처음으로 교환하는 것은 맨 처음 원소와 맨 처음 원소를 비교하는 것 부터 시작
- 배열은 계속 해서 들고 다니면서 교환되는 배열
- 첫번째 인자가 첫번째 인자와 교환된 상태라면 그걸 고정으로 하고 DFS 로 진행되듯이 깊이 들어가게된다.
  - 그리고 끝에 다다르면 출력하게 되는 형식이다.
- 구현 코드
  - 뒤에서 부터 변경

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
            swap(arr, i, depth);
            System.out.println("i : " + i + " depth : " + depth);
            System.out.println("swap: " + Arrays.toString(arr));
            perm(arr, depth+1, n, k);
            // depth가 계속 커져서 끝까지 갔을 경우 실행됨
            // 전 단계를 기억하고 전 단계로 초기화
            // 없다면 바뀐 상태로 수행되기 때문에 난장판이 됨
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

