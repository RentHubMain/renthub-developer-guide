---
title: 用户 (user)
sidebar_label: 用户
---

> 此模块负责用户资料、钱包、地址、收藏、签到、优惠券及管理端用户相关能力。推荐码与推荐统计已迁移至推荐模块，请使用云函数 `referral`，见 [10-推荐.md](referral.md)。

---

## 1. 注册用户 [POST]

**接口描述**：新用户首次使用时写入 `users` 集合，完成注册。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `register` |

### 1.1 请求参数 (Parameters)

见通用约定；具体字段以云函数实现为准。

### 1.2 响应数据 (Response)

成功时返回 `{ success: true, data?: object }`，见 README 2.2 通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 1.4 示例 (Examples)

**callFunction 入参 data：**

```json
{
  "action": "register",
  "data": {}
}
```

---

## 2. 获取当前用户资料 [GET]

**接口描述**：根据当前登录态获取用户资料，常用于登录态校验与个人页展示。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getProfile` |

### 2.1 请求参数 (Parameters)

见通用约定。

### 2.2 响应数据 (Response)

成功时返回用户资料对象，见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。未登录时为 RH00001。

### 2.4 示例 (Examples)

```json
{
  "action": "getProfile",
  "data": {}
}
```

---

## 3. 更新用户资料 [POST]

**接口描述**：更新当前用户昵称、头像等资料。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateProfile` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| nickname | String | 否 | - | 昵称 | “小明” |
| avatarUrl | String | 否 | - | 头像 URL | - |

### 3.2 响应数据 (Response)

成功时返回更新后的用户信息，见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "updateProfile",
  "data": { "nickname": "小明", "avatarUrl": "https://..." }
}
```

---

## 4. 绑定/更新登录手机号 [POST]

**接口描述**：用户登录成功后绑定或更新手机号。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `bindPhone` |

### 4.1 请求参数 (Parameters)

以云函数实现为准（通常需微信手机号授权 code 或密文）。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "bindPhone",
  "data": {}
}
```

---

## 5. 设置登录密码 [POST]

**接口描述**：为当前账号设置登录密码，需已登录。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `setLoginPassword` |

### 5.1 请求参数 (Parameters)

见通用约定（通常含 password 等）。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "setLoginPassword",
  "data": {}
}
```

---

## 6. 密码登录 [POST]

**接口描述**：使用手机号+密码校验并返回用户信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `loginWithPassword` |

### 6.1 请求参数 (Parameters)

见通用约定（通常含 phone、password）。

### 6.2 响应数据 (Response)

成功时返回用户信息及登录态相关数据。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "loginWithPassword",
  "data": {}
}
```

---

## 7. 查询登录方式绑定情况 [GET]

**接口描述**：查询当前用户手机号、密码等登录方式绑定情况。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLoginBinding` |

### 7.1 请求参数 (Parameters)

无。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "getLoginBinding",
  "data": {}
}
```

---

## 8. 实名认证 [POST]

**接口描述**：调用腾讯云身份核验完成实名认证。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `verify` |

### 8.1 请求参数 (Parameters)

以云函数实现为准（通常含姓名、身份证号等）。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 8.4 示例 (Examples)

```json
{
  "action": "verify",
  "data": {}
}
```

---

## 9. 身份证 OCR [POST]

**接口描述**：识别身份证信息并返回结构化数据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `ocrIdCard` |

### 9.1 请求参数 (Parameters)

以云函数实现为准（通常为图片 fileID 或 URL）。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 9.4 示例 (Examples)

```json
{
  "action": "ocrIdCard",
  "data": {}
}
```

---

## 10. 获取手机号 [POST]

**接口描述**：在用户授权后获取手机号。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getPhoneNumber` |

### 10.1 请求参数 (Parameters)

见通用约定（通常需微信返回的 code 或密文）。

### 10.2 响应数据 (Response)

见通用约定。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 10.4 示例 (Examples)

```json
{
  "action": "getPhoneNumber",
  "data": {}
}
```

---

## 11. 获取钱包信息 [GET]

**接口描述**：获取当前用户钱包余额、可提现金额等。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getWallet` |

