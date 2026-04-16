---
title: 资产 (asset)
sidebar_label: 资产
---

> 此模块负责物品 CRUD、列表/统计/轮播及管理端上下架、审核等。

---

## 1. 发布物品 [POST]

**接口描述**：用户发布物品，需登录，写入 `assets` 集合。


| 项目                | 说明       |
| ----------------- | -------- |
| **云函数名**          | `asset`  |
| **HTTP 路由**       | 不适用      |
| **动作类型 (Action)** | `create` |


### 1.1 请求参数 (Parameters)

分类与成新度枚举的**单一事实来源**为仓库内契约模块 `shared/contracts/asset.js`（云函数侧须内联同步常量，不得 require 该路径）。

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| title | String | 是 | - | 产品名称 | “Sony A7M4 机身” |
| brand | String | 否 | “” | 品牌；建议填写，便于分类关键词匹配 | “Sony” |
| categoryL1Id | String | 是 | - | 一级分类 ID（如 geek_digital） | “imaging_av” |
| categoryL2Id | String | 是 | - | 二级分类 ID，须属于所选一级 | “camera_system” |
| conditionGrade | String | 是 | - | 成新度：`brand_new` / `like_new_99` / `like_new_95` / `ninety_pct` / `eighty_pct` / `seventy_or_below` | “like_new_95” |
| description | String | 否 | “” | 物品描述（可为空，具体校验以云函数为准） | “箱说全” |
| images | String[] | 是 | - | 云存储 fileID，至少 1 张 | `["cloud://..."]` |
| price | Number | 是 | - | 日租金（元） | 99 |
| originalPrice | Number | 否 | null | 原价/估值（元），押金与保险计算 | 18000 |
| minDays | Number | 否 | 1 | 最短租期（天） | 3 |
| location | String | 否 | “” | 取货地址展示文案 | “广东省 深圳市 南山区 …” |
| latitude | Number | 否 | null | 纬度 | 22.5 |
| longitude | Number | 否 | null | 经度 | 113.9 |
| deliveryType | String | 否 | both | 交易方式：`pickup` / `shipping` / `both` | “both” |
| requireInsurance | Boolean | 否 | false | 是否购买租汇保 | true |

**已移除字段（不再写入）**：`category`（扁平字符串）、`proofImages`、`rules`、`purchaseDate`、`usageYears`、`functionalLimits`、`accessories`、`damageImages`。

### 1.2 响应数据 (Response)

成功时 `{ success: true, message?: string, data: { _id: string } }`，`_id` 为新物品文档 ID。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。资产模块补充：**RH00304** 分类组合无效、**RH00305** 成新度无效、**RH00310** 智能识别描述为空；另有 RH00300～RH00303 等。

### 1.4 示例 (Examples)

```json
{
  "action": "create",
  "data": {
    "title": "大疆 Mini 3 Pro",
    "brand": "DJI",
    "categoryL1Id": "imaging_av",
    "categoryL2Id": "drone",
    "conditionGrade": "like_new_99",
    "description": "",
    "images": ["cloud://xxx/a.jpg"],
    "price": 80,
    "originalPrice": 4800,
    "minDays": 1,
    "deliveryType": "both",
    "requireInsurance": true
  }
}
```

---

## 2. 更新物品信息 [POST]

**接口描述**：更新已发布的物品信息，仅创建者可操作。


| 项目                | 说明       |
| ----------------- | -------- |
| **云函数名**          | `asset`  |
| **HTTP 路由**       | 不适用      |
| **动作类型 (Action)** | `update` |


### 2.1 请求参数 (Parameters)


| 参数名     | 类型     | 必选  | 默认值 | 描述    | 示例          |
| ------- | ------ | --- | --- | ----- | ----------- |
| assetId | String | 是   | -   | 物品 ID | “asset_xxx” |


