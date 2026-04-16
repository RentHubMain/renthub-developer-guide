---
title: 争议 (dispute)
sidebar_label: 争议
---

> 此模块实现四级争议解决机制（协商和解 → 平台调解 → 仲裁指引 → 执行），将线下签署流程全面电子化，最大程度减少客服人工介入。

---

## 1. 概览

### 1.1 四级机制

| 级别 | 阶段 | 客服介入 | 说明 |
| :--- | :--- | :--- | :--- |
| L1 | 协商和解 | **零介入** | 双方通过结构化和解方案自行解决，系统推荐方案、自动生成协议 |
| L2 | 平台调解 | 调解员介入 | 金额 ≤ 10,000 元，协商不成时申请，调解免费 |
| L3 | 仲裁/诉讼指引 | **零介入** | 平台仅提供仲裁机构信息、电子模板，实际流程在外部 |
| L4 | 平台执行 | **自动化** | 从钱包/押金自动扣款，信用惩戒 |

### 1.2 入口

| 入口 | 范围 | 说明 |
| :--- | :--- | :--- |
| 订单页「报告问题」 | user_to_user | 待收货 / 租赁中 / 待归还 状态可发起 |
| 我的页「报告问题」 | user_to_user + user_to_platform | user_to_user 需选关联订单 |

### 1.3 电子化替代

| 原规则（线下/纸质） | 电子化方案 |
| :--- | :--- |
| 签署《和解协议》 | 电子协议 + 双方「确认」按钮 |
| 《调解申请表》（手填） | 结构化表单提交 |
| 《调解协议书》（签字盖章） | 电子协议 + 双方确认 + 平台盖章 |
| 《仲裁协议》（手签） | 电子模板生成 + PDF 下载 |
| 《证据清单》（手写） | 从上传证据自动生成 |
| 《答辩书》（手写） | **已取消**；改为调解期与平台**分通道会话**（`scene=dispute_mediation` + `threadKey`，小程序从争议详情进入聊天页） |
| 执行申请书 | 一键申请 + 自动扣款 |

**契约文件**：`shared/contracts/dispute.js`

### 1.4 与统一聊天（方案 A）

- **当事人协商**与**调解期与平台沟通**已全部落在云函数 `message` 的 `chats` + `chat_messages`：`createOrGetChat` 传 `scene: dispute_party` 或 `dispute_mediation`（调解须带 `threadKey`：`lessee` / `lessor` / `user`），详见 [05-消息.md](message.md) 与 `shared/contracts/chat.js`。
- **`dispute.sendDisputeMessage` / `sendMediationThreadMessage` 已停用**，固定返回 **RH00257**；小程序从争议详情进入聊天页，不再写入 `disputes.messages` / `disputes.mediationThreads`。
- **管理端**调解客服发话写入同一套 `chat_messages`（发送者展示为平台调解侧）；管理端详情中的沟通记录由 `dispute_party` 会话 + 原 `disputes.messages`（如 `sendAdminMessage`）合并展示。

---

## 2. 提交争议 [POST]

**接口描述**：用户发起争议，进入 L1 协商阶段。系统根据争议类型自动推荐和解方案、引导举证。

- **云函数名**：`dispute`
- **HTTP 路由**：不适用
- **动作类型 (Action)**：`submitDispute`

### 2.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| scope | String | 是 | - | `user_to_user` / `user_to_platform` | “user_to_user” |
| category | String | 是 | - | 争议大类（见契约 DISPUTE_CATEGORY） | “rental_contract” |
| type | String | 是 | - | 争议类型（见契约 DISPUTE_TYPE） | “item_damage” |
| description | String | 是 | - | 问题描述（10-500字） | “收到的物品屏幕有明显裂痕” |
| orderId | String | 条件 | - | scope=user_to_user 时必填 | “order_abc123” |
| expectedResolution | String | 否 | - | 期望解决方案 | “希望商家更换物品” |
| claimAmount | Number | 否 | - | 索赔金额（分） | 10000 |
| evidence | Array\<EvidenceItem\> | 否 | [] | 初始证据（写入提交方所属 party，每方最多9项，见契约） | 见下方 |
| partyStatement | String | 否 | - | 提交方辩解词（与 description 区分；申请调解前须补全） | “我认为损坏在签收前已存在…” |
| entry | String | 否 | - | `order` / `profile` | “order” |