### 11.1 请求参数 (Parameters)

无。

### 11.2 响应数据 (Response)

成功时返回钱包对象（含 balance、withdrawable 等），见通用约定。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 11.4 示例 (Examples)

```json
{
  "action": "getWallet",
  "data": {}
}
```

---

## 12. 更新钱包 [POST]

**接口描述**：内部或管理员更新钱包数据，一般不由前端直接调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateWallet` |

### 12.1 请求参数 (Parameters)

见通用约定。

### 12.2 响应数据 (Response)

见通用约定。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 12.4 示例 (Examples)

```json
{
  "action": "updateWallet",
  "data": {}
}
```

---

## 13. 新增钱包流水 [POST]

**接口描述**：内部使用，新增一条钱包流水记录。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `addWalletTransaction` |

### 13.1 请求参数 (Parameters)

见通用约定。

### 13.2 响应数据 (Response)

见通用约定。

### 13.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 13.4 示例 (Examples)

```json
{
  "action": "addWalletTransaction",
  "data": {}
}
```

---

## 14. 获取钱包流水列表 [GET]

**接口描述**：分页获取当前用户钱包流水列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getWalletTransactions` |

### 14.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 14.2 响应数据 (Response)

成功时 `data` 含列表及分页信息，见通用约定。

### 14.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 14.4 示例 (Examples)

```json
{
  "action": "getWalletTransactions",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 15. 获取收货地址列表 [GET]

**接口描述**：获取当前用户收货地址列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAddresses` |

### 15.1 请求参数 (Parameters)

无。

### 15.2 响应数据 (Response)

成功时返回地址列表，见通用约定。

### 15.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 15.4 示例 (Examples)

```json
{
  "action": "getAddresses",
  "data": {}
}
```

---

## 16. 根据 ID 获取单条地址 [GET]

**接口描述**：根据地址 ID 获取单条收货地址。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAddressById` |

### 16.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| addressId | String | 是 | - | 地址 ID | “addr_xxx” |

### 16.2 响应数据 (Response)

见通用约定。

### 16.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 16.4 示例 (Examples)

```json
{
  "action": "getAddressById",
  "data": { "addressId": "addr_xxx" }
}
```

---

## 17. 新增地址 [POST]

**接口描述**：新增一条收货地址。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `addAddress` |

### 17.1 请求参数 (Parameters)

见通用约定（通常含联系人、手机号、省市区、详细地址等）。

### 17.2 响应数据 (Response)

成功时返回新地址 ID 或完整地址对象。

### 17.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 17.4 示例 (Examples)

```json
{
  "action": "addAddress",
  "data": {}
}
```

---

## 18. 更新地址 [POST]

**接口描述**：更新已有收货地址。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateAddress` |

### 18.1 请求参数 (Parameters)

见通用约定（含 addressId 及待更新字段）。

### 18.2 响应数据 (Response)

见通用约定。

### 18.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 18.4 示例 (Examples)

```json
{
  "action": "updateAddress",
  "data": {}
}
```

---

## 19. 删除地址 [POST]

**接口描述**：删除指定收货地址。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `deleteAddress` |

### 19.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| addressId | String | 是 | - | 地址 ID | “addr_xxx” |

### 19.2 响应数据 (Response)

见通用约定。

### 19.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 19.4 示例 (Examples)

```json
{
  "action": "deleteAddress",
  "data": { "addressId": "addr_xxx" }
}
```

---

## 20. 设为默认地址 [POST]

**接口描述**：将指定地址设为默认收货地址。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `setDefaultAddress` |

### 20.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| addressId | String | 是 | - | 地址 ID | “addr_xxx” |

### 20.2 响应数据 (Response)

见通用约定。

### 20.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 20.4 示例 (Examples)

```json
{
  "action": "setDefaultAddress",
  "data": { "addressId": "addr_xxx" }
}
```

---

## 21. 获取我的优惠券列表 [GET]