其余为待更新字段，见通用约定。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "update",
  "data": { "assetId": "asset_xxx" }
}
```

---

## 3. 删除/下架物品 [POST]

**接口描述**：删除或下架物品，可为软删或状态更新。


| 项目                | 说明       |
| ----------------- | -------- |
| **云函数名**          | `asset`  |
| **HTTP 路由**       | 不适用      |
| **动作类型 (Action)** | `delete` |


### 3.1 请求参数 (Parameters)


| 参数名     | 类型     | 必选  | 默认值 | 描述    | 示例          |
| ------- | ------ | --- | --- | ----- | ----------- |
| assetId | String | 是   | -   | 物品 ID | “asset_xxx” |


### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "delete",
  "data": { "assetId": "asset_xxx" }
}
```

---

## 4. 获取物品详情 [GET]

**接口描述**：根据 `assetId` 获取物品详情，公开可读。


| 项目                | 说明          |
| ----------------- | ----------- |
| **云函数名**          | `asset`     |
| **HTTP 路由**       | 不适用         |
| **动作类型 (Action)** | `getDetail` |


### 4.1 请求参数 (Parameters)


| 参数名     | 类型     | 必选  | 默认值 | 描述    | 示例          |
| ------- | ------ | --- | --- | ----- | ----------- |
| assetId | String | 是   | -   | 物品 ID | “asset_xxx” |


### 4.2 响应数据 (Response)

