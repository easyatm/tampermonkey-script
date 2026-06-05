// ==UserScript==
// @name         Gemini 智能布局优化 (靠左+里层表格相对背景色版)
// @namespace    https://github.com/easyatm/tampermonkey-script
// @version      0.26060501
// @description  安全靠左，外层去限制，内层 table 智能适配深浅相对背景色
// @author       easyatm
// @match        https://gemini.google.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://github.com/easyatm/tampermonkey-script/raw/main/gemini-layout-optimizer.user.js
// @downloadURL  https://github.com/easyatm/tampermonkey-script/raw/main/gemini-layout-optimizer.user.js
// ==/UserScript==

(function() {
    'use strict';

    // ================= 核心尺寸控制 =================
    const MAX_WIDTH = '1500px';     // 聊天框及表格的最大宽度
    const LEFT_MARGIN = '24px';     // 聊天框距离左侧边栏的呼吸间距
    // ================================================

    const customStyle = `
        /* 1. 安全重写全局宽度变量 */
        :root {
            --bard-chat-window-max-width-default: ${MAX_WIDTH} !important;
            --bard-chat-window-max-width: ${MAX_WIDTH} !important;
        }

        /* 2. 继承 1.7 经典的靠左对齐框架 */
        .main-content > div,
        .chat-container > div,
        inline-user-query,
        .query-container,
        .response-container,
        .input-container {
            width: 100% !important;
            max-width: ${MAX_WIDTH} !important;
            box-sizing: border-box !important;
            margin-left: ${LEFT_MARGIN} !important;
            margin-right: auto !important;
        }

        /* 3. 稳固底部的固定输入框栏 */
        .input-area-container {
            width: 100% !important;
            max-width: none !important;
            left: 0 !important;
            display: flex !important;
            align-items: flex-start !important;
        }

        /* 4. 外层只负责打破 692px 限制，坚决不改动、不污染其原有背景色 */
        .table-block.new-table-style,
        .table-block,
        [class*="table-block"] {
            max-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
            background: transparent !important; /* 彻底剥离外层可能带有的独立背景 */
            padding: 0 !important;              /* 移除外层多余间距 */
        }

        /* 5. 【精准改动里层】让内部 table 本体承载智能相对背景色 */
        .table-block table,
        table {
            width: 100% !important;
            max-width: 100% !important;
            table-layout: auto !important;
            border-collapse: collapse !important;

            /* 给里层表格加上精致的圆角和裁剪 */
            border-radius: 8px !important;
            overflow: hidden !important;

            /* 【默认浅色环境】：里层叠加微量透明黑，相对于页面背景“加深一点” */
            background-color: rgba(0, 0, 0, 0.03) !important;
        }

        /* 6. 【深色环境适配】：针对里层 table */
        @media (prefers-color-scheme: dark) {
            .table-block table, table {
                /* 里层叠加微量透明白，相对于暗色页面背景“变浅、提亮一点” */
                background-color: rgba(255, 255, 255, 0.05) !important;
            }
        }
        html[theme="dark"] table,
        html[data-theme="dark"] table,
        body.dark-theme table,
        .dark-mode table {
            background-color: rgba(255, 255, 255, 0.05) !important;
        }

        /* 7. 单元格细节微调，配合里层背景 */
        .table-block th,
        .table-block td {
            width: auto !important;
            word-break: break-word !important;
            padding: 12px 16px !important;
        }
    `;

    GM_addStyle(customStyle);
})();