### 2.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| success | Boolean | true |
| data.disputeId | String | 争议ID |
| data.disputeNo | String | 争议编号 |
| data.suggestedSettlements | Array | 推荐和解方案列表 |
| data.evidenceGuidance | Array\<String\> | 举证引导提示 |
| data.negotiationDeadline | String | 协商截止时间（7工作日后） |

### 2.3 错误码 (Error Codes)

通用错误见 [通用报错码](common-error-codes.md)。本接口特有：

| 错误码 | 描述 |
| :--- | :--- |
| RH00220 | 当前订单状态不允许发起争议 |
| RH00221 | 该订单已有未关闭的争议 |
| RH00222 | 争议类型与大类不匹配 |
| RH00227 | 问题描述至少10个字 |
| RH00228 | 争议范围与大类不匹配 |
| RH00229 | 用户之间争议必须关联订单 |

### 2.4 示例 (Examples)

```json
{
  "action": "submitDispute",
  "data": {
    "scope": "user_to_user",
    "category": "rental_contract",
    "type": "item_damage",
    "description": "收到的物品屏幕有明显裂痕，与商品描述不符",
    "orderId": "order_abc123",
    "claimAmount": 10000,
    "evidence": [
      { "fileId": "cloud://xxx/damage.jpg", "fileType": "image", "description": "屏幕裂痕照片" }
    ],
    "entry": "order"
  }
}
```

---

## 3. 获取我的争议列表 [GET]

**接口描述**：当前用户查看参与的争议列表，支持按范围、状态、阶段筛选。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`getMyDisputes`

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| scope | String | 否 | - | 按范围筛选 | “user_to_user” |
| status | String | 否 | - | 按状态筛选 | “negotiating” |
| phase | String | 否 | - | 按阶段筛选 | “negotiation” |
| page | Number | 否 | 1 | 页码 | 1 |
| pageSize | Number | 否 | 20 | 每页条数 | 20 |

### 3.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.list | Array\<DisputeListItem\> | 列表（含 phase/phaseLabel） |
| data.total | Number | 总数 |

### 3.3 示例 (Examples)

```json
{
  "action": "getMyDisputes",
  "data": { "phase": "negotiation", "page": 1 }
}
```

---

## 4. 获取争议详情 [GET]

**接口描述**：获取单个争议完整信息，包含：阶段进度、订单摘要、双方信息、证据、沟通记录、和解方案历史、电子协议、推荐方案与举证引导。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`getDisputeDetail`

### 4.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |

### 4.2 响应数据 (Response)

完整结构见契约 `DisputeDetail` typedef。关键字段：

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.phase / data.phaseLabel | String | 当前阶段（negotiation/mediation/…） |
| data.proposals | Array\<SettlementProposal\> | 和解方案历史 |
| data.agreement | ElectronicAgreement | 电子协议（如已生成） |
| data.suggestedSettlements | Array | 推荐和解方案模板 |
| data.evidenceGuidance | Array\<String\> | 举证引导 |
| data.negotiationDeadline | String | 协商截止时间 |

### 4.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00223 | 争议不存在 |
| RH00224 | 无权查看 |

---

## 5. 提出和解方案 [POST]

**接口描述**：L1 协商阶段，任一方提出结构化和解方案（替代线下协商）。系统按争议类型推荐方案模板，对方72小时内回应。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`proposeSettlement`

### 5.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | - | 争议ID | “dispute_xyz” |
| type | String | 是 | - | 方案类型（SETTLEMENT_TYPE） | “partial_refund” |
| description | String | 是 | - | 方案描述（1-200字） | “退还50%租金” |
| amount | Number | 否 | - | 涉及金额（分） | 5000 |
| fulfillmentDays | Number | 否 | 7 | 履行期限（天） | 7 |

### 5.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.proposalId | String | 方案ID |
| data.expiresAt | String | 过期时间（72小时后） |

### 5.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00225 | 非协商阶段不可提方案 |

