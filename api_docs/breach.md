---
title: 违约 (breach)
sidebar_label: 违约
---

> 此模块负责违约记录的创建、查询、统计与过期清理。

---

## 1. 获取当前用户违约记录 [GET]

**接口描述**：分页获取当前用户违约记录列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `breach` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getBreachRecords` |

### 1.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 1.2 响应数据 (Response)

成功时 `data` 含 list、total 等，见 README 2.2 通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 1.4 示例 (Examples)

```json
{
  "action": "getBreachRecords",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 2. 获取当前用户违约统计 [GET]

**接口描述**：获取当前用户违约数量、金额等统计。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `breach` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getBreachStatistics` |

### 2.1 请求参数 (Parameters)

无。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getBreachStatistics",
  "data": {}
}
```

---

## 3. 创建违约记录 [POST]

**接口描述**：由订单或系统触发，创建一条违约记录。多为内部调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `breach` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createBreachRecord` |

### 3.1 请求参数 (Parameters)

见通用约定（含订单、违约类型、金额等）。

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "createBreachRecord",
  "data": {}
}
```

---

## 4. 更新违约记录状态 [POST]

**接口描述**：更新违约记录状态（如已支付、申诉中等）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `breach` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateBreachRecordStatus` |

### 4.1 请求参数 (Parameters)

见通用约定（含 recordId、status 等）。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "updateBreachRecordStatus",
  "data": {}
}
```

---

## 5. 管理端违约统计 [GET]

**接口描述**：管理端获取违约统计。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `breach` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAdminBreachStatistics` |

### 5.1 请求参数 (Parameters)

见通用约定（可选筛选、时间范围等）。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "getAdminBreachStatistics",
  "data": {}
}
```

---

## 6. 清理过期违约记录 [POST]

**接口描述**：清理已过期的违约记录，由定时任务调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `breach` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `cleanupExpiredRecords` |

### 6.1 请求参数 (Parameters)

见通用约定。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "cleanupExpiredRecords",
  "data": {}
}
```
