# Docker 설치



## Ubuntu에서 Docker 설치

> https://docs.docker.com/engine/install/ubuntu/
>
> https://docs.docker.com/compose/install/

1. 기존의 있던 이전 버전 삭제

   ```zsh
   sudo apt-get remove docker-engine docker.io containered runc
   ```

2. repository 추가

   1.  사전 작업

   ```shell
   sudo apt-get update
   
   sudo apt-get install \
   	apt-transport-https \
   	ca-certificates \
   	curl \
   	gnupg-agent \
   	software-properties-common
   	
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

   2. repository 추가

   ```shell
   ❯ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   ```

3. docker 설치

   ```shell
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

4. docker compose 설치

   1. curl 로 설치

   ```shell
   sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

   2. 권한 설정

   ```shell
   sudo chmod +x /usr/local/bin/docker-compose
   ```

   3. 심볼릭 링크 설정

   ```shell
   sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
   ```

   