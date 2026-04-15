---
title: Vibe Coding 指南
---

本板块记录 RentHub 团队在 AI 辅助开发中的使用约定，涵盖工具选型、模型选择策略及使用规范，帮助团队高效协作并控制 API 成本。

## 目录

| 文件 | 内容 |
|------|------|
| [Cursor 使用指南](/docs/vibe-coding/cursor-guide) | 账号、模型选择、限额配置与 token 控制 |
| [Cursor 核心概念](/docs/vibe-coding/cursor-concepts) | Rules / Skills / Commands / Subagents / MCP 定义与 Best Practice |

## 目标

读完本板块，你应当能够：

- 合理配置 Cursor 的模型选择与额度，有效控制 API 成本
- 理解并运用 Rules、Skills、Commands、MCP 等 AI 辅助开发核心概念
- 在日常开发中高效运用 AI 工具完成需求，减少重复摸索

## 核心原则

- 优先用套餐内额度，仅在真正需要时才切换到高算力模型
- 保持上下文精简，主动控制 token 消耗
- 及时沉淀提示词与工作流，减少重复摸索
