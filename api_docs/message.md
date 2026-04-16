---
title: 消息 (message)
sidebar_label: 消息
---

> 此模块负责站内信、聊天、未读统计及通知等能力。

---

## 1. 架构说明（统一聊天方案 A）

- **消息列表页双轨**：**顶部**为通知中心（`getMessages` + `digestCategory=order_safety`），仅展示订单进度、待确认/发货、即将到期、钱款安全等强相关提醒，且每条须 **完整正文**（字段见契约 `NotificationDigestItemView` / `UserInboxMessageDoc.content`）；**下方**为私信对话列表，**仅**来自 `getChatList`（`chats`），含租赁私信、平台客服、争议协商、调解会话等，**不与**站内通知混排。私信列表每项形状见契约 `ChatListItemView`。
- **通知中心与数据源**：订单/钱款类提醒主要走 `messages` 集合；租赁与争议相关**对话**统一走 `chats` + `chat_messages`，争议协商与调解线程不再依赖独立存储形态（迁移期见 `docs/api_docs/17-争议.md` 说明）。
- **序号 `seq`**：每条 `chat_messages` 带会话内单调递增 `seq`；客户端发现断档时用 `syncChatMessages` 按 `afterSeq` 补拉。
- **写入路径（迁移中）**：`sendChatMessage` **仅**插入 `chat_messages`（含 `seq`）；`chats` 的 `lastSeq` / `lastMessage` / `lastMessageTime` / `unreadCount` 由**云数据库触发器**在 `chat_messages` 新增后异步更新。迁移步骤：① 控制台为 `chat_messages` 配置 INSERT 触发器 → ② 触发器更新 `chats` 摘要与 unreadCount → ③ 验证稳定后从 `sendChatMessage` 移除同步双写。**不再**向 `messages` 集合写入 `type: chat` 摘要行。消息页私信列表以 `getChatList` 为准；`markChatAsRead` 仍会尝试将历史遗留的 `messages` 中同 `chatId` 未读行标为已读。
- **实时（聊天）**：聊天页对 `chat_messages` 使用 **`where({ chatId })` + `watch()`**（由「拉」变「推」）；`onError` 或基础库无 `watch` 时回退为约 3s 轮询。若推送中发现 **seq 断档**，调用 `syncChatMessages`（`afterSeq`）补拉。
- **实时（通知 + 私信列表）**：消息列表页通过 **双 watch** 替代 5s 轮询：① `db.collection('messages').where({ userId }).watch()` 监听通知变更 → 按 `digestCategory` 分拣到顶部或对应 tab；② `db.collection('chats').where({ participants: _.in([openid]) }).watch()` 监听私信摘要变更 → 刷新下方列表的 `preview` / `unreadCount` / 排序。`onError` 时回退为轮询。见契约 `NotificationRealtimeStrategy`。
- **场景化顶栏**：租赁进行中展示进度条、对方星级、顺丰/京东等物流段 ETA、验收/确认类倒计时；争议调解室支持「和对方 / 和调解员」分线，由 `getChatScenarioContext` 返回锚点与可切换的 `chatId`（见下文 §8.1）。

**契约文件**：`shared/contracts/chat.js`（与 `shared/contracts/common.js` 出参约定一致）

---

## 2. 获取消息列表 [GET]

**接口描述**：分页获取站内信列表，可按类型筛选。消息列表页**顶部通知中心**应使用 **`digestCategory=order_safety`** 单独请求，与下方 `getChatList` 分离；该场景下每条返回须带 **完整正文**（契约 `NotificationDigestItemView.bodyFull` 或与 `content` 对齐的完整字段），不得仅返回省略号摘要。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getMessages` |

### 2.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |
| type | String | 否 | - | 消息类型筛选 | “system” |
| digestCategory | String | 否 | - | `order_safety`：仅订单/钱款安全类，供顶部栏；`general` 或其它扩展值见 `shared/contracts/chat.js` 中 `NOTIFICATION_DIGEST_CATEGORY` | “order_safety” |

### 2.2 响应数据 (Response)

成功时 `data` 含 list、total 等，见 README 2.2 通用约定。当 `digestCategory=order_safety` 时，`list[]` 项建议包含 `bodyFull`（或等价完整 `content`）、`relatedOrderId`、`read`、`createdAt`，供顶部完整展示与跳转。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getMessages",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 3. 单条标已读 [POST]

**接口描述**：将指定消息标为已读，传入 `messageId`。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `markMessageAsRead` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| messageId | String | 是 | - | 消息 ID | “msg_xxx” |

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "markMessageAsRead",
  "data": { "messageId": "msg_xxx" }
}
```

