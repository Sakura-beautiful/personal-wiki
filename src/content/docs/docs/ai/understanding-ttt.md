---
title: Understanding Test-Time Training
description: A structured overview of Test-Time Training — what it is, why it matters, and how it works.
date: 2026-08-08
tags:
  - AI
  - TTT
  - Foundation Models
---

> **Status:** Draft template — fill in with actual content.

## Overview

Test-Time Training (TTT) is a paradigm that adapts a model at inference time using the test input itself, without labeled data.

## Motivation

Standard models are trained on a fixed distribution. When test-time inputs deviate from training distribution, performance degrades. TTT addresses this by allowing the model to adapt using self-supervised signals at test time.

## Key Idea

$$
\theta^* = \arg\min_\theta \mathcal{L}_{\text{self}}(x_{\text{test}}; \theta)
$$

The model updates its parameters using a self-supervised loss on the test input before making a prediction.

## Method

*Fill in with your understanding of the method.*

## Architecture

*Describe the model architecture.*

## My Understanding

*Record your own interpretation here.*

## Questions

- [ ] How does TTT interact with fine-tuned models?
- [ ] What are the computational costs at inference?

## Related Work

- Fast Weight Programmers
- Meta-Learning (MAML)
- In-Context Learning

## References

- [Test-Time Training with Self-Supervision for Generalization under Distribution Shifts](https://arxiv.org/abs/1909.13231)
