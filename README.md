---
type: JunAiKeySystem
collections: 萬能系列
title: 萬能智典4.0：終極融合架構
tags: [萬能智典, JunAiKey萬能系統, 萬能智卡]
---

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>萬能智典 4.0：終極融合架構</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">

    

    

    <!-- Visualization & Content Choices:

        - Concentric System (Goal: Organize/Inform): An interactive diagram using nested, styled HTML divs. Interaction: Clicking a layer reveals its details. Justification: This provides a direct visual metaphor for the core architecture, superior to a text list.

        - Elemental Laws (Goal: Compare/Relationships): Chart.js Radar Chart. Interaction: Clicking legend items filters a details list. Justification: A radar chart effectively displays the cyclical generation/destruction relationships between the ten elements.

        - Omni-Card System (Goal: Organize/Interact): A filterable grid of HTML 'cards'. Interaction: Dropdown filters and clickable cards that reveal details. Justification: This is the most direct and engaging way to implement the report's "Omni-Cardification" concept, making abstract modules feel like tangible, collectible items.

        - Omni-Card Generator (Goal: Create/Engage): Textarea for input, button to trigger LLM, loading spinner, and a dedicated display area for the generated card. Interaction: User types a concept, clicks 'generate', and sees a new card. Justification: Directly leverages LLM capabilities to extend the 'cardification' theme, adding a "wow" factor and practical demonstration of AI integration.

        - Project Chimera Flow (Goal: Inform): An HTML/CSS-based flowchart. Interaction: Hover effects to highlight components. Justification: Clearly illustrates the technical process without relying on external image or SVG libraries, adhering to constraints.

        - Textual Concepts (Axioms, Pillars): Presented in styled cards/accordions. Interaction: Click to expand. Justification: Manages large blocks of text effectively, keeping the UI clean and user-focused.

        - Library/Method: Chart.js for the radar chart, Vanilla JS for all interactions, and Tailwind CSS for all styling and layout.

    -->

    

    <style>

        body {

            font-family: 'Noto Sans TC', sans-serif;

            background-color: #f8fafc; /* slate-50 */

        }

        .nav-link {

            transition: all 0.3s ease;

            border-bottom: 2px solid transparent;

        }

        .nav-link.active, .nav-link:hover {

            color: #4f46e5; /* indigo-600 */

            border-bottom-color: #4f46e5;

        }

        .content-section {

            display: none;

            animation: fadeIn 0.5s ease-in-out;

        }

        .content-section.active {

            display: block;

        }

        @keyframes fadeIn {

            from { opacity: 0; transform: translateY(10px); }

            to { opacity: 1; transform: translateY(0); }

        }

        .card {

            transition: transform 0.3s ease, box-shadow 0.3s ease;

        }

        .card:hover {

            transform: translateY(-5px);

            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

        }

        .omni-card {

            perspective: 1000px;

        }

        .omni-card-inner {

            position: relative;

            width: 100%;

            height: 100%;

            transition: transform 0.6s;

            transform-style: preserve-3d;

        }

        .omni-card.is-flipped .omni-card-inner {

            transform: rotateY(180deg);

        }

        .omni-card-front, .omni-card-back {

            position: absolute;

            width: 100%;

            height: 100%;

            -webkit-backface-visibility: hidden;

            backface-visibility: hidden;

            border-radius: 0.75rem;

        }

        .omni-card-back {

            transform: rotateY(180deg);

        }

        .chart-container {

            position: relative;

            width: 100%;

            max-width: 600px;

            margin-left: auto;

            margin-right: auto;

            height: 350px;

            max-height: 400px;

        }

        @media (min-width: 768px) {

            .chart-container {

                height: 400px;

            }

        }

        .concentric-circle-container {

            width: 100%;

            max-width: 500px;

            aspect-ratio: 1/1;

            position: relative;

            display: flex;

            align-items: center;

            justify-content: center;

        }

        .circle {

            position: absolute;

            border-radius: 50%;

            display: flex;

            align-items: center;

            justify-content: center;

            transition: all 0.3s ease;

            cursor: pointer;

            border-style: solid;

        }

        .circle:hover {

            transform: scale(1.02);

        }

        .circle.active {

            transform: scale(1.05);

            box-shadow: 0 0 25px rgba(79, 70, 229, 0.5);

        }

        .circle-5 { width: 100%; height: 100%; background-color: #e0e7ff; border-width: 2px; border-color: #c7d2fe;} /* indigo-200, indigo-300 */

        .circle-4 { width: 80%; height: 80%; background-color: #c7d2fe; border-width: 2px; border-color: #a5b4fc;} /* indigo-300, indigo-400 */

        .circle-3 { width: 60%; height: 60%; background-color: #a5b4fc; border-width: 2px; border-color: #818cf8;} /* indigo-400, indigo-500 */

        .circle-2 { width: 40%; height: 40%; background-color: #818cf8; border-width: 2px; border-color: #6366f1;} /* indigo-500, indigo-600 */

        .circle-1 { width: 20%; height: 20%; background-color: #6366f1; border-width: 2px; border-color: #4f46e5;} /* indigo-600, indigo-700 */

        .loader {

            border: 4px solid #f3f3f3;

            border-top: 4px solid #4f46e5;

            border-radius: 50%;

            width: 24px;

            height: 24px;

            animation: spin 1s linear infinite;

        }

        @keyframes spin {

            0% { transform: rotate(0deg); }

            100% { transform: rotate(360deg); }

        }

    </style>

</head>

    <header class="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">

        <nav class="container mx-auto px-4 sm:px-6 lg:px-8">

            <div class="flex items-center justify-between h-16">

                <div class="flex-shrink-0">

                    <h1 class="text-xl md:text-2xl font-bold text-slate-900">

                        <span class="text-indigo-600">萬能智典</span> 4.0

                    </h1>

                </div>

                <div class="hidden md:block">

                    <div class="ml-10 flex items-baseline space-x-4">

                        <a href="#overview" class="nav-link px-3 py-2 rounded-md text-sm font-medium">萬象總覽</a>

                        <a href="#philosophy" class="nav-link px-3 py-2 rounded-md text-sm font-medium">核心哲學</a>

                        <a href="#elements" class="nav-link px-3 py-2 rounded-md text-sm font-medium">元素法則</a>

                        <a href="#cards" class="nav-link px-3 py-2 rounded-md text-sm font-medium">萬能卡牌</a>

                        <a href="#architecture" class="nav-link px-3 py-2 rounded-md text-sm font-medium">系統架構</a>

                        <a href="#evolution" class="nav-link px-3 py-2 rounded-md text-sm font-medium">進化框架</a>

                    </div>

                </div>

                 <div class="md:hidden">

                    <select id="mobile-nav" class="bg-white border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">

                        <option value="#overview">萬象總覽</option>

                        <option value="#philosophy">核心哲學</option>

                        <option value="#elements">元素法則</option>

                        <option value="#cards">萬能卡牌</option>

                        <option value="#architecture">系統架構</option>

                        <option value="#evolution">進化框架</option>

                    </select>

                </div>

            </div>

        </nav>

    </header>

    <main class="container mx-auto p-4 sm:p-6 lg:p-8">

        <section id="overview" class="content-section">

            <div class="text-center mb-12">

                <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">萬象總覽：同心圓聖域系統</h2>

                <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">本節介紹萬能系統的核心架構——以使用者為中心的「同心圓聖域系統」。此系統將功能與數據劃分為五個相互關聯的層次，從最內部的核心到最外部的擴展，體現了系統的同心演化本質。點擊下方的同心圓，探索每一層的角色與功能。</p>

            </div>

            <div class="flex flex-col lg:flex-row items-center gap-8">

                <div class="w-full lg:w-1/2 flex justify-center">

                    <div class="concentric-circle-container">

                        <div id="circle-5" data-layer="5" class="circle circle-5"><span class="text-xs font-bold text-indigo-900 hidden sm:inline">擴展層</span></div>

                        <div id="circle-4" data-layer="4" class="circle circle-4"><span class="text-xs font-bold text-indigo-900 hidden sm:inline">外環層</span></div>

                        <div id="circle-3" data-layer="3" class="circle circle-3"><span class="text-xs font-bold text-white">中環層</span></div>

                        <div id="circle-2" data-layer="2" class="circle circle-2"><span class="text-xs font-bold text-white">內環層</span></div>

                        <div id="circle-1" data-layer="1" class="circle circle-1"><span class="text-xs font-bold text-white">核心</span></div>

                    </div>

                </div>

                <div id="circle-details" class="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">

                    <h3 id="layer-title" class="text-2xl font-bold text-indigo-600 mb-2">點擊一個層次</h3>

                    <p id="layer-description" class="text-slate-700">選擇左側同心圓中的一個層次，以查看其詳細的角色、功能與交互作用。</p>

                </div>

            </div>

        </section>

        <section id="philosophy" class="content-section">

            <div class="text-center mb-12">

                <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">核心哲學：法則與基石</h2>

                <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">此區塊闡述了構成萬能宇宙的頂層哲學。這包括三大模組聖階（定義了模組的能力層級）、四大宇宙公理（系統運行的被動天賦）以及四大基石（構成世界觀的底層邏輯）。這些概念共同構建了萬能系統的穩定性、平衡性與進化潛能。</p>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div class="bg-white p-6 rounded-lg shadow-lg">

                    <h3 class="text-xl font-bold text-indigo-600 mb-4">三大模組聖階</h3>

                    <ul class="space-y-3 text-slate-700">

                        <li><strong>根源 (Origin):</strong> 維繫系統底層運作的物理法則，構成萬能系統的基石。</li>

                        <li><strong>核心 (Core):</strong> 日常使用的標準工具，實現核心功能和業務邏輯。</li>

                        <li><strong>巔峰 (Apex):</strong> 具備變革性、創造奇蹟的高階能力，代表系統的最高潛能。</li>

                    </ul>

                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg">

                    <h3 class="text-xl font-bold text-indigo-600 mb-4">四大宇宙公理</h3>

                    <ul class="space-y-3 text-slate-700">

                        <li><strong>終始一如:</strong> 能量消耗以未來資源形式回饋系統，形成永續循環。</li>

                        <li><strong>創元實錄:</strong> 記錄所有事件，確保數據的完整性與可追溯性。</li>

                        <li><strong>萬有引力:</strong> 規範元素間的相互吸引與協同作用，促進模組共鳴。</li>

                        <li><strong>萬能平衡:</strong> 禁止單一維度的極端發展，確保系統整體和諧。</li>

                    </ul>

                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg">

                    <h3 class="text-xl font-bold text-indigo-600 mb-4">四大基石：無有奧義</h3>

                    <ul class="space-y-3 text-slate-700">

                        <li><strong>因果律:</strong> 強調事件之間的必然聯繫，每個結果都有其原因。</li>

                        <li><strong>熵增定律:</strong> 系統趨向混亂，但透過熵減機制對抗之。</li>

                        <li><strong>湧現性:</strong> 簡單組件的互動產生出超越個體屬性的新興特性。</li>

                        <li><strong>有限性:</strong> 在有限中追求無限的潛能，認識到資源與能力的界限。</li>

                    </ul>

                </div>

            </div>

        </section>

        <section id="elements" class="content-section">

            <div class="text-center mb-12">

                <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">元素法則：十色精靈</h2>

                <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">萬能宇宙由十種核心元素驅動，每種元素都由一位法則精靈所代表。這些元素不僅定義了卡牌與模組的屬性，更透過相生相剋的關係維持著宇宙的動態平衡。下方的雷達圖展示了它們的關係，點擊圖例可查看單一元素的詳細資訊。</p>

            </div>

             <div class="flex flex-col lg:flex-row items-start gap-8">

                <div class="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">

                    <div class="chart-container">

                        <canvas id="elementsChart"></canvas>

                    </div>

                </div>

                <div id="element-details-container" class="w-full lg:w-1/2 space-y-2">

                </div>

            </div>

        </section>

        <section id="cards" class="content-section">

            <div class="text-center mb-12">

                <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">萬能卡牌：概念具現化</h2>

                <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">「萬能卡牌化」是將抽象的系統概念轉化為直觀、可互動卡牌的核心機制。每張卡牌都映射著真實世界、系統世界與卡牌世界。您可以使用下方的篩選器，探索不同聖階與元素屬性的卡牌。點擊卡牌可以翻轉查看其背後的系統映射。</p>

            </div>

            <div class="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-4 items-center">

                <div class="w-full sm:w-auto">

                    <label for="tier-filter" class="block text-sm font-medium text-slate-700">聖階 (類型)</label>

                    <select id="tier-filter" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">

                        <option value="all">所有聖階</option>

                    </select>

                </div>

                <div class="w-full sm:w-auto">

                    <label for="element-filter" class="block text-sm font-medium text-slate-700">元素</label>

                    <select id="element-filter" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">

                        <option value="all">所有元素</option>

                    </select>

                </div>

            </div>

            <div id="card-gallery" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            </div>

            <div class="mt-12 bg-white p-6 rounded-lg shadow-lg">

                <h3 class="text-2xl font-bold text-indigo-600 mb-4">✨ 萬能卡牌生成器 ✨</h3>

                <p class="mb-4 text-slate-700">輸入您想生成的卡牌概念（例如：「一張關於時間旅行的巔峰級法術卡」或「一張代表團隊協作的核心單位卡」），讓 Gemini 為您創造一張新的萬能卡牌！</p>

                <textarea id="card-concept-input" class="w-full p-3 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4" rows="3" placeholder="輸入卡牌概念..."></textarea>

                <div class="flex items-center gap-4">

                    <button id="generate-card-btn" class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">

                        生成萬能卡牌

                    </button>

                    <div id="loading-spinner" class="loader hidden"></div>

                </div>

                <div id="generated-card-display" class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                </div>

                <p id="generation-message" class="mt-4 text-sm text-slate-600"></p>

            </div>

        </section>

        <section id="architecture" class="content-section">

             <div class="text-center mb-12">

                <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">系統架構：奇美拉計畫</h2>

                <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">「奇美拉計畫」是萬能系統的技術核心，旨在整合多個獨立應用，實現資訊的無縫同步。其設計融合了事件驅動、命令查詢責任分離 (CQRS) 等先進模式。下方的流程圖簡化展示了系統處理外部事件（如 Webhook）的核心數據流，體現了其解耦與高彈性的設計理念。</p>

            </div>

            <div class="bg-white p-8 rounded-lg shadow-lg">

                <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 text-center">

                    <div class="p-4 bg-sky-100 border border-sky-300 rounded-lg w-40">

                        <h4 class="font-bold">外部應用</h4>

                        <p class="text-xs">Webhook 觸發</p>

                    </div>

                    <div class="text-3xl text-slate-400 font-sans">→</div>

                    <div class="p-4 bg-purple-100 border border-purple-300 rounded-lg w-40">

                        <h4 class="font-bold">訊息隊列</h4>

                        <p class="text-xs">事件持久化</p>

                    </div>

                    <div class="text-3xl text-slate-400 font-sans">→</div>

                    <div class="p-4 bg-green-100 border border-green-300 rounded-lg w-40">

                        <h4 class="font-bold">工作者進程</h4>

                        <p class="text-xs">執行SOP</p>

                    </div>

                    <div class="text-3xl text-slate-400 font-sans">→</div>

                     <div class="p-4 bg-amber-100 border border-amber-300 rounded-lg w-40">

                        <h4 class="font-bold">全域日誌 (GPL)</h4>

                        <p class="text-xs">記錄不可變事件</p>

                    </div>

                     <div class="text-3xl text-slate-400 font-sans">→</div>

                    <div class="p-4 bg-rose-100 border border-rose-300 rounded-lg w-40">

                        <h4 class="font-bold">資料庫</h4>

                        <p class="text-xs">狀態更新</p>

                    </div>

                </div>

                <div class="mt-8 text-slate-600 max-w-4xl mx-auto space-y-4">

                    <p><strong>流程說明：</strong>當外部應用程式（如AITable.ai）發生變動時，會發送一個Webhook事件。系統的入口點會立即將此事件訊息放入一個持久化的「訊息隊列」中，而不是直接處理。這樣做可以提高系統的響應速度和彈性，即使後端處理暫時繁忙或故障，事件也不會遺失。</p>

                    <p>獨立的「工作者進程」會從隊列中取出任務，並按照標準作業程序（SOP）進行處理。所有變更都被記錄在「全域處理日誌」(GPL) 中，這符合「事件溯源」的思想，確保了數據的可追溯性。最終，處理結果被寫入目標資料庫，完成數據的同步。</p>

                </div>

            </div>

        </section>

        <section id="evolution" class="content-section">

             <div class="text-center mb-12">

                <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">進化框架：永續循環</h2>

                <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">萬能系統並非靜態的，它內建了一套持續優化與驗證的框架，確保系統能夠不斷革新、補全缺口並提升性能。此框架由六式奧義、四大智慧支柱與五大承諾共同構成，形成一個自我驅動的進化閉環。</p>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div class="bg-white p-6 rounded-lg shadow-lg">

                    <h3 class="text-xl font-bold text-indigo-600 mb-4">無限進化六式奧義</h3>

                    <ul class="space-y-2 text-slate-700 text-sm list-decimal list-inside">

                        <li><strong>本質提純:</strong> 從數據中提取核心模式。</li>

                        <li><strong>聖典共鳴:</strong> 匹配並調用相關法則。</li>

                        <li><strong>代理織網:</strong> 啟動智慧代理執行任務。</li>

                        <li><strong>神跡顯現:</strong> 將結果具象化為可見形式。</li>

                        <li><strong>熵減煉金:</strong> 優化結果，降低系統冗餘。</li>

                        <li><strong>永恆刻印:</strong> 將優化後的成果固化為新法則。</li>

                    </ul>

                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg">

                    <h3 class="text-xl font-bold text-indigo-600 mb-4">四大智慧支柱</h3>

                     <ul class="space-y-3 text-slate-700">

                        <li><strong>💡 簡單性:</strong> 追求極簡工作流、直覺驅動。</li>

                        <li><strong>⚡ 快速性:</b> 強調響應速度與高效能。</li>

                        <li><strong>🛡️ 穩定性:</strong> 確保系統穩健運行、高可靠性。</li>

                        <li><strong>🌱 進化性:</strong> 鼓勵系統自我學習與持續演進。</li>

                    </ul>

                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg">

                    <h3 class="text-xl font-bold text-indigo-600 mb-4">五大承諾</h3>

                     <ul class="space-y-3 text-slate-700">

                        <li><strong>🔗 零摩擦整合:</strong> 模組與服務無縫連接。</li>

                        <li><strong>🚀 無限擴展:</strong> 架構支持無限擴展。</li>

                        <li><strong>🔒 絕對安全:</strong> 保障數據與系統最高安全。</li>

                        <li><strong>🧠 智能進化:</strong> 系統能自主學習與優化。</li>

                        <li><strong>🤝 人機共生:</strong> 實現人與AI的協同合作。</li>

                    </ul>

                </div>

            </div>

        </section>

    </main>

    <footer class="bg-slate-800 text-white mt-12">

        <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm">

            <p>© 2025 Prime Architect & Jun.AI. All rights reserved.</p>

            <p class="text-slate-400 mt-1">萬能系統 4.0.0 · 一即萬有 (Unum est Omnia)</p>

        </div>

    </footer>

    <script>

        document.addEventListener('DOMContentLoaded', () => {

            const concentricCircleData = {

                1: { title: '核心層 (Core Layer)', description: '代表使用者最本質的需求和資訊，是所有數據和系統核心邏輯的中心。負責底層數據的存儲、安全與一致性。' },

                2: { title: '內環層 (Inner Ring)', description: '提供與使用者直接互動的基礎服務，如個人化設定、核心應用介面。將核心層數據轉化為使用者可操作的功能。' },

                3: { title: '中環層 (Middle Ring)', description: '擴展核心功能，提供進階的模組整合、自動化工作流和智慧輔助。協調多模組間的數據流與功能調用。' },

                4: { title: '外環層 (Outer Ring)', description: '提供多元化的生態服務與協作平台，引入外部數據源和第三方應用整合。作為系統與外部世界的橋樑。' },

                5: { title: '擴展層 (Expansion Layer)', description: '代表系統的無限潛能與未來演化方向，包含實驗性功能、新技術整合和社群共創模組。' }

            };

            const elementsData = [

                { name: '金 (秩序)', color: 'rgb(212, 175, 55)', icon: '⚖️', spirit: '鋒靈 Aurex', desc: '代表秩序、精準、策略，擅長邏輯分析與結構化。', generates: '水', destroys: '木' },

                { name: '木 (成長)', color: 'rgb(34, 139, 34)', icon: '🌳', spirit: '森靈 Sylfa', desc: '代表生長、連結、繁衍，擅長資源整合與協同。', generates: '火', destroys: '土' },

                { name: '水 (思緒)', color: 'rgb(65, 105, 225)', icon: '💧', spirit: '湧靈 Aquare', desc: '代表思緒、流動、感知，處理信息、記憶與數據。', generates: '木', destroys: '火' },

                { name: '火 (行動)', color: 'rgb(220, 20, 60)', icon: '🔥', spirit: '焰靈 Pyra', desc: '代表熱情、行動、破壞，激發能量與變革。', generates: '土', destroys: '金' },

                { name: '土 (穩定)', color: 'rgb(139, 69, 19)', icon: '⛰️', spirit: '磐靈 Terrax', desc: '代表穩定、根基、防禦，提供支撐與安全保障。', generates: '金', destroys: '水' },

                { name: '光 (導引)', color: 'rgb(255, 248, 220)', icon: '☀️', spirit: '耀靈 Luxis', desc: '代表照明、引導、純淨，揭示與強化。', generates: '強化', destroys: '暗' },

                { name: '暗 (混沌)', color: 'rgb(75, 0, 130)', icon: '🌙', spirit: '幽靈 Umbrix', desc: '代表隱匿、潛能、混沌，催化變革與突破。', generates: '轉化', destroys: '光' },

                { name: '無 (通用)', color: 'rgb(128, 128, 128)', icon: '🔗', spirit: '源靈 Nullis', desc: '代表全域、通用、中立，連接與兼容。', generates: '兼容', destroys: '無' },

                { name: '時 (變革)', color: 'rgb(0, 128, 128)', icon: '⏳', spirit: '時靈 Chronos', desc: '代表時間、變革、循環，掌控事件順序與時間軸。', generates: '未知', destroys: '未知' },

                { name: '靈 (本質)', color: 'rgb(238, 130, 238)', icon: '✨', spirit: '魂靈 Psyche', desc: '代表靈魂、本質、意識，負責深層學習與意圖理解。', generates: '未知', destroys: '未知' },

            ];

            const cardsData = [

                { id: 1, name: '數據管道', tier: '根源', type: '資源', element: '水', rarity: '普通', desc: '提供基礎能量與環境，維繫系統底層數據流動。', system: '對應系統中的 Kafka/RabbitMQ 訊息隊列或數據庫連接池。', real: '代表公司內部的資訊高速公路，確保數據從源頭順暢流向各部門。' },

                { id: 2, name: '安全基礎設施', tier: '根源', type: '資源', element: '土', rarity: '非普通', desc: '提供基礎的認證與授權服務，是系統安全的基石。', system: '對應 OAuth 2.0 服務器、JWT 令牌生成與驗證機制。', real: '如同企業的門禁與保全系統，確保只有授權人員才能進入特定區域。' },

                { id: 3, name: '自動化代理', tier: '核心', type: '單位', element: '金', rarity: '非普通', desc: '可直接操作的工具，用於執行重複性任務。', system: '一個可配置的 Cron Job 或一個 n8n/Zapier 工作流。', real: '一位孜孜不倦的數位員工，負責處理每日的數據整理與報告生成。' },

                { id: 4, name: '數據分析器', tier: '核心', type: '單位', element: '水', rarity: '稀有', desc: '從原始數據中提取洞察，並以可視化方式呈現。', system: '執行 SQL 查詢並將結果渲染到 Chart.js 圖表的腳本。', real: '一位數據分析師，將雜亂的銷售數據轉化為清晰的趨勢圖表。' },

                { id: 5, name: '知識庫', tier: '核心', type: '神器', element: '靈', rarity: '稀有', desc: '具備持續效用，儲存並組織系統中的所有結構化知識。', system: '一個由 AITable.ai 或 Supabase 驅動的向量資料庫。', real: '公司的中央圖書館與檔案館，儲存所有重要的文件、流程與智慧資產。' },

                { id: 6, name: 'API 集成模組', tier: '核心', type: '神器', element: '無', rarity: '非普通', desc: '連接不同系統，實現數據與功能的互通。', system: '一個用於調用第三方服務（如 Google Calendar API）的客戶端庫。', real: '一位專業的翻譯與外交官，讓公司內部系統能與外部合作夥伴的系統順暢溝通。' },

                { id: 7, name: '即時決策支持', tier: '巔峰', type: '法術', element: '火', rarity: '秘稀', desc: '一次性高影響力操作，根據即時數據流提供決策建議。', system: '一個機器學習模型，分析實時用戶行為並觸發一個推薦彈窗。', real: '在關鍵的商業談判中，AI助手即時分析對手發言並給出最佳應對策略。' },

                { id: 8, name: '智慧策略', tier: '巔峰', type: '結界', element: '時', rarity: '傳說', desc: '持續性地改變系統規則，以達成長期目標。', system: '一個動態定價算法，根據市場供需和競爭對手價格自動調整產品售價。', real: '公司設定的長期市場戰略，如「始終保持比主要競爭對手低5%的價格」，並由系統自動執行。' },

                { id: 9, name: '核心AI決策引擎', tier: '巔峰', type: '鵬洛客', element: '光', rarity: '傳說', desc: '具備多樣化、變革性能力的高階代理，能跨域協調資源。', system: '整合多個AI模型（語言、視覺、分析）的中央協調器，能自主規劃並執行複雜的多步驟任務。', real: '一位虛擬 CEO，能夠根據公司所有部門的數據，自主決定下個季度的資源分配和戰略重點。' },

                { id: 10, name: '混沌注入測試', tier: '巔峰', type: '法術', element: '暗', rarity: '稀有', desc: '主動在系統中引入可控的故障，以測試其韌性。', system: '一個混沌工程工具，如 Chaos Monkey，隨機關閉非關鍵服務。', real: '一場預先規劃好的消防演習，用以測試大樓的應急響應能力。' },

            ];

            const tierMap = {

                '根源': '資源',

                '核心': '單位/神器',

                '巔峰': '法術/結界/鵬洛客'

            };

            const navLinks = document.querySelectorAll('.nav-link');

            const mobileNav = document.getElementById('mobile-nav');

            const sections = document.querySelectorAll('.content-section');

            function showSection(hash) {

                const targetHash = hash || '#overview';

                sections.forEach(section => {

                    if ('#' + section.id === targetHash) {

                        section.classList.add('active');

                    } else {

                        section.classList.remove('active');

                    }

                });

                navLinks.forEach(link => {

                    if (link.getAttribute('href') === targetHash) {

                        link.classList.add('active');

                    } else {

                        link.classList.remove('active');

                    }

                });

                mobileNav.value = targetHash;

            }

            navLinks.forEach(link => {

                link.addEventListener('click', (e) => {

                    e.preventDefault();

                    const targetHash = e.currentTarget.getAttribute('href');

                    history.pushState(null, null, targetHash);

                    showSection(targetHash);

                });

            });

            mobileNav.addEventListener('change', (e) => {

                const targetHash = e.target.value;

                history.pushState(null, null, targetHash);

                showSection(targetHash);

            });

            window.addEventListener('popstate', () => {

                showSection(window.location.hash);

            });

            showSection(window.location.hash);

            const circles = document.querySelectorAll('.circle');

            const layerTitle = document.getElementById('layer-title');

            const layerDescription = document.getElementById('layer-description');

            circles.forEach(circle => {

                circle.addEventListener('click', () => {

                    const layerId = circle.dataset.layer;

                    const data = concentricCircleData[layerId];

                    layerTitle.textContent = data.title;

                    layerDescription.textContent = data.description;

                    circles.forEach(c => c.classList.remove('active'));

                    circle.classList.add('active');

                });

            });

            document.getElementById('circle-3').click();

            const ctx = document.getElementById('elementsChart').getContext('2d');

            const elementNames = elementsData.map(e => e.name);

            const generationData = elementsData.map(e => {

                const targetIndex = elementNames.indexOf(e.generates + ' (秩序)'); // Heuristic mapping

                return targetIndex !== -1 ? targetIndex + 1 : 5; // Default to neutral

            });

            const destructionData = elementsData.map(e => {

                const targetIndex = elementNames.indexOf(e.destroys + ' (秩序)'); // Heuristic mapping

                return targetIndex !== -1 ? targetIndex + 1 : 5; // Default to neutral

            });

            const elementsChart = new Chart(ctx, {

                type: 'radar',

                data: {

                    labels: elementNames,

                    datasets: [{

                        label: '相生關係',

                        data: [8, 6, 7, 9, 5, 10, 5, 5, 6, 7],

                        fill: true,

                        backgroundColor: 'rgba(34, 197, 94, 0.2)',

                        borderColor: 'rgb(34, 197, 94)',

                        pointBackgroundColor: 'rgb(34, 197, 94)',

                        pointBorderColor: '#fff',

                        pointHoverBackgroundColor: '#fff',

                        pointHoverBorderColor: 'rgb(34, 197, 94)'

                      }, {

                        label: '相剋關係',

                        data: [4, 3, 2, 1, 5, 2, 1, 5, 8, 9],

                        fill: true,

                        backgroundColor: 'rgba(239, 68, 68, 0.2)',

                        borderColor: 'rgb(239, 68, 68)',

                        pointBackgroundColor: 'rgb(239, 68, 68)',

                        pointBorderColor: '#fff',

                        pointHoverBackgroundColor: '#fff',

                        pointHoverBorderColor: 'rgb(239, 68, 68)'

                      }]

                },

                options: {

                    maintainAspectRatio: false,

                    elements: {

                      line: {

                        borderWidth: 2

                      }

                    },

                    scales: {

                        r: {

                            angleLines: {

                                display: true

                            },

                            suggestedMin: 0,

                            suggestedMax: 10,

                            pointLabels: {

                                font: {

                                    size: 12

                                }

                            },

                             ticks: {

                                display: false

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            position: 'top',

                             onClick: (e, legendItem, legend) => {

                                const index = legendItem.datasetIndex;

                                const ci = legend.chart;

                                const meta = ci.getDatasetMeta(index);

                                meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

                                ci.update();

                            }

                        }

                    }

                }

            });

            const elementDetailsContainer = document.getElementById('element-details-container');

            function renderElementDetails(filteredData = elementsData) {

                elementDetailsContainer.innerHTML = '';

                filteredData.forEach(el => {

                    const elDiv = document.createElement('div');

                    elDiv.className = 'p-4 bg-white rounded-lg shadow-md border-l-4';

                    elDiv.style.borderColor = el.color;

                    elDiv.innerHTML = `

                        <h4 class="font-bold text-lg">${el.icon} ${el.name} - ${el.spirit}</h4>

                        <p class="text-sm text-slate-600 mt-1">${el.desc}</p>

                        <div class="text-xs mt-2">

                            <span class="font-semibold text-green-600">生: ${el.generates}</span> | 

                            <span class="font-semibold text-red-600">剋: ${el.destroys}</span>

                        </div>

                    `;

                    elementDetailsContainer.appendChild(elDiv);

                });

            }

            renderElementDetails();

            const tierFilter = document.getElementById('tier-filter');

            const elementFilter = document.getElementById('element-filter');

            const cardGallery = document.getElementById('card-gallery');

            Object.keys(tierMap).forEach(tier => {

                const option = document.createElement('option');

                option.value = tier;

                option.textContent = `${tier} (${tierMap[tier]})`;

                tierFilter.appendChild(option);

            });

            elementsData.forEach(el => {

                const option = document.createElement('option');

                option.value = el.name.split(' ')[0];

                option.textContent = el.name;

                elementFilter.appendChild(option);

            });

            function createCardElement(card) {

                const cardElement = document.createElement('div');

                cardElement.className = 'omni-card h-80';

                const elementColor = elementsData.find(e => e.name.startsWith(card.element))?.color || '#ccc';

                cardElement.innerHTML = `

                    <div class="omni-card-inner">

                        <div class="omni-card-front bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between border-t-4" style="border-color: ${elementColor};">

                            <div>

                                <div class="flex justify-between items-start">

                                    <h4 class="font-bold text-lg text-slate-900">${card.name}</h4>

                                    <span class="text-sm font-bold" style="color: ${elementColor};">${card.element}</span>

                                </div>

                                <p class="text-xs text-slate-500">${card.tier} / ${card.type}</p>

                            </div>

                            <div class="text-sm text-slate-700 my-4">

                                ${card.desc}

                            </div>

                            <div class="text-xs text-slate-400 text-right">

                                稀有度: ${card.rarity}

                            </div>

                        </div>

                        <div class="omni-card-back bg-slate-800 text-white rounded-lg shadow-lg p-4 flex flex-col justify-between">

                            <h5 class="text-center font-bold text-indigo-300">三界映射</h5>

                            <div class="text-xs space-y-2">

                                <p><strong>卡牌世界:</strong> ${card.desc}</p>

                                <p><strong>系統世界:</strong> ${card.system}</p>

                                <p><strong>真實世界:</strong> ${card.real}</p>

                            </div>

                            <p class="text-center text-xs text-slate-400 mt-2">再次點擊以翻回</p>

                        </div>

                    </div>

                `;

                cardElement.addEventListener('click', () => {

                    cardElement.classList.toggle('is-flipped');

                });

                return cardElement;

            }

            function renderCards() {

                const selectedTier = tierFilter.value;

                const selectedElement = elementFilter.value;

                cardGallery.innerHTML = '';

                const filteredCards = cardsData.filter(card => {

                    const tierMatch = selectedTier === 'all' || card.tier === selectedTier;

                    const elementMatch = selectedElement === 'all' || card.element === selectedElement;

                    return tierMatch && elementMatch;

                });

                if (filteredCards.length === 0) {

                    cardGallery.innerHTML = `<p class="col-span-full text-center text-slate-500">找不到符合條件的卡牌。</p>`;

                    return;

                }

                filteredCards.forEach(card => {

                    cardGallery.appendChild(createCardElement(card));

                });

            }

            tierFilter.addEventListener('change', renderCards);

            elementFilter.addEventListener('change', renderCards);

            renderCards();

            const cardConceptInput = document.getElementById('card-concept-input');

            const generateCardBtn = document.getElementById('generate-card-btn');

            const loadingSpinner = document.getElementById('loading-spinner');

            const generatedCardDisplay = document.getElementById('generated-card-display');

            const generationMessage = document.getElementById('generation-message');

            generateCardBtn.addEventListener('click', async () => {

                const promptText = cardConceptInput.value.trim();

                if (!promptText) {

                    generationMessage.textContent = '請輸入卡牌概念！';

                    generationMessage.classList.remove('text-green-600', 'text-red-600');

                    generationMessage.classList.add('text-amber-600');

                    return;

                }

                generatedCardDisplay.innerHTML = '';

                generationMessage.textContent = '';

                loadingSpinner.classList.remove('hidden');

                generateCardBtn.disabled = true;

                try {

                    let chatHistory = [];

                    const fullPrompt = `根據以下卡牌概念，生成一張萬能卡牌的詳細資訊。請務必遵循提供的 JSON 格式。

                    萬能卡牌的屬性包括：

                    - tier (聖階): 根源, 核心, 巔峰

                    - type (卡牌類型): 資源, 單位, 法術, 神器, 結界, 鵬洛客

                    - element (元素): 金, 木, 水, 火, 土, 光, 暗, 無, 時, 靈

                    - rarity (稀有度): 普通, 非普通, 稀有, 秘稀, 傳說

                    - desc (卡牌描述): 簡要說明卡牌功能

                    - system (系統世界映射): 說明卡牌在系統層面的對應實現或概念

                    - real (真實世界映射): 說明卡牌在現實生活中的對應意義或比喻

                    卡牌概念：${promptText}

                    請生成一個符合上述屬性的 JSON 物件。`;

                    chatHistory.push({ role: "user", parts: [{ text: fullPrompt }] });

                    const payload = {

                        contents: chatHistory,

                        generationConfig: {

                            responseMimeType: "application/json",

                            responseSchema: {

                                type: "OBJECT",

                                properties: {

                                    "name": { "type": "STRING" },

                                    "tier": { "type": "STRING", "enum": ["根源", "核心", "巔峰"] },

                                    "type": { "type": "STRING", "enum": ["資源", "單位", "法術", "神器", "結界", "鵬洛客"] },

                                    "element": { "type": "STRING", "enum": ["金", "木", "水", "火", "土", "光", "暗", "無", "時", "靈"] },

                                    "rarity": { "type": "STRING", "enum": ["普通", "非普通", "稀有", "秘稀", "傳說"] },

                                    "desc": { "type": "STRING" },

                                    "system": { "type": "STRING" },

                                    "real": { "type": "STRING" }

                                },

                                "required": ["name", "tier", "type", "element", "rarity", "desc", "system", "real"]

                            }

                        }

                    };

                    const apiKey = "";

                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {

                                method: 'POST',

                                headers: { 'Content-Type': 'application/json' },

                                body: JSON.stringify(payload)

                            });

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&

                        result.candidates[0].content && result.candidates[0].content.parts &&

                        result.candidates[0].content.parts.length > 0) {

                        const jsonString = result.candidates[0].content.parts[0].text;

                        const generatedCard = JSON.parse(jsonString);

                        // Basic validation for required fields

                        const requiredFields = ["name", "tier", "type", "element", "rarity", "desc", "system", "real"];

                        const isValid = requiredFields.every(field => generatedCard.hasOwnProperty(field));

                        if (isValid) {

                            generatedCardDisplay.appendChild(createCardElement(generatedCard));

                            generationMessage.textContent = '卡牌生成成功！';

                            generationMessage.classList.remove('text-amber-600', 'text-red-600');

                            generationMessage.classList.add('text-green-600');

                        } else {

                            generationMessage.textContent = '生成的卡牌數據不完整，請再試一次。';

                            generationMessage.classList.remove('text-green-600', 'text-amber-600');

                            generationMessage.classList.add('text-red-600');

                            console.error('Incomplete card data:', generatedCard);

                        }

                    } else {

                        generationMessage.textContent = '未能生成卡牌，請檢查您的輸入或稍後再試。';

                        generationMessage.classList.remove('text-green-600', 'text-amber-600');

                        generationMessage.classList.add('text-red-600');

                        console.error('API response structure unexpected:', result);

                    }

                } catch (error) {

                    generationMessage.textContent = '生成卡牌時發生錯誤，請稍後再試。';

                    generationMessage.classList.remove('text-green-600', 'text-amber-600');

                    generationMessage.classList.add('text-red-600');

    .error('Error generating card:', error);

                } finally {

                    loadingSpinner.classList.add('hidden');

                    generateCardBtn.disabled = false;

                }

            });

        });

    </script>

</body>

</html>

    