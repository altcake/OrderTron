#!/bin/bash
cd ~/ordertron-aws
aws s3 cp s3://ordertron-bucket/.env .
aws s3 cp s3://ordertron-bucket/content content/ --recursive
pm2 start ecosystem.config.js