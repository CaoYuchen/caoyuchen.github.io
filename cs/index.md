---
layout: page
title: "Computer Science"
tags: [cs]
date: 2022-04-07
comments: false
---


# Deep & Machine Learning 

### Poisson Blending
The project explores the gradient-domain processing in the practice of image blending, tone mapping and non-photorealistic rendering. The method mainly focuses on the Poisson Blending algorithm. The tasks include primary gradient minimization, 4 neighbors based Poisson blending, mixed gradient Poisson blending and gray-scale intensity preserved color2gray method. The whole project is implemented in Python. The detail implementation can be viewed here <a href="https://github.com/CaoYuchen/16726/tree/main/a2" target="_blank" style="color:blue">https://github.com/CaoYuchen/16726/tree/main/a2</a>, and the related <a href="https://www.andrew.cmu.edu/course/16-726-sp22/projects/yuchenca/proj2/index.html" target="_blank" style="color:blue">website</a>.

<center>
{% capture images %}
	{{ site.url }}/assets/img/Poisson-Blending.jpg
{% endcapture %}
{% include gallery images=images caption="Poisson Blending Demo" cols=1 %}
</center> 

### CycleGAN
This project implements two famous GAN architecture: DC-GAN and CycleGAN. It is programmed in Pytorch, the major code includes the build-up of discriminator and generator neural network, loss function, forward and backward propagations. It also explores different methods that help GAN generate better results, such as Data Augmentation, Differentiable Augmentation, variance of different lose functions, variance of different discriminators, and implemented in different dataset to check the robustness fo the network. The detail implementation can be viewed here <a href="https://github.com/CaoYuchen/16726/tree/main/a3" target="_blank" style="color:blue">https://github.com/CaoYuchen/16726/tree/main/a3</a>, and the related <a href="https://www.andrew.cmu.edu/course/16-726-sp22/projects/yuchenca/proj3/index.html" target="_blank" style="color:blue">website</a>.

<center>
{% capture images %}
	{{ site.url }}/assets/img/cycgan.jpg
{% endcapture %}
{% include gallery images=images caption="CycleGAN Demo" cols=1 %}
</center> 

### Neural Style Transfer
Neural Style Transfer is a vgg-19 based neural network, utilizes regression method MSE for loss function, and the LBFGS for input image(noise) optimization. It only uses the feature extraction part of vgg-19, and only for evaluation purpose(no gradient optimization for these layers), instead, the optimization happens in the loss function and input(two ends). And the loss function consists of two parts, content loss and style loss, we'll implement them separately first, and then combine them together with assigned weights. The detail implementation can be viewed here <a href="https://github.com/CaoYuchen/16726/tree/main/a4" target="_blank" style="color:blue">https://github.com/CaoYuchen/16726/tree/main/a4</a>, and the related <a href="https://www.andrew.cmu.edu/course/16-726-sp22/projects/yuchenca/proj4/index.html" target="_blank" style="color:blue">website</a>.


<center>
{% capture images %}
	{{ site.url }}/assets/img/styletransfer.jpg
{% endcapture %}
{% include gallery images=images caption="Style Transfer Demo" cols=1 %}
</center>

### Dense Object Reconstruction from RGBD Images with Embedded Deep Shape Representations
Most problems involving simultaneous localization and mapping can nowadays be solved using one of two fundamentally different approaches. The traditional approach is given by a least-squares objective, which minimizes many local photometric or geometric residuals over explicitly parametrized structure and camera parameters. Unmodeled effects violating the Lambertian surface assumption or geometric invariance of individual residuals are encountered through statistical averaging or the addition of robust kernels and smoothness terms. Aiming at more accurate measurement models and the inclusion of higher-order shape priors, the community more recently shifted its attention to deep end-to-end models for solving geometric localization and mapping problems. However, at test-time, these feed-forward models ignore the more traditional geometric or photometric consistency terms, thus leading to a low ability to recover fine details and potentially complete failure in corner case scenarios. With an application to dense object modeling from RGB-D images, our work aims at taking the best of both worlds by embedding modern higher-order object shape priors into classical iterative residual minimization objectives. We demonstrate a general ability to improve mapping accuracy with respect to each modality alone, and present a successful application to real data.

