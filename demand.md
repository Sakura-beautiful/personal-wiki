# Personal Research & Engineering Wiki

## 技术设计与实现需求文档

> **项目定位：**
>
> 构建一个长期维护的个人技术知识库与开源项目展示网站，而不是传统意义上的个人简历/Portfolio 网站。
>
> 网站主要用于沉淀作者在 **Robotics、AI、Embodied Intelligence、Robot Learning、Computer Vision、VLA** 等方向上的技术文档、论文阅读笔记、实验记录和开源项目。
>
> 网站的核心目标是：
>
> **Things I learn, build, and understand.**

---

# 1. 项目目标

开发一个基于 GitHub 的静态个人知识库网站。

网站需要满足以下目标：

1. 能够长期维护和持续添加技术文章。
2. 技术文档以 Markdown / MDX 为主要内容格式。
3. 支持论文阅读笔记。
4. 支持开源项目介绍和项目文档。
5. 支持实验记录和技术问题记录。
6. 支持全文搜索。
7. 支持分类、标签和文章关联。
8. 支持代码高亮。
9. 支持数学公式和 LaTeX。
10. 支持图片、GIF、视频等技术内容展示。
11. 支持 Dark Mode。
12. 网站内容通过 Git 管理。
13. 推送到 GitHub 后自动部署。
14. 第一阶段使用 GitHub Pages，不需要后端数据库。
15. 架构需要方便未来扩展搜索、评论、动态 Demo、项目 API 等功能。

---

# 2. 网站定位

网站不是传统的：

> About Me → Resume → Experience → Contact

而应该更接近：

> **Documentation + Research Wiki + Engineering Blog + Open Source Hub**

核心内容不是“介绍我”，而是：

* 我学到了什么
* 我理解了什么
* 我做了什么
* 我遇到了什么问题
* 我写了什么代码
* 我读过什么论文
* 我的实验结果是什么

因此网站应该让**内容本身成为第一优先级**。

---

# 3. 核心信息架构

网站第一版采用以下一级导航：

```text
Home
Docs
Papers
Projects
Lab
Blog
About
```

其中：

### Home

网站入口和内容导航。

### Docs

系统性的技术知识文档。

### Papers

论文阅读笔记。

### Projects

自己开发的开源项目。

### Lab

实验记录、Debug 记录、技术探索。

### Blog

比较自由的技术文章、思考和研究日志。

### About

非常简洁的个人信息，不作为网站主体。

---

# 4. 内容分类

## 4.1 Docs

Docs 是网站最重要的内容之一。

主要用于记录系统性的技术知识。

建议分类：

```text
Docs
├── Robotics
├── AI
├── Computer Vision
├── Robot Learning
├── Embodied AI
└── Engineering
```

例如：

```text
Robotics
├── ROS2
├── Isaac Sim
├── Isaac Lab
├── URDF
├── MJCF
├── Coordinate Systems
└── Robot Manipulation

AI
├── Transformer
├── Foundation Models
├── VLA
├── Test-Time Training
└── Reinforcement Learning

Computer Vision
├── DINO
├── Object Detection
├── Hand Pose Estimation
├── 6D Pose Estimation
└── RGB-D

Robot Learning
├── PPO
├── DAgger
├── Imitation Learning
├── AMP
└── Policy Learning

Engineering
├── Linux
├── CUDA
├── PyTorch
├── Docker
├── Git
└── Server
```

分类不需要一次性全部创建。

只需要保证架构可以方便地增加新分类。

---

# 5. Paper Notes

Papers 用于记录论文阅读过程。

论文笔记不应该只是复制论文 Abstract，而应该突出：

> **作者自己的理解。**

每篇论文建议采用以下结构：

```markdown
# Paper Title

> Authors

Paper Link

## TL;DR

用几句话说明论文核心贡献。

## Motivation

为什么需要这项工作？

## Problem

论文解决什么问题？

## Key Idea

论文最核心的思想是什么？

## Method

详细介绍方法。

## Architecture

介绍模型结构。

## Training

介绍训练过程。

## Experiments

介绍实验设计和结果。

## My Understanding

记录自己的理解。

## Questions

记录目前还没有解决的问题。

## Related Work

记录相关工作。

## References

相关论文。
```

