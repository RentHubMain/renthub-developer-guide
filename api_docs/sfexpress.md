---
title: 顺丰物流 (sfexpress)
sidebar_label: 顺丰物流
---

> 此模块负责顺丰预下单、下单、路由查询、时效查询及顺丰 HTTP 推送处理。

---

支持 `wx.cloud.callFunction` 与 **HTTP 触发**（顺丰回调）。业务侧调用 callFunction；顺丰推送通过 HTTP 触发，根据 `event.path` / `event.headers` 等自动分发。

---

## 1. 预下单 [POST]

**接口描述**：调用顺丰预下单接口。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用（callFunction） |
| **动作类型 (Action)** | `preOrder` |

### 1.1 请求参数 (Parameters)

见通用约定（收寄件信息等），见 README 2.2 通用约定。

### 1.2 响应数据 (Response)

见通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 1.4 示例 (Examples)

```json
{
  "action": "preOrder",
  "data": {}
}
```

---

## 2. 下单 [POST]

**接口描述**：创建顺丰运单。对应顺丰 [下单接口 EXP_RECE_CREATE_ORDER](https://open.sf-express.com/Api/ApiDetails?level3=393&interName=%E4%B8%8B%E8%AE%A2%E5%8D%95%E6%8E%A5%E5%8F%A3-EXP_RECE_CREATE_ORDER)。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createOrder` |

### 2.1 请求参数 (Parameters)

见通用约定。预约上门取件时间通过以下可选字段传递（格式 `YYYY-MM-DD HH:mm:ss`）：

| 参数 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| sendStartTm | String | 否 | 预约上门取件开始时间。业务侧 setPickupTime 后创建配送单时由 order 云函数传入。 |
| pickupAppointEndTime | String | 否 | 预约上门取件结束时间。 |

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 2.4 示例 (Examples)

```json
{
  "action": "createOrder",
  "data": {}
}
```

---

## 3. 更新订单 [POST]

**接口描述**：更新顺丰订单信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateOrder` |

### 3.1 请求参数 (Parameters)

见通用约定。

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 3.4 示例 (Examples)

```json
{
  "action": "updateOrder",
  "data": {}
}
```

---

## 4. 路由查询 [GET]

**接口描述**：查询运单路由信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `searchRoutes` |

### 4.1 请求参数 (Parameters)

见通用约定（含运单号等）。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 4.4 示例 (Examples)

```json
{
  "action": "searchRoutes",
  "data": {}
}
```

---

## 5. 时效查询 [GET]

**接口描述**：查询顺丰时效。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `searchPromitm` |

### 5.1 请求参数 (Parameters)

见通用约定。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 5.4 示例 (Examples)

```json
{
  "action": "searchPromitm",
  "data": {}
}
```

---

## 6. 派件时效查询 [GET]

**接口描述**：查询派件时效。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `queryDeliverTm` |

### 6.1 请求参数 (Parameters)

见通用约定。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 6.4 示例 (Examples)

```json
{
  "action": "queryDeliverTm",
  "data": {}
}
```

---

## 7. 获取物流信息 [GET]

**接口描述**：内部或前端查询运单轨迹等信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLogisticsInfo` |

### 7.1 请求参数 (Parameters)

见通用约定。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 7.4 示例 (Examples)

```json
{
  "action": "getLogisticsInfo",
  "data": {}
}
```

---

## 8. 注册路由推送 [POST]

**接口描述**：注册顺丰路由推送配置。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `registerRoute` |

### 8.1 请求参数 (Parameters)

见通用约定。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 8.4 示例 (Examples)

```json
{
  "action": "registerRoute",
  "data": {}
}
```

---

## 9. 上传运单照片 [POST]

**接口描述**：上传运单照片。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `sfexpress` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `registerWaybillPicture` |

### 9.1 请求参数 (Parameters)

见通用约定。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。物流相关如 RH00700 等详见该文档。

### 9.4 示例 (Examples)

```json
{
  "action": "registerWaybillPicture",
  "data": {}
}
```

---

## 10. HTTP 推送（顺丰回调）

顺丰通过 HTTP 回调推送以下类型，云函数根据 `event.path` / `event.headers` 等自动识别并分发，**无需前端调用**：

| 类型 | 说明 | 处理逻辑 |
| :--- | :--- | :--- |
| 路由推送 | 运单状态变更 | handleRoutePush |
| 订单状态推送 | 订单状态变更 | handlePushOrderState |
| 费用推送 | 运费等费用 | handleWaybillsFeePush |

由顺丰服务器请求云函数 HTTP 地址，无需在文档中写 callFunction 示例。
