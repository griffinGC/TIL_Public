#include <iostream>
#include <string>
#include <cstdio>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

using namespace std;

int longestPrefix(string arr[], int size){
	if(arr->length() == 0){
		return 0;
	}
	
	cout << arr[0] << endl;
	string max_prefix = arr[0];
    printf("max prefix length : %d\n", (int)max_prefix.length());
    int number = 0;
//    int arrLength = (int)arr->length();
//	값이 첫번째 원소의 첫번째와 같은지 계속 비교하는것! 
	for(int i = 0; i<max_prefix.length(); i++){
		char c = max_prefix.at(i);
		printf("character : %c\n", c);
		for(int j = 1; j<size;j++){
		    number++;
			if(arr[j].at(i) != c)
			{
			    return i;
			}
		}
	}
	return max_prefix.length();
}

int main(int argc, char** argv) {
	string arr[3] = {"apple", "apps", "ape"};
	int data = sizeof(arr) / sizeof(arr[0]);
	printf("arr length : %d\n", data);
	int value = longestPrefix(arr, data);
	
	printf("Value : %d\n", value);
	
	return 0;
}
