---
title: 商家主页 (seller-home)
sidebar_label: 商家主页
---

> 此模块负责商家主页所需数据：商家公开资料与信任背书统计、在架物品橱窗、服务政策、商家维度评价列表。入口：物品详情页点击商家头像/名称。

---

## 1. 获取商家公开资料 [GET]

**接口描述**：根据商家 openid 获取其公开资料与信任背书数据，用于商家主页 Header 区（星级、实名勋章、累计出租单数、24h 内确认率、好评率）及服务政策区（验收标准、租汇保标识）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMerchantProfile` |

### 1.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ownerId | String | 是 | - | 商家 openid | “oXXXX” |

### 1.2 响应数据 (Response)

成功时返回商家公开资料与统计，形状见 `shared/contracts/merchantHome.js` 中 `MerchantProfile`。

| 字段名 | 类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| success | Boolean | 是否成功 | true |
| data | Object | 商家资料 | - |
| data.ownerId | String | 商家 openid | “oXXXX” |
| data.name | String | 展示名称 | “小明” |
| data.avatar | String | 头像 URL | “https://...” |
| data.starLevel | Number | 信用星级 | 4.8 |
| data.isVerified | Boolean | 是否实名认证 | true |
| data.totalRentalCount | Number | 累计出租单数 | 120 |
| data.confirmWithin24hRate | Number\|null | 24h 内确认率 0～1 | 0.95 |
| data.goodReviewRate | Number\|null | 好评率 0～1 | 0.98 |
| data.acceptanceStandard | String | 验收标准简述（可选） | “需开箱视频...” |
| data.hasRentHubInsurance | Boolean | 是否租汇保认证（可选） | true |

### 1.3 错误码 (Error Codes)

通用错误见 [通用报错码](common-error-codes.md)。本接口特有：

| 错误码 | 描述 | 解决方案 |
| :--- | :--- | :--- |
| RH00100 | 商家信息不存在 | 检查 ownerId 是否有效、用户是否存在 |

### 1.4 示例 (Examples)

**Request Body (Cloud Function):**

```json
{
  "action": "getMerchantProfile",
  "data": {
    "ownerId": "oXXXX"
  }
}
```

---

## 2. 获取商家在架物品列表 [GET]

**接口描述**：分页获取某商家的在架物品列表，支持按分类筛选，用于商家主页物品橱窗区。返回字段与首页卡片展示一致：缩略图、标题、分类、地址、日租金、押金相关、星级与评价数、可租/已租出状态。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `asset` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMerchantAssets` |

### 2.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ownerId | String | 是 | - | 商家 openid | “oXXXX” |
| category | String | 否 | - | 分类筛选（数码、家电、户外等） | “数码” |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 10 | 每页条数 | 10 |

### 2.2 响应数据 (Response)

成功时返回物品列表及总数，形状见 `shared/contracts/merchantHome.js` 中 `GetMerchantAssetsResponse`、`MerchantAssetItem`。

| 字段名 | 类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| success | Boolean | 是否成功 | true |
| data | Array | 物品列表 | - |
| total | Number | 总条数 | 5 |

单条物品字段：_id、title、images、category、price、priceUnit、originalPrice、status（available/rented）、location（脱敏地址）、rating（星级，缺省 0）、reviewCount（评价数，缺省 0）。

### 2.3 错误码 (Error Codes)

通用错误见 [通用报错码](common-error-codes.md)。参数缺少 ownerId 为 RH00002。

### 2.4 示例 (Examples)

**Request Body (Cloud Function):**

```json
{
  "action": "getMerchantAssets",
  "data": {
    "ownerId": "oXXXX",
    "category": "数码",
    "page": 1,
    "pageSize": 10
  }
}
```

---

## 3. 获取商家维度评价列表 [GET]

**接口描述**：分页获取某商家名下物品收到的评价列表，用于商家主页用户互动与评价区（真实追评）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `review` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMerchantReviews` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ownerId | String | 是 | - | 商家 openid | “oXXXX” |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 10 | 每页条数 | 10 |

### 3.2 响应数据 (Response)

成功时返回评价列表，形状见 `shared/contracts/merchantHome.js` 中 `GetMerchantReviewsResponse`、`MerchantReviewItem`。

| 字段名 | 类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| success | Boolean | 是否成功 | true |
| data | Array | 评价列表 | - |
| total | Number | 总条数或当页条数 | 10 |

单条评价字段：id、name、avatar、rating、time、content、assetId、assetTitle（可选）。

### 3.3 错误码 (Error Codes)

通用错误见 [通用报错码](common-error-codes.md)。参数缺少 ownerId 为 RH00002。

### 3.4 示例 (Examples)

**Request Body (Cloud Function):**

```json
{
  "action": "getMerchantReviews",
  "data": {
    "ownerId": "oXXXX",
    "page": 1,
    "pageSize": 10
  }
}
```
