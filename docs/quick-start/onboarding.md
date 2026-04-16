---
title: 新成员上手指南
---

本文面向刚加入 RentHub 团队的开发者，带你从零完成环境配置，直到提交第一个 Pull Request。

---

## 1. 前置条件

开始前，请确认以下账号与权限已就绪：

| 项目         | 说明                                                                  |
| ---------- | ------------------------------------------------------------------- |
| GitHub 账号  | 已加入 [**RentHubMain** 组织](https://github.com/RentHubMain)，并对业务仓库有写权限 |
| Cursor Pro | 已下载并激活，登录状态正常；参见 [Cursor 使用指南](/docs/vibe-coding/cursor-guide)      |
| 微信开发者工具    | 已安装并登录微信账号（含小程序开发权限）                                                |
| Node.js    | 推荐 **Node ≥ 18**，通过 `node -v` 验证                                    |
| Git        | 通过 `git --version` 验证已安装                                            |

链接汇总：

[GitHub 组织](https://github.com/RentHubMain)

[Cursor 下载](https://cursor.com/download)

[微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

[Node.js 下载](https://nodejs.org/en/download)

[Git 下载](https://git-scm.com/)

> 如果尚未获得 GitHub 组织邀请或小程序开发权限，请联系负责人。

---

## 2. 克隆仓库与安装依赖

```bash
# 克隆业务仓库（以实际仓库地址为准）
git clone https://github.com/RentHubMain/<业务仓库名>.git
cd <业务仓库名>

# 安装依赖（使用 ci 命令保持与 lockfile 一致）
npm ci
```

---

## 3. 验证本地环境

```bash
# 运行全量单元测试，确认环境正常
npm test
```

所有用例通过 ✓ 表示本地环境配置正确。若出现报错，先检查 Node 版本和 `npm ci` 是否成功完成。

---

## 4. 了解仓库结构

RentHub 业务仓库采用 Monorepo 布局：

| 目录 | 职责 |
|------|------|
| `miniprogram/` | 微信小程序前端（页面、组件、工具函数） |
| `cloudfunctions/` | 云开发云函数，按业务域拆分 |
| `shared/contracts/` | 前后端共享数据结构与契约 |
| `tests/` | 单元测试、集成测试、E2E 测试 |
| `docs/` | 功能说明与接口文档（中文） |

详细说明见 [RentHub 业务仓库开发工作流](/docs/project-mgmt/renthub-dev-workflow)。

---

## 5. 开发工具配置

### 5.1 在 Cursor 中打开项目

用 Cursor 打开仓库根目录。首次打开时建议：

- 阅读仓库根目录的 `README.md`（如果有）了解项目背景
- 在 Cursor 中选择合适的 AI 模型（日常任务用 Composer 模型，复杂场景再切换）
- 详细模型选择策略参见 [Cursor 使用指南 §3–4](/docs/vibe-coding/cursor-guide)

### 5.2 在微信开发者工具中打开小程序

打开微信开发者工具，选择**导入项目**，路径填写仓库根目录（由 `project.config.json` 自动定位 `miniprogramRoot`）。

---

## 6. 第一次提交流程

按照 RentHub 团队的 Git 协作规范，完整流程如下：

```bash
# 1. 从 main 拉取最新代码，创建功能分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 2. 完成代码改动后，运行测试确认无误
npm test

# 3. 提交代码（使用 /renthub-commit cursor skill）
cursor: /renthub-commit

```

然后在 GitHub 上创建 Pull Request，等待 CI 检查通过后请求 Code Review。

> 分支命名规范与 commit message 格式详见 [Git 协作工作流](/docs/project-mgmt/git-workflow)。

---

## 7. CI 会做什么

PR 提交后，GitHub Actions `Build` 工作流会自动执行：

1. **依赖审查**（仅 PR）：检查新增依赖的安全漏洞
2. **npm audit**：安全扫描
3. **npm test**：单元测试 + 覆盖率
4. **SonarQube 分析**：代码质量检查

所有步骤通过后方可合并。详见 [RentHub 业务仓库开发工作流 §6](/docs/project-mgmt/renthub-dev-workflow#6-github-actions-build-工作流)。

---

## 8. 遇到问题去哪查

| 问题类型 | 参考文档 |
|---------|---------|
| AI 工具使用 / token 消耗 | [Cursor 使用指南](/docs/vibe-coding/cursor-guide) |
| Git 操作不熟悉 | [Git 基础入门](/docs/project-mgmt/git-basics) |
| 分支与协作规范 | [Git 协作工作流](/docs/project-mgmt/git-workflow) |
| 云函数开发 | [腾讯云 CloudBase 入门](/docs/dev-knowledge/cloudbase) |
| 小程序开发 | [微信小程序开发体系](/docs/dev-knowledge/wechat-mini-program) |
| UI 规范 | [界面设计](/docs/ui-design/mini-program) |
| 完整发布流程 | [RentHub 业务仓库开发工作流](/docs/project-mgmt/renthub-dev-workflow) |
