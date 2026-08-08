# Personal Research Wiki — 最终需求文档

> **核心定位：** 个人技术知识库，不是个人简历网站。
> 核心是 **Docs · Papers · Projects · Lab · Blog**，About 是辅助页面。

---

## 1. 技术栈

| 模块 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | Astro | 静态站点生成 |
| Docs 框架 | Astro Starlight | 仅用于 Docs 板块 |
| 样式 | Tailwind CSS | 自定义页面样式 |
| 内容格式 | Markdown / MDX | 所有文章内容 |
| 数学公式 | KaTeX | LaTeX 渲染 |
| 代码高亮 | Shiki | Starlight 内置，自定义页面同步配置 |
| 搜索 | Pagefind | 纯静态全文搜索，build 后自动建索引 |
| 版本控制 | Git + GitHub | 内容和代码统一管理 |
| 部署 | GitHub Pages | 静态托管 |
| CI/CD | GitHub Actions | push 后自动构建部署 |

---

## 2. 部署配置

```
GitHub Username:   Sakura-beautiful
Repository:        personal-wiki
GitHub Pages URL:  https://sakura-beautiful.github.io/personal-wiki
Astro base:        /personal-wiki
自定义域名:         无
```

GitHub Actions 工作流：

```
git push → GitHub Actions → npm install → npm run build → Deploy to GitHub Pages
```

---

## 3. 信息架构

### 3.1 导航结构

```
Home | Docs | Papers | Projects | Lab | Blog | About
```

导航语言为英文。所有路由：

```
/                     → Home
/docs/                → Docs（Starlight）
/papers/              → Papers 列表
/papers/[slug]/       → 单篇 Paper
/projects/            → Projects 卡片网格
/projects/[slug]/     → 单个 Project
/lab/                 → Lab 列表
/lab/[slug]/          → 单篇 Lab 记录
/blog/                → Blog 列表
/blog/[slug]/         → 单篇 Blog
/about/               → About
```

### 3.2 板块归属

| 板块 | 实现方式 | 列表样式 |
|------|----------|----------|
| Docs | Astro Starlight | 侧边栏导航，不需要列表页 |
| Papers | 自定义 Astro 页面 | 卡片列表 |
| Projects | 自定义 Astro 页面 | 卡片网格 |
| Lab | 自定义 Astro 页面 | 卡片列表，按日期倒序 |
| Blog | 自定义 Astro 页面 | 卡片列表，按日期倒序 |
| Home | 自定义 Astro 页面 | — |
| About | 自定义 Astro 页面 | — |

---

## 4. Docs 板块（最高优先级）

使用 Astro Starlight 实现。**阅读体验是整个网站最重要的页面体验。**

### 4.1 目录结构

```
docs/
├── robotics/
│   ├── ros2/
│   ├── isaac-sim/
│   ├── isaac-lab/
│   ├── urdf/
│   └── robot-manipulation/
├── ai/
│   ├── transformer/
│   ├── foundation-models/
│   ├── vla/
│   └── reinforcement-learning/
├── computer-vision/
│   ├── dino/
│   ├── object-detection/
│   ├── hand-pose-estimation/
│   └── 6d-pose-estimation/
├── robot-learning/
│   ├── ppo/
│   ├── imitation-learning/
│   └── policy-learning/
└── engineering/
    ├── linux/
    ├── cuda/
    ├── pytorch/
    └── docker/
```

分类不必一次创建完，架构支持持续扩展。

### 4.2 Starlight 配置要求

- 左侧边栏按上述分类组织，支持折叠
- 右侧 Table of Contents（页内锚点导航）
- 代码块语法高亮（Shiki）
- KaTeX 数学公式渲染
- 内置 Pagefind 搜索
- Dark Mode 切换
- "Edit this page on GitHub" 链接
- "On this page" 快速跳转

### 4.3 Docs Frontmatter Schema

```yaml
---
title: "文章标题"
description: "一句话描述"
date: 2026-08-08
updated: 2026-08-08
tags:
  - AI
  - TTT
draft: false
---
```

---

## 5. Papers 板块

### 5.1 列表页设计

卡片样式，每张卡片显示：

```
┌─────────────────────────────────────────┐
│ Title                          [venue]  │
│ Authors                                 │
│ TL;DR 一句话摘要                         │
│ [tag] [tag]              date →         │
└─────────────────────────────────────────┘
```

### 5.2 单篇 Paper 结构模板

```markdown
---
title: ""
description: ""
authors: ""
venue: ""
date: 2026-08-08
tags: []
paperUrl: ""
codeUrl: ""
draft: false
---

## TL;DR

## Motivation

## Problem

## Key Idea

## Method

## Architecture

## Training

## Experiments

## My Understanding

## Questions

## Related Work

## References
```

---

## 6. Projects 板块

### 6.1 列表页设计

卡片网格（桌面端 2 列，移动端 1 列），每张卡片显示：

