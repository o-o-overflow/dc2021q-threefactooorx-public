
crx:
	rm 3factooorx.crx
	zip -r 3factooorx.crx 3FACTOOORX-public

run:
	-docker ps -q | xargs docker kill
	-docker rm `docker ps -a -f status=exited -q`
	-docker images -a | grep "3factooorx" | awk '{print $$3}' | xargs docker rmi
	docker build -t 3factooorx .
	docker run -p 4017:4017 -v `pwd`/output:/tester/output 3factooorx

benchmark:
	ulimit -n 10000
	ab -n 10000 -c 100 http://localhost:4017/

it:
	docker run -it  -p 4017:4017 3factooorx /bin/bash

clean_docker:
	-docker rmi -f $$(docker images -f "dangling=true" -q)
	-docker ps -q | xargs docker kill
	-docker rm `docker ps -a -f status=exited -q`
	-docker images -a | grep "3factooorx" | awk '{print $$3}' | xargs docker rmi