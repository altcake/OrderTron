#!/bin/bash

sudo apt update
sudp apt install -y ruby
sudo apt install -y wget
sudo apt install -y awscli

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install pm2 -g