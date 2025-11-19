# Dog Image Upload Guide

## Overview
Dog images are stored in a **private S3 bucket** and accessed via **presigned URLs** for security. Images are named by UUID: `{uuid}.webp`


## Manual Upload

# Upload all images in sandbox
aws s3 sync public/images/ s3://amplify-foundmyfriend-and-dogprofileimagesbucket9a-3dqyiev1nghu/dog-images/ --profile amplify-local --exclude "*" --include "*.webp" --content-type "image/webp"