// ==UserScript==
// @name         Claude 智能布局优化 (靠左全宽版)
// @namespace    https://github.com/easyatm/tampermonkey-script
// @version      0.26060502
// @description  将 Claude 聊天区域拓宽至 1400px 并完美靠左对齐，右侧留空
// @author       easyatm
// @match        https://claude.ai/*
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://github.com/easyatm/tampermonkey-script/raw/main/claude-layout-optimizer.user.js
// @downloadURL  https://github.com/easyatm/tampermonkey-script/raw/main/claude-layout-optimizer.user.js
// ==/UserScript==

(function() {
    'use strict';

    // ================= 核心尺寸控制 =================
    const MAX_WIDTH = '1440px';     // 聊天框及表格的最大宽度
    const LEFT_MARGIN = '24px';     // 聊天框距离左侧边栏的呼吸间距
    // ================================================

    const customStyle = `
        /* 1. 强行重写 Claude 限制宽度的底层 CSS 变量 */
        :root {
            --container-3xl: ${MAX_WIDTH} !important;
        }

        /* 2. 精准拦截你找到的 .max-w-3xl 容器（包括对话流和底部的输入框） */
        /* 取消居中，强制使其向左看齐，右边无限放空 */
        .max-w-3xl,
        [class*="max-w-3xl"] {
            max-width: ${MAX_WIDTH} !important;
            width: 100% !important;
            box-sizing: border-box !important;

            /* 核心对齐：左边立定，右边把剩余空间吃掉 */
            margin-left: ${LEFT_MARGIN} !important;
            margin-right: auto !important;
        }

        /* 3. 顺手优化：确保 Claude 渲染出来的表格或代码块也能 100% 优雅平摊 */
        .max-w-3xl table,
        table {
            width: 100% !important;
            max-width: 100% !important;
            table-layout: auto !important;
        }

        .max-w-3xl th,
        .max-w-3xl td {
            width: auto !important;
            word-break: break-word !important;
        }
    `;

    GM_addStyle(customStyle);
})();