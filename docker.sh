#!/bin/bash
# Script to Create a Container for LAMP, using Docker

# 1. Download git repository
#git clone https://github.com/robertoarcomano/DockerLamp.git /tmp/DockerLamp
#cd /tmp/DockerLamp

# 2. Download Dockerfile and create image
docker build -t videorent .

# 3. Create the container from the image
docker rm -f videorent
docker create -p 81:80 --name videorent videorent

# 4. Start the container
docker start videorent

docker exec -it videorent /bin/bash