### 5.4 示例 (Examples)

```json
{
  "action": "proposeSettlement",
  "data": {
    "disputeId": "dispute_xyz",
    "type": "partial_refund",
    "description": "退还50%租金作为补偿",
    "amount": 5000,
    "fulfillmentDays": 7
  }
}
```

---

## 6. 回应和解方案 [POST]

**接口描述**：对方对和解方案进行回应（接受/拒绝/反提议）。接受后自动生成电子协议，无需客服介入。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`respondSettlement`

### 6.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID | “dispute_xyz” |
| proposalId | String | 是 | 方案ID | “proposal_abc” |
| action | String | 是 | `accepted` / `rejected` / `countered` | “accepted” |
| rejectReason | String | 条件 | action=rejected 时填写 | “金额不够” |
| counterProposal | Object | 条件 | action=countered 时的反提议 | 同 proposeSettlement 参数 |

### 6.2 响应数据 (Response)

接受时：

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.agreementId | String | 自动生成的电子协议ID |
| data.agreementNo | String | 协议编号 |
| message | String | “和解方案已接受，电子协议已生成” |

### 6.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00230 | 和解方案不存在 |
| RH00231 | 不能回应自己提出的方案 |
| RH00239 | 和解方案已过期 |

---

## 7. 确认电子协议 [POST]

**接口描述**：双方分别确认电子协议（替代纸质签字）。双方均确认后协议生效，争议状态变为已和解/调解达成。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`confirmAgreement`

### 7.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| agreementId | String | 是 | 协议ID |

### 7.2 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00235 | 电子协议不存在 |
| RH00236 | 您已确认此协议 |

---

## 8. 报告违约 [POST]

**接口描述**：电子协议生效后，若一方未在履行期限内履行，另一方可报告违约，触发 L4 执行。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`reportBreach`

### 8.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| agreementId | String | 是 | 协议ID |
| description | String | 是 | 违约说明 |
| evidence | Array\<EvidenceItem\> | 否 | 违约证据 |

---

## 9. 申请平台调解 [POST]

**接口描述**：L1 协商不成时，申请 L2 平台调解。系统自动检查申请条件（已协商、金额 ≤ 10,000元、30日内），生成电子调解申请表。**申请方须事先完成本方举证**：至少 1 张图片证据 + 辩解词达到最短字数（见契约 `MEDIATION_APPLICANT_IMAGE_MIN_COUNT` / `MEDIATION_APPLICANT_STATEMENT_MIN_LENGTH`），否则返回 RH00241。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`requestMediation`

### 9.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID | “dispute_xyz” |
| facts | String | 是 | 争议事实和理由 | “收到物品有裂痕…” |
| requests | Array\<String\> | 是 | 调解请求列表 | [“退还押金500元”, “赔偿损失200元”] |
| evidence | Array\<EvidenceItem\> | 否 | 本请求随附的补充图片证据（合并入申请方 party 后参与校验） | - |
| partyStatement | String | 否 | 申请方辩解词（可与已保存的该方 statement 合并后再校验） | “详见上传照片…” |

### 9.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “调解申请已提交，将在3个工作日内审核” |
| data.reviewDeadline | String | 审核截止时间 |

### 9.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00232 | 争议金额超过调解限额 |
| RH00233 | 已超过调解申请时限 |
| RH00234 | 请先完成协商阶段 |
| RH00241 | 请先完成本方证据（图片+辩解词）后再申请调解 |

### 9.4 示例 (Examples)

```json
{
  "action": "requestMediation",
  "data": {
    "disputeId": "dispute_xyz",
    "facts": "2026年3月1日收到物品后发现屏幕有明显裂痕，与商品描述严重不符…",
    "requests": ["全额退还押金500元", "赔偿运费损失50元"],
    "evidence": [
      { "fileId": "cloud://xxx/crack.jpg", "fileType": "image", "description": "裂痕照片" }
    ]
  }
}
```

---

## 10. 更新本方辩解词 [POST]

**接口描述**：争议关联方更新**本方**举证区的文字辩解（与 `description` 区分）。用于在申请调解前补全 RH00241 所需内容。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`updatePartyStatement`

