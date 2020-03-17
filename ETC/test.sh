#!/bin/bash

a="star"
b="${a}"
c=3
d="${c}"
# star
echo "${a}"
echo "${b}"

# 3
echo "${c}"
echo "${d}"


arr_test=("abc" "def" "abcd")
arr_test2="${arr_test[@]}"
# abc def abcd
echo "${arr_test2[@]}"

# abc def abcd inserted
arr_test2+=("inserted")
echo "${arr_test2[@]}"

# abc  abcd inserted => def 삭제됨
arr_test2=("${arr_test2[@]/"def"}")
echo "${arr_test2[@]}"


if_test=5
if [ "${if_test}" -eq 1 ]
then
    echo "1입니다.."
elif [ "${if_test}" -lt 3 ]
then
    echo "3보다 큽니다.."
else
    echo "잘 모르겠습니다."
fi
# 잘 모르겠습니다.

cnt=0
while (("${cnt}" < 5))
do
    echo "${cnt}"
    ((cnt = "${cnt}" + 1))
done
# 0
# 1
# 2
# 3
# 4

for_test=(1 2 3 4 5)
for i in "${for_test[@]}"
do
    echo "${i}"
done
# 1
# 2
# 3
# 4
# 5

num=5
numCal=`expr \( 6 / 3 \) \* 3`
echo calCulate number is "${numCal}" 
# calCulate number is 6