成功时返回物品完整信息，见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "getDetail",
  "data": { "assetId": "asset_xxx" }
}
```

---

## 5. 获取物品列表 [GET]

**接口描述**：分页获取物品列表，支持筛选、排序。


| 项目                | 说明        |
| ----------------- | --------- |
| **云函数名**          | `asset`   |
| **HTTP 路由**       | 不适用       |
| **动作类型 (Action)** | `getList` |


### 5.1 请求参数 (Parameters)


| 参数名        | 类型      | 必选  | 默认值 | 描述    | 示例        |
| ---------- | ------- | --- | --- | ----- | --------- |
| page       | Integer | 否   | 1   | 页码    | 1         |
| pageSize   | Integer | 否   | 20  | 每页条数  | 20        |
| categoryL1Id | String  | 否   | -   | 一级分类 ID | “geek_digital” |
| categoryL2Id | String  | 否   | -   | 二级分类 ID（更精确） | “phone” |
| sort       | String  | 否   | -   | 排序方式  | “latest”  |


### 5.2 响应数据 (Response)

成功时 `data` 含 `list`、`total` 等，见通用约定。

### 5.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 5.4 示例 (Examples)

```json
{
  "action": "getList",
  "data": { "page": 1, "pageSize": 20 }
}
```

---

## 6. 搜索物品 [GET]

**接口描述**：按关键词、分类等搜索物品。


| 项目                | 说明       |
| ----------------- | -------- |
| **云函数名**          | `asset`  |
| **HTTP 路由**       | 不适用      |
| **动作类型 (Action)** | `search` |


### 6.1 请求参数 (Parameters)


| 参数名        | 类型      | 必选  | 默认值 | 描述    | 示例        |
| ---------- | ------- | --- | --- | ----- | --------- |
| keyword    | String  | 否   | -   | 关键词   | “相机”      |
| categoryL1Id | String  | 否   | -   | 一级分类 ID | “imaging_av” |
| categoryL2Id | String  | 否   | -   | 二级分类 ID | “camera_system” |
| page       | Integer | 否   | 1   | 页码    | 1         |
| pageSize   | Integer | 否   | 20  | 每页条数  | 20        |


### 6.2 响应数据 (Response)

见通用约定。

### 6.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 6.4 示例 (Examples)

```json
{
  "action": "search",
  "data": { "keyword": "相机" }
}
```

---

## 7. 获取当前用户发布的物品 [GET]

**接口描述**：获取当前用户已发布的物品列表（我的发布）。


| 项目                | 说明              |
| ----------------- | --------------- |
| **云函数名**          | `asset`         |
| **HTTP 路由**       | 不适用             |
| **动作类型 (Action)** | `getUserAssets` |


### 7.1 请求参数 (Parameters)

见通用约定（可选分页、状态）。

### 7.2 响应数据 (Response)

见通用约定。

### 7.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 7.4 示例 (Examples)

```json
{
  "action": "getUserAssets",
  "data": {}
}
```

---

## 8. 获取可发布数量/配额 [GET]

**接口描述**：获取当前用户可发布物品数量或配额。


| 项目                | 说明                |
| ----------------- | ----------------- |
| **云函数名**          | `asset`           |
| **HTTP 路由**       | 不适用               |
| **动作类型 (Action)** | `getPublishQuota` |


### 8.1 请求参数 (Parameters)

无。

### 8.2 响应数据 (Response)

见通用约定。

### 8.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 8.4 示例 (Examples)

```json
{
  "action": "getPublishQuota",
  "data": {}
}
```

---

## 9. 获取全局统计 [GET]

**接口描述**：获取物品数、订单数等全局统计。


| 项目                | 说明         |
| ----------------- | ---------- |
| **云函数名**          | `asset`    |
| **HTTP 路由**       | 不适用        |
| **动作类型 (Action)** | `getStats` |


### 9.1 请求参数 (Parameters)

无。

### 9.2 响应数据 (Response)

见通用约定。

### 9.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 9.4 示例 (Examples)

```json
{
  "action": "getStats",
  "data": {}
}
```

---

## 10. 获取分类统计 [GET]

**接口描述**：获取各分类的统计，用于首页/分类页。


| 项目                | 说明                 |
| ----------------- | ------------------ |
| **云函数名**          | `asset`            |
| **HTTP 路由**       | 不适用                |
| **动作类型 (Action)** | `getCategoryStats` |


### 10.1 请求参数 (Parameters)

无。

### 10.2 响应数据 (Response)

成功时 `data` 为对象：键为**二级分类 ID**（`categoryL2Id`，与 `shared/contracts/asset.js` 中一致），值为该分类下在架物品数量；用于首页/分类 Tab 与侧边栏统计（实现可在阶段 2 与前端对齐）。

### 10.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 10.4 示例 (Examples)

```json
{
  "action": "getCategoryStats",
  "data": {}
}
```

---

## 11. 获取首页轮播配置 [GET]

**接口描述**：获取首页轮播图配置，含临时 URL 等。


| 项目                | 说明               |
| ----------------- | ---------------- |
| **云函数名**          | `asset`          |
| **HTTP 路由**       | 不适用              |
| **动作类型 (Action)** | `getHomeBanners` |


### 11.1 请求参数 (Parameters)

无。

### 11.2 响应数据 (Response)

见通用约定。

### 11.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 11.4 示例 (Examples)

```json
{
  "action": "getHomeBanners",
  "data": {}
}
```

---

## 12. 获取云存储临时链接 [GET]

**接口描述**：根据 fileID 获取云存储文件临时访问链接。


| 项目                | 说明               |
| ----------------- | ---------------- |
| **云函数名**          | `asset`          |
| **HTTP 路由**       | 不适用              |
| **动作类型 (Action)** | `getTempFileURL` |


### 12.1 请求参数 (Parameters)


| 参数名    | 类型     | 必选  | 默认值 | 描述         | 示例            |
| ------ | ------ | --- | --- | ---------- | ------------- |
| fileID | String | 是   | -   | 云存储 fileID | “cloud://xxx” |


### 12.2 响应数据 (Response)

见通用约定（含临时 URL）。

### 12.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 12.4 示例 (Examples)

```json
{
  "action": "getTempFileURL",
  "data": { "fileID": "cloud://xxx" }
}
```

---

## 13. 获取全部在架物品（管理员） [GET]

**接口描述**：管理端获取全部在架物品列表。需管理员权限。


| 项目                | 说明                   |
| ----------------- | -------------------- |
| **云函数名**          | `asset`              |
| **HTTP 路由**       | 不适用                  |
| **动作类型 (Action)** | `getAllActiveAssets` |


### 13.1 请求参数 (Parameters)

见通用约定（分页、筛选等）。

### 13.2 响应数据 (Response)

见通用约定。

### 13.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 13.4 示例 (Examples)

```json
{
  "action": "getAllActiveAssets",
  "data": {}
}
```

---

## 14. 下架物品（管理员） [POST]

**接口描述**：管理员下架指定物品。


| 项目                | 说明              |
| ----------------- | --------------- |
| **云函数名**          | `asset`         |
| **HTTP 路由**       | 不适用             |
| **动作类型 (Action)** | `adminTakeDown` |


### 14.1 请求参数 (Parameters)

见通用约定（含 assetId）。

### 14.2 响应数据 (Response)

见通用约定。

### 14.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 14.4 示例 (Examples)

```json
{
  "action": "adminTakeDown",
  "data": {}
}
```

---

## 15. 取消下架（管理员） [POST]

**接口描述**：管理员取消对物品的下架。


| 项目                | 说明               |
| ----------------- | ---------------- |
| **云函数名**          | `asset`          |
| **HTTP 路由**       | 不适用              |
| **动作类型 (Action)** | `cancelTakeDown` |


### 15.1 请求参数 (Parameters)

见通用约定。

### 15.2 响应数据 (Response)

见通用约定。

### 15.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 15.4 示例 (Examples)

```json
{
  "action": "cancelTakeDown",
  "data": {}
}
```

---

## 16. 警告物品（管理员） [POST]

**接口描述**：管理员对物品进行违规警告。


| 项目                | 说明          |
| ----------------- | ----------- |
| **云函数名**          | `asset`     |
| **HTTP 路由**       | 不适用         |
| **动作类型 (Action)** | `adminWarn` |


### 16.1 请求参数 (Parameters)

见通用约定。

### 16.2 响应数据 (Response)

见通用约定。

### 16.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 16.4 示例 (Examples)

```json
{
  "action": "adminWarn",
  "data": {}
}
```

---

## 17. 取消警告（管理员） [POST]

**接口描述**：管理员取消对物品的警告。


| 项目                | 说明              |
| ----------------- | --------------- |
| **云函数名**          | `asset`         |
| **HTTP 路由**       | 不适用             |
| **动作类型 (Action)** | `cancelWarning` |


### 17.1 请求参数 (Parameters)

见通用约定。

### 17.2 响应数据 (Response)

见通用约定。

### 17.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 17.4 示例 (Examples)

```json
{
  "action": "cancelWarning",
  "data": {}
}
```

---

## 18. 批量下架（管理员） [POST]

**接口描述**：管理员批量下架物品。


| 项目                | 说明                   |
| ----------------- | -------------------- |
| **云函数名**          | `asset`              |
| **HTTP 路由**       | 不适用                  |
| **动作类型 (Action)** | `adminBatchTakeDown` |


### 18.1 请求参数 (Parameters)

见通用约定（含 assetIds 等）。

### 18.2 响应数据 (Response)

见通用约定。

### 18.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 18.4 示例 (Examples)

```json
{
  "action": "adminBatchTakeDown",
  "data": {}
}
```

---

## 19. 标记异常（管理员） [POST]

**接口描述**：管理员标记物品为异常。


| 项目                | 说明             |
| ----------------- | -------------- |
| **云函数名**          | `asset`        |
| **HTTP 路由**       | 不适用            |
| **动作类型 (Action)** | `markAbnormal` |


### 19.1 请求参数 (Parameters)

见通用约定。

### 19.2 响应数据 (Response)

见通用约定。

### 19.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 19.4 示例 (Examples)

```json
{
  "action": "markAbnormal",
  "data": {}
}
```

---

## 20. 取消异常（管理员） [POST]

**接口描述**：管理员取消物品异常标记。


| 项目                | 说明               |
| ----------------- | ---------------- |
| **云函数名**          | `asset`          |
| **HTTP 路由**       | 不适用              |
| **动作类型 (Action)** | `cancelAbnormal` |


### 20.1 请求参数 (Parameters)

见通用约定。

### 20.2 响应数据 (Response)

见通用约定。

### 20.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 20.4 示例 (Examples)

```json
{
  "action": "cancelAbnormal",
  "data": {}
}
```

---

## 21. 冻结物品（管理员） [POST]

**接口描述**：管理员冻结物品，限制展示或交易。


| 项目                | 说明            |
| ----------------- | ------------- |
| **云函数名**          | `asset`       |
| **HTTP 路由**       | 不适用           |
| **动作类型 (Action)** | `freezeAsset` |


### 21.1 请求参数 (Parameters)

见通用约定。

### 21.2 响应数据 (Response)

见通用约定。

### 21.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 21.4 示例 (Examples)

```json
{
  "action": "freezeAsset",
  "data": {}
}
```

---

## 22. 获取待审核列表（管理员） [GET]

**接口描述**：获取待审核物品列表。需管理员权限。


| 项目                | 说明              |
| ----------------- | --------------- |
| **云函数名**          | `asset`         |
| **HTTP 路由**       | 不适用             |
| **动作类型 (Action)** | `getReviewList` |


### 22.1 请求参数 (Parameters)

见通用约定。

### 22.2 响应数据 (Response)

见通用约定。

### 22.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 22.4 示例 (Examples)

```json
{
  "action": "getReviewList",
  "data": {}
}
```

---

## 23. 审核通过（管理员） [POST]

**接口描述**：管理员审核通过物品。


| 项目                | 说明        |
| ----------------- | --------- |
| **云函数名**          | `asset`   |
| **HTTP 路由**       | 不适用       |
| **动作类型 (Action)** | `approve` |


### 23.1 请求参数 (Parameters)

见通用约定（含 assetId）。

### 23.2 响应数据 (Response)

见通用约定。

### 23.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 23.4 示例 (Examples)

```json
{
  "action": "approve",
  "data": {}
}
```

---

## 24. 审核拒绝（管理员） [POST]

**接口描述**：管理员审核拒绝物品。


| 项目                | 说明       |
| ----------------- | -------- |
| **云函数名**          | `asset`  |
| **HTTP 路由**       | 不适用      |
| **动作类型 (Action)** | `reject` |


### 24.1 请求参数 (Parameters)

见通用约定（含 assetId、拒绝原因等）。

### 24.2 响应数据 (Response)

见通用约定。

### 24.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 24.4 示例 (Examples)

```json
{
  "action": "reject",
  "data": {}
}
```

---

## 25. 永久删除（管理员） [POST]

**接口描述**：管理员永久删除物品。慎用。


| 项目                | 说明                     |
| ----------------- | ---------------------- |
| **云函数名**          | `asset`                |
| **HTTP 路由**       | 不适用                    |
| **动作类型 (Action)** | `adminPermanentDelete` |


### 25.1 请求参数 (Parameters)

见通用约定（含 assetId）。

### 25.2 响应数据 (Response)

见通用约定。

### 25.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 25.4 示例 (Examples)

```json
{
  "action": "adminPermanentDelete",
  "data": {}
}
```

---

## 26. 批量创建模拟物品（测试） [POST]

**接口描述**：批量创建模拟物品，仅测试用。


| 项目                | 说明                |
| ----------------- | ----------------- |
| **云函数名**          | `asset`           |
| **HTTP 路由**       | 不适用               |
| **动作类型 (Action)** | `batchCreateMock` |


### 26.1 请求参数 (Parameters)

见通用约定。

### 26.2 响应数据 (Response)

见通用约定。

### 26.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 26.4 示例 (Examples)

```json
{
  "action": "batchCreateMock",
  "data": {}
}
```

---

## 27. 清空当前用户物品（慎用） [POST]

**接口描述**：清空当前用户发布的物品，仅测试用，慎用。


| 项目                | 说明         |
| ----------------- | ---------- |
| **云函数名**          | `asset`    |
| **HTTP 路由**       | 不适用        |
| **动作类型 (Action)** | `clearAll` |


### 27.1 请求参数 (Parameters)

无。

### 27.2 响应数据 (Response)

见通用约定。

### 27.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 27.4 示例 (Examples)

```json
{
  "action": "clearAll",
  "data": {}
}
```

---

## 28. 建议发布分类匹配 [GET]

**接口描述**：根据用户已输入的**产品名称**与**品牌**文本，按契约中的关键词表计算候选一二级分类，供发布页自动预选；只读，不改变数据。小程序可复用 `shared/contracts/asset.js` 内 `suggestAssetCategoriesFromText` 的等价逻辑做纯本地匹配，亦可通过本接口与云端保持一致。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `asset` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `suggestCategories` |

### 28.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| title | String | 否 | “” | 产品名称 | “Switch OLED” |
| brand | String | 否 | “” | 品牌 | “Nintendo” |

### 28.2 响应数据 (Response)

成功时 `data.suggestions` 为数组，项包含 `categoryL1Id`、`categoryL2Id`、`categoryL1Label`、`categoryL2Label`、`score`（关键词命中数，降序）；无匹配时为空数组。

### 28.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 28.4 示例 (Examples)

```json
{
  "action": "suggestCategories",
  "data": { "title": "PS5 光驱版", "brand": "Sony" }
}
```

---

## 29. 智能发布识别（自然语言填表） [POST]

**接口描述**：已登录用户在发布页输入一段自然语言物品描述，服务端结合 MySQL SPU 目录、分类树关键词与（必要时）云开发 AI 模型，提取一二级分类、品牌、型号与成新度，供前端展示预填确认卡并一键写入表单。与 `suggestCategories` 并存：后者仍按标题+品牌做轻量关键词匹配，本接口面向整段描述的智能解析。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `asset` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `aiParseItem` |

### 29.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| text | String | 是 | - | 自然语言描述；服务端按契约最长处理 300 字（超出截断） | “大疆 Mini 3 Pro 无人机，买了半年，9成新” |

参数位于 `event.data`：`{ "action": "aiParseItem", "data": { "text": "..." } }`。

### 29.2 响应数据 (Response)

成功时返回 `AiParseItemResult` 形状的业务数据（字段均可为 `null`，由识别结果决定）：

| 字段名 | 类型 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| categoryL1Id | String \| null | 一级分类 ID | `"imaging_av"` |
| categoryL2Id | String \| null | 二级分类 ID | `"drone"` |
| categoryL1Label | String \| null | 一级分类中文名 | `"影像影音"` |
| categoryL2Label | String \| null | 二级分类中文名 | `"无人机"` |
| brand | String \| null | 品牌名 | `"大疆"` |
| model | String \| null | 型号名 | `"Mini 3 Pro"` |
| conditionGrade | String \| null | 成新度枚举，与发布接口一致 | `"ninety_pct"` |
| confidence | Number | 综合置信度 0～1 | `0.92` |
| source | String | 结果来源：`local`（纯本地命中）、`ai`（经 AI 解析或合并）、`local_fallback`（AI 失败时降级本地） | `"ai"` |

失败时按项目统一错误结构返回，其中**本接口特有**业务码见下表；鉴权、参数类等通用码见 [通用报错码](common-error-codes.md)。

### 29.3 错误码 (Error Codes)

| 错误码 | 描述 | 解决方案 |
| :--- | :--- | :--- |
| RH00310 | 描述文本为空（未传、空串或仅空白） | 输入有效描述后重试 |

其他通用错误见 [通用报错码](common-error-codes.md)。

### 29.4 示例 (Examples)

```json
{
  "action": "aiParseItem",
  "data": {
    "text": "大疆 Mini 3 Pro，9成新"
  }
}
```