### 10.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| statement | String | 是 | 本方辩解词 |

### 10.2 错误码 (Error Codes)

通用错误见 [通用报错码](common-error-codes.md)。

---

## 11. 发送调解客服会话消息 [POST]

**接口描述**：调解相关状态下，**租户/商家**与平台客服的**单独会话**中发送文字消息（与 `sendDisputeMessage` 用户↔用户协商区分离）。仅可向**己方**线程发消息。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`sendMediationThreadMessage`

### 11.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| content | String | 是 | 消息内容（1～300 字） |

### 11.2 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00225 | 当前状态不允许（须为调解申请/受理/调解中） |
| RH00224 | 非争议关联方 |

---

## 12. 申请平台执行 [POST]

**接口描述**：电子协议已生效但义务人未履行时，权利人申请平台从钱包/押金自动扣款（≤50,000元）。超额需走法院。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`requestExecution`

### 12.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| agreementId | String | 是 | 协议ID |
| description | String | 是 | 未履行说明 |

### 12.2 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00237 | 执行金额超过平台限额（≤50,000元） |

---

## 13. 发送争议消息 [POST]（已停用）

> **已停用**：双方协商沟通请使用云函数 `message` 的 `sendChatMessage`（`scene: dispute_party`），会话由 `createOrGetChat` 创建；小程序从争议详情进入统一聊天页。详见 [05-消息.md](message.md)。

**接口描述**（历史说明）：原写入 `disputes.messages` 的路径已关闭。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`sendDisputeMessage`

### 13.1 请求参数 (Parameters)

保留字段仅为兼容旧客户端探测；**任意合法参数均返回 RH00257**。

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| content | String | 是 | 消息内容（1-300字） |
| attachments | Array\<EvidenceItem\> | 否 | 附件 |

### 13.2 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00257 | 本接口已停用，请使用 `message.sendChatMessage` 与统一聊天 |

---

## 14. 补充证据 [POST]

**接口描述**：双方在非终态时追加证据（合并后不超过9项）。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`addEvidence`

### 14.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| evidence | Array\<EvidenceItem\> | 是 | 新增证据 |

---

## 15. 撤销争议 [POST]

**接口描述**：提交人在非终态时撤销争议。

- **云函数名**：`dispute`
- **动作类型 (Action)**：`cancelDispute`

### 15.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| reason | String | 否 | 撤销理由 |

---

---

# 管理端接口（admin 云函数）

> 以下接口通过 `admin` 云函数调用，需管理员权限（isAdmin=true）。用于调解委员会受理、调解、关闭争议及紧急措施等。

---

## 16. 管理端获取争议列表 [GET]

**接口描述**：管理员查看全部争议列表，支持多维度筛选。

- **云函数名**：`admin`
- **HTTP 路由**：不适用
- **动作类型 (Action)**：`getDisputeList`

### 16.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| status | String | 否 | “all” | 按状态筛选 | “mediation_pending” |
| phase | String | 否 | - | 按阶段筛选（RESOLUTION_PHASE） | “mediation” |
| scope | String | 否 | - | 按范围筛选 | “user_to_user” |
| keyword | String | 否 | - | 争议编号/订单号模糊搜索 | “RH2026” |
| page | Number | 否 | 1 | 页码 | 1 |
| pageSize | Number | 否 | 20 | 每页条数 | 20 |

### 16.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data | Array\<AdminDisputeListItem\> | 列表项（含双方用户名、阶段、类型文案等） |
| total | Number | 总数 |
| page | Number | 当前页 |
| pageSize | Number | 每页条数 |

### 16.3 示例 (Examples)

```json
{
  "action": "getDisputeList",
  "data": {
    "isAdmin": true,
    "status": "mediation_pending",
    "page": 1,
    "pageSize": 20
  }
}
```

---

## 17. 管理端获取争议详情 [GET]

**接口描述**：管理员查看争议完整信息，包含双方用户信息、订单信息、和解方案历史、调解信息、分边举证与辩解词、用户协商消息、调解双通道会话、紧急措施记录等。

- **云函数名**：`admin`
- **动作类型 (Action)**：`getDisputeDetail`