This is a paper published in the ACCV workshop, it can be found here <a href="https://arxiv.org/abs/1810.04891" target="_blank" style="color:blue">https://arxiv.org/abs/1810.04891</a>


<center>
{% capture images %}
	{{ site.url }}/assets/img/autoEncoder.jpg
{% endcapture %}
{% include gallery images=images caption="Network Architecture" cols=1 %}
</center>

***
# Computer Graphics

### Draw SVG
As name implies, this project's target is to draw svg from 3D shape, the main tasks are to draw line, triangle shapes, manage super-sampling, transforms, trilinear filter, alpha composition, scaling, etc. you can find original link <a href="https://github.com/CMU-Graphics/DrawSVG" target="_blank" style="color:blue">here</a>, and this is my implementation <a href="https://github.com/CaoYuchen/CMU15662/tree/main/DrawSVG" target="_blank" style="color:blue">https://github.com/CaoYuchen/CMU15662/tree/main/DrawSVG</a>.

<center>
{% capture images %}
	{{ site.url }}/assets/img/drawSVG.png
{% endcapture %}
{% include gallery images=images caption="Draw SVG Demo" cols=1 %}
</center>

### Scotty3D
Scotty3D is a 3D modelling software developed by CMU for education purpose, you can find original link <a href="https://cmu-graphics.github.io/Scotty3D/" target="_blank" style="color:blue">here</a>, and this is my implementation <a href="https://github.com/CaoYuchen/Scotty3D" target="_blank" style="color:blue">https://github.com/CaoYuchen/Scotty3D</a>.

This assignment covers basic half-edge-based 3D mesh and modeling algorithm, BVH, ray tracing rendering, rigging, simple animation and particle effect.

<center>
{% capture images %}
	{{ site.url }}/assets/img/scotty3D.png
{% endcapture %}
{% include gallery images=images caption="Scotty3D Interface" cols=1 %}
</center>

***

# Computer Vision & SLAM 

### Representations and Benchmarking of Modern Visual SLAM Systems
Simultaneous Localisation And Mapping (SLAM) has long been recognized as a core problem to be solved within countless emerging mobile applications that require intelligent interaction or navigation in an environment. Classical solutions to the problem primarily aim at localisation and reconstruction of a geometric 3D model of the scene. More recently, the community increasingly investigates the development of Spatial Artificial Intelligence (Spatial AI), an evolutionary paradigm pursuing a simultaneous recovery of object-level composition and semantic annotations of the recovered 3D model. Several interesting approaches have already been presented, producing object-level maps with both geometric and semantic properties rather than just accurate and robust localisation performance. As such, they require much broader ground truth information for validation purposes. We discuss the structure of the representations and optimisation problems involved in Spatial AI, and propose new synthetic datasets that, for the first time, include accurate ground truth information about the scene composition as well as individual object shapes and poses. We furthermore propose evaluation metrics for all aspects of such joint geometric-semantic representations and apply them to a new semantic SLAM framework. It is our hope that the introduction of these datasets and proper evaluation metrics will be instrumental in the evaluation of current and future Spatial AI systems and as such contribute substantially to the overall research progress on this important topic.

This is a paper published in Sensors Journal, it can be found here <a href="https://www.mdpi.com/1424-8220/20/9/2572" target="_blank" style="color:blue">https://www.mdpi.com/1424-8220/20/9/2572</a>

<center>
{% capture images %}
	{{ site.url }}/assets/img/pythonPipeline.png
{% endcapture %}
{% include gallery images=images caption="Pipeline" cols=1 %}
</center>

### A basic framework of SLAM
A fundamental SLAM system with tracking, mapping and pose optimization in Matlab. It includes SIFT & Harris feature extraction, 7/8 points, homograph method, and LevenBerg-Marquardt average error for pose optimization. The detail implementation can be viewed here <a href="https://github.com/CaoYuchen/SLAM-basicframe" target="_blank" style="color:blue">https://github.com/CaoYuchen/SLAM-basicframe</a>