---

# 6. Projects

Projects 用于展示自己的开源项目。

项目页面不能只是：

> 项目名称 + GitHub 链接

而应该是完整的项目文档。

例如：

```markdown
# EgoHand

Egocentric Hand Pose Estimation

## Overview

项目简介。

## Motivation

为什么开发这个项目？

## Architecture

展示整体架构。

## Features

项目功能。

## Installation

安装方法。

## Usage

使用方法。

## Implementation

核心实现。

## Experiments

实验结果。

## Demo

视频 / GIF / 图片。

## Results

结果展示。

## Problems

开发过程中遇到的问题。

## Future Work

未来计划。

## Repository

GitHub Repository。
```

项目页面应该支持：

* GitHub 链接
* Demo
* 图片
* GIF
* 视频
* Architecture Diagram
* Code
* Installation
* Usage
* Results

---

# 7. Lab

Lab 是一个非常重要的模块，用于记录真实开发过程。

它与 Docs 的区别：

> Docs = 总结后的知识

> Lab = 实验和开发过程

例如：

```text
Lab

2026-08-08
DINO Grasp Classification Experiment

2026-08-05
RGB-D Hand Pose Pipeline

2026-07-29
HaWoR CUDA Debugging

2026-07-25
Isaac Lab Experiment

2026-07-20
RealSense Depth Measurement
```

Lab 页面可以记录：

```markdown
# Experiment: DINO Grasp Classification

Date: 2026-08-08

## Goal

检测第一视角视频中的手是否抓住物体。

## Dataset

...

## Method

DINOv3 → Feature Extraction → MLP Classifier

## Experiment

...

## Result

...

## Problem

...

## Next Step

...
```

Lab 不需要特别正式。

允许记录：

* 实验
* Debug
* Benchmark
* CUDA 问题
* 环境配置
* 失败实验
* 技术探索
* 临时想法

---

# 8. Blog

Blog 用于比较自由的文章。

例如：

```text
Why I Started Building My Own Research Wiki

What I Learned From Implementing PPO

My First Attempt at Building an Egocentric Dataset

Thoughts on Vision-Language-Action Models
```

Blog 不需要严格遵循 Docs 的结构。

---

# 9. Home 页面

首页不要设计成传统个人简历。

应该突出：

> Knowledge / Research / Projects

首页建议结构：

```text
Hero
│
├── 简短标题
├── 一句话介绍
└── Search
│
├── Explore
│   ├── Docs
│   ├── Papers
│   ├── Projects
│   └── Lab
│
├── Latest
│   └── 最近更新的文章
│
├── Featured Projects
│
└── Recent Notes
```

Hero 不需要放大量个人信息。

可以使用：

```text
Things I learn, build, and understand.

Robotics · AI · Embodied Intelligence
```

或者：

```text
A personal knowledge base for
robotics, AI, and embodied intelligence.
```

---

# 10. About 页面

About 页面保持极简。

可以包含：

```text
Name

Education

Research Interests

GitHub

Email

CV
```

不要让 About 页面成为整个网站的重点。

---

# 11. 搜索功能

网站必须预留全文搜索能力。

搜索应该能够搜索：

* Docs
* Papers
* Projects
* Lab
* Blog

例如搜索：

```text
test time training
```

返回：

```text
3 results

Docs
Understanding Test-Time Training

Papers
Test-Time Training Paper Notes

Lab
TTT Experiment
```

第一版可以使用纯静态搜索方案，不需要数据库。

优先考虑适合 Astro 静态站点的搜索方案。

---

# 12. Tag 系统

文章应该支持 Tag。

例如：

```text
#Robotics
#EmbodiedAI
#VLA
#RobotLearning
#ComputerVision
#PyTorch
#ROS2
#IsaacLab
#Paper
#Experiment
```

文章 Frontmatter 可以类似：

