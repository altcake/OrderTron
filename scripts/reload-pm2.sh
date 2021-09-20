#!/bin/bash
cd ~/ordertron-aws
pm2 start ecosystem.config.js
pm2 save