---

## 4. 全部标已读 [POST]

**接口描述**：将全部或按类型消息标为已读。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `markAllAsRead` |

### 4.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| type | String | 否 | - | 按类型，不传则全部 | “system” |

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "markAllAsRead",
  "data": {}
}
```

---

## 5. 获取未读数 [GET]

**接口描述**：获取各类型未读消息数量统计。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getUnreadCount` |

### 5.1 请求参数 (Parameters)

无。

### 5.2 响应数据 (Response)

见通用约定（含各类型未读数）。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "getUnreadCount",
  "data": {}
}
```

---

## 6. 添加消息 [POST]

**接口描述**：系统或客服向用户发送站内信，可指定 `userId`。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `addMessage` |

### 6.1 请求参数 (Parameters)

见通用约定（含 userId、类型、标题、内容等）。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "addMessage",
  "data": {}
}
```

---

## 7. 删除单条消息 [POST]

**接口描述**：删除当前用户的一条站内信。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `deleteMessage` |

### 7.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| messageId | String | 是 | - | 消息 ID | “msg_xxx” |

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "deleteMessage",
  "data": { "messageId": "msg_xxx" }
}
```

---

## 8. 创建或获取会话 [POST]

**接口描述**：按场景创建或获取会话。**租赁私信**（`scene=lease` 或缺省）：依赖 `targetUserId` 与可选 `assetId` 定位双方；与「商家主页联系」和「物品详情联系」**同属 lease**，区别用 **`leaseEntry`** 标明入口（`merchant_home` / `asset_detail` / `order_context`），便于列表副标题、埋点、是否挂订单卡片——**不单独建 scene**，会话去重仍为「双方 + `assetId`（含 null）」唯一。**平台客服**（`scene=platform_support`）：当前用户与平台侧账号的私信线程，`targetUserId` 规则由服务端定义（可省略并由服务端解析唯一客服线程），可选 `supportTopic`。**争议协商**（`scene=dispute_party`）：同一争议同一对用户仅一条协商会话，由 `disputeId` 与权限校验确定当事人，可不传 `targetUserId`（实现可从争议单解析对端）。**调解会话**（`scene=dispute_mediation`）：按 `disputeId` + `threadKey`（`lessee` / `lessor` / `user`）创建或获取「该方 ↔ 平台调解」线路，参与者由服务端解析（含平台侧账号，见功能文档）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createOrGetChat` |

### 8.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| scene | String | 否 | lease | `lease` / `platform_support` / `dispute_party` / `dispute_mediation` | “lease” |
| targetUserId | String | 条件 | - | **lease** 必填对方 openid；**platform_support** 按服务端约定可选 | “oXXXX” |
| assetId | String | 否 | null | 仅 lease：关联物品 ID；null 为通用会话 | “asset_xxx” |
| orderId | String | 否 | - | 可选，租赁会话锚定订单（场景化 UI：进度/物流/倒计时） | “order_xxx” |
| disputeId | String | 条件 | - | **dispute_*** 场景必填 | “dsp_xxx” |
| threadKey | String | 条件 | - | **dispute_mediation** 必填：`lessee` / `lessor` / `user` | “lessee” |
| supportTopic | String | 否 | - | **platform_support** 可选业务分类 | “account” |

### 8.2 响应数据 (Response)

成功时 `data` 含 `chatId`、`targetUserInfo`、`targetRole`、`roleLabel`；可回显 `leaseEntry`；若已实现 seq，可含 `lastSeq`（无消息时为 0）。详见 `shared/contracts/chat.js`（`CHAT_LEASE_ENTRY`）。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。本接口特有：RH00600（不可与自己聊天）、RH00603（场景参数无效或与已有会话冲突）。

### 8.4 示例 (Examples)

**通用会话（商家主页「联系 Ta」，务必带 `leaseEntry`）：**

```json
{
  "action": "createOrGetChat",
  "data": { "targetUserId": "oXXXX", "leaseEntry": "merchant_home" }
}
```

**围绕物品的会话（物品详情「联系 Ta」）：**

