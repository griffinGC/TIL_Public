# 선택정렬(Selection Sort)

- **O(n^2)** 의 시간복잡도를 가지는 정렬
- 가장 작은 원소를 찾아서 앞에다가 위치시키고 인덱스를 하나씩 증가하는 정렬방식
- 입력배열 이외에 다른 추가 메모리 요구하지 않음



### 순서 (오름차순)

1. i 번째 원소를 기억
2. i+1 부터 N-1 번째 원소 중에 가장 작은 것을 찾음 (전체원소의 개수 N개)
3. 비교하고 조건에 맞다면 번호 기억
4. for문 밖에서 swap (앞부터 저장)



### 구현

1. pseudo

   ```pseudocode
   idx = 0;
   for(int i = 0; i<n-1; i++){
   	for(int j = i+1; j<n; j++){
   		if(arr[idx] > arr[j]){
   			idx = j;
   		}
   	}
   	// 또는 idx = i+1;
   	if(idx != least){
       temp = arr[idx];
       arr[idx] = arr[i];
       arr[i] = temp;
   	}
   	//idx = i + 1;
   }
   ```

   

2. Java

   1. No recursive

      ```java
      package SortAlgorithm;
      
      import java.lang.reflect.Array;
      import java.util.Arrays;
      
      public class SelectionSortAlgorithm {
          public static void SelectionSort(int[] dataList){
              int minIndex = 0;
              for(int i = 0; i<dataList.length ; i++){
                  for(int j = i+1; j < dataList.length; j++){
                      // 최소 값보다 작은게 있다면 그것을 찾아서 임시로 저장해둠!
                      if(dataList[minIndex] > dataList[j]){
      //                    System.out.println("min : " + min);
      //                    System.out.println("smaller data and index : " + dataList[j] + " / " + j);
                          minIndex = j;
                      }
                  }
                  int temp = dataList[i];
                  dataList[i] = dataList[minIndex];
                  dataList[minIndex] = temp;
                  // 만약 sorting할 필요가 없다면 기존의 자리를 그대로 유지하는것이기 때문에 자기 자리와 바꾸는 것처럼 minIndex를 설정해줌
                  // 이것을 설정하지 않으면 for문 안에 if문을 생략하게 되고 게속해서 가지고 있던 기존에 minIndex를 설정해놨던 곳에 다시 값을 넣게됨
                  minIndex = i+1;
                  System.out.println(Arrays.toString(dataList));
                  System.out.println();
              }
          }
      
      
          public static void main(String[] args) {
              int[] dataList = { 3, 9, 4, 7, 5, 0, 1, 6, 8, 2 };
      //        int[] dataList = {5,3,8,4,9,1,6,2,7};
      //        int[] dataList = { 69, 10, 30, 2, 16, 8, 31, 22 };
              System.out.println("sorting 전!");
              System.out.println(Arrays.toString(dataList));
              System.out.println();
      
              SelectionSort(dataList);
              System.out.println("sorting 후!");
              System.out.println(Arrays.toString(dataList));
              System.out.println();
          }
      }
      ```

      

   2. Recursive

      ```java
      package SortAlgorithm;
      
      import java.util.Arrays;
      
      public class SelectionSortRecursive {
          public static void SelectionSort(int[] dataList){
              SelectionSort(dataList, 0);
          }
          public static void SelectionSort(int[] dataList, int start){
              if(start < dataList.length){
                  int minIndex = start;
                  for(int i = start; i < dataList.length; i++){
                      if(dataList[minIndex] > dataList[i]){
                          minIndex = i;
                      }
                  }
                  swap(dataList, start, minIndex);
                  SelectionSort(dataList, start + 1);
              }
          }
      
          public static void swap(int[] dataList, int a, int b){
              int temp = dataList[a];
              dataList[a] = dataList[b];
              dataList[b] = temp;
          }
          public static void printArray(int[] data){
      //        System.out.println(Arrays.toString(data));
              for(int ele : data){
                  System.out.print(ele + " ");
              }
              System.out.println();
          }
      
          public static void main(String[] args) {
      //        int[] dataList = { 3, 9, 4, 7, 5, 0, 1, 6, 8, 2 };
              int[] dataList = {5,3,8,4,9,1,6,2,7};
      //        int[] dataList = { 69, 10, 30, 2, 16, 8, 31, 22 };
              System.out.println("sorting 전");
              printArray(dataList);
      
              SelectionSort(dataList);
              System.out.println("sorting 후");
              printArray(dataList);
          }
      }
      
      // 출처 : https://www.youtube.com/watch?v=uCUu3fF5Dws
      ```

      



### 참고자료

> https://gmlwjd9405.github.io/2018/05/06/algorithm-selection-sort.html