<center>
{% capture images %}
	{{ site.url }}/assets/img/basicSLAM.jpg
{% endcapture %}
{% include gallery images=images caption="Simultaneous Localization and Mapping" cols=1 %}
</center>


***

# System 

### CMU 15213/15513

This course mainly includes basic computer system knowledge from compiler to linker, includes stack, heap, cache, simple network implementation, debug and disassemble usages. The assignment is based on C. The implementation can be found here <a href="https://github.com/CaoYuchen/CMU15513" target="_blank" style="color:blue">https://github.com/CaoYuchen/CMU15513</a>

***

# Computational Design  

### Cybernetics

This is a dynamic self-balanced system based on vector field, the points start from random location and influenced by field force in each pixel, these points will gradually form into a dynamic stable status, as an representation of cybernetic system. It is implemented in Processing, the code can be found here <a href="https://github.com/CaoYuchen/Cybernetic" target="_blank" style="color:blue">https://github.com/CaoYuchen/Cybernetic</a>

<center>
{% capture images %}
	{{ site.url }}/assets/img/vectorField.gif
{% endcapture %}
{% include gallery images=images caption="Vector Field Demo" cols=1 %}
</center>

***

# Digital Media Programming

### Interactive White Board

This is a set of English teaching tools, Interactive White Board(IWB), that I made for EF Education First, the main purpose of it is to assist children-oriented teaching in an entertaining and interactive way. My main contributions include:  

- Design styles for children-oriented teaching
- The entire programming of front-end
- Data transfer part of Back-end

<iframe width="560" height="315" src="https://www.youtube.com/embed/0_Hi4KPP46A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  

### Goal Map

I also made another questionaire website Goal Map for EF Education to help collect information quickly from parents to help their children locate best learning curve and courses to take.

<center>
{% capture images %}
	{{ site.url }}/assets/img/goalmap.jpg
{% endcapture %}
{% include gallery images=images caption="Goal Map Demo" cols=1 %}
</center>  

There are also some other websites that I made, you can check them here:  

<a href="https://caoyuchen.github.io/Dreamatic/" target="_blank" style="color:blue">Animated Website using three.js, for display of Dreamatic concept products</a>  
<a href="http://mpl.sist.shanghaitech.edu.cn/" style="color:blue">Academic style lab website for MPL lab</a>  

### Dr.Dox Quest For Time

GGJ 2022 game project: <a href="https://github.com/gcwhitfield/DrDoxQuestForTime" target="_blank" style="color:blue">https://github.com/gcwhitfield/DrDoxQuestForTime</a>. It's a puzzle game where Dr.Dox is a time traveler seeking for treasures but he has to be careful to not bump into himself in the past to avoid time paradox. My major role in this project: 

- Game design 
- Programming

<center>
{% capture images %}
	{{ site.url }}/assets/img/DrDox.png
{% endcapture %}
{% include gallery images=images caption="Dr.Dox Quest For Time Demo" cols=1 %}
</center>  


### Penumbra

CMU Advanced Game Studio project: <a href="https://github.com/gcwhitfield/Advanced-Game-Studio-Game" target="_blank" style="color:blue">Penumbra</a>. This projects is a split-screen two players game, players need to cooperate together and communicate with each other offline while playing the daughter and father to solve puzzles, go through forest and hide from monsters, to finally let them meet in the game. My major role in this project:

- Game Programmer
- Sound Artist
- Game Designer
- 3D Artist

<center>
{% capture images %}
	{{ site.url }}/assets/img/Forest.jpg
{% endcapture %}
{% include gallery images=images caption="Penumbra Demo" cols=1 %}
</center>

<iframe width="560" height="315" src="https://drive.google.com/file/d/1Xak8_xMf4E4C73CwjqslYpquJiFe1tjP/view?resourcekey" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