```json
{
  "action": "createOrGetChat",
  "data": { "targetUserId": "oXXXX", "assetId": "asset_xxx", "leaseEntry": "asset_detail" }
}
```

**争议协商会话（阶段 2 实现后）：**

```json
{
  "action": "createOrGetChat",
  "data": { "scene": "dispute_party", "disputeId": "dsp_xxx" }
}
```

**调解会话（租户线路，阶段 2 实现后）：**

```json
{
  "action": "createOrGetChat",
  "data": { "scene": "dispute_mediation", "disputeId": "dsp_xxx", "threadKey": "lessee" }
}
```

---

## 9. 获取会话信息 [GET]

**接口描述**：获取指定会话信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getChatInfo` |

### 9.1 请求参数 (Parameters)

见通用约定（含 chatId 等）。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 9.4 示例 (Examples)

```json
{
  "action": "getChatInfo",
  "data": {}
}
```

---

## 10. 1 获取聊天场景化上下文 [GET]

**接口描述**：进入聊天页后拉取**场景化顶栏**所需数据：租赁进行中的订单进度、对方星级、去程/回程物流 ETA、验收/确认倒计时；争议**调解会议室**模式下返回「和对方」与「和调解员」两条线路对应的 `chatId`，供顶部身份切换；并返回是否允许发送图片等策略字段。与 `getChatMessages` 互补（本接口不返回消息列表）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getChatScenarioContext` |

### 10.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| chatId | String | 是 | - | 当前打开的会话 ID | “chat_xxx” |
| disputeRoomFocus | String | 否 | - | 调解室切换意图：`party`（和对方）/ `mediator`（和调解员），与 `shared/contracts/chat.js` 中 `DISPUTE_ROOM_FOCUS` 一致 | “mediator” |

### 10.2 响应数据 (Response)

成功时 `data` 形状见契约 `GetChatScenarioContextResult`：`scenarioUi`（`lease_in_progress` / `dispute_mediation_room` 等）、`lease`（进度/信任/物流/倒计时锚点）、`disputeMediationRoom`（`partyChatId`、`mediationLine`）、`canSendImage` 等。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无权访问会话时同 `RH00604`。

### 10.4 示例 (Examples)

```json
{
  "action": "getChatScenarioContext",
  "data": { "chatId": "chat_xxx", "disputeRoomFocus": "party" }
}
```

---

## 11. 获取聊天记录 [GET]

**接口描述**：分页获取会话内聊天记录。迁移期可同时支持按 `createdAt` 的 `page`/`pageSize` 与按 **`seq`** 的窗口查询；新客户端应优先使用 `afterSeq` / `beforeSeq` 保证顺序一致。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getChatMessages` |

### 11.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| chatId | String | 是 | - | 会话 ID | “chat_xxx” |
| page | Integer | 否 | 1 | 按时间分页（兼容旧客户端） | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |
| afterSeq | Integer | 否 | - | 仅返回 seq 大于该值的消息（升序） | 12 |
| beforeSeq | Integer | 否 | - | 仅返回 seq 小于该值的消息，用于向上翻页 | 100 |
| limit | Integer | 否 | 20 | 与 afterSeq/beforeSeq 联用时的条数上限 | 50 |

### 11.2 响应数据 (Response)

成功时 `data` 为消息数组；每条含 `id`、`seq`、`content`、`isMine`、`senderId`、`time`、`timeText`、`type`；图片消息含 `imageFileIds`（`string[]`）。见 `shared/contracts/chat.js` 中 `ChatMessageView`。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 11.4 示例 (Examples)

```json
{
  "action": "getChatMessages",
  "data": { "chatId": "chat_xxx" }
}
```

---

## 12. 发送聊天消息 [POST]

**接口描述**：在会话中发送文本、图片或结构化卡片（预留）。服务端为消息分配 **`seq`** 并写入 `chat_messages`；`chats` 的摘要与未读计数由 **云数据库触发器异步更新**（迁移期云函数内仍保留同步更新作为兜底，触发器稳定后下线）。不向 `messages` 集合双写聊天摘要。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `sendChatMessage` |

### 12.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| chatId | String | 是 | - | 会话 ID | “chat_xxx” |
| content | String | 条件 | - | 文本内容；纯图片时可空或占位说明 | “你好” |
| messageType | String | 否 | text | `text` / `image` / `structured` | “image” |
| imageFileIds | Array\<String\> | 条件 | - | `messageType=image` 时至少一个云存储 fileID | [“cloud://…”] |
| structuredPayload | Object | 条件 | - | `messageType=structured` 时由契约约定字段 | `{}` |

### 12.2 响应数据 (Response)

成功时 `data` 含新消息 `id`、`seq`、`content`、`isMine`、`senderId`、`time`、`timeText`、`type`、`imageFileIds`（如有）。失败时见错误码 RH00606、RH00607。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 12.4 示例 (Examples)

```json
{
  "action": "sendChatMessage",
  "data": {}
}
```

---

## 13. 会话标已读 [POST]

**接口描述**：将会话内消息标已读，清除未读。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `markChatAsRead` |

### 13.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| chatId | String | 是 | - | 会话 ID | “chat_xxx” |

### 13.2 响应数据 (Response)

见通用约定。

### 13.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 13.4 示例 (Examples)

```json
{
  "action": "markChatAsRead",
  "data": { "chatId": "chat_xxx" }
}
```

---

## 14. 获取会话列表 [GET]

**接口描述**：获取当前用户会话列表（消息页下方「私信对话」列表）。每条可含 `scene`、`disputeId`、`threadKey`、`orderId` 等供前端路由到场景化聊天页。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getChatList` |

