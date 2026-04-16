---
title: 管理员 (admin)
sidebar_label: 管理员
---

> 此模块面向管理后台或运维，提供数据库、日志、配置、经验与争议、测试等能力；部分 action 需管理员权限或 OPENID 校验。

---

## 2. 获取集合列表 [GET]

**接口描述**：获取数据库集合列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getCollections` |

### 2.1 请求参数 (Parameters)

见 README 2.2 通用约定。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 2.4 示例 (Examples)

```json
{
  "action": "getCollections",
  "data": {}
}
```

---

## 3. 获取集合内文档 [GET]

**接口描述**：分页、筛选获取指定集合内文档。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getDocuments` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| collection | String | 是 | - | 集合名 | “users” |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 3.4 示例 (Examples)

```json
{
  "action": "getDocuments",
  "data": { "collection": "users" }
}
```

---

## 4. 创建文档 [POST]

**接口描述**：在指定集合中创建文档。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `createDocument` |

### 4.1 请求参数 (Parameters)

见通用约定（含 collection、文档字段等）。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 4.4 示例 (Examples)

```json
{
  "action": "createDocument",
  "data": {}
}
```

---

## 5. 更新文档 [POST]

**接口描述**：更新指定集合中的文档。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `updateDocument` |

### 5.1 请求参数 (Parameters)

见通用约定。

### 5.2 响应数据 (Response)

见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 5.4 示例 (Examples)

```json
{
  "action": "updateDocument",
  "data": {}
}
```

---

## 6. 删除文档 [POST]

**接口描述**：删除指定集合中的文档。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `deleteDocument` |

### 6.1 请求参数 (Parameters)

见通用约定。

### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 6.4 示例 (Examples)

```json
{
  "action": "deleteDocument",
  "data": {}
}
```

---

## 7. 去重 [POST]

**接口描述**：按条件对集合内数据去重。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `deduplicate` |

### 7.1 请求参数 (Parameters)

见通用约定。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 7.4 示例 (Examples)

```json
{
  "action": "deduplicate",
  "data": {}
}
```

---

## 8. 压缩/整理 [POST]

**接口描述**：按业务定义执行压缩或整理操作。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `compact` |

### 8.1 请求参数 (Parameters)

见通用约定。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 8.4 示例 (Examples)

```json
{
  "action": "compact",
  "data": {}
}
```

---

### 8.5 二、日志

---

## 9. 获取管理员操作日志 [GET]

**接口描述**：分页、筛选获取管理员操作日志。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLogs` |

### 9.1 请求参数 (Parameters)

见通用约定（分页、时间、操作类型等）。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 9.4 示例 (Examples)

```json
{
  "action": "getLogs",
  "data": {}
}
```

---

## 10. 单条日志详情 [GET]

**接口描述**：获取单条日志详情。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLogDetail` |

### 10.1 请求参数 (Parameters)

见通用约定（含 logId）。

### 10.2 响应数据 (Response)

见通用约定。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 10.4 示例 (Examples)

```json
{
  "action": "getLogDetail",
  "data": {}
}
```

---

## 11. 日志统计 [GET]

**接口描述**：获取日志统计信息。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLogStats` |

### 11.1 请求参数 (Parameters)

见通用约定。

### 11.2 响应数据 (Response)

见通用约定。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 11.4 示例 (Examples)

```json
{
  "action": "getLogStats",
  "data": {}
}
```

---

## 12. 导出日志 [GET]

**接口描述**：导出日志数据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getLogsExport` |

### 12.1 请求参数 (Parameters)

见通用约定。

### 12.2 响应数据 (Response)

见通用约定。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 12.4 示例 (Examples)

```json
{
  "action": "getLogsExport",
  "data": {}
}
```

---

### 12.5 三、配置

---

## 13. 获取单条系统配置 [GET]

**接口描述**：根据 key 获取单条系统配置。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getConfig` |

### 13.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| key | String | 是 | - | 配置键 | “site_name” |

### 13.2 响应数据 (Response)

见通用约定。

### 13.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 13.4 示例 (Examples)

```json
{
  "action": "getConfig",
  "data": { "key": "site_name" }
}
```

---

## 14. 获取全部配置 [GET]

**接口描述**：获取全部系统配置。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getAllConfigs` |

### 14.1 请求参数 (Parameters)

无。

### 14.2 响应数据 (Response)

见通用约定。

### 14.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 14.4 示例 (Examples)

```json
{
  "action": "getAllConfigs",
  "data": {}
}
```

---

## 15. 设置配置 [POST]

**接口描述**：设置系统配置，需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `setConfig` |

### 15.1 请求参数 (Parameters)

见通用约定（含 key、value 等）。

### 15.2 响应数据 (Response)

见通用约定。

### 15.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 15.4 示例 (Examples)

```json
{
  "action": "setConfig",
  "data": {}
}
```

---

## 16. 初始化 system_config [POST]

**接口描述**：首次部署时初始化 system_config 集合。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `initConfig` |

### 16.1 请求参数 (Parameters)

见通用约定。

### 16.2 响应数据 (Response)

见通用约定。

### 16.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 16.4 示例 (Examples)

```json
{
  "action": "initConfig",
  "data": {}
}
```

---

## 17. 清除配置缓存 [POST]

**接口描述**：清除配置缓存。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `clearConfigCache` |

### 17.1 请求参数 (Parameters)

见通用约定。

### 17.2 响应数据 (Response)

见通用约定。

### 17.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 17.4 示例 (Examples)

```json
{
  "action": "clearConfigCache",
  "data": {}
}
```

---

### 17.5 四、经验与争议

---

## 18. 获取指定用户经验/星级 [GET]

