#!/bin/bash
cd ~/ordertron-aws
aws s3 cp s3://ordertron-bucket/prod/.env .
aws s3 cp s3://ordertron-bucket/prod/content content/ --recursive