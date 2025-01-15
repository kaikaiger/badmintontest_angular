# 羽球場地管理系統(Front-end)

羽球場地管理系統的前端專案，使用 Angular 開發，提供場地租借和管理的使用者介面。

## 架構

### 前端(運行於本地 `http://localhost:4200`)
- Angular

### 專案結構
```
src/
├── app/
│   ├── components/         # 元件
│   ├── models/            # 資料模型
│   │   ├── court.ts
│   │   ├── renter.ts
│   │   └── manager.ts
│   └── services/          # 服務
│       ├── court.services.ts
│       ├── renter.services.ts
│       └── manager.services.ts
└── assets/                # 靜態資源
```

### API 串接
- 專案使用 RESTful API 與後端溝通，API 端點設定在各service.ts
  - baseUrl = 'http://localhost:8080/Badminton/api/<courts/renters/managers>'

## 功能特點

- 使用者功能
  - 查看場地狀態（上午/下午時段）
  - 場地預約
  - 依區域查詢場地
  - 租借者預約紀錄查詢
  - 修改時段/取消預約
- 管理員功能
  - 管理員登入
  - 場地管理

### 主要功能頁面

- 場地租借預約總覽
- 查詢場地
- 預約紀錄
- 管理員後台

## 開發環境建置

### 必要條件
- Node.js
- Angular CLI

### 系統需求
- Angular 19.0.0
- TypeScript 5.6.2

### 啟動指令
- ng serve --open:啟動開發伺服器
