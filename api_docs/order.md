---
title: 订单 (order)
sidebar_label: 订单
---

> 此模块负责下单、支付、续租、物流、证据与争议及微信/云支付回调。

---

**说明**：微信支付回调、云支付回调通过 `event.type` 识别，不走 action 路由。

---

## 1. 创建订单 [POST]

**接口描述**：租户下单时调用，创建订单并返回订单信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `create` |

### 1.1 请求参数 (Parameters)

见通用约定（含 assetId、租期、地址等），见 README 2.2 通用约定。

### 1.2 响应数据 (Response)

成功时返回 `{ success: true, data?: object }`，含订单号与支付参数等。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。订单相关如 RH00200～RH00218、支付相关如 RH00400～RH00413 等详见该文档。

### 1.4 示例 (Examples)

```json
{
  "action": "create",
  "data": {}
}
```

---

## 2. 取消订单 [POST]

**接口描述**：用户取消未支付或可取消状态的订单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `cancel` |

### 2.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| orderId | String | 是 | - | 订单 ID | “order_xxx” |

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "cancel",
  "data": { "orderId": "order_xxx" }
}
```

---

## 3. 强制取消订单 [POST]

**接口描述**：管理员或系统强制取消订单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `forceCancel` |

### 3.1 请求参数 (Parameters)

见通用约定。

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "forceCancel",
  "data": {}
}
```

---

## 4. 确认取件 [POST]

**接口描述**：租户确认已收到物品。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `confirmPickup` |

### 4.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| orderId | String | 是 | - | 订单 ID | “order_xxx” |

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "confirmPickup",
  "data": { "orderId": "order_xxx" }
}
```

---

## 5. 确认归还 [POST]

**接口描述**：租户确认已归还物品。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `confirmReturn` |

### 5.1 请求参数 (Parameters)

见通用约定。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "confirmReturn",
  "data": {}
}
```

---

## 6. 商家接单 [POST]

**接口描述**：商家接受订单，可设置取件时间等。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `acceptOrder` |

### 6.1 请求参数 (Parameters)

见通用约定。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "acceptOrder",
  "data": {}
}
```

---

## 7. 商家拒单 [POST]

**接口描述**：商家拒绝订单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `rejectOrder` |

### 7.1 请求参数 (Parameters)

见通用约定。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "rejectOrder",
  "data": {}
}
```

---

## 8. 设置取件时间 [POST]

**接口描述**：设置订单取件时间。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `setPickupTime` |

### 8.1 请求参数 (Parameters)

见通用约定。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 8.4 示例 (Examples)

```json
{
  "action": "setPickupTime",
  "data": {}
}
```

---

## 9. 商家确认发货 [POST]

**接口描述**：商家确认已发货。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `confirmShipment` |

### 9.1 请求参数 (Parameters)

见通用约定。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 9.4 示例 (Examples)

```json
{
  "action": "confirmShipment",
  "data": {}
}
```

---

## 10. 商家确认收货（验收） [POST]

**接口描述**：商家确认收货并完成验收，订单完成。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `confirmReceipt` |

### 10.1 请求参数 (Parameters)

见通用约定。

### 10.2 响应数据 (Response)

见通用约定。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 10.4 示例 (Examples)

```json
{
  "action": "confirmReceipt",
  "data": {}
}
```

---

## 11. 获取订单列表 [GET]

