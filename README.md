# GitHub Issue 管理網站

串接github api使用戶可以新增、更新、搜尋task(issue)，並能夠更新task狀態。

## 技術架構

React
React Router
Axios

## 開始

### 環境設置

1. 安裝 Node.js 環境
2. 複製或下載此專案

### `pnpm i`

使用終端機進入專案目錄後，執行 'pnpm i' 指令來安裝相依套件。

### 設定環境變數

#### 創建自己的github oauth app

按照 <https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app>
的指示創建一個自己的github oauth app

#### 設定環境變數

1. 在根目錄新增檔案 .env
2. 在裡面新增以下兩個變數

REACT_APP_CLIENTID = '你在github oauth app取得的CLIENTID'
REACT_APP_CLIENTSECRET = '你在github oauth app取得的CLIENTSECRET'

### `pnpm start`

使用該指令來運行程式在本地端: <http://localhost:3000/> 上運行。

## 程式架構

> public/                 # 網頁靜態資源
> > index.html<br>
> > favicon.ico<br>

>src/                     # React 主要程式碼目錄<br>
>>components/             # React 組件<br>
>>>addissue.tsx #新增issue<br>
>>>issuetask.tsx #issuetask<br>
>>>stateschangedialog.tsx #更改issue狀態<br>
>>>statesfilterdialog.tsx #依照state篩選task<br>
>>>taskmenu.tsx #編輯task選項<br>

>>views/                  # 網頁頁面<br>
>>>homepage.tsx #主要頁面<br>
>>>login.tsx #登入頁面<br>

>>utils/                  # 工具類程式碼<br>
>>>TimeFormatter.tsx #格式化時間<br>

>>gitapi/                  # github相關api<br>
>>>changelabel.tsx #更改標籤<br>
closeissue.tsx #關閉issue<br>
editissue.tsx #編輯issue<br>
fetchissue.tsx #取得issue<br>
gettoken.tsx #取得token<br>
getuser.tsx #取得username<br>
logout.tsx #登出<br>
postissue.tsx #新增issue<br>

>>index.tsx               # 入口文件<br>
App.tsx                 # React 主要組件<br>

>.gitignore                 # Git 忽略文件列表<br>
package.json                # npm 包管理器設定文件<br>
pnpm-lock.yaml              #紀錄當前安装的包的版本信息<br>
README.md                   # 專案說明文件<br>
tsconfig.json               # TypeScript編譯器的編譯選項<br>
