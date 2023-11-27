#!/bin/bash
# Install required libraries
sudo apt install -y ruby wget awscli build-essential
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install pm2 -g