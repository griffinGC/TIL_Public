# 농장을 가장 큰 정사각형으로 토지를 나누는 방법
def cal_area(a, b):
    min_length = min(a,b)
    max_length = max(a,b)
    # 넓은 변의 길이가 짧은 변의 길이의 2배가 될때 끝남
    small = max_length % min_length
    if 2*min_length == max_length:
        print(min_length)
        return 
    else:
        # 변 중 짧은 부분과 짧은 부분으로 나누고 남은 부분
        return cal_area(min_length, small)

cal_area(1680, 640)