**接口描述**：获取订单列表，支持按状态、角色筛选，分页。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getList` |

### 11.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| status | String | 否 | - | 订单状态筛选 | “pending” |
| role | String | 否 | - | 角色：租户/商家 | “lessee” |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 11.2 响应数据 (Response)

成功时 `data` 含 `list`、`total` 等，见通用约定。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 11.4 示例 (Examples)

```json
{
  "action": "getList",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 12. 获取订单详情 [GET]

**接口描述**：根据 orderId 或 orderNo 获取订单详情。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getDetail` |

### 12.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| orderId | String | 否 | - | 订单 ID（与 orderNo 二选一） | “order_xxx” |
| orderNo | String | 否 | - | 订单号 | “ON202601010001” |

### 12.2 响应数据 (Response)

见通用约定。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 12.4 示例 (Examples)

```json
{
  "action": "getDetail",
  "data": { "orderId": "order_xxx" }
}
```

---

## 13. 创建订单支付（微信支付） [POST]

**接口描述**：创建订单支付并返回调起微信支付所需参数。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createPayment` |

### 13.1 请求参数 (Parameters)

见通用约定（含 orderId 等）。

### 13.2 响应数据 (Response)

成功时 `data` 含支付参数，见通用约定。

### 13.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 13.4 示例 (Examples)

```json
{
  "action": "createPayment",
  "data": {}
}
```

---

## 14. 发起订单支付 [POST]

**接口描述**：发起订单支付流程。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `pay` |

### 14.1 请求参数 (Parameters)

见通用约定。

### 14.2 响应数据 (Response)

见通用约定。

### 14.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 14.4 示例 (Examples)

```json
{
  "action": "pay",
  "data": {}
}
```

---

## 15. 使用钱包支付订单 [POST]

**接口描述**：使用用户钱包余额支付订单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `payWithWallet` |

### 15.1 请求参数 (Parameters)

见通用约定。

### 15.2 响应数据 (Response)

见通用约定。

### 15.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 15.4 示例 (Examples)

```json
{
  "action": "payWithWallet",
  "data": {}
}
```

---

## 16. 创建充值支付 [POST]

**接口描述**：创建钱包充值支付（微信支付）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createRechargePayment` |

### 16.1 请求参数 (Parameters)

见通用约定（含金额等）。

### 16.2 响应数据 (Response)

见通用约定。

### 16.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 16.4 示例 (Examples)

```json
{
  "action": "createRechargePayment",
  "data": {}
}
```

---

## 17. 确认充值到账 [POST]

**接口描述**：支付回调后更新钱包余额，确认充值到账。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `confirmRechargePayment` |

### 17.1 请求参数 (Parameters)

见通用约定。

### 17.2 响应数据 (Response)

见通用约定。

### 17.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 17.4 示例 (Examples)

```json
{
  "action": "confirmRechargePayment",
  "data": {}
}
```

---

## 18. 取消充值单 [POST]

**接口描述**：取消未完成的充值单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `cancelRechargePayment` |

### 18.1 请求参数 (Parameters)

见通用约定。

### 18.2 响应数据 (Response)

见通用约定。

### 18.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 18.4 示例 (Examples)

```json
{
  "action": "cancelRechargePayment",
  "data": {}
}
```

---

## 19. 发起提现 [POST]

**接口描述**：用户发起提现申请。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createWithdrawTransfer` |

### 19.1 请求参数 (Parameters)

见通用约定（含金额等）。

### 19.2 响应数据 (Response)

见通用约定。

### 19.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 19.4 示例 (Examples)

```json
{
  "action": "createWithdrawTransfer",
  "data": {}
}
```

---

## 20. 取消提现 [POST]

**接口描述**：取消待处理的提现申请。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `cancelWithdrawTransfer` |

### 20.1 请求参数 (Parameters)

见通用约定。

### 20.2 响应数据 (Response)

见通用约定。

### 20.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 20.4 示例 (Examples)

```json
{
  "action": "cancelWithdrawTransfer",
  "data": {}
}
```

---

## 21. 恢复待处理提现 [POST]

**接口描述**：异常恢复场景下恢复待处理提现。内部/管理员使用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `recoverPendingWithdraws` |

### 21.1 请求参数 (Parameters)

见通用约定。

### 21.2 响应数据 (Response)

见通用约定。

### 21.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 21.4 示例 (Examples)

```json
{
  "action": "recoverPendingWithdraws",
  "data": {}
}
```

---

## 22. 支付商家快递费（钱包） [POST]

**接口描述**：使用钱包支付商家快递费。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `payLessorShippingFee` |

### 22.1 请求参数 (Parameters)

见通用约定。

### 22.2 响应数据 (Response)

见通用约定。

### 22.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 22.4 示例 (Examples)

```json
{
  "action": "payLessorShippingFee",
  "data": {}
}
```

---

## 23. 创建商家快递费支付（微信） [POST]

**接口描述**：创建商家快递费微信支付。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createLessorShippingPayment` |

### 23.1 请求参数 (Parameters)

见通用约定。

### 23.2 响应数据 (Response)

见通用约定。

### 23.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 23.4 示例 (Examples)

```json
{
  "action": "createLessorShippingPayment",
  "data": {}
}
```

---

## 24. 订单退款 [POST]

**接口描述**：对订单发起退款。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `refund` |

### 24.1 请求参数 (Parameters)

见通用约定。

### 24.2 响应数据 (Response)

见通用约定。

### 24.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 24.4 示例 (Examples)

```json
{
  "action": "refund",
  "data": {}
}
```

---

## 25. 获取退款详情 [GET]

**接口描述**：获取某次退款的详情。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getRefundDetail` |

### 25.1 请求参数 (Parameters)

见通用约定。

### 25.2 响应数据 (Response)

见通用约定。

### 25.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 25.4 示例 (Examples)

```json
{
  "action": "getRefundDetail",
  "data": {}
}
```

---

## 26. 查询微信支付订单状态 [GET]

**接口描述**：查询微信支付侧订单状态。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `queryOrder` |

### 26.1 请求参数 (Parameters)

见通用约定。

### 26.2 响应数据 (Response)

见通用约定。

### 26.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 26.4 示例 (Examples)

```json
{
  "action": "queryOrder",
  "data": {}
}
```

---

## 27. 关闭未支付微信订单 [POST]

**接口描述**：关闭未支付的微信支付订单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `closeWeChatOrder` |

### 27.1 请求参数 (Parameters)

见通用约定。

### 27.2 响应数据 (Response)

见通用约定。

### 27.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 27.4 示例 (Examples)

```json
{
  "action": "closeWeChatOrder",
  "data": {}
}
```

---

## 28. 申请续租 [POST]

**接口描述**：租户申请续租。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `requestRenewal` |

### 28.1 请求参数 (Parameters)

见通用约定。

### 28.2 响应数据 (Response)

见通用约定。

### 28.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 28.4 示例 (Examples)

```json
{
  "action": "requestRenewal",
  "data": {}
}
```

---

## 29. 同意续租 [POST]

**接口描述**：商家同意续租申请。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `approveRenewal` |

### 29.1 请求参数 (Parameters)

见通用约定。

### 29.2 响应数据 (Response)

见通用约定。

### 29.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 29.4 示例 (Examples)

```json
{
  "action": "approveRenewal",
  "data": {}
}
```

---

## 30. 拒绝续租 [POST]

**接口描述**：商家拒绝续租申请。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `rejectRenewal` |

### 30.1 请求参数 (Parameters)

见通用约定。

### 30.2 响应数据 (Response)

见通用约定。

### 30.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 30.4 示例 (Examples)

```json
{
  "action": "rejectRenewal",
  "data": {}
}
```

---

## 31. 支付续租费用 [POST]

**接口描述**：支付续租产生的费用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `payRenewal` |

### 31.1 请求参数 (Parameters)

见通用约定。

### 31.2 响应数据 (Response)

见通用约定。

### 31.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 31.4 示例 (Examples)

```json
{
  "action": "payRenewal",
  "data": {}
}
```

---

## 32. 申请提前退租 [POST]

**接口描述**：租户申请提前退租。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `requestEarlyReturn` |

### 32.1 请求参数 (Parameters)

见通用约定。

### 32.2 响应数据 (Response)

见通用约定。

### 32.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 32.4 示例 (Examples)

```json
{
  "action": "requestEarlyReturn",
  "data": {}
}
```

---

## 33. 获取订单物流信息 [GET]

**接口描述**：获取订单关联的物流信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLogistics` |

### 33.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| orderId | String | 是 | - | 订单 ID | “order_xxx” |

### 33.2 响应数据 (Response)

见通用约定。

### 33.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 33.4 示例 (Examples)

```json
{
  "action": "getLogistics",
  "data": { "orderId": "order_xxx" }
}
```

---

## 34. 查询快递价格 [GET]

**接口描述**：查询寄递价格。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `queryDeliveryPrice` |

### 34.1 请求参数 (Parameters)

见通用约定。

### 34.2 响应数据 (Response)

见通用约定。

### 34.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 34.4 示例 (Examples)

```json
{
  "action": "queryDeliveryPrice",
  "data": {}
}
```

---

## 35. 检查是否支持寄递 [GET]

**接口描述**：检查某地址是否支持寄递。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkDeliveryAvailable` |

### 35.1 请求参数 (Parameters)

见通用约定。

### 35.2 响应数据 (Response)

见通用约定。

### 35.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 35.4 示例 (Examples)

```json
{
  "action": "checkDeliveryAvailable",
  "data": {}
}
```

---

## 36. 创建归还快递单 [POST]

**接口描述**：创建归还时的快递单（如顺丰）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createReturnExpressOrder` |

### 36.1 请求参数 (Parameters)

见通用约定。

### 36.2 响应数据 (Response)

见通用约定。

### 36.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 36.4 示例 (Examples)

```json
{
  "action": "createReturnExpressOrder",
  "data": {}
}
```

---

## 37. 上传发货视频 [POST]

**接口描述**：商家上传发货视频证据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `uploadShippingVideo` |

### 37.1 请求参数 (Parameters)

见通用约定。

### 37.2 响应数据 (Response)

见通用约定。

### 37.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 37.4 示例 (Examples)

```json
{
  "action": "uploadShippingVideo",
  "data": {}
}
```

---

## 38. 上传收货视频 [POST]

**接口描述**：租户上传收货视频证据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `uploadReceivingVideo` |

### 38.1 请求参数 (Parameters)

见通用约定。

### 38.2 响应数据 (Response)

见通用约定。

### 38.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 38.4 示例 (Examples)

```json
{
  "action": "uploadReceivingVideo",
  "data": {}
}
```

---

## 39. 上传归还发货视频 [POST]

**接口描述**：租户上传归还发货视频证据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `uploadReturnShippingVideo` |

### 39.1 请求参数 (Parameters)

见通用约定。

### 39.2 响应数据 (Response)

见通用约定。

### 39.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 39.4 示例 (Examples)

```json
{
  "action": "uploadReturnShippingVideo",
  "data": {}
}
```

---

## 40. 上传验收视频 [POST]

**接口描述**：商家上传验收视频证据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `uploadAcceptanceVideo` |

### 40.1 请求参数 (Parameters)

见通用约定。

### 40.2 响应数据 (Response)

见通用约定。

### 40.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 40.4 示例 (Examples)

```json
{
  "action": "uploadAcceptanceVideo",
  "data": {}
}
```

---

## 41. 提交争议 [POST]

**接口描述**：用户提交订单争议。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `submitDispute` |

### 41.1 请求参数 (Parameters)

见通用约定。

### 41.2 响应数据 (Response)

见通用约定。

### 41.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 41.4 示例 (Examples)

```json
{
  "action": "submitDispute",
  "data": {}
}
```

---

## 42. 上传争议证据 [POST]

**接口描述**：上传争议相关证据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `uploadDisputeEvidence` |

### 42.1 请求参数 (Parameters)

见通用约定。

### 42.2 响应数据 (Response)

见通用约定。

### 42.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 42.4 示例 (Examples)

```json
{
  "action": "uploadDisputeEvidence",
  "data": {}
}
```

---

## 43. 批量创建模拟订单（测试） [POST]

**接口描述**：批量创建模拟订单，仅测试用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `batchCreateMock` |

### 43.1 请求参数 (Parameters)

见通用约定。

### 43.2 响应数据 (Response)

见通用约定。

### 43.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 43.4 示例 (Examples)

```json
{
  "action": "batchCreateMock",
  "data": {}
}
```

---

## 44. 获取全部订单（管理端） [GET]

**接口描述**：管理端获取全部订单列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAllOrders` |

### 44.1 请求参数 (Parameters)

见通用约定（分页、筛选等）。

### 44.2 响应数据 (Response)

见通用约定。

### 44.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 44.4 示例 (Examples)

```json
{
  "action": "getAllOrders",
  "data": {}
}
```

---

## 45. 清空订单（慎用） [POST]

**接口描述**：清空订单数据，仅测试用，慎用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `order` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `clearAll` |

### 45.1 请求参数 (Parameters)

无。

### 45.2 响应数据 (Response)

见通用约定。

### 45.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 45.4 示例 (Examples)

```json
{
  "action": "clearAll",
  "data": {}
}
```
