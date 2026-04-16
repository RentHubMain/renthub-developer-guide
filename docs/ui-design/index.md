---
title: 界面设计
---

RentHub 采用统一的设计系统，贯穿小程序、Web 管理后台与官网三个端。本板块提供各端的 UI 设计准则、组件规范与代码示例，帮助开发者在编写界面时保持视觉一致性。三端对应的运行时与仓库布局（`miniprogram/`、`admin/`、`website/` 等）见 [开发知识](/docs/dev-knowledge/) 与 [RentHub 业务仓库开发工作流](/docs/project-mgmt/renthub-dev-workflow)。

## 目录

| 文档 | 适用端 | 说明 |
|---|---|---|
| [小程序 UI 设计](/docs/ui-design/mini-program) | 微信小程序 | rpx 单位体系、原生滚动、安全区域、组件规范 |
| [官网 UI 设计](/docs/ui-design/website) | 官方网站 | 响应式布局、Hero 区、px 单位、断点系统 |
| [Admin Panel UI 设计](/docs/ui-design/admin-panel) | Web 管理后台 | 表格、筛选器、分页、数据展示组件 |

## 目标

读完本板块，你应当能够：

- 理解 RentHub 拟物化设计风格与 60-30-10 色彩规则
- 在小程序、官网、管理后台中编写视觉一致的界面代码
- 正确使用各端的单位体系（rpx / px）和布局规范
- 参照品牌主题色变量与组件规范实现符合设计调性的 UI

## 设计理念

RentHub 的设计系统基于两个核心原则：

**拟物化设计（Neomorphism）**：使用柔和的阴影与渐变营造立体感，让界面元素具有真实的光影质感——凸起的按钮、凹陷的输入框、激活时的绿色光晕。

**60-30-10 色彩规则**：60% 主导色用于背景与主文本，30% 次要色用于卡片与辅助区域，10% 强调色专属于 CTA 按钮与核心高亮。

## 公司主题色

| 变量 | 色值 | 用途 |
|---|---|---|
| `--color-green-dark` | `#3d7c47` | 深绿色，强调、深色变体 |
| `--color-green-light` | `#7cb342` | 浅绿色，主 CTA、成功状态 |
| `--color-blue-dark` | `#2c5f8d` | 深蓝色，信息展示 |
| `--color-blue-light` | `#4a9b8e` | 浅蓝色，次要强调 |
| `--color-brown-dark` | `#8b7355` | 深棕色，装饰性元素 |
| `--color-brown-light` | `#c4a775` | 浅棕色，特殊场景 |
