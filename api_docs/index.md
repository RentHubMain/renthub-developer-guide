---
title: Cloud Functions API
sidebar_label: 概览
---

RentHub 小程序与后台所依赖的**云函数接口说明**：按云函数域划分模块，正文来自业务仓库 `docs/api_docs`，在文档站统一托管便于检索与分享。

## 目录

| 文档 | 说明 |
| --- | --- |
| [api-spec](/api/api-spec) | 模块文档结构与写作格式 |
| [common-error-codes](/api/common-error-codes) | 错误响应与 RH 报错码表 |
| [user](/api/user) | 云函数 `user` |
| [order](/api/order) | 云函数 `order` |
| [asset](/api/asset) | 云函数 `asset` |
| [experience](/api/experience) | 云函数 `experience` |
| [message](/api/message) | 云函数 `message` |
| [newbie](/api/newbie) | 云函数 `newbie` |
| [breach](/api/breach) | 云函数 `breach` |
| [insurance](/api/insurance) | 云函数 `insurance` |
| [review](/api/review) | 云函数 `review` |
| [referral](/api/referral) | 云函数 `referral` |
| [help](/api/help) | 云函数 `help` |
| [preload](/api/preload) | 云函数 `preload` |
| [sfexpress](/api/sfexpress) | 云函数 `sfexpress` |
| [scheduler](/api/scheduler) | 云函数 `scheduler` |
| [admin](/api/admin) | 云函数 `admin` |
| [seller-home](/api/seller-home) | 商家展示相关接口 |
| [dispute](/api/dispute) | 争议与协商（部分能力在 `message`） |

---

## 目标

读完本专题，你应当能够：

- 按云函数名与 `action` 查阅请求/响应与错误码引用关系；
- 在《通用报错码》中定位 RH 码含义；
- 按《API 文档规范》新增或修订接口说明。

---

## 通用约定

本节摘录自业务仓库 `docs/README.md`，与云函数实现对齐。

- **入参**：`event = { action: string, data?: object }`，部分云函数仅用 `event` 原始参数（如 preload）。
- **出参**：业务接口统一返回 `{ success: boolean, data?: any, message?: string }`；预拉取返回 JSON 字符串。
- **鉴权**：需登录的 action 依赖云函数内 `cloud.getWXContext().OPENID`，未登录会返回「用户身份验证失败，请重新登录」。

---

## 模块与云函数索引

| 域 | 云函数名 | API 文档 |
| --- | --- | --- |
| 用户 | user | [user](/api/user) |
| 订单 | order | [order](/api/order) |
| 资产与展示 | asset | [asset](/api/asset) |
| 经验与信用 | experience | [experience](/api/experience) |
| 消息与客服 | message | [message](/api/message) |
| 成长与任务 | newbie | [newbie](/api/newbie) |
| 违约与处罚 | breach | [breach](/api/breach) |
| 保险与理赔 | insurance | [insurance](/api/insurance) |
| 评价 | review | [review](/api/review) |
| 推荐奖励 | referral | [referral](/api/referral) |
| 帮助与配置 | help | [help](/api/help) |
| 预拉取 | preload | [preload](/api/preload) |
| 物流 | sfexpress | [sfexpress](/api/sfexpress) |
| 定时任务 | scheduler | [scheduler](/api/scheduler) |
| 管理端 | admin | [admin](/api/admin) |

---

## 维护说明

- 正文修订仍在业务仓库 `renthub-mini-program` 的 `docs/api_docs` 进行；同步到文档站时可复制 Markdown 后执行 `node scripts/prepare-api-docs.mjs`（勿覆盖手工维护的 `index.md`）。
- 功能说明类长文（如预拉取、定时任务配置）仍在业务仓库 [`docs/functionality_docs`](https://github.com/RentHubMain/renthub-mini-program/tree/main/docs/functionality_docs)。