### 17.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |

### 17.2 响应数据 (Response)

完整结构见契约 `AdminDisputeDetail` typedef。关键字段：

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.disputeNo | String | 争议编号 |
| data.scope / scopeLabel | String | 范围 |
| data.category / categoryLabel | String | 大类 |
| data.type / typeLabel | String | 类型 |
| data.status / statusLabel | String | 状态 |
| data.phase / phaseLabel | String | 阶段 |
| data.lesseeInfo | Object | 租户信息（openid, name, phone, avatar） |
| data.lessorInfo | Object | 商家信息（openid, name, phone, avatar） |
| data.orderInfo | Object | 关联订单信息 |
| data.proposals | Array | 和解方案历史 |
| data.agreement | Object | 电子协议 |
| data.messages | Array | 用户↔用户协商消息 |
| data.partyEvidence | Object | `{ lessee, lessor }` 各方 `statement` + `evidence` |
| data.evidence | Array | 兼容旧版扁平证据 |
| data.mediationInfo | Object | 调解信息（facts, requests, mediatorId, acceptedAt） |
| data.mediationThreads | Object | `{ lessee: [], lessor: [] }` 客服与各方会话 |
| data.emergencyMeasures | Array | 紧急措施记录 |

---

## 18. 管理端受理/驳回调解申请 [POST]

**接口描述**：调解委员会对调解申请进行受理审查（规则第12.1条，3个工作日内）。受理后发送《调解受理通知书》，**不再启动答辩期**；客服通过 `mediationThreads` 与双方沟通。不予受理则退回协商阶段。

- **云函数名**：`admin`
- **动作类型 (Action)**：`acceptMediation`

### 18.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | - | 争议ID | “dispute_xyz” |
| action | String | 是 | - | `accept` / `reject` | “accept” |
| rejectReason | String | 条件 | - | action=reject 时必填 | “争议金额超出范围” |

### 18.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “调解申请已受理” / “调解申请已驳回” |

### 18.3 错误码 (Error Codes)

| 错误码 | 描述 | 解决方案 |
| :--- | :--- | :--- |
| RH00225 | 当前争议状态不允许此操作 | 仅 `mediation_pending` 可受理 |
| RH00250 | 无效的管理操作 | action 仅支持 accept/reject |
| RH00251 | 调解申请已被受理 | 勿重复操作 |

### 18.4 示例 (Examples)

```json
{
  "action": "acceptMediation",
  "data": {
    "isAdmin": true,
    "disputeId": "dispute_xyz",
    "action": "accept"
  }
}
```

---

## 19. 管理端启动调解 [POST]

**接口描述**：调解员启动调解会议（规则第12.4条）。将状态从 `mediation_accepted` 推进为 `mediating`（不依赖答辩流程）。

- **云函数名**：`admin`
- **动作类型 (Action)**：`startMediation`

### 19.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| message | String | 否 | 调解开场说明 |

### 19.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “调解已启动” |

### 19.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00252 | 当前不在调解阶段（需 mediation_accepted） |

---

## 20. 管理端调解达成 [POST]

**接口描述**：调解员制作《调解协议书》（规则第13.1条）。生成电子调解协议（sourceType=mediation），争议状态变为 `mediation_resolved`。

- **云函数名**：`admin`
- **动作类型 (Action)**：`resolveDispute`

### 20.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | - | 争议ID | “dispute_xyz” |
| resolution | String | 是 | - | 调解方案描述 | “甲方退还押金300元” |
| terms | Array\<String\> | 是 | - | 协议条款列表（≤10条） | [“退还押金300元”,“7日内履行”] |
| amount | Number | 否 | - | 涉及金额（分） | 30000 |
| fulfillmentDays | Number | 否 | 7 | 履行期限（天） | 7 |
| penaltyAmount | Number | 否 | - | 违约金（分） | 5000 |
| winner | String | 否 | - | `lessee` / `lessor` / `both` | “lessee” |

### 20.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “争议已调解解决” |
| data.agreementId | String | 生成的电子调解协议ID |
| data.agreementNo | String | 协议编号 |

### 20.3 错误码 (Error Codes)