```
┌─────────────────────────────┐
│ [封面图 / 占位图]            │
│ Project Name                │
│ 一句话描述                  │
│ [tag] [tag]     [GitHub →]  │
└─────────────────────────────┘
```

### 6.2 单个 Project 结构模板

```markdown
---
title: ""
description: ""
date: 2026-08-08
tags: []
github: ""
demo: ""
status: "active"   # active | archived | wip
draft: false
---

## Overview

## Motivation

## Architecture

## Features

## Installation

## Usage

## Implementation

## Experiments

## Demo

## Results

## Problems

## Future Work
```

---

## 7. Lab 板块

### 7.1 列表页设计

卡片列表，按日期倒序。每张卡片：

```
┌─────────────────────────────────────────┐
│ 2026-08-08                              │
│ Experiment Title                        │
│ 简短描述                                │
│ [tag] [tag]                             │
└─────────────────────────────────────────┘
```

### 7.2 单篇 Lab 结构模板

```markdown
---
title: ""
description: ""
date: 2026-08-08
tags: []
draft: false
---

## Goal

## Setup

## Method

## Experiment

## Result

## Problem

## Next Step
```

---

## 8. Blog 板块

### 8.1 列表页设计

卡片列表，按日期倒序。每张卡片：

```
┌─────────────────────────────────────────┐
│ Title                                   │
│ 简短描述                                │
│ [tag] [tag]                    date     │
└─────────────────────────────────────────┘
```

### 8.2 单篇 Blog 结构模板

```markdown
---
title: ""
description: ""
date: 2026-08-08
tags: []
draft: false
---

（自由格式，无固定结构）
```

---

## 9. Home 首页

### 9.1 Hero

```
Notes on building machines that understand the world.

Robotics · AI · Embodied Intelligence
```

包含搜索框（触发 Pagefind）。

### 9.2 页面结构

```
Hero
│  headline + subline + search
│
Explore
│  Docs / Papers / Projects / Lab
│  （4 个板块的入口卡片，有图标和简短说明）
│
Latest
│  最近更新的 6 篇文章（混合板块）
│
Featured Projects
│  精选项目卡片（手动配置 featured: true）
│
Recent Lab Notes
│  最近 3 条 Lab 记录
```

Home 首页不展示大量个人信息，不放头像。

---

## 10. About 页面

极简，仅包含以下字段（全部使用占位符，作者自行填写）：

```
Name:               [YOUR NAME]
Education:          [UNIVERSITY / DEGREE]
Research Interests: Robotics · Embodied AI · Computer Vision · Robot Learning
GitHub:             https://github.com/Sakura-beautiful
Email:              [YOUR EMAIL]
CV:                 [LINK TO CV PDF]
```

---

## 11. UI / UX 规范

### 11.1 整体风格

参考：Linear、GitHub、Vercel、现代技术文档网站。

规则：
- 内容优先，留白充足
- 无大面积渐变、无粒子动画、无 3D、无鼠标特效
- 允许极细微的 hover 过渡（150ms ease）

### 11.2 字体

```
UI / Body:   Inter（系统优先，fallback: -apple-system, sans-serif）
Code:        JetBrains Mono（fallback: 'Fira Code', monospace）
```

### 11.3 颜色系统

```
Light Mode
  background:   #ffffff
  surface:      #f9f9f9
  border:       #e5e5e5
  text-primary: #111111
  text-muted:   #666666
  accent:       #4f6ef7

Dark Mode
  background:   #0c0c0c
  surface:      #141414
  border:       #2a2a2a
  text-primary: #f0f0f0
  text-muted:   #888888
  accent:       #6b8afb
```

### 11.4 Layout

桌面端（Docs 板块）：

```
┌────────────────────────────────────────────┐
│ Logo              Search       GitHub Dark │
├───────────┬────────────────────┬───────────┤
│ Sidebar   │ Content            │ On Page   │
│ (240px)   │                    │ (200px)   │
└───────────┴────────────────────┴───────────┘
```

移动端：Header → Content → ToC，Sidebar 折叠为汉堡菜单。

### 11.5 卡片规范

所有卡片（Papers / Lab / Blog / Projects）：
- 边框 1px，radius 8px
- hover 时轻微 border 颜色加深 + 阴影
- 无背景色大变化

---

## 12. 内容格式支持

必须支持以下 Markdown 特性：

| 特性 | 实现 |
|------|------|
| Heading H1-H6 | 原生 Markdown |
| Paragraph / List / Table / Blockquote | 原生 Markdown |
| Code Block + 语法高亮 | Shiki |
| Inline Code | 原生 Markdown |
| Image（PNG/JPG/WEBP/GIF） | 原生 Markdown + Astro 优化 |
| Link | 原生 Markdown |
| LaTeX（行内 + 块级） | KaTeX |
| Footnote | remark-footnotes |
| Video（MP4/WebM） | MDX `<video>` 组件 |
| YouTube / Bilibili embed | MDX 自定义组件 |

