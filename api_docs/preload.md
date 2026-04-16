---
title: 预拉取 (preload)
sidebar_label: 预拉取
---

> 此模块负责小程序冷启动时的数据预拉取，通过 HTTP GET 触发，无 action 路由。

---

## 1. 调用说明

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `preload` |
| **HTTP 路由** | 由微信数据预拉取配置的 URL（GET） |
| **动作类型 (Action)** | 不适用（无 action 路由，`event` 为 HTTP 请求参数） |

- 微信在小程序**冷启动**时向该云函数发起 **GET** 请求，返回字符串（≤256KB），供 `wx.getBackgroundFetchData` 使用。
- 云函数根据请求参数（如 token/code）判断是否带用户身份，返回内容不同：
  - **无用户**：首页首屏资产、分类统计等。
  - **有用户**： additionally 未读数、聊天列表、我的页摘要等。
- 返回格式为 **JSON 字符串**，包含 `assets`、`categories`、`ts`、`error` 等字段；失败时仍返回合法 JSON 带 `error: 'preload_failed'`。
- 详见功能说明：[数据预拉取与本地缓存](https://github.com/RentHubMain/renthub-mini-program/blob/main/docs/functionality_docs/%E6%95%B0%E6%8D%AE%E9%A2%84%E6%8B%89%E5%8F%96%E4%B8%8E%E6%9C%AC%E5%9C%B0%E7%BC%93%E5%AD%98.md)。

---

### 1.1 请求参数 (Parameters)

HTTP GET 查询参数由微信或调用方传入，具体以云函数实现为准（如鉴权 code/token）。无统一 `event.action`。

### 1.2 响应数据 (Response)

成功时返回 JSON 字符串，非标准 `{ success, data }` 形状；字段见上。失败时 JSON 含 `error`。

### 1.3 错误码 (Error Codes)

预拉取返回非标准 `{ success, data }` 形状，失败时通过 JSON 中的 `error` 表示；业务错误码约定见 [通用报错码](common-error-codes.md)。

### 1.4 示例 (Examples)

**HTTP 请求示例**（仅当通过 HTTP 触发时）：

- **Method**：GET
- **URL**：配置的预拉取云函数 HTTP 地址
- **Headers**：按微信或业务要求携带鉴权信息

**callFunction**：若通过 `wx.cloud.callFunction({ name: 'preload', data: event })` 直接调用，`data` 传云函数所需的原始 `event` 参数，无 `action` 字段。
