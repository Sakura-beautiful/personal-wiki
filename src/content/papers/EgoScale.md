---
title: "EgoScale: Scaling Dexterous Manipulation with Egocentric Human Video Pretraining"
description: "利用大规模第一视角人类操作视频预训练，通过极少量机器人数据完成具身对齐，实现复杂灵巧操作能力迁移的三阶段训练范式。"
authors: "EgoScale Team"
date: 2026-07-01
tags:
  - RobotLearning
  - DexterousManipulation
  - Embodiment
---
# 1. 项目背景

传统灵巧操作策略主要依赖机器人遥操作数据进行训练，但高自由度灵巧手的数据采集成本极高，且任务覆盖范围有限。相比之下，人类每天都在进行大量复杂的手部操作行为，因此利用人类示教数据训练机器人策略成为近年来机器人基础模型的重要研究方向。

然而，人类与机器人之间存在明显的 embodiment gap（具身差异）：

- 人手自由度远高于多数机器人手；
    
- 人类示教通常缺乏机器人动作标签；
    
- 人类视频中的相机运动与机器人视角差异较大；
    
- 人类动作无法直接映射到机器人控制空间。
    

EgoScale 的核心目标是：

> 利用海量第一视角人类操作视频学习通用操作先验，再通过极少量机器人数据完成具身对齐，从而实现复杂灵巧操作能力的迁移。

整个方法验证了一个重要结论：

> **灵巧操作的人类到机器人迁移本质上是一个 Scaling Problem。**

---

# 2. 整体框架

EgoScale 采用三阶段训练流程：

```text
Stage 1:
20,854 小时第一视角人类视频预训练

        ↓

Stage 2:
50 小时 Human Play + 4 小时 Robot Play 中间对齐训练

        ↓

Stage 3:
少量任务示教微调
```

整体流程如下：

```text
Egocentric Human Video
        ↓
SLAM + Hand Pose Estimation
        ↓
Wrist Motion Extraction
        ↓
Hand Retargeting
        ↓
Human Action Sequence
        ↓
Flow-based VLA Pretraining
        ↓
Human-Robot Mid-training
        ↓
Robot Task Fine-tuning
```

核心思想可以总结为：

> 大规模数据负责学习操作知识，小规模机器人数据负责学习机器人身体。

---

# 3. 人类动作表示方法

## 3.1 原始输入数据

每条人类示教数据包含：

- 第一视角 RGB 视频
    
- 相机位姿
    
- 人手关键点
    
- 文本任务描述
    

定义：

世界坐标系：

$$  
\mathcal{F}_w  
$$

相机坐标系：

$$  
\mathcal{F}_c^t  
$$

相机位姿表示为：
该矩阵表示为相机坐标系相对于世界坐标系的变换矩阵

$$  
T_{w\leftarrow c}^{t}\in SE(3)  
$$

人手关键点表示为：
该矩阵表示第i个关键点在相机坐标系下的位置

$$  
H_{c,i}^{t}\in SE(3)  
$$

其中：

- (i=1) 表示手腕
    
- 共 21 个关键点
    

---

## 3.2 手腕运动表示

首先计算世界坐标系下的手腕位姿：
相机坐标系下的手腕位姿用变换矩阵放到世界坐标系下

$$  
W_w^t=T_{w\leftarrow c}^{t}H_{c,1}^{t}  
$$

直接使用绝对位姿会受到头部运动影响，因此论文采用相对运动表示：

$$  
\Delta W_t=  
(W_w^0)^{-1}W_w^t  
$$
该公式的详细解释如下，这里原文中的符号表示有些混乱：
世界：
$$A=W$$
初始手：
$$B=H_0$$
当前手：
$$C=H_t$$
得到：
$${}^{H_0}T_{H_t} = ({}^WT_{H_0})^{-1} {}^WT_{H_t}$$
求相对运动即为求某一时刻的手部位姿相对于初始时刻的手部位姿变动了多少。

该表示具有以下优点：

- 消除相机运动影响；
    
- 与机器人末端控制天然一致；
    
- 不依赖具体机械臂结构；
    
- 易于跨机器人迁移。
    

实际上机器人控制空间也采用相同形式：

$$  
a_{arm}=\Delta x,\Delta y,\Delta z,\Delta R  
$$

因此实现了 Human-Robot Action Alignment。

---

## 3.3 灵巧手动作表示

人手关键点并不直接作为监督信号，而是被重定向到机器人关节空间。

输入：

- 21 个人手关键点
    

输出：

- Sharpa 灵巧手 22 个关节角
    

即：
$$  
q_{hand} = [q_1,q_2,...,q_{22}]  
$$
优化目标：
$$  
q^* = \arg\min_q L(q)  
$$

其中损失函数由多个部分组成：

$$  
L=  
\lambda_pL_{pos}  
+  
\lambda_rL_{rot}  
+  
\lambda_sL_{smooth}  
$$

其中：

位置误差：
$$  
L_{pos} = \sum_i \|p_i^{robot}(q)-p_i^{human}\|^2  
$$
姿态误差：
$$  
L_{rot} = \sum_i \|R_i^{robot}(q)-R_i^{human}\|^2  
$$
平滑约束： 
$$  
L_{smooth} = \|q_t-q_{t-1}\|^2  
$$
同时满足机器人关节约束：
$$  
q_{min}\le q \le q_{max}  
$$
最终使用 IPOPT 求解器进行优化。

---

# 4. 数据处理流程

## 4.1 第一阶段预训练数据

总数据规模：

$$  
20854\ hours  
$$

其中包含：

- 9869 个场景
    
- 6015 个任务
    
- 43237 个物体
    

覆盖：

- 家庭环境
    
- 工业环境
    
