---
title: 评论 (review)
sidebar_label: 评论
---

> 此模块负责创建评价、查询评价列表与物品评分汇总。

---

## 1. 创建评价 [POST]

**接口描述**：用户对订单/物品进行评价，需登录，传入 `assetId`、订单、评分、内容等。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `review` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createReview` |

### 1.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| assetId | String | 是 | - | 物品 ID | “asset_xxx” |
| orderId | String | 是 | - | 订单 ID | “order_xxx” |
| rating | Number | 是 | - | 评分 | 5 |
| content | String | 否 | - | 评价内容 | “很好” |

其余见 README 2.2 通用约定。

### 1.2 响应数据 (Response)

成功时返回评价 ID 等，见通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。重复评价为 RH00601。

### 1.4 示例 (Examples)

```json
{
  "action": "createReview",
  "data": {
    "assetId": "asset_xxx",
    "orderId": "order_xxx",
    "rating": 5,
    "content": "很好"
  }
}
```

---

## 2. 获取物品评价列表 [GET]

**接口描述**：根据 assetId 分页获取物品的评价列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `review` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getReviews` |

### 2.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| assetId | String | 是 | - | 物品 ID | “asset_xxx” |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 2.2 响应数据 (Response)

成功时 `data` 含 list、total 等，见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getReviews",
  "data": { "assetId": "asset_xxx", "page": 1, "pageSize": 20 }
}
```

---

## 3. 获取物品评分汇总 [GET]

**接口描述**：获取物品的平均分、评价数量等汇总信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `review` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAssetRating` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| assetId | String | 是 | - | 物品 ID | “asset_xxx” |

### 3.2 响应数据 (Response)

成功时返回平均分、数量等，见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "getAssetRating",
  "data": { "assetId": "asset_xxx" }
}
```
