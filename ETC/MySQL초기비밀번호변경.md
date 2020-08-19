# MySQL 설치 및 초기 비밀번호 변경

## Linux mysql 설치

> https://donghwa-kim.github.io/mysql.html

```sh
sudo apt-get install mysql-server
```

### workbench 설치

```sh
sudo apt-get install mysql-workbench
```



## MySQL 비밀번호 없이 접속

> https://stackoverflow.com/questions/42421585/default-password-of-mysql-in-ubuntu-server-16-04

```sh
sudo mysql --defaults-file=/etc/mysql/debian.cnf  
```



## 초기 비밀번호 접속 및 root 변경

> https://stackoverflow.com/questions/42421585/default-password-of-mysql-in-ubuntu-server-16-04
>
> https://inma.tistory.com/98

```sh
// mysql 8.x
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '1234';
mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

mysql> quit
Bye
```

