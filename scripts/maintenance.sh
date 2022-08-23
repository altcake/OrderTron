#!/bin/bash
cd ~/ordertron-aws
# Backup word data file from server to S3
sudo aws s3 cp content/word_data/ s3://ordertron-bucket/prod/backup/word_data --recursive
sudo chown -R ubuntu:ubuntu *