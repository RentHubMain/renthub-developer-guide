---
title: 新手任务 (newbie)
sidebar_label: 新手任务
---

> 此模块负责新手任务与破土计划的进度、奖励与过期检测。

---

所有 action 均需登录（依赖 `cloud.getWXContext().OPENID`）。

---

## 1. 获取新手任务列表 [GET]

**接口描述**：获取当前用户新手任务列表，含任务状态、奖励等。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getNewbieTasks` |

### 1.1 请求参数 (Parameters)

无。

### 1.2 响应数据 (Response)

成功时返回任务列表及完成状态，见 README 2.2 通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。未登录时为 RH00001。

### 1.4 示例 (Examples)

```json
{
  "action": "getNewbieTasks",
  "data": {}
}
```

---

## 2. 检测并发放任务奖励 [POST]

**接口描述**：当任务完成条件满足时，检测并发放任务奖励。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkAndAwardTask` |

### 2.1 请求参数 (Parameters)

见通用约定（如 taskId 或由业务自动检测）。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "checkAndAwardTask",
  "data": {}
}
```

---

## 3. 检查任务过期 [POST]

**接口描述**：检查新手任务是否过期，可由定时任务或进入页时调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkTaskExpiration` |

### 3.1 请求参数 (Parameters)

见通用约定。

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "checkTaskExpiration",
  "data": {}
}
```

---

## 4. 获取破土计划进度 [GET]

**接口描述**：获取破土计划进度，可传 role（租户/商家）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getBreakthroughProgress` |

### 4.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| role | String | 否 | - | 角色：租户/商家 | “lessee” |

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "getBreakthroughProgress",
  "data": { "role": "lessee" }
}
```

---

## 5. 检测破土是否完成 [POST]

**接口描述**：检测破土计划是否达成（如完成 3 单等）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkBreakthroughCompletion` |

### 5.1 请求参数 (Parameters)

见通用约定。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "checkBreakthroughCompletion",
  "data": {}
}
```

---

## 6. 处理破土失败 [POST]

**接口描述**：处理破土计划失败（超时、中断等）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `handleBreakthroughFailure` |

### 6.1 请求参数 (Parameters)

见通用约定。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "handleBreakthroughFailure",
  "data": {}
}
```

---

## 7. 检查破土计划是否过期 [POST]

**接口描述**：检查破土计划是否过期（如 90 天未完成）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `newbie` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkBreakthroughExpiration` |

### 7.1 请求参数 (Parameters)

见通用约定。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "checkBreakthroughExpiration",
  "data": {}
}
```