```yaml
---
title: "Understanding Test-Time Training"
description: "A detailed explanation of Test-Time Training."
tags:
  - AI
  - TTT
  - Foundation Models
category: Docs
date: 2026-08-08
---
```

点击 Tag 后可以查看所有相关内容。

---

# 13. Related Content

文章底部增加相关内容。

例如：

```text
Related

→ Fast Weight
→ Meta Learning
→ Long Context
→ Robot Foundation Model
```

这样可以逐渐建立知识网络。

未来可以进一步实现自动关联。

---

# 14. 内容格式

主要使用：

```text
Markdown
MDX
```

Markdown 必须支持：

* Heading
* Paragraph
* List
* Table
* Blockquote
* Code Block
* Inline Code
* Image
* Link
* LaTeX
* Footnote

代码块必须支持语法高亮。

例如：

```python
import torch

x = torch.randn(10, 3)
```

需要支持多种语言：

```text
Python
C++
Bash
JavaScript
TypeScript
YAML
JSON
XML
Markdown
LaTeX
```

---

# 15. 数学公式

技术文章和论文笔记需要支持 LaTeX。

例如：

```text
$$
P(y|x)=\frac{e^{f(x,y)}}{\sum_{y'}e^{f(x,y')}}
$$
```

需要正常渲染。

---

# 16. 图片和视频

技术文章经常需要展示：

* Architecture
* Pipeline
* Experiment Result
* Training Curve
* Visualization
* Robot Demo
* GIF

因此需要支持：

```text
PNG
JPG
WEBP
GIF
MP4
WebM
```

视频建议支持：

```html
<video>
```

而不是强制上传到第三方平台。

但需要考虑 GitHub Pages 的仓库体积问题。

对于大型视频，可以预留：

```text
YouTube
Bilibili
GitHub Release
其他 CDN
```

等外部资源方案。

---

# 17. UI / UX 设计

整体风格：

> **Linear + GitHub + Vercel + Modern Documentation**

不要做传统个人主页风格。

不要：

* 大量渐变
* 大量粒子动画
* 复杂 3D
* 过多卡片
* 巨大的头像
* 炫酷鼠标特效

应该：

* 简洁
* 留白
* 清晰
* 内容优先
* 技术感
* 长时间阅读舒适

---

# 18. Layout

桌面端建议：

```text
┌────────────────────────────────────────────────────┐
│ Logo                         Search      GitHub    │
├──────────────┬────────────────────────┬───────────┤
│              │                        │           │
│ Sidebar      │ Main Content           │ On This   │
│              │                        │ Page      │
│ Docs         │                        │           │
│ Papers       │ Article                │ Contents  │
│ Projects     │                        │           │
│ Lab          │                        │           │
│ Blog         │                        │           │
│              │                        │           │
└──────────────┴────────────────────────┴───────────┘
```

类似现代技术文档网站。

移动端自动变成：

```text
Header
↓
Content
↓
Table of Contents
```

Sidebar 折叠。

---

# 19. 技术栈

第一版推荐：

```text
Framework:
Astro

Documentation:
Astro Starlight

Styling:
Tailwind CSS

Content:
Markdown / MDX

Math:
KaTeX / MathJax

Syntax Highlight:
Shiki

Search:
Pagefind 或其他静态搜索方案

Version Control:
Git

Repository:
GitHub

Deployment:
GitHub Pages

CI/CD:
GitHub Actions
```

优先使用成熟的 Astro/Starlight 能力。

不要为了实现简单功能自己造轮子。

---

# 20. 项目目录

建议最终结构：

