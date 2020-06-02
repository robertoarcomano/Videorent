#!/bin/bash
# Script to Create a Container for Videorent, using Docker

# 1. Download git repository
rm -rf /tmp/videorent
git clone https://github.com/robertoarcomano/Videorent.git /tmp/videorent

# 2. Download Dockerfile and create image
docker rmi -f robertoarcomano/videorent
docker build -t robertoarcomano/videorent /tmp/videorent

# 3. Create the container from the image
docker rm -f videorent
docker create -p 81:80 --name "videorent" --restart=unless-stopped robertoarcomano/videorent

# 4. Start the container
docker start videorent

