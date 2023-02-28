---
layout: post
title: Ground-robot Navigation
date: 2022-10-14
description: # Add post description (optional)
img: HuskyNavigation.gif # Add image post (optional)
fig-caption: # Add figcaption (optional)
keywords: Path Planning, Ground-robot, SLAM
comments: false
---


We Built the Husky ground-robot system with a Velodyne-16 Lidar sensor, Xsens-IMU, a 2nd 2D lidar, an RGB RealSense camera, and most importantly, on-board computing hardware with modern GPU; We then configured the ROS system with AMCL, Gmapping, Dijkstra* and DWA for 2D-lidar SLAM and path planning, navigation while avoiding dynamic obstacles, this achieves a foundation for advanced research such as reinforcement learning, more accurate pedestrian detection, etc. Besides, we managed to run a 3D lidar-based SLAM algorithm in real-time. 
