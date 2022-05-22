---
layout: post
title: Neural Style Transfer
date: 2022-04-18
description: # Add post description (optional)
img: styletransfer.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
keywords: Deep Learning, Image Synthesis, Style Transfer
comments: false
github: https://github.com/CaoYuchen/16726/tree/main/a4
web: https://www.andrew.cmu.edu/course/16-726-sp22/projects/yuchenca/proj4/index.html
---


Neural Style Transfer is a vgg-19 based neural network, utilizes regression method MSE for loss function, and the LBFGS for input image(noise) optimization. It only uses the feature extraction part of vgg-19, and only for evaluation purpose(no gradient optimization for these layers), instead, the optimization happens in the loss function and input(two ends). And the loss function consists of two parts, content loss and style loss, we'll implement them separately first, and then combine them together with assigned weights