---
layout: post
title: Dense Object Reconstruction from RGBD Images with Embedded Deep Shape Representations
date: 2018-10-11
description: # Add post description (optional)
img: autoEncoder.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
keywords: AutoEncoder, SLAM, 3D Reconstruction
comments: false
github: 
web: https://arxiv.org/abs/1810.04891
---


Most problems involving simultaneous localization and mapping can nowadays be solved using one of two fundamentally different approaches. The traditional approach is given by a least-squares objective, which minimizes many local photometric or geometric residuals over explicitly parametrized structure and camera parameters. Unmodeled effects violating the Lambertian surface assumption or geometric invariance of individual residuals are encountered through statistical averaging or the addition of robust kernels and smoothness terms. Aiming at more accurate measurement models and the inclusion of higher-order shape priors, the community more recently shifted its attention to deep end-to-end models for solving geometric localization and mapping problems. However, at test-time, these feed-forward models ignore the more traditional geometric or photometric consistency terms, thus leading to a low ability to recover fine details and potentially complete failure in corner case scenarios. With an application to dense object modeling from RGB-D images, our work aims at taking the best of both worlds by embedding modern higher-order object shape priors into classical iterative residual minimization objectives. We demonstrate a general ability to improve mapping accuracy with respect to each modality alone, and present a successful application to real data.