代码块语言支持：Python、C++、Bash、JavaScript、TypeScript、YAML、JSON、XML、Markdown、LaTeX。

---

## 13. 搜索

使用 Pagefind。

搜索范围覆盖所有板块：Docs / Papers / Projects / Lab / Blog。

搜索入口：
- Home 首页 Hero 区域
- 顶部导航栏（桌面端图标，移动端菜单内）
- Starlight 内置搜索（Docs 板块）

---

## 14. Tags 系统

所有内容类型均支持 `tags` 字段。

Tag 页面路由：`/tags/[tag]/` → 列出该 tag 下所有文章（跨板块）。

示例 Tag：

```
Robotics · EmbodiedAI · VLA · RobotLearning · ComputerVision
PyTorch · ROS2 · IsaacLab · CUDA · Paper · Experiment
```

---

## 15. Content Collections Schema

### 通用字段（所有类型）

```typescript
title: z.string()
description: z.string()
date: z.date()
updated: z.date().optional()
tags: z.array(z.string()).default([])
draft: z.boolean().default(false)
```

### Papers 额外字段

```typescript
authors: z.string()
venue: z.string().optional()
paperUrl: z.string().url().optional()
codeUrl: z.string().url().optional()
```

### Projects 额外字段

```typescript
github: z.string().url().optional()
demo: z.string().url().optional()
status: z.enum(['active', 'archived', 'wip']).default('active')
featured: z.boolean().default(false)
```

---

## 16. 项目目录结构

```
personal-wiki/
│
├── src/
│   ├── content/
│   │   ├── config.ts              ← Content Collections schema
│   │   ├── docs/                  ← Starlight 管理
│   │   │   ├── robotics/
│   │   │   ├── ai/
│   │   │   ├── computer-vision/
│   │   │   ├── robot-learning/
│   │   │   └── engineering/
│   │   ├── papers/
│   │   ├── projects/
│   │   ├── lab/
│   │   └── blog/
│   │
│   ├── components/
│   │   ├── Card.astro
│   │   ├── CardGrid.astro
│   │   ├── TagBadge.astro
│   │   └── VideoEmbed.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro            ← Home
│   │   ├── papers/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── lab/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── tags/
│   │   │   └── [tag].astro
│   │   └── about.astro
│   │
│   └── styles/
│       └── global.css
│
├── public/
│   ├── images/
│   └── assets/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 17. GitHub Actions 部署配置

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - uses: actions/deploy-pages@v4
```

---

## 18. 示例内容（结构模板）

第一版各板块创建以下文件，**内容为结构模板，不需要填写实际内容**：

```
content/docs/ai/understanding-ttt.md         ← Docs 示例
content/papers/openvla.md                    ← Paper 示例
content/projects/robotac.md                  ← Project 示例
content/lab/2026-08-08-dino-grasp.md         ← Lab 示例
content/blog/why-i-built-this-wiki.md        ← Blog 示例
```

---

## 19. MVP P0 检查清单

### 基础架构
- [ ] Astro 项目初始化（含 Starlight、Tailwind CSS）
- [ ] Content Collections schema 定义
- [ ] GitHub Pages 部署配置（`base: '/personal-wiki'`）
- [ ] GitHub Actions 工作流

### 页面
- [ ] Home 首页
- [ ] Docs（Starlight，含侧边栏分类）
- [ ] Papers 列表页 + 文章页
- [ ] Projects 网格页 + 项目页
- [ ] Lab 列表页 + 记录页
- [ ] Blog 列表页 + 文章页
- [ ] About 页面
- [ ] Tags 聚合页

### 功能
- [ ] Dark Mode
- [ ] Responsive Layout（Desktop / Tablet / Mobile）
- [ ] Markdown + MDX 支持
- [ ] 代码高亮（Shiki）
- [ ] LaTeX（KaTeX）
- [ ] 图片支持
- [ ] Pagefind 搜索
- [ ] Tags 系统

### 内容
- [ ] 各板块至少 1 篇结构模板文章

---

## 20. 后续阶段（P1 / P2，不在第一版范围内）

**P1**
- Related Articles
- RSS Feed
- Sitemap + SEO + OpenGraph
- Reading Time
- Previous / Next Article

**P2**
- Paper Citation Graph / Knowledge Graph
- GitHub API 自动同步项目数据
- Interactive Demo
- AI Search
- 评论系统

---

## 21. 核心原则

1. **内容优先**：文章必须独立于页面组件，所有内容存 Markdown 文件。
2. **使用框架能力**：不重复实现 Starlight 已提供的功能。
3. **不过度工程化**：第一版无数据库、无后端、无登录。
4. **扩展性优先**：目录、schema、路由设计支持从 10 篇扩展到 500+ 篇。
5. **Docs 阅读体验是第一优先级**。
