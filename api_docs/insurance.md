---
title: 保险 (insurance)
sidebar_label: 保险
---

> 此模块负责理赔提交、审核、补偿计算与打款。

---

## 1. 提交理赔申请 [POST]

**接口描述**：用户提交理赔申请，传入订单、原因、证据等。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `submitClaim` |

### 1.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| orderId | String | 是 | - | 订单 ID | “order_xxx” |
| reason | String | 是 | - | 理赔原因 | “损坏” |
| evidence | Array | 否 | - | 证据（图片 fileID 等） | [] |

其余见 README 2.2 通用约定。

### 1.2 响应数据 (Response)

成功时返回理赔单 ID 等，见通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。理赔相关如 RH00502 等详见该文档。

### 1.4 示例 (Examples)

```json
{
  "action": "submitClaim",
  "data": { "orderId": "order_xxx", "reason": "损坏" }
}
```

---

## 2. 获取我的理赔列表 [GET]

**接口描述**：获取当前用户提交的理赔列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMyClaims` |

### 2.1 请求参数 (Parameters)

见通用约定（可选分页、状态）。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getMyClaims",
  "data": {}
}
```

---

## 3. 获取理赔列表（管理端） [GET]

**接口描述**：管理端获取全部或筛选后的理赔列表。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getClaimList` |

### 3.1 请求参数 (Parameters)

见通用约定（分页、状态筛选等）。

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "getClaimList",
  "data": {}
}
```

---

## 4. 获取理赔详情 [GET]

**接口描述**：根据 claimId 获取理赔详情。管理端或用户本人。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getClaimDetail` |

### 4.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| claimId | String | 是 | - | 理赔单 ID | “claim_xxx” |

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "getClaimDetail",
  "data": { "claimId": "claim_xxx" }
}
```

---

## 5. 审核理赔 [POST]

**接口描述**：管理员审核理赔，通过或拒绝。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `reviewClaim` |

### 5.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| claimId | String | 是 | - | 理赔单 ID | “claim_xxx” |
| result | String | 是 | - | 通过/拒绝 | “approve” |
| remark | String | 否 | - | 备注 | - |

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "reviewClaim",
  "data": { "claimId": "claim_xxx", "result": "approve" }
}
```

---

## 6. 计算理赔金额 [POST]

**接口描述**：按折旧等规则计算理赔补偿金额。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `calculateCompensation` |

### 6.1 请求参数 (Parameters)

见通用约定（含 claimId、物品信息等）。

### 6.2 响应数据 (Response)

见通用约定（含计算后的金额）。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "calculateCompensation",
  "data": {}
}
```

---

## 7. 处理理赔打款 [POST]

**接口描述**：将理赔款打款到用户。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `insurance` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `processPayment` |

### 7.1 请求参数 (Parameters)

见通用约定（含 claimId 等）。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "processPayment",
  "data": {}
}
```