```text
personal-wiki/
│
├── src/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── robotics/
│   │   │   ├── ai/
│   │   │   ├── computer-vision/
│   │   │   ├── robot-learning/
│   │   │   └── engineering/
│   │   │
│   │   ├── papers/
│   │   │
│   │   ├── projects/
│   │   │
│   │   ├── lab/
│   │   │
│   │   └── blog/
│   │
│   ├── components/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │
│   └── styles/
│
├── public/
│   ├── images/
│   ├── videos/
│   └── assets/
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

如果 Starlight 对目录结构有自己的约定，则优先遵循 Starlight 的最佳实践，不要为了严格遵循上述结构而破坏框架规范。

---

# 21. Content Schema

建议使用 Content Collections / Content Layer 对文章进行结构化管理。

至少定义：

```yaml
title
description
date
updated
category
tags
draft
```

Paper 可以额外增加：

```yaml
authors
venue
paperUrl
codeUrl
```

Project 可以额外增加：

```yaml
github
demo
status
```

---

# 22. Git 工作流

所有内容都通过 Git 管理。

典型工作流：

```bash
git clone <repository>

# 创建文章
vim src/content/docs/...

# 本地预览
npm run dev

# 构建
npm run build

# 提交
git add .
git commit -m "add TTT notes"

# 推送
git push
```

GitHub Actions 自动完成：

```text
git push
    ↓
GitHub Actions
    ↓
npm install
    ↓
npm run build
    ↓
Deploy
    ↓
GitHub Pages
```

---

# 23. 第一阶段 MVP

不要一次实现所有功能。

第一阶段只需要完成：

### P0

* [ ] Astro 项目初始化
* [ ] Starlight 配置
* [ ] GitHub Pages 部署
* [ ] Home
* [ ] Docs
* [ ] Papers
* [ ] Projects
* [ ] Lab
* [ ] Blog
* [ ] About
* [ ] Dark Mode
* [ ] Responsive Layout
* [ ] Markdown
* [ ] MDX
* [ ] Code Highlight
* [ ] LaTeX
* [ ] 图片
* [ ] 基础搜索
* [ ] Tags
* [ ] GitHub Actions

---

# 24. 第二阶段

第一版稳定后再增加：

### P1

* [ ] 全文搜索优化
* [ ] Related Articles
* [ ] Tag 页面
* [ ] Category 页面
* [ ] RSS
* [ ] Sitemap
* [ ] SEO
* [ ] OpenGraph
* [ ] Reading Time
* [ ] Last Updated
* [ ] Article TOC
* [ ] Previous / Next Article

---

# 25. 第三阶段

以后可以增加：

### P2

* [ ] 项目 Demo
* [ ] Interactive Visualization
* [ ] Notebook
* [ ] 在线代码 Demo
* [ ] Paper citation graph
* [ ] Knowledge graph
* [ ] GitHub API
* [ ] GitHub Project 自动同步
* [ ] 自动生成 Project statistics
* [ ] 评论系统
* [ ] AI Search
* [ ] AI Paper Assistant

这些都不是第一阶段必须实现的。

---

# 26. 内容组织原则

网站需要遵循一个核心原则：

> **Content First.**

不要为了视觉效果牺牲阅读体验。

文章应该：

* 易读
* 易搜索
* 易关联
* 易维护
* 易迁移

所有内容尽量保持 Markdown 原始数据。

避免把文章内容硬编码到 React/Astro Component 中。

例如不要：

```typescript
const article = {
  title: "...",
  content: "..."
}
```

而应该：

```text
content/
    ttt.md
```

这样未来即使更换网站框架，也可以直接迁移内容。

---

# 27. 开源项目页面原则

Projects 页面应该尽可能与 GitHub Repository 解耦。

网站负责：

> 项目介绍、架构、Demo、文档、实验结果

GitHub 负责：

> 源代码、Issue、Pull Request、Release

例如：

```text
Website
    ↓
Project Documentation
    ↓
GitHub Repository
    ↓
