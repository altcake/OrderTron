#!/bin/bash
cd ~/ordertron-aws
sudo aws s3 cp s3://ordertron-bucket/prod/.env .
sudo aws s3 cp s3://ordertron-bucket/prod/content content/ --recursive
sudo chown -R ubuntu:ubuntu *