**接口描述**：获取当前用户优惠券列表，可带状态筛选。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getCoupons` |

### 21.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| status | String | 否 | - | 状态筛选 | “usable” |

### 21.2 响应数据 (Response)

成功时返回优惠券列表，见通用约定。

### 21.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 21.4 示例 (Examples)

```json
{
  "action": "getCoupons",
  "data": {}
}
```

---

## 22. 领取优惠券 [POST]

**接口描述**：用户领取优惠券，传入 `couponId`。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `receiveCoupon` |

### 22.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| couponId | String | 是 | - | 优惠券 ID | “coupon_xxx” |

### 22.2 响应数据 (Response)

见通用约定。

### 22.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 22.4 示例 (Examples)

```json
{
  "action": "receiveCoupon",
  "data": { "couponId": "coupon_xxx" }
}
```

---

## 23. 使用优惠券 [POST]

**接口描述**：下单时扣减优惠券。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `useCoupon` |

### 23.1 请求参数 (Parameters)

见通用约定（通常含 orderId、couponId）。

### 23.2 响应数据 (Response)

见通用约定。

### 23.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 23.4 示例 (Examples)

```json
{
  "action": "useCoupon",
  "data": {}
}
```

---

## 24. 保存用户位置 [POST]

**接口描述**：保存用户经纬度等位置信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `saveLocation` |

### 24.1 请求参数 (Parameters)

见通用约定（通常含 latitude、longitude 等）。

### 24.2 响应数据 (Response)

见通用约定。

### 24.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 24.4 示例 (Examples)

```json
{
  "action": "saveLocation",
  "data": {}
}
```

---

## 25. 获取用户位置 [GET]

**接口描述**：获取已保存的用户位置。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLocation` |

### 25.1 请求参数 (Parameters)

无。

### 25.2 响应数据 (Response)

见通用约定。

### 25.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 25.4 示例 (Examples)

```json
{
  "action": "getLocation",
  "data": {}
}
```

---

## 26. 添加收藏 [POST]

**接口描述**：收藏指定物品，传入 `assetId`。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `addFavorite` |

### 26.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| assetId | String | 是 | - | 物品 ID | “asset_xxx” |

### 26.2 响应数据 (Response)

见通用约定。

### 26.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 26.4 示例 (Examples)

```json
{
  "action": "addFavorite",
  "data": { "assetId": "asset_xxx" }
}
```

---

## 27. 取消收藏 [POST]

**接口描述**：取消对某物品的收藏。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `removeFavorite` |

### 27.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| assetId | String | 是 | - | 物品 ID | “asset_xxx” |

### 27.2 响应数据 (Response)

见通用约定。

### 27.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 27.4 示例 (Examples)

```json
{
  "action": "removeFavorite",
  "data": { "assetId": "asset_xxx" }
}
```

---

## 28. 获取收藏列表 [GET]

