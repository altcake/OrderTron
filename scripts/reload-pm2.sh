#!/bin/bash
cd ~/ordertron-aws
pm2 start ecosystem.config.cjs
pm2 save