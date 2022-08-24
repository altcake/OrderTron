#!/bin/bash
# Install required libraries
sudo apt install -y ruby wget awscli build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install pm2 -g