- 教育场景
    
- 商业场景
    
- 维修场景
    
- 零售场景
    

全部视频均为：

```text
30 FPS
Egocentric RGB Video
```

随后通过离线算法提取：

```text
RGB Video
    ↓
SLAM
    ↓
Camera Pose

RGB Video
    ↓
Hand Pose Estimation
    ↓
3D Hand Keypoints
```

虽然标签噪声较大，但论文发现：

> 数据规模远比标签精度更加重要。

---

## 4.2 EgoDex 数据

为了提高动作监督质量，作者额外加入：

EgoDex 数据集：

- 829 小时
    
- Apple Vision Pro 采集
    
- 高精度手部追踪
    

主要作用：

- 提供高质量运动监督；
    
- 稳定训练过程；
    
- 减少噪声影响。
    

---

## 4.3 Mid-training 数据

用于完成 Human-Robot Alignment。

数据规模：

|数据类型|时长|
|---|---|
|Human Play|50 h|
|Robot Play|4 h|

包含：

- 344 个桌面任务
    
- 每个任务约 30 条人类轨迹
    
- 每个任务约 5 条机器人轨迹
    

采集设备：

- Vive Tracker
    
- Manus Glove
    
- Head Camera
    
- Wrist Camera
    

该阶段的核心目标：

$$  
P(a_h|o_h)  
\rightarrow  
P(a_r|o_r)  
$$

即：

将人类动作表示映射到机器人控制空间。

---

# 5. 模型结构

EgoScale 采用 Flow-based VLA 架构。

输入：

$$  
o_t=(I_t,l_t)  
$$

其中：

- (I_t)：图像
    
- (l_t)：语言指令
    

编码后得到：

$$  
\phi_t=f(I_t,l_t)  
$$

随后输入 DiT Action Expert：

$$  
a_{t:t+H} = \pi_\theta(\phi_t,q_t)  
$$

输出未来动作序列：

$$  
a_{t:t+H} = [a_t,a_{t+1},...,a_{t+H}]  
$$

其中：

动作由两部分组成：

$$  
a_t=  
[a_{wrist},a_{hand}]  
$$

即：

$$  
a_t=  
[  
\Delta W_t,  
q_t^{hand}  
]  
$$

---

# 6. Flow Matching 训练目标

模型采用 Flow Matching 而非传统 Diffusion。

设：

真实动作：

$$  
x_1  
$$

噪声动作：

$$  
x_0  
$$

插值过程：

$$  
x_t=(1-t)x_0+tx_1  
$$

目标速度场：

$$  
u_t=x_1-x_0  
$$

模型预测：

$$  
v_\theta(x_t,t,c)  
$$

训练损失：

$$  
L_{FM} = E\left[\|v_\theta(x_t,t,c)-u_t\|^2\right]  
$$

其中：

$$  
c=(I,l,q)  
$$

表示视觉、语言以及机器人状态条件。

---

# 7. 三阶段训练策略

## Stage 1：Human Pretraining

训练数据：

$$  
20854h  
$$

训练参数：

|参数|数值|
|---|---|
|GPU|256 × GB200|
|Batch Size|8192|
|Learning Rate|5e-5|
|Steps|100k|

此阶段：

- 解冻全部参数；
    
- 学习人类操作先验。
    

---

## Stage 2：Human-Robot Mid-training

训练参数：

|参数|数值|
|---|---|
|Batch Size|2048|
|Learning Rate|3e-5|
|Steps|50k|

冻结：

- Vision Language Backbone
    

训练：

- Vision Encoder
    
- DiT Action Expert
    

作用：

> 将人类知识映射到机器人控制空间。

---

## Stage 3：Task Post-training

训练参数：

|参数|数值|
|---|---|
|Batch Size|512|
|Learning Rate|3e-5|
|Steps|10k|

利用少量机器人示教完成任务适配。

---

# 8. Scaling Law

论文最大的发现之一是：

人类数据规模与验证损失之间满足对数线性关系：

$$  
L = 0.024 - 0.003\ln(D)  
$$

其中：

- (L) 为 Human Validation Loss
    
- (D) 为人类数据小时数
    

拟合结果：

$$  
R^2=0.9983  
$$

说明：

随着数据规模增加：

```text
Human Data ↑
        ↓
Validation Loss ↓
        ↓
Robot Success Rate ↑
```

即：

$$  
D \uparrow  
\Rightarrow  
L \downarrow  
\Rightarrow  
R_{robot}\uparrow  
$$

这也是本文最核心的贡献：

> 人类数据可以像互联网文本训练大语言模型一样，用于训练机器人基础模型。

---

# 9. 实验结论

论文最终验证了几个重要结论：

1. 大规模人类预训练比纯机器人训练效果提升超过 54%。
    
2. Human Validation Loss 可以预测真实机器人性能。
    
3. 少量 Mid-training 数据即可实现 One-shot Skill Transfer。
    
4. 学到的操作能力能够迁移到不同机器人平台。
    
5. 高自由度手部动作监督明显优于 Wrist-only 表示。
    

---

# 10. 总结

EgoScale 提出了目前最完整的大规模 Human-to-Robot 灵巧操作训练范式：

$$  
Human Data  
\rightarrow  
Motor Prior  
\rightarrow  
Embodiment Alignment  
\rightarrow  
Robot Skill  
$$

相比传统机器人学习依赖昂贵遥操作数据的方法，EgoScale 证明：

> 人类第一视角视频可以成为未来机器人基础模型最重要的数据来源之一。

这一工作也意味着机器人领域正在逐渐进入类似 NLP 的 Scaling Era：

> 更多的数据 + 更大的模型 + 更少的机器人示教 = 更强的机器人智能。