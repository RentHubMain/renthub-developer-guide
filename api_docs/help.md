---
title: 帮助 (help)
sidebar_label: 帮助
---

> 此模块负责 FAQ 列表、分类、搜索及帮助数据初始化。

---

无需登录，公开读取。

---

## 1. 获取 FAQ 列表 [GET]

**接口描述**：获取帮助/FAQ 列表，可传分类等筛选。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `help` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getFaqs` |

### 1.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| categoryId | String | 否 | - | 分类 ID | “cat_xxx” |
| page | Integer | 否 | 1 | 页码 | 1 |
| pageSize | Integer | 否 | 20 | 每页条数 | 20 |

### 1.2 响应数据 (Response)

成功时返回 FAQ 列表，见 README 2.2 通用约定。

### 1.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 1.4 示例 (Examples)

```json
{
  "action": "getFaqs",
  "data": {}
}
```

---

## 2. 获取帮助分类 [GET]

**接口描述**：获取帮助内容分类列表。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `help` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `getCategories` |

### 2.1 请求参数 (Parameters)

无。

### 2.2 响应数据 (Response)

见通用约定。

### 2.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 2.4 示例 (Examples)

```json
{
  "action": "getCategories",
  "data": {}
}
```

---

## 3. 搜索 FAQ [GET]

**接口描述**：按关键词搜索 FAQ。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `help` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `searchFaqs` |

### 3.1 请求参数 (Parameters)

| 参数名 | 类型 | 必选 | 默认值 | 描述 | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| keyword | String | 是 | - | 关键词 | “租期” |

### 3.2 响应数据 (Response)

见通用约定。

### 3.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 3.4 示例 (Examples)

```json
{
  "action": "searchFaqs",
  "data": { "keyword": "租期" }
}
```

---

## 4. 初始化帮助数据 [POST]

**接口描述**：管理员或首次部署时初始化帮助/FAQ 数据。需管理员权限。

| 项目 | 说明 |
| :--- | :--- |
| **云函数名** | `help` |
| **HTTP 路由** | 不适用 |
| **动作类型 (Action)** | `initData` |

### 4.1 请求参数 (Parameters)

见通用约定。

### 4.2 响应数据 (Response)

见通用约定。

### 4.3 错误码 (Error Codes)

见 [通用报错码](common-error-codes.md)。

### 4.4 示例 (Examples)

```json
{
  "action": "initData",
  "data": {}
}
```
