---
applyTo: '**'
---

# Tampermonkey 脚本开发规范

## 版本号规范 (全局)
- 格式：`0.yymmddxx`
- `yy`: 两位年份（如 26）
- `mm`: 两位月份
- `dd`: 两位日期
- `xx`: 当天的修订次数，从 `01` 开始递增。

## 脚本元数据
- **Author**: `easyatm`
- **Namespace**: `https://github.com/easyatm/tampermonkey-script`
- **UpdateURL**: `https://github.com/easyatm/tampermonkey-script/raw/main/[filename].user.js`
- **DownloadURL**: `https://github.com/easyatm/tampermonkey-script/raw/main/[filename].user.js`

## 文件命名
- 必须以 `.user.js` 结尾。

## README 更新
- 每次新增或重命名脚本后，需同步更新 [README.md](README.md) 中的脚本列表表格。
