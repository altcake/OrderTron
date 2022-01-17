#!/bin/bash

# Install required libraries
sudo apt update
sudo apt install -y ruby
sudo apt install -y wget
sudo apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
sudo apt install -y awscli

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install pm2 -g