**接口描述**：获取指定用户的经验值与星级。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getUserExperience` |

### 18.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| userId | String | 是 | - | 用户 ID | “U12345” |

### 18.2 响应数据 (Response)

见通用约定。

### 18.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 18.4 示例 (Examples)

```json
{
  "action": "getUserExperience",
  "data": { "userId": "U12345" }
}
```

---

## 19. 调整用户经验值 [POST]

**接口描述**：管理员调整用户经验值。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `adjustExperience` |

### 19.1 请求参数 (Parameters)

见通用约定（含 userId、增减量、原因等）。

### 19.2 响应数据 (Response)

见通用约定。

### 19.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 19.4 示例 (Examples)

```json
{
  "action": "adjustExperience",
  "data": {}
}
```

---

## 20. 获取经验值历史 [GET]

**接口描述**：获取用户经验值变动历史。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getExperienceHistory` |

### 20.1 请求参数 (Parameters)

见通用约定（含 userId、分页等）。

### 20.2 响应数据 (Response)

见通用约定。

### 20.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 20.4 示例 (Examples)

```json
{
  "action": "getExperienceHistory",
  "data": {}
}
```

---

## 21. 作弊检测 [POST]

**接口描述**：执行作弊检测逻辑。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `detectCheating` |

### 21.1 请求参数 (Parameters)

见通用约定。

### 21.2 响应数据 (Response)

见通用约定。

### 21.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 21.4 示例 (Examples)

```json
{
  "action": "detectCheating",
  "data": {}
}
```

---

## 22. 处理经验申诉 [POST]

**接口描述**：管理员处理用户经验申诉。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `processAppeal` |

### 22.1 请求参数 (Parameters)

见通用约定（含申诉 ID、通过/拒绝、备注等）。

### 22.2 响应数据 (Response)

见通用约定。

### 22.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 22.4 示例 (Examples)

```json
{
  "action": "processAppeal",
  "data": {}
}
```

---

## 23. 获取争议列表 [GET]

**接口描述**：获取争议列表，支持筛选、分页。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getDisputeList` |

### 23.1 请求参数 (Parameters)

见通用约定。

### 23.2 响应数据 (Response)

见通用约定。

### 23.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 23.4 示例 (Examples)

```json
{
  "action": "getDisputeList",
  "data": {}
}
```

---

## 24. 争议详情 [GET]

**接口描述**：获取单条争议详情。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getDisputeDetail` |

### 24.1 请求参数 (Parameters)

见通用约定（含 disputeId）。

### 24.2 响应数据 (Response)

见通用约定。

### 24.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 24.4 示例 (Examples)

```json
{
  "action": "getDisputeDetail",
  "data": {}
}
```

---

## 25. 处理争议 [POST]

**接口描述**：管理员处理争议（裁决等）。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `resolveDispute` |

### 25.1 请求参数 (Parameters)

见通用约定。

### 25.2 响应数据 (Response)

见通用约定。

### 25.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 25.4 示例 (Examples)

```json
{
  "action": "resolveDispute",
  "data": {}
}
```

---

## 26. 关闭争议 [POST]

**接口描述**：关闭争议单。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `closeDispute` |

### 26.1 请求参数 (Parameters)

见通用约定。

### 26.2 响应数据 (Response)

见通用约定。

### 26.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 26.4 示例 (Examples)

```json
{
  "action": "closeDispute",
  "data": {}
}
```

---

### 26.5 五、测试

---

## 27. 运行测试套件 [POST]

**接口描述**：运行测试套件。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `runTestSuite` |

### 27.1 请求参数 (Parameters)

见通用约定。

### 27.2 响应数据 (Response)

见通用约定。

### 27.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 27.4 示例 (Examples)

```json
{
  "action": "runTestSuite",
  "data": {}
}
```

---

## 28. 运行单条测试 [POST]

**接口描述**：运行单条测试用例。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `runSingleTest` |

### 28.1 请求参数 (Parameters)

见通用约定（含 testId 等）。

### 28.2 响应数据 (Response)

见通用约定。

### 28.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 28.4 示例 (Examples)

```json
{
  "action": "runSingleTest",
  "data": {}
}
```

---

## 29. 获取测试结果 [GET]

**接口描述**：获取测试运行结果。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getTestResults` |

### 29.1 请求参数 (Parameters)

见通用约定。

### 29.2 响应数据 (Response)

见通用约定。

### 29.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 29.4 示例 (Examples)

```json
{
  "action": "getTestResults",
  "data": {}
}
```

---

## 30. 清除测试结果 [POST]

**接口描述**：清除测试结果数据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `clearTestResults` |

### 30.1 请求参数 (Parameters)

见通用约定。

### 30.2 响应数据 (Response)

见通用约定。

### 30.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 30.4 示例 (Examples)

```json
{
  "action": "clearTestResults",
  "data": {}
}
```

---

## 31. 注入模拟数据 [POST]

**接口描述**：注入模拟数据，用于测试。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `injectMockData` |

### 31.1 请求参数 (Parameters)

见通用约定。

### 31.2 响应数据 (Response)

见通用约定。

### 31.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 31.4 示例 (Examples)

```json
{
  "action": "injectMockData",
  "data": {}
}
```

---

## 32. 清除测试数据 [POST]

**接口描述**：清除测试注入的数据。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `admin` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `clearTestData` |

### 32.1 请求参数 (Parameters)

见通用约定。

### 32.2 响应数据 (Response)

见通用约定。

### 32.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。无管理员权限为 RH00004，配置相关为 RH00702。

### 32.4 示例 (Examples)

```json
{
  "action": "clearTestData",
  "data": {}
}
```
