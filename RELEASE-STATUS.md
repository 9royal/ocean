# 洋流探索室 v2.0.1 發布紀錄

日期：2026-11-05（臺灣）

## 發布位置

- 線上網站：https://ocean.dg15.chatgpt.site/
- GitHub 原始碼：https://github.com/9royal/ocean
- Sites 與 GitHub 使用私人設定，未更改既有網站的存取權限。
- 新 Sites 專案：`appgprj_6aec1bc2f5008191842a86cea530248c`；沿用已建立的專案，未重複建立。

## 已完成的發布檢查

- 以原始修正提交 `c850e69104c1712db2719debfe5f0d1b0b29a1a8` 建立獨立發布副本。
- 保留 Ro 原始品牌素材、第三方授權、繁體中文 README、版本紀錄及測試。
- 再次通過 JavaScript 語法與科氏模型測試；既有完整課程測試紀錄見 `VERIFICATION-v2.0.1.md`。
- 重新執行發布 skill 的敏感資訊候選掃描，覆核 D3 色盤的兩個誤判；未發現需移除的金鑰或個資。
- Sites source helper 完成原始碼推送並封裝相符的靜態部署包。
- GitHub 私人存放庫 `9royal/ocean` 已建立，用於保存本次發布原始碼。

## 首次部署的可查證紀錄

- Sites 回傳狀態：`succeeded`。
- 部署 ID：`appgdep_6aec2e0c7cbc8191a7a6831947b2908e`。
- 來源提交：`d1b23b9e1070d0a859ff8d39dc137ff35a17bced`。
- 完成時間：2026-11-05 15:19（臺灣）。
- Chrome 已實際開啟行星風系、表層洋流、風與海的連動、區域放大鏡及科氏實驗；黑潮漂流點、ENSO 聖嬰切換與 v2.0.1 的隱藏圖層修正均已複查。

這份紀錄在首次成功後補入。發布流程會將文件更新後的相同原始碼同步至 Sites 與 GitHub，再次部署；最終提交與部署回條保存於工作區的發布收據。

## 後續更新

維持 `.openai/hosting.json` 的專案 ID。每次修改後先測試、推送相符原始碼並封裝，再儲存及部署 Sites 版本。短期憑證只透過隱藏 stdin 使用，不寫入檔案、Git 或發布包。

未另外指定開源授權，故本次不附加 LICENSE；未要求桌面安裝檔、簡報或 Word 文件，因此不另製作這些成果。
