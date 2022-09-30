#!/bin/bash
cd ~/ordertron-aws
# Copy environment variables from S3 to server
sudo aws s3 cp s3://ordertron-bucket/prod/.env .
# Copy content folder from S3 to server
sudo aws s3 cp s3://ordertron-bucket/prod/content content/ --recursive
# Backup word data file from server to S3
sudo aws s3 cp content/word_data/ s3://ordertron-bucket/prod/backup/word_data --recursive
# Backup FC users file from server to S3
sudo aws s3 cp content/fc_data/ s3://ordertron-bucket/prod/backup/fc_data --recursive
# Backup link file from server to S3
sudo aws s3 cp content/media/brown_links.txt s3://ordertron-bucket/prod/backup/media/brown/brown_links.txt
sudo chown -R ubuntu:ubuntu *
chmod +x scripts/maintenance.sh