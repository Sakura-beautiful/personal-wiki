---
title: "DINO Grasp Classification Experiment"
description: "Classifying whether a hand is grasping an object using DINOv2 features in egocentric video."
date: 2026-08-08
tags:
  - Experiment
  - DINO
  - ComputerVision
  - EmbodiedAI
draft: false
---

## Goal

Detect whether the hand in first-person video is grasping an object, using DINOv2 features + MLP classifier.

## Setup

- **Dataset:** [Describe dataset]
- **Model:** DINOv2 ViT-B/14 → feature extraction → MLP classifier
- **Hardware:** [GPU setup]

## Method

```python
import torch
from transformers import AutoModel

# DINOv2 feature extraction
model = AutoModel.from_pretrained('facebook/dinov2-base')

# Extract CLS token
with torch.no_grad():
    features = model(images).last_hidden_state[:, 0, :]
```

## Experiment

*Describe what you ran and how.*

## Result

| Metric    | Value |
|-----------|-------|
| Accuracy  | —     |
| Precision | —     |
| Recall    | —     |

## Problem

*What went wrong or what was unclear?*

## Next Step

- [ ] Try different DINOv2 model sizes
- [ ] Add temporal context
