---
title: 经验与信用 (experience)
sidebar_label: 经验与信用
---

> 此模块负责经验值、星级、申诉、信用修复及反作弊等能力。

---

## 1. 获取当前用户经验值 [GET]

**接口描述**：获取当前登录用户的经验值。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getExperience` |

### 1.1 请求参数 (Parameters)

无。

### 1.2 响应数据 (Response)

成功时返回经验值及相关字段，见 README 2.2 通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。未登录时为 RH00001。

### 1.4 示例 (Examples)

```json
{
  "action": "getExperience",
  "data": {}
}
```

---

## 2. 获取当前用户星级 [GET]

**接口描述**：获取当前用户星级。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getStarLevel` |

### 2.1 请求参数 (Parameters)

无。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getStarLevel",
  "data": {}
}
```

---

## 3. 获取经验值明细 [GET]

**接口描述**：分页获取经验值变动明细，可按类型筛选。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getExperienceHistory` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |
| type | String | 否 | - | 类型筛选 | “order_complete” |

### 3.2 响应数据 (Response)

成功时 `data` 含 list、total 等，见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "getExperienceHistory",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 4. 对扣减经验值申诉 [POST]

**接口描述**：用户对某次经验扣减提交申诉。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `appealDeduction` |

### 4.1 请求参数 (Parameters)

见通用约定（含扣减记录 ID、申诉理由等）。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "appealDeduction",
  "data": {}
}
```

---

## 5. 检查用户权益 [GET]

**接口描述**：检查当前用户星级权益等。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkUserBenefits` |

### 5.1 请求参数 (Parameters)

无。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "checkUserBenefits",
  "data": {}
}
```

---

## 6. 检查年度认证状态 [GET]

**接口描述**：检查用户年度认证是否完成。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkAnnualCertification` |

### 6.1 请求参数 (Parameters)

无。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "checkAnnualCertification",
  "data": {}
}
```

---

## 7. 信用修复 [POST]

**接口描述**：符合条件时恢复经验或信用（如完成修复任务）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `repairCredit` |

### 7.1 请求参数 (Parameters)

见通用约定。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "repairCredit",
  "data": {}
}
```

---

## 8. 计算并发放经验值 [POST]

**接口描述**：系统/内部在订单完成等场景计算并发放经验值，多由定时任务或订单云函数调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `calculateAndAward` |

### 8.1 请求参数 (Parameters)

见通用约定。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 8.4 示例 (Examples)

```json
{
  "action": "calculateAndAward",
  "data": {}
}
```

---

## 9. 扣除经验值 [POST]

**接口描述**：违约、惩罚等场景扣除用户经验值。系统/内部调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `deductExperience` |

### 9.1 请求参数 (Parameters)

见通用约定（含 userId、扣减量、原因等）。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 9.4 示例 (Examples)

```json
{
  "action": "deductExperience",
  "data": {}
}
```

---

## 10. 计算星级 [POST]

**接口描述**：根据经验值重新计算用户星级。系统/内部调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `calculateStarLevel` |

### 10.1 请求参数 (Parameters)

见通用约定。

### 10.2 响应数据 (Response)

见通用约定。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 10.4 示例 (Examples)

```json
{
  "action": "calculateStarLevel",
  "data": {}
}
```

---

## 11. 检查活跃度惩罚 [POST]

**接口描述**：检查用户是否触发活跃度惩罚。定时或手动调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkActivePenalty` |

### 11.1 请求参数 (Parameters)

见通用约定。

### 11.2 响应数据 (Response)

见通用约定。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 11.4 示例 (Examples)

```json
{
  "action": "checkActivePenalty",
  "data": {}
}
```

---

## 12. 发放新手任务经验 [POST]

**接口描述**：新手任务完成时发放经验奖励。由新手任务模块调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `awardNewbieTask` |

### 12.1 请求参数 (Parameters)

见通用约定。

### 12.2 响应数据 (Response)

见通用约定。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 12.4 示例 (Examples)

```json
{
  "action": "awardNewbieTask",
  "data": {}
}
```

---

## 13. 发放活动奖励经验 [POST]

**接口描述**：发放活动相关经验奖励。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `awardActivityReward` |

### 13.1 请求参数 (Parameters)

见通用约定。

### 13.2 响应数据 (Response)

见通用约定。

### 13.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 13.4 示例 (Examples)

```json
{
  "action": "awardActivityReward",
  "data": {}
}
```

---

## 14. 检查休眠状态 [POST]

**接口描述**：检查用户是否进入休眠。定时任务调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `checkDormancy` |

### 14.1 请求参数 (Parameters)

见通用约定。

### 14.2 响应数据 (Response)

见通用约定。

### 14.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 14.4 示例 (Examples)

```json
{
  "action": "checkDormancy",
  "data": {}
}
```

---

## 15. 反作弊检测 [POST]

**接口描述**：执行反作弊检测逻辑。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `detectAntiCheat` |

### 15.1 请求参数 (Parameters)

见通用约定。

### 15.2 响应数据 (Response)

见通用约定。

### 15.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 15.4 示例 (Examples)

```json
{
  "action": "detectAntiCheat",
  "data": {}
}
```

---

## 16. 因违约扣减经验 [POST]

**接口描述**：与违约模块联动，因违约记录扣减经验。系统/内部调用。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `deductExperienceByBreach` |

### 16.1 请求参数 (Parameters)

见通用约定。

### 16.2 响应数据 (Response)

见通用约定。

### 16.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 16.4 示例 (Examples)

```json
{
  "action": "deductExperienceByBreach",
  "data": {}
}
```

---

## 17. 处理申诉 [POST]

**接口描述**：管理员处理经验申诉。争议相关在 `admin` 云函数中也有提供。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `experience` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `processAppeal` |

### 17.1 请求参数 (Parameters)

见通用约定（含申诉 ID、通过/拒绝、备注等）。

### 17.2 响应数据 (Response)

见通用约定。

### 17.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 17.4 示例 (Examples)

```json
{
  "action": "processAppeal",
  "data": {}
}
```
