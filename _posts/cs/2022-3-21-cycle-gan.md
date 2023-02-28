---
layout: post
title: CycleGAN
date: 2022-03-21
description: # Add post description (optional)
img: cycgan.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
keywords: CycleGAN, DC-GAN, Deep Learning
comments: false
github: https://github.com/CaoYuchen/16726/tree/main/a3
web: https://www.andrew.cmu.edu/course/16-726-sp22/projects/yuchenca/proj3/index.html
---


This project implements two famous GAN architectures: DC-GAN and CycleGAN. It is programmed in Pytorch, the major code includes the build-up of the discriminator and generator neural network, loss function, and forward and backward propagations. It also explores different methods that help GAN generate better results, such as Data Augmentation, Differentiable Augmentation, the variance of different loss functions, and the variance of different discriminators, and implemented in the different datasets to check the robustness of the network.