| 错误码 | 描述 | 解决方案 |
| :--- | :--- | :--- |
| RH00252 | 当前不在调解阶段 | 仅 `mediating` 可调解达成 |
| RH00253 | 调解方案内容不完整 | resolution 和 terms 必填 |
| RH00256 | 协议条款不得超过10条 | 精简条款 |

### 20.4 示例 (Examples)

```json
{
  "action": "resolveDispute",
  "data": {
    "isAdmin": true,
    "disputeId": "dispute_xyz",
    "resolution": "甲方退还押金300元，乙方归还物品",
    "terms": [
      "甲方（商家）在7日内退还押金300元至乙方钱包",
      "乙方（租户）在3日内通过顺丰快递归还物品",
      "运费由甲方承担"
    ],
    "amount": 30000,
    "fulfillmentDays": 7,
    "winner": "lessee"
  }
}
```

---

## 21. 管理端调解不成 [POST]

**接口描述**：调解员制作《调解终结书》（规则第13.2条），标记调解失败。争议状态变为 `mediation_failed`，进入 L3 仲裁/诉讼指引。

- **云函数名**：`admin`
- **动作类型 (Action)**：`failMediation`

### 21.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID | “dispute_xyz” |
| reason | String | 是 | 调解不成原因 | “双方无法在赔偿金额上达成一致” |
| suggestedAction | String | 否 | 建议后续途径 | “建议向成都仲裁委员会申请仲裁” |

### 21.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “调解终结，已向双方发送通知” |

### 21.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00252 | 当前不在调解阶段（需 mediating） |

---

## 22. 管理端关闭争议 [POST]

**接口描述**：管理员在任何活跃状态下强制关闭争议。

- **云函数名**：`admin`
- **动作类型 (Action)**：`closeDispute`

### 22.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 |
| :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID |
| reason | String | 否 | 关闭原因 |

### 22.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “争议已关闭” |

---

## 23. 管理端发送消息 [POST]

**接口描述**：管理员向争议双方（或指定一方）发送系统通知，用于调解安排、举证要求等；持续单方沟通请用「管理端发送调解客服会话消息」。

- **云函数名**：`admin`
- **动作类型 (Action)**：`sendAdminMessage`

### 23.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | - | 争议ID | “dispute_xyz” |
| content | String | 是 | - | 消息内容（1-500字） | “请在3日内补充发货视频证据” |
| messageType | String | 否 | “general” | ADMIN_MESSAGE_TYPE | “request_evidence” |
| targetParties | Array\<String\> | 否 | [“lessee”,“lessor”] | 目标方 | [“lessor”] |

### 23.2 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00255 | 消息内容超过500字限制 |

---

## 24. 管理端发送调解客服会话消息 [POST]

**接口描述**：客服在争议详情中向**租户**或**商家**单独线程发送消息；内容写入统一 `chat_messages`（`scene=dispute_mediation`），**不再**追加 `disputes.mediationThreads`。详情页展示由后端合并聊天与历史字段。

- **云函数名**：`admin`
- **动作类型 (Action)**：`sendMediationThreadMessage`

### 24.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID | “dispute_xyz” |
| thread | String | 是 | `lessee` / `lessor`；`user_to_platform` 争议时用 `user` | “lessee” |
| content | String | 是 | 消息内容（1～500 字） | “请补充签收当天物流截图” |

### 24.2 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00255 | 消息内容超过500字限制 |

---

## 25. 管理端紧急措施 [POST]

**接口描述**：管理员对争议采取紧急措施（规则第32条），包括冻结订单数据、冻结钱包、冻结押金、限制提现、证据保全。

- **云函数名**：`admin`
- **动作类型 (Action)**：`applyEmergencyMeasure`

### 25.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| disputeId | String | 是 | 争议ID | “dispute_xyz” |
| measures | Array\<String\> | 是 | EMERGENCY_MEASURE 值 | [“freeze_wallet”,“freeze_deposit”] |
| reason | String | 是 | 采取措施的理由 | “物品面临灭失风险” |

### 25.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| message | String | “紧急措施已执行” |
| data.appliedMeasures | Array\<String\> | 已执行的措施列表 |