**接口描述**：分页获取当前用户收藏的物品列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getFavorites` |

### 28.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 28.2 响应数据 (Response)

成功时 `data` 含列表及分页信息，见通用约定。

### 28.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 28.4 示例 (Examples)

```json
{
  "action": "getFavorites",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 29. 检查是否已收藏某物品 [GET]

**接口描述**：检查当前用户是否已收藏指定物品。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkFavorite` |

### 29.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| assetId | String | 是 | - | 物品 ID | “asset_xxx” |

### 29.2 响应数据 (Response)

见通用约定（通常含 isFavorite: boolean）。

### 29.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 29.4 示例 (Examples)

```json
{
  "action": "checkFavorite",
  "data": { "assetId": "asset_xxx" }
}
```

---

## 30. 签到 [POST]

**接口描述**：每日签到一次，领取奖励。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkIn` |

### 30.1 请求参数 (Parameters)

无。

### 30.2 响应数据 (Response)

见通用约定。

### 30.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 30.4 示例 (Examples)

```json
{
  "action": "checkIn",
  "data": {}
}
```

---

## 31. 获取签到状态 [GET]

**接口描述**：获取今日是否已签到等状态。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getCheckInStatus` |

### 31.1 请求参数 (Parameters)

无。

### 31.2 响应数据 (Response)

见通用约定。

### 31.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 31.4 示例 (Examples)

```json
{
  "action": "getCheckInStatus",
  "data": {}
}
```

---

## 32. 获取当月签到日历 [GET]

**接口描述**：获取当月签到日历数据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMonthCheckIns` |

### 32.1 请求参数 (Parameters)

见通用约定（可选月份等）。

### 32.2 响应数据 (Response)

见通用约定。

### 32.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 32.4 示例 (Examples)

```json
{
  "action": "getMonthCheckIns",
  "data": {}
}
```

---

## 33. 获取用户列表（管理员） [GET]

**接口描述**：管理员获取用户列表，支持按 role 筛选。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAllUsers` |

### 33.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| role | String | 否 | - | 角色筛选 | “lessee” |

### 33.2 响应数据 (Response)

见通用约定。

### 33.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004。

### 33.4 示例 (Examples)

```json
{
  "action": "getAllUsers",
  "data": {}
}
```

---

## 34. 获取用户详情与统计（管理员） [GET]

**接口描述**：管理员获取指定用户详情及统计信息。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getUserDetail` |

### 34.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| userId | String | 是 | - | 用户 ID | “U12345” |

### 34.2 响应数据 (Response)

见通用约定。

### 34.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 34.4 示例 (Examples)

```json
{
  "action": "getUserDetail",
  "data": { "userId": "U12345" }
}
```

---

## 35. 调节用户星级（管理员） [POST]

**接口描述**：管理员调节指定用户星级。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateUserRating` |

### 35.1 请求参数 (Parameters)

见通用约定（含 userId、星级或经验调整等）。

### 35.2 响应数据 (Response)

见通用约定。

### 35.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 35.4 示例 (Examples)

```json
{
  "action": "updateUserRating",
  "data": {}
}
```

---

## 36. 冻结/解冻账户（管理员） [POST]

**接口描述**：管理员冻结或解冻用户账户。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `freezeAccount` |

### 36.1 请求参数 (Parameters)

见通用约定（含 userId、冻结状态等）。

### 36.2 响应数据 (Response)

见通用约定。

### 36.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 36.4 示例 (Examples)

```json
{
  "action": "freezeAccount",
  "data": {}
}
```

---

## 37. 加入/移出黑名单（管理员） [POST]

**接口描述**：管理员将用户加入或移出黑名单。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `blacklist` |

### 37.1 请求参数 (Parameters)

见通用约定（含 userId、操作类型等）。

### 37.2 响应数据 (Response)

见通用约定。

### 37.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 37.4 示例 (Examples)

```json
{
  "action": "blacklist",
  "data": {}
}
```

---

## 38. 校验管理员身份 [GET]

**接口描述**：校验当前用户是否具有管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `verifyAdmin` |

### 38.1 请求参数 (Parameters)

无。

### 38.2 响应数据 (Response)

见通用约定。

### 38.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 38.4 示例 (Examples)

```json
{
  "action": "verifyAdmin",
  "data": {}
}
```

---

## 39. 批量创建模拟用户（测试） [POST]

**接口描述**：批量创建模拟用户，仅测试用。需管理员或测试环境。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `batchCreateMock` |

### 39.1 请求参数 (Parameters)

见通用约定（如数量等）。

### 39.2 响应数据 (Response)

见通用约定。

### 39.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 39.4 示例 (Examples)

```json
{
  "action": "batchCreateMock",
  "data": {}
}
```

---

## 40. 清空所有用户（慎用） [POST]

**接口描述**：清空所有用户数据，仅测试用，慎用。需管理员或测试环境。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `user` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `clearAll` |

### 40.1 请求参数 (Parameters)

无。

### 40.2 响应数据 (Response)

见通用约定。

### 40.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 40.4 示例 (Examples)

```json
{
  "action": "clearAll",
  "data": {}
}
```