### 14.1 请求参数 (Parameters)

见通用约定（可选分页；阶段 2 可补充 `scene` 筛选）。

### 14.2 响应数据 (Response)

成功时 `data` 为 `ChatListItemView[]`，按 `lastMessageTime` 降序。每项含：`chatId`、`targetUserId`、`name`、`avatar`、`preview`、`time`、`timeText`、`unreadCount`、`targetRole`、`roleLabel`、`scene`、`leaseEntry`、`assetId`、`orderId`、`disputeId`、`threadKey`、`lastSeq`、`supportTopic`。见契约 `shared/contracts/chat.js`。

### 14.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 14.4 示例 (Examples)

```json
{
  "action": "getChatList",
  "data": {}
}
```

---

## 15. 按序号补拉聊天记录 [GET]

**接口描述**：当客户端通过 `watch` 或本地缓存发现 **seq 不连续** 时调用，拉取 `(afterSeq, serverLastSeq]` 范围内的消息，与 `getChatMessages` 的 `afterSeq` 语义一致时可合并为同一实现（本条目为契约化动作名，便于前端封装）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `syncChatMessages` |

### 15.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| chatId | String | 是 | - | 会话 ID | “chat_xxx” |
| afterSeq | Integer | 是 | - | 本地已确认的最大 seq | 3 |
| limit | Integer | 否 | 50 | 单次最大条数（服务端可封顶） | 50 |

### 15.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.messages | Array | `ChatMessageView[]`，按 seq 升序 |
| data.serverLastSeq | Number | 服务端当前 `chats.lastSeq` |
| data.hasMore | Boolean | 是否可能仍有未拉取的缺口（达到 limit 时为 true） |

### 15.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 15.4 示例 (Examples)

```json
{
  "action": "syncChatMessages",
  "data": { "chatId": "chat_xxx", "afterSeq": 3, "limit": 50 }
}
```

---

## 16. 发送标准模板通知 [POST]

**接口描述**：按站内信模板发送通知。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `sendNotification` |

### 16.1 请求参数 (Parameters)

见通用约定。

### 16.2 响应数据 (Response)

见通用约定。

### 16.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 16.4 示例 (Examples)

```json
{
  "action": "sendNotification",
  "data": {}
}
```

---

## 17. 批量创建模拟消息（测试） [POST]

**接口描述**：批量创建模拟消息，仅测试用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `batchCreateMock` |

### 17.1 请求参数 (Parameters)

见通用约定。

### 17.2 响应数据 (Response)

见通用约定。

### 17.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 17.4 示例 (Examples)

```json
{
  "action": "batchCreateMock",
  "data": {}
}
```

---

## 18. 清空当前用户消息（慎用） [POST]

**接口描述**：清空当前用户消息，仅测试用，慎用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `message` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `clearAll` |

### 18.1 请求参数 (Parameters)

无。

### 18.2 响应数据 (Response)

见通用约定。

### 18.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 18.4 示例 (Examples)

```json
{
  "action": "clearAll",
  "data": {}
}
```
