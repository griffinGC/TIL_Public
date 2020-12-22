def sum(arr):
    # 배열과 정수를 더할 수 없기 때문에 리턴을 0으로 해줌
    if arr == []:
        return 0
    else:
        return arr[0] + sum(arr[1:])

arr = [2,4,6]
result = sum(arr)
print(result)