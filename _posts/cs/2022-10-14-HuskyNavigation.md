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


We Built the Husky ground-robot system with Velodyne-16 Lidar sensor, Xsens-IMU, a 2nd 2D lidar and RGB RealSense camera; We then configured the ROS system with AMCL, Gmapping, Dijkstra* and DWA for 2D-lidar SLAM and path planning, navigation while avoiding dynamic obstacles, this achieves a fundation for advanced research such as reinforcement learning, more accurate pedestrian detection, etc.
