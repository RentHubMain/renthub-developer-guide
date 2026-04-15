---
title: 项目管理
---

本板块覆盖 RentHub 团队的协作规范，包括分支策略、代码提交、Review 流程与发布管理。

## 目录

| 文件 | 内容 |
|------|------|
| [Git 基础入门](/docs/project-mgmt/git-basics) | 零基础理解版本控制、分支、提交与远程操作 |
| [Git 团队协作](/docs/project-mgmt/git-workflow) | 现代 IDE + AI 环境下的分支、提交与 Review 最佳实践 |
| [GitHub Actions 工作流](/docs/project-mgmt/github-actions) | CI/CD 核心概念与文档站部署工作流逐段详解 |
| [RentHub 业务仓库开发工作流](/docs/project-mgmt/renthub-dev-workflow) | 小程序 + 云函数 Monorepo 目录约定、测试命令、Sonar、`Build` CI 与端到端发布链路 |

## 目标

读完本板块，你应当能够：

- 使用 Git 进行版本控制、分支管理与冲突解决
- 理解并遵循 RentHub 的 PR 提交与 Code Review 流程
- 读懂并配置 GitHub Actions CI/CD 工作流
- 独立完成业务仓库从功能开发到生产发布的完整链路

## 核心原则

- 小批量提交，频繁合并，降低冲突概率
- AI 生成的代码与人工编写的代码遵循同等 Review 标准
- 分支与提交信息应清晰传达"做了什么、为什么做"
