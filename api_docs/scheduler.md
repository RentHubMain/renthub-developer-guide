---
title: 定时任务 (scheduler)
sidebar_label: 定时任务
---

> 此模块由云开发定时触发器或管理端调用，执行统计更新、订单自动验收、休眠与违约清理等，通常不从前端直接调用。

---

## 1. 调用说明

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用（定时触发器或 callFunction） |
| **动作类型 (Action)** | `event.action` 指定任务类型 |

详见功能说明：[定时任务配置](https://github.com/RentHubMain/renthub-mini-program/blob/main/docs/functionality_docs/%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E9%85%8D%E7%BD%AE.md)。

---

## 2. 更新全局统计 [POST]

**接口描述**：更新 stats 集合中的全局统计。建议每 10 分钟触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateStats` |

### 2.1 请求参数 (Parameters)

见通用约定；通常由定时触发器传入，见 README 2.2 通用约定。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 2.4 示例 (Examples)

```json
{
  "action": "updateStats",
  "data": {}
}
```

---

## 3. 更新分类统计 [POST]

**接口描述**：更新分类统计。可与 updateStats 同频或合并触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateCategoryStats` |

### 3.1 请求参数 (Parameters)

见通用约定。

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 3.4 示例 (Examples)

```json
{
  "action": "updateCategoryStats",
  "data": {}
}
```

---

## 4. 检查活跃度惩罚 [POST]

**接口描述**：检查所有用户活跃度惩罚。建议每日触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkActivePenalty` |

### 4.1 请求参数 (Parameters)

见通用约定。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 4.4 示例 (Examples)

```json
{
  "action": "checkActivePenalty",
  "data": {}
}
```

---

## 5. 自动验收已归还订单 [POST]

**接口描述**：自动验收超时未验收的已归还订单。建议每 30 分钟。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `autoAcceptOrders` |

### 5.1 请求参数 (Parameters)

见通用约定。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 5.4 示例 (Examples)

```json
{
  "action": "autoAcceptOrders",
  "data": {}
}
```

---

## 6. 自动验收过期订单（别名） [POST]

**接口描述**：与 autoAcceptOrders 同义，别名。建议同频触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `autoAcceptExpiredOrders` |

### 6.1 请求参数 (Parameters)

见通用约定。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 6.4 示例 (Examples)

```json
{
  "action": "autoAcceptExpiredOrders",
  "data": {}
}
```

---

## 7. 归还提醒 [POST]

**接口描述**：到期前 3 天、当天归还提醒。建议每日触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkReturnReminders` |

### 7.1 请求参数 (Parameters)

见通用约定。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 7.4 示例 (Examples)

```json
{
  "action": "checkReturnReminders",
  "data": {}
}
```

---

## 8. 自动确认收货 [POST]

**接口描述**：按业务规则自动确认收货。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `autoConfirmReceipt` |

### 8.1 请求参数 (Parameters)

见通用约定。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 8.4 示例 (Examples)

```json
{
  "action": "autoConfirmReceipt",
  "data": {}
}
```

---

## 9. 自动取消超时未支付订单 [POST]

**接口描述**：自动取消超时未支付订单。建议每 5 分钟。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `autoCancelExpiredPendingOrders` |

### 9.1 请求参数 (Parameters)

见通用约定。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 9.4 示例 (Examples)

```json
{
  "action": "autoCancelExpiredPendingOrders",
  "data": {}
}
```

---

## 10. 检查休眠状态 [POST]

**接口描述**：检查所有用户休眠状态。建议每日触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkDormancy` |

### 10.1 请求参数 (Parameters)

见通用约定。

### 10.2 响应数据 (Response)

见通用约定。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 10.4 示例 (Examples)

```json
{
  "action": "checkDormancy",
  "data": {}
}
```

---

## 11. 清理过期视频证据 [POST]

**接口描述**：清理过期视频证据。建议每日触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `cleanupExpiredVideos` |

### 11.1 请求参数 (Parameters)

见通用约定。

### 11.2 响应数据 (Response)

见通用约定。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 11.4 示例 (Examples)

```json
{
  "action": "cleanupExpiredVideos",
  "data": {}
}
```

---

## 12. 清理过期违约记录 [POST]

**接口描述**：清理过期违约记录。建议每日触发。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `scheduler` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `cleanupExpiredBreachRecords` |

### 12.1 请求参数 (Parameters)

见通用约定。

### 12.2 响应数据 (Response)

见通用约定。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。定时任务失败为 RH00701。

### 12.4 示例 (Examples)

```json
{
  "action": "cleanupExpiredBreachRecords",
  "data": {}
}
```
