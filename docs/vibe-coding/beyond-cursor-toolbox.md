---
title: Beyond Cursor：统一AI工具箱
---

前两篇分别讲了 Cursor 的使用方式和内部机制，这一篇往外走一层：当团队已经在 Cursor 里沉淀出稳定约定后，下一步不是把这些规则留在单个客户端里，而是把它们提升成一套跨工具共享的源文件。Rulesync 做的就是这件事。再往下一层，就进入 [Agent Harness：把 AI 变成可控工作流](/docs/vibe-coding/agent-harness) 这一类执行系统。

## 1. 先说痛点：规则漂移

在 Rulesync 之前，跨工具维护规则的典型状态是这样的：

- `.cursor/rules/` 里有一条约定：`API 调用统一加 retry 逻辑，最多重试 3 次`
- 某人换到 Claude Code 工作，这条规则就消失了——因为 Claude Code 的配置在 `CLAUDE.md`，没人手动搬过去
- 某人用 Copilot 改了同一个模块，生成的代码没有 retry，因为 `.github/copilot-instructions.md` 是另一套独立文件
- 两个月后，同一个仓库里有三种不同的错误处理风格，没有人知道"官方约定"在哪里

这不是不自律，而是**工具原生格式分散，没有单一信源**：

| 工具 | 约束文件位置 |
|------|------------|
| Cursor | `.cursor/rules/*.mdc` |
| Claude Code | `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Codex CLI | `AGENTS.md` |

每次更新规范，要手动同步四个地方。这才是问题所在。

## 2. Rulesync 是做什么的

Rulesync 把上面四个地方的"源文件"统一到一个地方：

```
.rulesync/
  rules/        ← 团队规则的唯一来源
  commands/     ← 可复用命令模板
  skills/       ← 可复用技能定义
  mcp.json      ← MCP 配置源文件
  .aiignore     ← 统一忽略规则
  hooks.json    ← Hook 配置
rulesync.jsonc  ← 生成配置，定义目标工具和功能开关
```

你只维护 `.rulesync/` 下的源文件，Rulesync 负责把它们生成为每个工具自己需要的格式。更新一次，四个客户端同步。

**一句话定位：** Rulesync 不是工具，而是 `.rulesync/` 目录——一套可提交、可 review、可追踪的 AI 规范源文件，通过生成器分发给不同客户端。

## 3. 平时怎么用

### 3.1 安装

```bash
npm install -g rulesync
# 或
brew install rulesync

rulesync --version
rulesync --help
```

### 3.2 日常工作流：改一处，同步全部

**核心原则：永远只改 `.rulesync/` 下的源文件，不要直接编辑各工具的生成文件。**

```bash
# 1. 改源文件（例如更新错误处理规范）
vim .rulesync/rules/error-handling.md

# 2. 生成到所有目标工具
rulesync generate --targets "*" --features "*"

# 3. 把源文件和生成结果一起提交
git add .rulesync/ .cursor/rules/ CLAUDE.md .github/copilot-instructions.md
git commit -m "docs(rules): update error handling retry policy"
```

如果只需要更新特定工具或功能：

```bash
# 将 skills 添加到 Copilot
rulesync generate --targets copilot --features skills

# 将 rules 和 MCP 添加到 Claude Code
rulesync generate --targets claudecode --features rules,mcp
```

### 3.3 迁移已有配置

如果你已经在某个工具里手工维护过规则，可以反向导入到 Rulesync，作为 `.rulesync/` 的初始内容：

```bash
rulesync import --targets claudecode
rulesync import --targets cursor
rulesync import --targets copilot
rulesync import --targets claudecode --features rules,mcp,commands,subagents
```

导入后，再用 `generate` 把统一后的版本推回各工具。

### 3.4 新仓库初始化

```bash
rulesync init
rulesync fetch dyoshikawa/rulesync --features skills
```

## 4. 什么时候值得引入 Rulesync？

不是所有团队都需要现在就接入。以下情况说明你已经到了该用它的时候：

- 团队里有超过 1 人，并且不是所有人都用同一个 AI 客户端
- 某条规则在 Cursor 里验证过，但你发现用 Claude Code 或 Copilot 时模型不知道这条约束
- 你发现自己在多个工具的配置文件里维护着"差不多但不完全一致"的规则

如果你还在独自摸索阶段，先在 Cursor 里把规则跑通，再考虑 Rulesync。
