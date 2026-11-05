<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="ro-mark-white.svg">
    <img src="ro-mark.svg" width="140" alt="Ro">
  </picture>
</p>

# 洋流探索室｜風與海的四季

供課堂投影與學生探索的繁體中文互動教材，整合行星風系、表層洋流、海氣連動及區域氣候。

**程式版本：v2.0.1。** 本份原始碼以既有提交 `c850e69104c1712db2719debfe5f0d1b0b29a1a8` 為基礎，加入原始 Ro 標誌與發布文件。

線上開啟：[洋流探索室](https://ocean.dg15.chatgpt.site/)。原始碼：[9royal/ocean](https://github.com/9royal/ocean)。

網站與 GitHub 存放庫皆已公開。學生直接開啟網站即可操作，不需登入或申請帳號。Sites 已完成正式部署，發布與驗證紀錄見 `RELEASE-STATUS.md`。

## 使用方式

1. 選擇「行星風系」「表層洋流」「風與海的連動」或「區域放大鏡」。
2. 切換季節與動態／四季靜態，分別播放風場、洋流、自轉或四季演示。
3. 點選圖面查看說明，或開啟「課堂展開」與「科氏偏轉實驗」。

| 頁面 | 內容 |
| --- | --- |
| 行星風系 | 地球與旁側六風胞位於同一主圖，支援點選與季節切換 |
| 表層洋流 | 地球／地圖切換、洋流名稱、路徑點選與漂流點 |
| 風與海的連動 | 獨立控制風場與洋流；正常、聖嬰與反聖嬰比較 |
| 區域放大鏡 | 東亞、南亞、西非、北澳洲、地中海、加州、智利中部、南非西南端、澳洲西南部 |

四季依月份標示，並同時註明南北半球季節。靜態模式停止流動、自轉及四季演示，仍可拖曳、縮放與點選。關閉洋流圖層後，漂流點建立與洋流播放會停用；空白鍵優先控制可見洋流，洋流隱藏時控制可見風場。

## 本機開啟

需要 Node.js；應用程式本身不需安裝套件或設定 API 金鑰。

```sh
node preview.cjs
```

開啟 http://127.0.0.1:4175/ 。預覽僅供本機使用，提供 `dist/` 內的檔案。直接雙擊 HTML 可能因瀏覽器限制而無法載入地圖資料。

## 測試

瀏覽器測試使用 Playwright；已有 Google Chrome 的 Windows 電腦會優先使用預設安裝位置，也可透過 `CHROME_PATH` 指定。其他環境可安裝 Playwright Chromium。

```sh
npm install
npx playwright install chromium
npm test
```

`npm run test:physics` 只執行不依賴瀏覽器的模型檢查。本次測試結果見 `VERIFICATION-v2.0.1.md`。

## 部署

這是無建置步驟的靜態網站；部署目錄為 `dist/`。

- Sites：`.openai/hosting.json` 綁定本次新建專案。須先推送相符原始碼，再封裝並儲存、部署版本。
- 其他靜態主機：上傳 `dist/` 的完整內容，包含 `assets/`；無需學生帳號或後端。
- 部署到另一個全新 Sites 時，不應沿用這份專案識別。應由 Sites 建立新專案並更新 manifest。
- GitHub 使用 `9royal/ocean` 公開存放庫。未另行指定開源授權，故不附加 LICENSE。

## 檔案

| 檔案 | 用途 |
| --- | --- |
| `dist/index.html` | 四頁介面、共用控制與對話框 |
| `dist/app.js` | 畫布、狀態、播放、選取、漂流點與課堂展開 |
| `dist/climate.js`、`dist/data.js` | 季節、風胞、洋流與區域案例資料 |
| `dist/enso.js` | ENSO 比較與瀏覽器內的觀察筆記 |
| `dist/coriolis*.js` | 科氏模型與實驗 |
| `dist/*.css` | 桌面及手機版面 |
| `dist/assets/` | 本機地圖資料、第三方函式庫、授權與 Ro 標誌 |
| `test-*.cjs` | 控制、完整流程、邊界與科氏模型測試 |
| `ro-mark*.svg` | README 的原始 Ro 品牌素材 |

## 資料與模型範圍

圖面為教學概念情境，不是即時觀測、數值預報或完整氣候模型。風向箭頭、粒子速度、風胞高度與暖冷色彩為示意；ENSO 不會計算全球洋流及漂流點的預報。各項科學範圍與原始資料連結保留於網頁「資料與說明」。

- NOAA 洋流：https://oceanservice.noaa.gov/education/tutorial_currents/04currents1.html
- UCAR 大氣環流：https://scied.ucar.edu/learning-zone/how-weather-works/global-air-atmospheric-circulation
- UCAR 季風：https://scied.ucar.edu/learning-zone/storms/monsoons
- NOAA ENSO：https://www.noaa.gov/jetstream/tropical/enso/enso-patterns
- WHOI 科氏教學：https://www2.whoi.edu/staff/jprice/wp-content/uploads/sites/199/2018/12/aCt-P1-V8.pdf
- Natural Earth：https://www.naturalearthdata.com/about/terms-of-use/

## 隱私與授權

應用程式沒有 API 金鑰、學生名冊、分析追蹤服務或外部資料 API。偏好、觀察筆記及漂流點儲存在使用者自己的瀏覽器。發布包不含測試截圖、登入狀態及憑證。原始 Ro 標誌與第三方授權保留；本專案未擅自加上開源授權。

## 版本紀錄

- v2.0.1（2026-11-05）：修正隱藏圖層的漂流點及空白鍵播放；完成控制、四頁流程、邊界與模型測試；整理發布副本及原始品牌素材。
- v2.0：四頁課程、地球與六風胞同圖、四季與 ENSO 比較；詳見 CHANGELOG-v2.0.md。
