---
layout: post
title: Weakly Supervisde Object Detection
date: 2022-10-01
description: # Add post description (optional)
img: weaklyObject.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
keywords: Object Detection, Pytorch, Deep Learning, Computer Vision
github: https://github.com/CaoYuchen/16824/tree/main/a1
comments: false
---


We used ImageNet pre-trained model to give a rough object detection, we first implement an Alex-Net based naive object detection network, and then implemented WSDDN model where the object region proposals is fed into spatial pyramid pooling for both classification and detection. We used ROI Pooling to get feature from Selective Search and implememnted a classifier to get both bounding-boxes and class scores for each region, and then use NMS and get intersection over union to reduce the number of bboxes, fianlly we write mAP and recall to evaluate the model.