### 25.3 错误码 (Error Codes)

| 错误码 | 描述 |
| :--- | :--- |
| RH00254 | 紧急措施执行失败 |

---

## 26. 管理端争议统计 [GET]

**接口描述**：获取争议管理的统计概览数据，用于管理面板 Dashboard。

- **云函数名**：`admin`
- **动作类型 (Action)**：`getDisputeStats`

### 26.1 请求参数 (Parameters)

无需额外参数。

### 26.2 响应数据 (Response)

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| data.total | Number | 总争议数 |
| data.pendingMediation | Number | 待受理调解数 |
| data.mediating | Number | 调解中数 |
| data.negotiating | Number | 协商中数 |
| data.byStatus | Object | 按状态分布 `{ status: count }` |
| data.byType | Object | 按类型分布 `{ type: count }` |
| data.byPhase | Object | 按阶段分布 `{ phase: count }` |

---

## 27. 附录A：争议分类体系

### 27.1 用户之间 (user_to_user)

| 大类 | 类型 |
| :--- | :--- |
| 租赁合同纠纷 | quality_mismatch, late_return, early_termination, item_damage, item_lost, deposit_refund |
| 交付纠纷 | shipping_delay, missing_items, improper_packaging, receipt_dispute |
| 侵权纠纷 | false_description, privacy_violation, unfair_competition |

### 27.2 用户与平台 (user_to_platform)

| 大类 | 类型 |
| :--- | :--- |
| 服务费争议 | fee_standard, fee_calculation, fee_refund |
| 账户争议 | account_freeze, credit_adjustment, penalty |
| 理赔争议 | claim_rejection, claim_amount, claim_timing |
| 其他服务 | logistics, customer_service, technical |

### 27.3 不适用情形

刑事案件、知识产权争议、人身损害、行政处罚 → 应走外部渠道。

---

## 28. 附录B：状态流转

```
L1 协商和解：
  negotiating → settlement_proposed → settled (接受方案，生成电子协议)
                                    → negotiating (拒绝/反提议)
                                    → mediation_pending (申请调解，升级L2)

L2 平台调解：
  mediation_pending → mediation_accepted (受理，客服分通道沟通)
                    → closed (不予受理)
  mediation_accepted → mediating (调解员启动)
  mediating → mediation_resolved (达成调解协议)
            → mediation_failed (调解不成，可走仲裁指引)

终态：settled / mediation_resolved / mediation_failed / cancelled / closed

任何非终态 → cancelled (提交人撤销)
```

---

## 29. 附录C：违约金计算（规则第38条）

### 29.1 延期归还违约金

| 延期天数 | 费率（× 日租金） |
| :--- | :--- |
| 1-5天 | 105% |
| 6-10天 | 150% |
| 11天及以上 | 500% |

上限：物品原价

### 29.2 逾期发货违约金

| 延迟天数 | 费率（× 日租金） |
| :--- | :--- |
| 1-3天 | 50% |
| 4-7天 | 100% |
| 8天及以上 | 200% |

---

## 30. 附录D：调解条件

| 条件 | 要求 |
| :--- | :--- |
| 前置 | 已尝试 L1 协商 |
| 金额 | ≤ 10,000元 |
| 时限 | 争议发生30日内申请 |
| 费用 | 免费 |
| 审核期 | 3个工作日 |
| 答辩期 | **已取消**（改为客服会话） |
| 调解期 | 7-10个工作日 |
| 总时限 | 30个工作日（复杂案件45个工作日） |

---

---

## 31. 附录E：管理端错误码

| 错误码 | 描述 | 解决方案 |
| :--- | :--- | :--- |
| RH00250 | 无效的管理操作 | action 参数不正确 |
| RH00251 | 调解申请已被受理 | 勿重复受理 |
| RH00252 | 当前不在调解阶段 | 检查争议状态 |
| RH00253 | 调解方案内容不完整 | resolution 和 terms 必填 |
| RH00254 | 紧急措施执行失败 | 检查目标用户账户状态 |
| RH00255 | 消息内容超过500字限制 | 精简内容 |
| RH00256 | 协议条款不得超过10条 | 精简条款 |
