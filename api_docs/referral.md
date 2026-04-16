---
title: 推荐 (referral)
sidebar_label: 推荐
---

> 此模块负责推荐关系、邀请码、朋友圈分享及推荐奖励发放。

---

## 1. 获取我的推荐码 [GET]

**接口描述**：获取当前用户的推荐码，用于邀请他人。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getReferralCode` |

### 1.1 请求参数 (Parameters)

无。

### 1.2 响应数据 (Response)

成功时返回推荐码等，见 README 2.2 通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 1.4 示例 (Examples)

```json
{
  "action": "getReferralCode",
  "data": {}
}
```

---

## 2. 获取推荐统计 [GET]

**接口描述**：获取邀请人数、奖励等推荐统计。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getReferralStats` |

### 2.1 请求参数 (Parameters)

无。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getReferralStats",
  "data": {}
}
```

---

## 3. 建立推荐关系 [POST]

**接口描述**：被邀请人通过扫码或填写推荐码建立推荐关系。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createReferralRelation` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| referralCode | String | 是 | - | 推荐人的推荐码 | “ABC123” |

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。推荐码无效/已绑定为 RH00602。

### 3.4 示例 (Examples)

```json
{
  "action": "createReferralRelation",
  "data": { "referralCode": "ABC123" }
}
```

---

## 4. 提交朋友圈分享验证 [POST]

**接口描述**：用户提交朋友圈分享截图等验证信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `submitMomentsSharing` |

### 4.1 请求参数 (Parameters)

见通用约定（含截图 fileID 等）。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "submitMomentsSharing",
  "data": {}
}
```

---

## 5. 查询朋友圈分享审核状态 [GET]

**接口描述**：查询当前用户朋友圈分享的审核状态。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMomentsSharingStatus` |

### 5.1 请求参数 (Parameters)

无。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "getMomentsSharingStatus",
  "data": {}
}
```

---

## 6. 发放推荐奖励 [POST]

**接口描述**：被邀请人首单完成时触发，向推荐人发放奖励。系统/内部调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `distributeReward` |

### 6.1 请求参数 (Parameters)

见通用约定（含订单、推荐关系等）。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "distributeReward",
  "data": {}
}
```

---

## 7. 审核朋友圈分享 [POST]

**接口描述**：管理员审核用户提交的朋友圈分享。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `referral` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `verifyMomentsSharing` |

### 7.1 请求参数 (Parameters)

见通用约定（含记录 ID、通过/拒绝等）。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "verifyMomentsSharing",
  "data": {}
}
```
