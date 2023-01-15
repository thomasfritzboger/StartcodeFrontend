#! /usr/bin/env bash

NGINX_FRONTEND_FOLDER_NAME="frontend"
DROPLET_URL="venient-in.dk"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./dist/* root@$DROPLET_URL:/var/www/$NGINX_FRONTEND_FOLDER_NAME