Source Code
```

---

# 28. 内容示例

第一批内容可以从以下内容开始。

## Docs

```text
Understanding Test-Time Training
Understanding Fast Weight
Understanding DAgger
Understanding PPO
Understanding VLA
Robot Foundation Models
ROS2 Notes
Isaac Lab Notes
RGB-D Depth Estimation
6D Hand Pose Estimation
```

## Papers

```text
TTT
OpenVLA
π0
SmolVLA
ACT
Diffusion Policy
```

## Projects

```text
RoboTac
Egocentric Dataset Pipeline
Hand Grasp Classifier
Hand Pose Estimation
Paper Reader
```

## Lab

```text
DINO Grasp Classification
HaWoR Debugging
RealSense Depth Experiment
CUDA Environment Debugging
Isaac Lab Experiments
```

这些内容可以逐渐补充，不需要一次完成。

---

# 29. 非功能要求

网站需要满足：

### Performance

静态页面优先。

目标：

```text
Fast First Load
Minimal JavaScript
Optimized Images
Static Generation
```

### Accessibility

需要：

* Semantic HTML
* Keyboard Navigation
* Proper Contrast
* Alt Text

### Responsive

必须支持：

```text
Desktop
Tablet
Mobile
```

### Maintainability

最重要。

未来应该可以：

```text
添加一篇 Markdown
        ↓
不需要修改前端代码
        ↓
网站自动出现新文章
```

---

# 30. 开发原则

Coding Agent 实现时遵循：

### 原则 1

**优先使用成熟框架能力。**

不要重复实现 Markdown、搜索、代码高亮等基础设施。

### 原则 2

**内容和 UI 解耦。**

文章必须独立于页面组件。

### 原则 3

**第一版不要过度工程化。**

不要加入：

* 数据库
* 用户系统
* 后端
* 登录
* CMS
* 微服务

第一阶段完全使用静态网站。

### 原则 4

**设计要支持长期扩展。**

现在只有：

```text
10 articles
```

以后可能：

```text
500+ articles
```

因此目录、搜索、分类必须提前考虑扩展性。

### 原则 5

**不要做传统 Portfolio。**

About / Resume 只是辅助内容。

核心是：

```text
Docs
Papers
Projects
Lab
Blog
```

---

# 31. Agent 实现任务

请按照以下顺序实现。

## Step 1

初始化 Astro + Starlight 项目。

## Step 2

配置 GitHub Repository。

## Step 3

配置 GitHub Pages。

## Step 4

配置 GitHub Actions 自动部署。

## Step 5

设计全局 Layout。

## Step 6

实现：

```text
Home
Docs
Papers
Projects
Lab
Blog
About
```

## Step 7

实现 Markdown / MDX Content Collections。

## Step 8

实现代码高亮。

## Step 9

实现 LaTeX。

## Step 10

实现图片和视频。

## Step 11

实现 Tags。

## Step 12

实现搜索。

## Step 13

实现 Related Content。

## Step 14

实现 Dark Mode。

## Step 15

实现 Mobile Responsive。

## Step 16

添加示例内容。

至少创建：

```text
1 Docs article
1 Paper note
1 Project
1 Lab record
1 Blog post
```

## Step 17

本地测试。

```bash
npm run dev
npm run build
```

## Step 18

部署到 GitHub Pages。

## Step 19

检查：

* Desktop
* Mobile
* Dark Mode
* Search
* Code Block
* LaTeX
* Images
* Navigation
* Page Loading
* GitHub Pages Deployment

---

# 32. 最终目标

这个网站不是一次性项目。

它应该逐渐成为：

```text
                  Personal Research Wiki
                           │
          ┌────────────────┼────────────────┐
          │                │                │
        Learn             Build           Research
          │                │                │
        Docs            Projects          Papers
          │                │                │
          └────────────────┼────────────────┘
                           │
                         Lab
                           │
                    Experiments / Logs
                           │
                           ↓
                     Long-term Archive
```

最终形成一个长期积累的个人技术资产。

网站核心不是：

> “这是我的个人介绍。”

而是：

> **“这是我学习、研究、实验和构建过的东西。”**

---

# 33. 实现优先级总结

```text
                    Website
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Docs           Papers        Projects
        │              │              │
   技术知识         论文理解        开源项目
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                      Lab
                       │
                 实验 / Debug
                       │
                       ↓
                     Blog
                       │
                   思考 / 日志
```

**第一阶段只关注内容系统和阅读体验，不追求复杂功能。**

当内容达到一定规模后，再逐渐增加搜索、知识图谱、项目 Demo、AI Search 等功能。
