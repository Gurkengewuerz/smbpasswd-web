#!/bin/bash
USERNAME="gurken2108"
PROJECT="smbpasswd"
REGISTRY="docker.io"

docker build --no-cache -t ${REGISTRY}/${USERNAME}/${PROJECT}:latest .
docker push ${REGISTRY}/${USERNAME}/${PROJECT}:latest

echo -e "Done!"
