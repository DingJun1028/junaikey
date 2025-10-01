// ==UserScript==
// @name         Stay Pro+ vAbsolute-Stay – 永恆編纂・即刻生效 (神使心流介面)
// @namespace    http://tampermonkey.net/
// @version      vAbsolute-Stay
// @description  《聖鑰之心・vAbsolute-Stay》—— 永恆編纂・即刻生效。將您的三大意志編織為具體權能，創造可懸浮、可拖動的終端介面，作為您在網路維度中的「駕駛艙」。
// @author       Jun.AI.Key Collective
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    /**
     * @typedef {object} Avatar
     * @property {string} id - Unique identifier for the avatar.
     * @property {string} name - Display name of the avatar.
     * @property {number} level - Current level of the avatar.
     * @property {number} exp - Current experience points.
     * @property {number} expToNextLevel - Experience needed for the next level.
     * @property {number} skillPoints - Points available for skills (not used in this version, but for future).
     * @property {number} relicPoints - Points available for relics (not used in this version, but for future).
     * @property {string[]} skills - Array of IDs of learned skills.
     * @property {string[]} relics - Array of IDs of collected relics.
     * @property {string[]} equippedRelics - Array of IDs of equipped relics.
     * @property {Object.<string, number>} meceMastery - Object mapping MECE principle IDs to mastery count.
     * @property {Object.<string, number>} lastRelicActivation - Object mapping active relic IDs to their last activation timestamp.
     * @property {Array<HistoryEvent>} history - Chronological record of avatar events.
     * @property {Array<MemoryFragment>} memoryFragments - Array of stored memory fragments. // New: Memory Fragments
     */

    /**
     * @typedef {object} SkillDefinition
     * @property {string} id - Unique ID for the skill.
     * @property {string} name - Display name of the skill.
     * @property {'active' | 'passive'} type - Type of skill.
     * @property {string} description - Description of the skill.
     * @property {number} minLevel - Minimum level required to learn.
     * @property {number} expCost - Experience cost to learn.
     * @property {function(Avatar): void | function(Avatar, string): void} effect - Function to apply skill effect.
     * @property {number} [cooldown] - Cooldown in milliseconds for active skills.
     */

    /**
     * @typedef {object} RelicDefinition
     * @property {string} id - Unique ID for the relic.
     * @property {string} name - Display name of the relic.
     * @property {'active' | 'passive'} type - Type of relic.
     * @property {'head' | 'body' | 'hand' | 'foot' | 'accessory' | 'none'} part - Body part for equipping.
     * @property {string} description - Description of the relic.
     * @property {number} minLevel - Minimum level required to collect.
     * @property {number} expCost - Experience cost to collect.
     * @property {function(Avatar): void | function(Avatar, string): void} effect - Function to apply relic effect.
     * @property {number} [cooldown] - Cooldown in milliseconds for active relics.
     */

    /**
     * @typedef {object} MECEPrinciple
     * @property {string} id - Unique ID for the principle.
     * @property {string} name - Display name.
     * @property {string} description - Description.
     */

    /**
     * @typedef {object} HistoryEvent
     * @property {string} timestamp - ISO string of when the event occurred.
     * @property {string} type - Type of event (e.g., 'EXP_GAIN', 'LEVEL_UP', 'SKILL_LEARNED', 'RELIC_COLLECTED', 'MECE_TRIGGERED').
     * @property {any} [details] - Optional additional details.
     */

    /**
     * @typedef {object} MemoryFragment // New: Memory Fragment Type
     * @property {string} id - Unique ID for the memory fragment.
     * @property {string} content - The text content of the fragment.
     * @property {string} url - The URL where the fragment was captured.
     * @property {string} timestamp - ISO string of when the fragment was created.
     * @property {string} [tags] - Optional tags for the fragment.
     */

    // --- 1. 集中化配置 (CONFIG 物件) ---
    const CONFIG = {
        VERSION: 'vAbsolute-Stay', // Updated version
        STORAGE_KEYS: {
            AVATARS: 'junaikey_avatars_v4', // Updated storage key for v4.9 to ensure data migration
            ACTIVE_AVATAR_ID: 'junaikey_active_avatar_id',
            STRAICO_KEY: 'junaikey_straico_key',
            ORB_POSITION: 'junaikey_orb_position', // New: Store orb position
        },
        UI_IDS: {
            ORB_CONTAINER: 'junaikey-orb-container',
            ORB_ICON: 'junaaikey-orb-icon',
            ORB_NAME: 'junaaikey-orb-name',
            MENU_CONTAINER: 'junaaikey-menu-container',
            MENU_HEADER: 'junaaikey-menu-header',
            MENU_TABS: 'junaaikey-menu-tabs',
            MENU_CONTENT: 'junaaikey-menu-content',
            AVATAR_LIST_PANEL: 'junaaikey-avatar-list-panel',
            PERSONA_PANEL: 'junaaikey-persona-panel',
            SKILLS_PANEL: 'junaaikey-skills-panel',
            RELICS_PANEL: 'junaaikey-relics-panel',
            MECE_PANEL: 'junaaikey-mece-panel',
            HISTORY_PANEL: 'junaaikey-history-panel',
            MEMORY_PANEL: 'junaaikey-memory-panel', // New: Memory Panel
            FUTURE_CODEX_PANEL: 'junaaikey-future-codex-panel', // New: Future Codex Panel
            NOTIFICATION_AREA: 'junaaikey-notification-area',
            LEVEL_UP_MODAL: 'junaaikey-level-up-modal',
        },
        DEFAULT_AVATAR_NAME: '第13位 永續夥伴｜萬能元鑰召喚使 鏡像分身',
        DEFAULT_LEVEL: 1,
        DEFAULT_EXP: 0,
        BASE_EXP_TO_NEXT_LEVEL: 100,
        EXP_MULTIPLIER: 1.2, // Exp needed for next level = BASE_EXP_TO_NEXT_LEVEL * (level ^ EXP_MULTIPLIER)
        MAX_EQUIPPED_RELICS: 3,
        MAX_RELICS_PER_PART: {
            head: 1, body: 1, hand: 1, foot: 1, accessory: 1
        },
        COOLDOWNS: {
            ACTIVE_SKILL: 5 * 60 * 1000, // 5 minutes
            ACTIVE_RELIC: 10 * 60 * 1000, // 10 minutes
            MEMORY_CASTING: 5 * 1000, // 5 seconds cooldown for casting memory
        },
        EXP_GAINS: {
            PUSH_NOTE: 10,
            COPY_MARKDOWN: 5,
            DOWNLOAD_MARKDOWN: 5,
            SWITCH_AVATAR: 20,
            AUTO_CONTENT_DETECT: 15,
            LEVEL_UP_CHOICE: 50, // Bonus for making a choice
            MEMORY_CAST: 30, // New: EXP for casting a memory fragment
            MEMORY_RETRIEVE: 10, // New: EXP for retrieving memory fragments
        },
        API_ENDPOINTS: {
            STRAICO_AI_SUGGESTION: 'https://api.straico.com/v1/chat/completions', // Example endpoint
        },
        AI_PROMPT_PREFIX: "作為《Jun.AI.Key 萬能元鑰召喚使》的智慧核心，根據以下分身狀態、已習得技能、未習得技能庫、已收集神器、未收集神器庫，以及當前網頁內容，提供最佳的技能或神器建議。請以簡潔、直接的中文建議，並說明理由。如果API Key未設定，請明確指出。",
        AI_PROMPT_SUFFIX_SKILL: "\n\n請建議1-3個最適合當前情境的技能，說明為何建議。",
        AI_PROMPT_SUFFIX_RELIC: "\n\n請建議1-3個最適合當前情境的神器（收集或裝備），說明為何建議。",
        AI_MODEL: "gpt-3.5-turbo", // Or other suitable model
    };

    // --- 技能定義 ---
    /** @type {SkillDefinition[]} */
    const SKILL_DEFINITIONS = [
        { id: 'skill_001', name: '量子編織', type: 'active', description: '立即將當前頁面內容編織成一份精煉的Markdown筆記。', minLevel: 1, expCost: 0, effect: (avatar) => console.log(`[${avatar.name}] 啟動技能: 量子編織。`) },
        { id: 'skill_002', name: '意識共振', type: 'passive', description: '提升經驗值獲取速度10%。', minLevel: 3, expCost: 50, effect: (avatar) => console.log(`[${avatar.name}] 被動技能: 意識共振已激活，經驗值獲取速度提升10%。`) },
        { id: 'skill_003', name: '記憶回溯', type: 'active', description: '回溯最近5次操作歷史，並提供優化建議。', minLevel: 5, expCost: 100, effect: (avatar) => console.log(`[${avatar.name}] 啟動技能: 記憶回溯。`) },
        { id: 'skill_004', name: '符文解析', type: 'passive', description: '每次觸發MECE原則時，額外獲得5點經驗值。', minLevel: 7, expCost: 150, effect: (avatar) => console.log(`[${avatar.name}] 被動技能: 符文解析已激活。`) },
        { id: 'skill_005', name: '權能冶煉', type: 'active', description: '將當前選定文本提煉為核心權能，可供未來快速調用。', minLevel: 10, expCost: 200, effect: (avatar) => console.log(`[${avatar.name}] 啟動技能: 權能冶煉。`) },
        { id: 'skill_006', name: '無限顯化', type: 'passive', description: '所有主動技能冷卻時間減少10%。', minLevel: 12, expCost: 250, effect: (avatar) => console.log(`[${avatar.name}] 被動技能: 無限顯化已激活。`) },
        { id: 'skill_007', name: '熵減煉金', type: 'active', description: '優化當前頁面結構，移除冗餘信息，提升閱讀效率。', minLevel: 15, expCost: 300, effect: (avatar) => console.log(`[${avatar.name}] 啟動技能: 熵減煉金。`) },
        { id: 'skill_008', name: '創元編纂', type: 'passive', description: '每次升級時，額外獲得1個技能點（未來版本使用）。', minLevel: 18, expCost: 350, effect: (avatar) => console.log(`[${avatar.name}] 被動技能: 創元編纂已激活。`) },
    ];

    // --- 神器定義 ---
    /** @type {RelicDefinition[]} */
    const RELIC_DEFINITIONS = [
        { id: 'relic_001', name: '時間沙漏', type: 'active', part: 'accessory', description: '重置一個主動技能的冷卻時間。', minLevel: 2, expCost: 75, effect: (avatar) => console.log(`[${avatar.name}] 啟動神器: 時間沙漏。`) },
        { id: 'relic_002', name: '智慧之冠', type: 'passive', part: 'head', description: '提升所有經驗值獲取20%。', minLevel: 4, expCost: 120, effect: (avatar) => console.log(`[${avatar.name}] 裝備神器: 智慧之冠，經驗值獲取提升20%。`) },
        { id: 'relic_003', name: '虛空手套', type: 'active', part: 'hand', description: '在當前頁面生成一個臨時的虛空筆記本，可快速記錄。', minLevel: 6, expCost: 180, effect: (avatar) => console.log(`[${avatar.name}] 啟動神器: 虛空手套。`) },
        { id: 'relic_004', name: '次元之靴', type: 'passive', part: 'foot', description: '減少所有主動技能冷卻時間15%。', minLevel: 8, expCost: 250, effect: (avatar) => console.log(`[${avatar.name}] 裝備神器: 次元之靴，主動技能冷卻時間減少15%。`) },
        { id: 'relic_005', name: '真理法袍', type: 'passive', part: 'body', description: '每次觸發MECE原則時，額外獲得10點經驗值。', minLevel: 11, expCost: 320, effect: (avatar) => console.log(`[${avatar.name}] 裝備神器: 真理法袍，MECE觸發經驗值增加。`) },
        { id: 'relic_006', name: '命運羅盤', type: 'active', part: 'accessory', description: '預測下一個可能觸發的MECE原則。', minLevel: 14, expCost: 400, effect: (avatar) => console.log(`[${avatar.name}] 啟動神器: 命運羅盤。`) },
    ];

    // --- MECE 原則定義 ---\
    /** @type {MECEPrinciple[]} */
    const MECE_PRINCIPLES = [
        { id: 'mece_01', name: '互斥性 (Mutually Exclusive)', description: '確保分類之間沒有重疊。' },
        { id: 'mece_02', name: '窮盡性 (Collectively Exhaustive)', description: '確保分類涵蓋所有可能性。' },
        { id: 'mece_03', name: '結構化思維', description: '將複雜問題分解為可管理的組成部分。' },
        { id: 'mece_04', name: '邏輯樹分析', description: '系統性地展開問題的所有分支。' },
        { id: 'mece_05', name: '優先級排序', description: '識別並專注於最重要的元素。' },
        { id: 'mece_06', name: '關鍵要素識別', description: '找出影響結果的核心因素。' },
        { id: 'mece_07', name: '數據驅動', description: '基於事實和數據做出決策。' },
        { id: 'mece_08', name: '假設驗證', description: '提出假設並通過實驗或數據進行驗證。' },
        { id: 'mece_09', name: '情境分析', description: '考慮不同情境下的潛在結果。' },
        { id: 'mece_10', name: '風險評估', description: '識別潛在風險並制定應對策略。' },
        { id: 'mece_11', name: '簡潔表達', description: '用最少的詞語傳達最多的信息。' },
        { id: 'mece_12', name: '視覺化呈現', description: '利用圖表和圖像清晰地展示信息。' },
        { id: 'mece_13', name: '迭代優化', description: '持續改進和完善解決方案。' },
        { id: 'mece_14', name: '跨領域整合', description: '結合不同領域的知識和方法。' },
        { id: 'mece_15', name: '長期視角', description: '考慮決策的長期影響。' },
        { id: 'mece_16', name: '適應性調整', description: '根據環境變化靈活調整策略。' },
    ];

    // --- 全局狀態管理 ---
    let avatars = {};
    let activeAvatarId = null;
    let menuVisible = false;
    let currentPanel = 'avatarList'; // Default panel to show
    let notifications = [];
    let levelUpModal = { visible: false, avatarId: null, choices: [] };
    let lastMemoryCastingTime = 0; // New: Cooldown for memory casting
    let selectedTextForCasting = ''; // New: Store selected text

    // --- 2. 更嚴謹的資料初始化與升級 ---
    /**
     * Calculates the experience needed for the next level.
     * @param {number} level - The current level.
     * @returns {number} - Experience required for the next level.
     */
    function calculateExpToNextLevel(level) {
        return Math.floor(CONFIG.BASE_EXP_TO_NEXT_LEVEL * Math.pow(level, CONFIG.EXP_MULTIPLIER));
    }

    /**
     * Initializes a new avatar with default values.
     * @param {string} name - The name of the new avatar.
     * @returns {Avatar} - The newly created avatar object.
     */
    function createNewAvatar(name) {
        const newAvatarId = `avatar_${Date.now()}`;
        return {
            id: newAvatarId,
            name: name,
            level: CONFIG.DEFAULT_LEVEL,
            exp: CONFIG.DEFAULT_EXP,
            expToNextLevel: calculateExpToNextLevel(CONFIG.DEFAULT_LEVEL),
            skillPoints: 0,
            relicPoints: 0,
            skills: [],
            relics: [],
            equippedRelics: [],
            meceMastery: {},
            lastRelicActivation: {},
            history: [],
            memoryFragments: [], // New: Initialize memory fragments
        };
    }

    /**
     * Loads avatars from storage and performs data migration if necessary.
     * @returns {Object.<string, Avatar>} - Loaded and migrated avatars.
     */
    function loadAvatars() {
        const storedAvatars = GM_getValue(CONFIG.STORAGE_KEYS.AVATARS, {});
        const migratedAvatars = {};

        for (const id in storedAvatars) {
            const avatar = storedAvatars[id];
            // Data migration for new fields
            migratedAvatars[id] = {
                ...avatar,
                level: avatar.level || CONFIG.DEFAULT_LEVEL,
                exp: avatar.exp || CONFIG.DEFAULT_EXP,
                expToNextLevel: avatar.expToNextLevel || calculateExpToNextLevel(avatar.level || CONFIG.DEFAULT_LEVEL),
                skillPoints: avatar.skillPoints || 0,
                relicPoints: avatar.relicPoints || 0,
                skills: avatar.skills || [],
                relics: avatar.relics || [],
                equippedRelics: avatar.equippedRelics || [],
                meceMastery: avatar.meceMastery || {},
                lastRelicActivation: avatar.lastRelicActivation || {},
                history: avatar.history || [],
                memoryFragments: avatar.memoryFragments || [], // New: Migrate memory fragments
            };
        }
        return migratedAvatars;
    }

    /**
     * Saves the current avatars state to storage.
     */
    function saveAvatars() {
        GM_setValue(CONFIG.STORAGE_KEYS.AVATARS, avatars);
    }

    /**
     * Initializes the userscript data, including loading avatars and setting up the default if none exist.
     */
    function initializeData() {
        avatars = loadAvatars();
        activeAvatarId = GM_getValue(CONFIG.STORAGE_KEYS.ACTIVE_AVATAR_ID, null);

        if (Object.keys(avatars).length === 0) {
            const defaultAvatar = createNewAvatar(CONFIG.DEFAULT_AVATAR_NAME);
            avatars[defaultAvatar.id] = defaultAvatar;
            activeAvatarId = defaultAvatar.id;
            saveAvatars();
            GM_setValue(CONFIG.STORAGE_KEYS.ACTIVE_AVATAR_ID, activeAvatarId);
            showNotification(`歡迎，創世建築師！已為您創建預設分身: ${defaultAvatar.name}`, 'success');
            logHistory(activeAvatarId, { type: 'AVATAR_CREATED', description: `創建預設分身: ${defaultAvatar.name}` });
        } else if (!activeAvatarId || !avatars[activeAvatarId]) {
            // If activeAvatarId is invalid, pick the first available avatar
            activeAvatarId = Object.keys(avatars)[0];
            GM_setValue(CONFIG.STORAGE_KEYS.ACTIVE_AVATAR_ID, activeAvatarId);
            showNotification(`已自動選擇分身: ${avatars[activeAvatarId].name}`, 'info');
        }
        console.log("Jun.AI.Key: Data initialized.", { avatars, activeAvatarId });
    }

    // --- 核心邏輯函數 ---

    /**
     * Sets the active avatar and updates the UI.
     * @param {string} id - The ID of the avatar to set as active.
     */
    function setActiveAvatar(id) {
        if (avatars[id]) {
            activeAvatarId = id;
            GM_setValue(CONFIG.STORAGE_KEYS.ACTIVE_AVATAR_ID, activeAvatarId);
            saveAvatars();
            updateOrbDisplay();
            renderMenu(); // Re-render menu to update all panels
            applyPassiveEffects(activeAvatarId); // Reapply passive effects for the new active avatar
            gainExp(activeAvatarId, CONFIG.EXP_GAINS.SWITCH_AVATAR, 'SWITCH_AVATAR');
            showNotification(`已切換至分身: ${avatars[activeAvatarId].name}`, 'info');
            logHistory(activeAvatarId, { type: 'AVATAR_SWITCHED', description: `切換至分身: ${avatars[activeAvatarId].name}` });
        } else {
            showNotification('分身不存在！', 'error');
        }
    }

    /**
     * Adds a new avatar.
     * @param {string} name - The name of the new avatar.
     */
    function addAvatar(name) {
        if (!name || name.trim() === '') {
            showNotification('分身名稱不能為空！', 'error');
            return;
        }
        const newAvatar = createNewAvatar(name);
        avatars[newAvatar.id] = newAvatar;
        saveAvatars();
        renderAvatarListPanel();
        showNotification(`已創建新分身: ${newAvatar.name}`, 'success');
        logHistory(newAvatar.id, { type: 'AVATAR_CREATED', description: `創建新分身: ${newAvatar.name}` });
    }

    /**
     * Deletes an avatar.
     * @param {string} id - The ID of the avatar to delete.
     */
    function deleteAvatar(id) {
        if (Object.keys(avatars).length === 1) {
            showNotification('不能刪除最後一個分身！', 'error');
            return;
        }
        if (confirm(`確定要刪除分身 "${avatars[id].name}" 嗎？`)) {
            const deletedName = avatars[id].name;
            delete avatars[id];
            if (activeAvatarId === id) {
                activeAvatarId = Object.keys(avatars)[0];
                GM_setValue(CONFIG.STORAGE_KEYS.ACTIVE_AVATAR_ID, activeAvatarId);
                applyPassiveEffects(activeAvatarId);
            }
            saveAvatars();
            renderAvatarListPanel();
            updateOrbDisplay();
            showNotification(`已刪除分身: ${deletedName}`, 'warning');
            logHistory(activeAvatarId, { type: 'AVATAR_DELETED', description: `刪除分身: ${deletedName}` });
        }
    }

    /**
     * Gains experience for the active avatar and checks for level up.
     * @param {string} avatarId - The ID of the avatar.
     * @param {number} baseAmount - The base amount of experience to gain.
     * @param {string} eventType - The type of event triggering EXP gain.
     */
    function gainExp(avatarId, baseAmount, eventType) {
        const avatar = avatars[avatarId];
        if (!avatar) return;

        let finalAmount = baseAmount;

        // Apply passive skill effects for EXP gain
        const wisdomCrown = RELIC_DEFINITIONS.find(r => r.id === 'relic_002');
        if (wisdomCrown && avatar.equippedRelics.includes(wisdomCrown.id)) {
            finalAmount *= 1.2; // 20% boost from Wisdom Crown
        }
        const consciousnessResonance = SKILL_DEFINITIONS.find(s => s.id === 'skill_002');
        if (consciousnessResonance && avatar.skills.includes(consciousnessResonance.id)) {
            finalAmount *= 1.1; // 10% boost from Consciousness Resonance
        }
        finalAmount = Math.floor(finalAmount);

        avatar.exp += finalAmount;
        logHistory(avatarId, { type: eventType, description: `獲得 ${finalAmount} 經驗值`, details: { baseAmount, finalAmount } });
        showNotification(`獲得 ${finalAmount} 經驗值！`, 'info');

        while (avatar.exp >= avatar.expToNextLevel) {
            avatar.exp -= avatar.expToNextLevel;
            avatar.level++;
            avatar.expToNextLevel = calculateExpToNextLevel(avatar.level);
            levelUp(avatarId);
        }
        saveAvatars();
        updateAvatarStatsDisplay();
    }

    /**
     * Handles avatar level up, offering choices for skills or relics.
     * @param {string} avatarId - The ID of the avatar that leveled up.
     */
    function levelUp(avatarId) {
        const avatar = avatars[avatarId];
        if (!avatar) return;

        showNotification(`恭喜！分身 ${avatar.name} 升級到等級 ${avatar.level}！`, 'success');
        logHistory(avatarId, { type: 'LEVEL_UP', description: `升級到等級 ${avatar.level}` });

        // Generate choices for skills/relics
        const availableSkills = SKILL_DEFINITIONS.filter(s =>
            !avatar.skills.includes(s.id) && avatar.level >= s.minLevel
        );
        const availableRelics = RELIC_DEFINITIONS.filter(r =>
            !avatar.relics.includes(r.id) && avatar.level >= r.minLevel
        );

        const choices = [];
        // Prioritize skills if few, then relics
        while (choices.length < CONFIG.LEVEL_UP_CHOICES_COUNT) {
            const allAvailable = [...availableSkills, ...availableRelics];
            if (allAvailable.length === 0) break;

            const randomIndex = Math.floor(Math.random() * allAvailable.length);
            const choice = allAvailable[randomIndex];

            if (!choices.some(c => c.id === choice.id)) { // Avoid duplicates
                choices.push(choice);
            }

            // Remove chosen item from available lists to prevent re-selection
            if (choice.type === 'active' || choice.type === 'passive') { // It's a skill
                const skillIndex = availableSkills.findIndex(s => s.id === choice.id);
                if (skillIndex > -1) availableSkills.splice(skillIndex, 1);
            } else { // It's a relic
                const relicIndex = availableRelics.findIndex(r => r.id === choice.id);
                if (relicIndex > -1) availableRelics.splice(relicIndex, 1);
            }
        }

        if (choices.length > 0) {
            showLevelUpChoiceModal(avatarId, choices);
        } else {
            showNotification('沒有可學習的新技能或可收集的新神器。', 'info');
        }
        saveAvatars();
        renderSkillsPanel();
        renderRelicsPanel();
    }

    /**
     * Learns a skill for the active avatar.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} skillId - The ID of the skill to learn.
     * @param {boolean} [fromLevelUp=false] - True if learned from level up choice, bypasses exp cost.
     */
    function learnSkill(avatarId, skillId, fromLevelUp = false) {
        const avatar = avatars[avatarId];
        const skill = SKILL_DEFINITIONS.find(s => s.id === skillId);

        if (!avatar || !skill) {
            showNotification('技能或分身不存在！', 'error');
            return;
        }
        if (avatar.skills.includes(skillId)) {
            showNotification('已習得此技能！', 'warning');
            return;
        }
        if (avatar.level < skill.minLevel) {
            showNotification(`等級不足，需要等級 ${skill.minLevel} 才能習得此技能。`, 'warning');
            return;
        }
        if (!fromLevelUp && avatar.exp < skill.expCost) {
            showNotification(`經驗值不足，需要 ${skill.expCost} 經驗值才能習得此技能。`, 'warning');
            return;
        }

        if (!fromLevelUp) {
            avatar.exp -= skill.expCost;
        }
        avatar.skills.push(skillId);
        saveAvatars();
        applyPassiveEffects(avatarId);
        renderSkillsPanel();
        updateAvatarStatsDisplay();
        showNotification(`分身 ${avatar.name} 習得技能: ${skill.name}！`, 'success');
        logHistory(avatarId, { type: 'SKILL_LEARNED', description: `習得技能: ${skill.name}`, details: { skillId, expCost: fromLevelUp ? 0 : skill.expCost } });
    }

    /**
     * Collects a relic for the active avatar.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} relicId - The ID of the relic to collect.
     * @param {boolean} [fromLevelUp=false] - True if collected from level up choice, bypasses exp cost.
     */
    function collectRelic(avatarId, relicId, fromLevelUp = false) {
        const avatar = avatars[avatarId];
        const relic = RELIC_DEFINITIONS.find(r => r.id === relicId);

        if (!avatar || !relic) {
            showNotification('神器或分身不存在！', 'error');
            return;
        }
        if (avatar.relics.includes(relicId)) {
            showNotification('已收集此神器！', 'warning');
            return;
        }
        if (avatar.level < relic.minLevel) {
            showNotification(`等級不足，需要等級 ${relic.minLevel} 才能收集此神器。`, 'warning');
            return;
        }
        if (!fromLevelUp && avatar.exp < relic.expCost) {
            showNotification(`經驗值不足，需要 ${relic.expCost} 經驗值才能收集此神器。`, 'warning');
            return;
        }

        if (!fromLevelUp) {
            avatar.exp -= relic.expCost;
        }
        avatar.relics.push(relicId);
        saveAvatars();
        renderRelicsPanel();
        updateAvatarStatsDisplay();
        showNotification(`分身 ${avatar.name} 收集神器: ${relic.name}！`, 'success');
        logHistory(avatarId, { type: 'RELIC_COLLECTED', description: `收集神器: ${relic.name}`, details: { relicId, expCost: fromLevelUp ? 0 : relic.expCost } });
    }

    /**
     * Equips a relic for the active avatar.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} relicId - The ID of the relic to equip.
     */
    function equipRelic(avatarId, relicId) {
        const avatar = avatars[avatarId];
        const relic = RELIC_DEFINITIONS.find(r => r.id === relicId);

        if (!avatar || !relic) {
            showNotification('神器或分身不存在！', 'error');
            return;
        }
        if (!avatar.relics.includes(relicId)) {
            showNotification('尚未收集此神器！', 'warning');
            return;
        }
        if (avatar.equippedRelics.includes(relicId)) {
            showNotification('此神器已裝備！', 'warning');
            return;
        }
        if (avatar.equippedRelics.length >= CONFIG.MAX_EQUIPPED_RELICS) {
            showNotification(`最多只能裝備 ${CONFIG.MAX_EQUIPPED_RELICS} 個神器。`, 'warning');
            return;
        }
        if (relic.part !== 'none') {
            const equippedInSamePart = avatar.equippedRelics.some(
                (eqRelicId) => RELIC_DEFINITIONS.find(r => r.id === eqRelicId)?.part === relic.part
            );
            if (equippedInSamePart) {
                showNotification(`同部位只能裝備一個神器 (${relic.part})。`, 'warning');
                return;
            }
        }

        avatar.equippedRelics.push(relicId);
        saveAvatars();
        applyPassiveEffects(avatarId);
        renderRelicsPanel();
        showNotification(`分身 ${avatar.name} 裝備神器: ${relic.name}！`, 'success');
        logHistory(avatarId, { type: 'RELIC_EQUIPPED', description: `裝備神器: ${relic.name}`, details: { relicId } });
    }

    /**
     * Unequips a relic for the active avatar.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} relicId - The ID of the relic to unequip.
     */
    function unequipRelic(avatarId, relicId) {
        const avatar = avatars[avatarId];
        const relic = RELIC_DEFINITIONS.find(r => r.id === relicId);

        if (!avatar || !relic) {
            showNotification('神器或分身不存在！', 'error');
            return;
        }
        if (!avatar.equippedRelics.includes(relicId)) {
            showNotification('此神器未裝備！', 'warning');
            return;
        }

        avatar.equippedRelics = avatar.equippedRelics.filter(id => id !== relicId);
        saveAvatars();
        applyPassiveEffects(avatarId); // Reapply all passives as one might have been removed
        renderRelicsPanel();
        showNotification(`分身 ${avatar.name} 卸下神器: ${relic.name}！`, 'info');
        logHistory(avatarId, { type: 'RELIC_UNEQUIPPED', description: `卸下神器: ${relic.name}`, details: { relicId } });
    }

    /**
     * Activates an active skill.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} skillId - The ID of the skill to activate.
     */
    function activateActiveSkill(avatarId, skillId) {
        const avatar = avatars[avatarId];
        const skill = SKILL_DEFINITIONS.find(s => s.id === skillId);

        if (!avatar || !skill || skill.type !== 'active') {
            showNotification('技能不存在或不是主動技能！', 'error');
            return;
        }
        if (!avatar.skills.includes(skillId)) {
            showNotification('尚未習得此技能！', 'warning');
            return;
        }

        const lastActivation = avatar.lastRelicActivation[skillId] || 0; // Using same cooldown tracking for simplicity
        const cooldown = CONFIG.COOLDOWNS.ACTIVE_SKILL;
        const remainingCooldown = cooldown - (Date.now() - lastActivation);

        if (remainingCooldown > 0) {
            const minutes = Math.ceil(remainingCooldown / (60 * 1000));
            showNotification(`技能 "${skill.name}" 正在冷卻中，請等待 ${minutes} 分鐘。`, 'warning');
            return;
        }

        skill.effect(avatar); // Execute skill effect
        avatar.lastRelicActivation[skillId] = Date.now();
        saveAvatars();
        showNotification(`分身 ${avatar.name} 啟動技能: ${skill.name}！`, 'success');
        logHistory(avatarId, { type: 'SKILL_ACTIVATED', description: `啟動技能: ${skill.name}`, details: { skillId } });
        renderSkillsPanel(); // Update UI to show cooldown
    }

    /**
     * Activates an active relic.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} relicId - The ID of the relic to activate.
     */
    function activateActiveRelic(avatarId, relicId) {
        const avatar = avatars[avatarId];
        const relic = RELIC_DEFINITIONS.find(r => r.id === relicId);

        if (!avatar || !relic || relic.type !== 'active') {
            showNotification('神器不存在或不是主動神器！', 'error');
            return;
        }
        if (!avatar.equippedRelics.includes(relicId)) {
            showNotification('此神器未裝備或未收集！', 'warning');
            return;
        }

        const lastActivation = avatar.lastRelicActivation[relicId] || 0;
        const cooldown = CONFIG.COOLDOWNS.ACTIVE_RELIC;
        const remainingCooldown = cooldown - (Date.now() - lastActivation);

        if (remainingCooldown > 0) {
            const minutes = Math.ceil(remainingCooldown / (60 * 1000));
            showNotification(`神器 "${relic.name}" 正在冷卻中，請等待 ${minutes} 分鐘。`, 'warning');
            return;
        }

        relic.effect(avatar); // Execute relic effect
        avatar.lastRelicActivation[relicId] = Date.now();
        saveAvatars();
        showNotification(`分身 ${avatar.name} 啟動神器: ${relic.name}！`, 'success');
        logHistory(avatarId, { type: 'RELIC_ACTIVATED', description: `啟動神器: ${relic.name}`, details: { relicId } });
        renderRelicsPanel(); // Update UI to show cooldown
    }

    /**
     * Applies all passive effects from learned skills and equipped relics for the active avatar.
     * This function should be called when avatar changes, skills are learned, or relics are equipped/unequipped.
     * @param {string} avatarId - The ID of the avatar.
     */
    function applyPassiveEffects(avatarId) {
        const avatar = avatars[avatarId];
        if (!avatar) return;

        console.log(`[${avatar.name}] 重新應用所有被動效果...`);

        // Passive Skills
        avatar.skills.forEach(skillId => {
            const skill = SKILL_DEFINITIONS.find(s => s.id === skillId);
            if (skill && skill.type === 'passive' && typeof skill.effect === 'function') {
                skill.effect(avatar);
            }
        });

        // Passive Relics
        avatar.equippedRelics.forEach(relicId => {
            const relic = RELIC_DEFINITIONS.find(r => r.id === relicId);
            if (relic && relic.type === 'passive' && typeof relic.effect === 'function') {
                relic.effect(avatar);
            }
        });
        console.log(`[${avatar.name}] 被動效果應用完成。`);
    }

    /**
     * Records an event in the avatar's history.
     * @param {string} avatarId - The ID of the avatar.
     * @param {HistoryEvent} event - The event object to record.
     */
    function logHistory(avatarId, event) {
        const avatar = avatars[avatarId];
        if (avatar) {
            avatar.history.push({
                timestamp: new Date().toISOString(),
                ...event
            });
            // Keep history to a reasonable size, e.g., last 100 events
            if (avatar.history.length > 100) {
                avatar.history.shift();
            }
            saveAvatars();
            if (currentPanel === 'history') {
                renderHistoryPanel(); // Update history panel if it's open
            }
        }
    }

    /**
     * Increments the mastery count for a given MECE principle.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} mecePrincipleId - The ID of the MECE principle.
     */
    function triggerEvolution(avatarId, mecePrincipleId) {
        const avatar = avatars[avatarId];
        if (!avatar) return;

        if (!MECE_PRINCIPLES.some(p => p.id === mecePrincipleId)) {
            console.warn(`MECE principle ID "${mecePrincipleId}" not found.`);
            return;
        }

        avatar.meceMastery[mecePrincipleId] = (avatar.meceMastery[mecePrincipleId] || 0) + 1;
        saveAvatars();
        showNotification(`MECE原則 "${MECE_PRINCIPLES.find(p => p.id === mecePrincipleId)?.name}" 掌握度提升！`, 'info');
        logHistory(avatarId, { type: 'MECE_TRIGGERED', description: `觸發MECE原則: ${MECE_PRINCIPLES.find(p => p.id === mecePrincipleId)?.name}`, details: { mecePrincipleId } });

        // Apply passive effects for MECE trigger
        const runeAnalysis = SKILL_DEFINITIONS.find(s => s.id === 'skill_004');
        if (runeAnalysis && avatar.skills.includes(runeAnalysis.id)) {
            gainExp(avatarId, 5, 'MECE_BONUS_EXP_SKILL'); // 5 bonus EXP from Rune Analysis
        }
        const truthRobe = RELIC_DEFINITIONS.find(r => r.id === 'relic_005');
        if (truthRobe && avatar.equippedRelics.includes(truthRobe.id)) {
            gainExp(avatarId, 10, 'MECE_BONUS_EXP_RELIC'); // 10 bonus EXP from Truth Robe
        }

        if (currentPanel === 'mece') {
            renderMECEPanel(); // Update MECE panel if it's open
        }
    }

    // --- UI 渲染函數 ---

    /**
     * Creates the main floating orb UI element.
     */
    function createFloatingOrb() {
        GM_addStyle(`
            #${CONFIG.UI_IDS.ORB_CONTAINER} {
                position: fixed;
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #a78bfa, #6ee7b7);
                border-radius: 50%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: grab; /* Change cursor to grab for dragging */
                z-index: 9999;
                transition: all 0.3s ease-in-out;
                border: 2px solid #c4b5fd;
                animation: pulse 2s infinite alternate;
            }
            #${CONFIG.UI_IDS.ORB_CONTAINER}:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
            }
            #${CONFIG.UI_IDS.ORB_CONTAINER}.dragging {
                cursor: grabbing;
                opacity: 0.8;
                transition: none; /* Disable transition while dragging */
            }
            #${CONFIG.UI_IDS.ORB_ICON} {
                font-size: 2.5em;
                color: #fff;
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            }
            #${CONFIG.UI_IDS.ORB_NAME} {
                font-size: 0.7em;
                color: #fff;
                text-align: center;
                max-width: 90%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-top: 2px;
            }

            #${CONFIG.UI_IDS.MENU_CONTAINER} {
                position: fixed;
                bottom: 110px;
                right: 20px;
                width: 350px;
                max-height: 80vh;
                background: #1e1e1e;
                border-radius: 15px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
                z-index: 9998;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #333;
                transform: scale(0.95);
                opacity: 0;
                transition: all 0.3s ease-in-out;
            }
            #${CONFIG.UI_IDS.MENU_CONTAINER}.visible {
                transform: scale(1);
                opacity: 1;
            }
            #${CONFIG.UI_IDS.MENU_HEADER} {
                background: linear-gradient(90deg, #a78bfa, #c4b5fd);
                color: #fff;
                padding: 15px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                font-size: 1.2em;
                font-weight: bold;
                text-align: center;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
            #${CONFIG.UI_IDS.MENU_TABS} {
                display: flex;
                justify-content: space-around;
                background: #2a2a2a;
                padding: 10px 0;
                border-bottom: 1px solid #333;
                flex-wrap: wrap; /* Allow tabs to wrap */
            }
            #${CONFIG.UI_IDS.MENU_TABS} button {
                background: none;
                border: none;
                color: #b0b0b0;
                padding: 8px 12px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.2s ease-in-out;
                border-radius: 5px;
                flex-grow: 1; /* Allow buttons to grow */
                min-width: fit-content; /* Prevent shrinking too much */
            }
            #${CONFIG.UI_IDS.MENU_TABS} button:hover {
                color: #fff;
                background: #3a3a3a;
            }
            #${CONFIG.UI_IDS.MENU_TABS} button.active {
                color: #c4b5fd;
                font-weight: bold;
                background: #3a3a3a;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} {
                flex-grow: 1;
                padding: 15px;
                overflow-y: auto;
                color: #e0e0e0;
                font-size: 0.9em;
                line-height: 1.5;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} h3 {
                color: #6ee7b7;
                margin-top: 10px;
                margin-bottom: 10px;
                font-size: 1.1em;
                border-bottom: 1px dashed #444;
                padding-bottom: 5px;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} li {
                background: #2a2a2a;
                margin-bottom: 8px;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                gap: 5px;
                border-left: 3px solid #a78bfa;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} li strong {
                color: #c4b5fd;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} button {
                background: #a78bfa;
                color: #fff;
                border: none;
                padding: 8px 12px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 5px;
                transition: background 0.2s ease-in-out, transform 0.1s ease-in-out;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} button:hover:not(:disabled) {
                background: #c4b5fd;
                transform: translateY(-1px);
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} button:disabled {
                background: #555;
                cursor: not-allowed;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} input[type="text"], #${CONFIG.UI_IDS.MENU_CONTENT} input[type="password"], #${CONFIG.UI_IDS.MENU_CONTENT} textarea {
                width: calc(100% - 20px);
                padding: 8px 10px;
                margin-top: 5px;
                border-radius: 5px;
                border: 1px solid #444;
                background: #3a3a3a;
                color: #e0e0e0;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .avatar-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background: #2a2a2a;
                border-radius: 8px;
                margin-bottom: 8px;
                border-left: 3px solid #6ee7b7;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .avatar-item.active {
                border-left-color: #a78bfa;
                background: #3a3a3a;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .avatar-item button {
                margin-left: 5px;
                padding: 5px 10px;
                font-size: 0.8em;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .avatar-item .delete-btn {
                background: #e74c3c;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .avatar-item .delete-btn:hover:not(:disabled) {
                background: #c0392b;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .avatar-stats p {
                margin: 5px 0;
                color: #b0b0b0;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .progress-bar-container {
                width: 100%;
                background-color: #444;
                border-radius: 5px;
                height: 8px;
                margin-top: 5px;
                overflow: hidden;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #6ee7b7, #a78bfa);
                width: 0%;
                border-radius: 5px;
                transition: width 0.5s ease-in-out;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .skill-item, #${CONFIG.UI_IDS.MENU_CONTENT} .relic-item, #${CONFIG.UI_IDS.MENU_CONTENT} .memory-fragment-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin-bottom: 10px;
                padding: 10px;
                background: #2a2a2a;
                border-radius: 8px;
                border-left: 3px solid #a78bfa;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .skill-item.learned, #${CONFIG.UI_IDS.MENU_CONTENT} .relic-item.collected {
                border-left-color: #6ee7b7;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .skill-item.active-cooldown, #${CONFIG.UI_IDS.MENU_CONTENT} .relic-item.active-cooldown {
                border-left-color: #e74c3c;
            }
            #${CONFIG.UI_IDS.MENU_CONTENT} .ai-tip {
                background: #3a3a3a;
                border-left: 3px solid #f1c40f;
                padding: 10px;
                margin-top: 10px;
                border-radius: 8px;
                color: #f39c12;
                font-size: 0.9em;
            }
            #${CONFIG.UI_IDS.NOTIFICATION_AREA} {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .junaaikey-notification {
                background: #333;
                color: #fff;
                padding: 10px 15px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.5s ease-out;
                min-width: 250px;
                max-width: 350px;
            }
            .junaaikey-notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            .junaaikey-notification.success { border-left: 5px solid #2ecc71; }
            .junaaikey-notification.info { border-left: 5px solid #3498db; }
            .junaaikey-notification.warning { border-left: 5px solid #f1c40f; }
            .junaaikey-notification.error { border-left: 5px solid #e74c3c; }

            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10001;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .modal-content {
                background: #1e1e1e;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
                width: 90%;
                max-width: 600px;
                text-align: center;
                color: #e0e0e0;
                border: 1px solid #333;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} h3 {
                color: #c4b5fd;
                margin-bottom: 20px;
                font-size: 1.5em;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choices-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choice-card {
                background: #2a2a2a;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid #444;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                text-align: left;
                transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choice-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choice-card h4 {
                color: #6ee7b7;
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 1.2em;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choice-card p {
                font-size: 0.9em;
                color: #b0b0b0;
                margin-bottom: 10px;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choice-card button {
                width: 100%;
                background: #a78bfa;
                color: #fff;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.2s ease-in-out;
            }
            #${CONFIG.UI_IDS.LEVEL_UP_MODAL} .choice-card button:hover {
                background: #c4b5fd;
            }

            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.7); }
                70% { box-shadow: 0 0 0 15px rgba(167, 139, 250, 0); }
                100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0); }
            }
        `);

        let orbContainer = document.getElementById(CONFIG.UI_IDS.ORB_CONTAINER);
        if (!orbContainer) {
            orbContainer = document.createElement('div');
            orbContainer.id = CONFIG.UI_IDS.ORB_CONTAINER;
            orbContainer.innerHTML = `
                <span id="${CONFIG.UI_IDS.ORB_ICON}">⚛️</span>
                <span id="${CONFIG.UI_IDS.ORB_NAME}"></span>
            `;
            document.body.appendChild(orbContainer);
            orbContainer.addEventListener('click', toggleMenu);
            makeDraggable(orbContainer); // Make orb draggable
        }
        updateOrbDisplay();

        let menuContainer = document.getElementById(CONFIG.UI_IDS.MENU_CONTAINER);
        if (!menuContainer) {
            menuContainer = document.createElement('div');
            menuContainer.id = CONFIG.UI_IDS.MENU_CONTAINER;
            document.body.appendChild(menuContainer);
        }

        let notificationArea = document.getElementById(CONFIG.UI_IDS.NOTIFICATION_AREA);
        if (!notificationArea) {
            notificationArea = document.createElement('div');
            notificationArea.id = CONFIG.UI_IDS.NOTIFICATION_AREA;
            document.body.appendChild(notificationArea);
        }
    }

    /**
     * Makes an element draggable.
     * @param {HTMLElement} element - The element to make draggable.
     */
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;

        const storedPos = GM_getValue(CONFIG.STORAGE_KEYS.ORB_POSITION, { bottom: 20, right: 20 });
        element.style.bottom = `${storedPos.bottom}px`;
        element.style.right = `${storedPos.right}px`;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            isDragging = true;
            element.classList.add('dragging');
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // set the element's new position:
            // Calculate new bottom and right based on current position
            let newBottom = parseInt(element.style.bottom || '0') + pos2;
            let newRight = parseInt(element.style.right || '0') + pos1;

            // Clamp to viewport boundaries
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const orbHeight = element.offsetHeight;
            const orbWidth = element.offsetWidth;

            newBottom = Math.max(0, Math.min(viewportHeight - orbHeight, newBottom));
            newRight = Math.max(0, Math.min(viewportWidth - orbWidth, newRight));

            element.style.bottom = `${newBottom}px`;
            element.style.right = `${newRight}px`;

            // Update menu position relative to orb
            const menuContainer = document.getElementById(CONFIG.UI_IDS.MENU_CONTAINER);
            if (menuContainer && menuVisible) {
                menuContainer.style.bottom = `${newBottom + orbHeight + 10}px`;
                menuContainer.style.right = `${newRight}px`;
            }
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            isDragging = false;
            element.classList.remove('dragging');

            // Save final position
            GM_setValue(CONFIG.STORAGE_KEYS.ORB_POSITION, {
                bottom: parseInt(element.style.bottom || '20'),
                right: parseInt(element.style.right || '20')
            });
        }

        // Prevent click event from firing after drag
        element.addEventListener('click', (e) => {
            if (isDragging) {
                e.stopPropagation();
            }
        }, true); // Use capture phase
    }


    /**
     * Updates the display of the floating orb with the active avatar's info.
     */
    function updateOrbDisplay() {
        const orbName = document.getElementById(CONFIG.UI_IDS.ORB_NAME);
        if (orbName && activeAvatarId && avatars[activeAvatarId]) {
            orbName.textContent = avatars[activeAvatarId].name;
        } else if (orbName) {
            orbName.textContent = '無分身';
        }

        // Update menu position if visible
        const orbContainer = document.getElementById(CONFIG.UI_IDS.ORB_CONTAINER);
        const menuContainer = document.getElementById(CONFIG.UI_IDS.MENU_CONTAINER);
        if (orbContainer && menuContainer && menuVisible) {
            const orbRect = orbContainer.getBoundingClientRect();
            menuContainer.style.bottom = `${window.innerHeight - orbRect.top + 10}px`;
            menuContainer.style.right = `${window.innerWidth - orbRect.right}px`;
        }
    }

    /**
     * Toggles the visibility of the main menu.
     */
    function toggleMenu() {
        const orbContainer = document.getElementById(CONFIG.UI_IDS.ORB_CONTAINER);
        if (orbContainer && orbContainer.classList.contains('dragging')) {
            return; // Prevent menu toggle if dragging
        }

        menuVisible = !menuVisible;
        const menuContainer = document.getElementById(CONFIG.UI_IDS.MENU_CONTAINER);
        if (menuContainer) {
            menuContainer.classList.toggle('visible', menuVisible);
            if (menuVisible) {
                renderMenu();
                updateOrbDisplay(); // Update menu position relative to orb
            }
        }
    }

    /**
     * Renders the main menu structure with tabs and content area.
     */
    function renderMenu() {
        const menuContainer = document.getElementById(CONFIG.UI_IDS.MENU_CONTAINER);
        if (!menuContainer) return;

        menuContainer.innerHTML = `
            <div id="${CONFIG.UI_IDS.MENU_HEADER}">Jun.AI.Key 神使心流介面 v${CONFIG.VERSION}</div>
            <div id="${CONFIG.UI_IDS.MENU_TABS}">
                <button data-panel="avatarList">鏡像列表</button>
                <button data-panel="persona">人設</button>
                <button data-panel="skills">技能</button>
                <button data-panel="relics">聖櫃神器</button>
                <button data-panel="mece">MECE 原則</button>
                <button data-panel="history">鏡像回憶長廊</button>
                <button data-panel="memory">聖櫃</button> <!-- New Tab -->
                <button data-panel="futureCodex">未來聖典</button> <!-- New Tab -->
            </div>
            <div id="${CONFIG.UI_IDS.MENU_CONTENT}"></div>
        `;

        const tabsContainer = document.getElementById(CONFIG.UI_IDS.MENU_TABS);
        tabsContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                currentPanel = event.target.dataset.panel;
                renderPanel(currentPanel);
                tabsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
            });
        });

        // Render the initially active panel
        renderPanel(currentPanel);
        tabsContainer.querySelector(`button[data-panel="${currentPanel}"]`)?.classList.add('active');
    }

    /**
     * Renders the content of a specific panel within the menu.
     * @param {string} panelName - The name of the panel to render.
     */
    function renderPanel(panelName) {
        const menuContent = document.getElementById(CONFIG.UI_IDS.MENU_CONTENT);
        if (!menuContent) return;

        menuContent.innerHTML = ''; // Clear previous content

        switch (panelName) {
            case 'avatarList':
                renderAvatarListPanel(menuContent);
                break;
            case 'persona':
                renderPersonaPanel(menuContent);
                break;
            case 'skills':
                renderSkillsPanel(menuContent);
                break;
            case 'relics':
                renderRelicsPanel(menuContent);
                break;
            case 'mece':
                renderMECEPanel(menuContent);
                break;
            case 'history':
                renderHistoryPanel(menuContent);
                break;
            case 'memory': // New: Memory Panel
                renderMemoryPanel(menuContent);
                break;
            case 'futureCodex': // New: Future Codex Panel
                renderFutureCodexPanel(menuContent);
                break;
            default:
                menuContent.innerHTML = '<p>選擇一個面板。</p>';
        }
    }

    /**
     * Renders the avatar list panel.
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    function renderAvatarListPanel(parentElement) {
        if (!parentElement) return;
        const activeAvatar = avatars[activeAvatarId];

        let html = '<h3>鏡像分身列表</h3>';
        html += '<div class=\"avatar-list\">';
        for (const id in avatars) {
            const avatar = avatars[id];
            const isActive = id === activeAvatarId ? 'active' : '';
            html += `
                <div class=\"avatar-item ${isActive}\">
                    <span>${avatar.name} (Lv.${avatar.level})</span>
                    <div>
                        <button data-id=\"${id}\" class=\"switch-btn\" ${isActive ? 'disabled' : ''}>切換</button>
                        <button data-id=\"${id}\" class=\"delete-btn\" ${isActive ? 'disabled' : ''}>刪除</button>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        html += `
            <h3>新增鏡像分身</h3>
            <input type=\"text\" id=\"new-avatar-name\" placeholder=\"輸入新分身名稱\" />
            <button id=\"add-avatar-btn\">新增分身</button>
        `;
        parentElement.innerHTML = html;

        parentElement.querySelectorAll('.switch-btn').forEach(button => {
            button.addEventListener('click', (e) => setActiveAvatar(e.target.dataset.id));
        });
        parentElement.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => deleteAvatar(e.target.dataset.id));
        });
        parentElement.querySelector('#add-avatar-btn').addEventListener('click', () => {
            const nameInput = parentElement.querySelector('#new-avatar-name');
            addAvatar(nameInput.value);
            nameInput.value = '';
        });
    }

    /**
     * Renders the persona panel with avatar stats and StraicoKey input.
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    function renderPersonaPanel(parentElement) {
        if (!parentElement || !activeAvatarId || !avatars[activeAvatarId]) {
            parentElement.innerHTML = '<p>請先選擇一個分身。</p>';
            return;
        }
        const avatar = avatars[activeAvatarId];
        const straicoKey = GM_getValue(CONFIG.STORAGE_KEYS.STRAICO_KEY, '');

        parentElement.innerHTML = `
            <h3>${avatar.name} 的人設</h3>
            <div class=\"avatar-stats\">
                <p><strong>等級:</strong> Lv.${avatar.level}</p>
                <p><strong>經驗值:</strong> ${avatar.exp} / ${avatar.expToNextLevel}</p>
                <div class=\"progress-bar-container\"><div class=\"progress-bar\" style=\"width: ${(avatar.exp / avatar.expToNextLevel) * 100}%\"></div></div>
                <p><strong>技能點:</strong> ${avatar.skillPoints}</p>
                <p><strong>神器點:</strong> ${avatar.relicPoints}</p>
            </div>

            <h3>Straico API Key 配置</h3>
            <p>用於 AI 提示功能。請確保您的 Straico Key 已正確設定。</p>
            <input type=\"password\" id=\"straico-api-key\" placeholder=\"輸入您的 Straico API Key\" value=\"${straicoKey}\" />
            <button id=\"save-straico-key-btn\">保存 API Key</button>
            <button id=\"clear-straico-key-btn\" style=\"background: #e74c3c; margin-left: 5px;\">清除 API Key</button>
        `;

        parentElement.querySelector('#save-straico-key-btn').addEventListener('click', () => {
            const keyInput = parentElement.querySelector('#straico-api-key');
            GM_setValue(CONFIG.STORAGE_KEYS.STRAICO_KEY, keyInput.value);
            showNotification('Straico API Key 已保存！', 'success');
        });
        parentElement.querySelector('#clear-straico-key-btn').addEventListener('click', () => {
            if (confirm('確定要清除 Straico API Key 嗎？')) {
                GM_deleteValue(CONFIG.STORAGE_KEYS.STRAICO_KEY);
                parentElement.querySelector('#straico-api-key').value = '';
                showNotification('Straico API Key 已清除！', 'warning');
            }
        });
        updateAvatarStatsDisplay(); // Ensure progress bar is updated
    }

    /**
     * Updates the avatar stats display (level, exp, progress bar).
     */
    function updateAvatarStatsDisplay() {
        const avatar = avatars[activeAvatarId];
        if (!avatar) return;

        const personaPanel = document.getElementById(CONFIG.UI_IDS.PERSONA_PANEL);
        if (personaPanel) {
            personaPanel.querySelector('.avatar-stats p:nth-child(1)').textContent = `等級: Lv.${avatar.level}`;
            personaPanel.querySelector('.avatar-stats p:nth-child(2)').textContent = `經驗值: ${avatar.exp} / ${avatar.expToNextLevel}`;
            const progressBar = personaPanel.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = `${(avatar.exp / avatar.expToNextLevel) * 100}%`;
            }
        }
    }

    /**
     * Renders the skills panel with learned and unlearned skills.
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    async function renderSkillsPanel(parentElement) {
        if (!parentElement || !activeAvatarId || !avatars[activeAvatarId]) {
            parentElement.innerHTML = '<p>請先選擇一個分身。</p>';
            return;
        }
        const avatar = avatars[activeAvatarId];

        let html = '<h3>已習得技能</h3><ul class=\"learned-skills-list\">';
        const learnedSkills = SKILL_DEFINITIONS.filter(s => avatar.skills.includes(s.id));
        if (learnedSkills.length === 0) {
            html += '<li><p>尚未習得任何技能。</p></li>';
        } else {
            learnedSkills.forEach(skill => {
                const lastActivation = avatar.lastRelicActivation[skill.id] || 0;
                const cooldown = CONFIG.COOLDOWNS.ACTIVE_SKILL;
                const remainingCooldown = cooldown - (Date.now() - lastActivation);
                const isOnCooldown = skill.type === 'active' && remainingCooldown > 0;
                const cooldownText = isOnCooldown ? ` (冷卻中: ${Math.ceil(remainingCooldown / (60 * 1000))}分)` : '';
                const cooldownClass = isOnCooldown ? 'active-cooldown' : '';

                html += `
                    <li class=\"skill-item learned ${cooldownClass}\">
                        <div class=\"skill-info\">
                            <span class=\"skill-name\">${skill.name} (${skill.type === 'active' ? '主動' : '被動'})</span>
                            <span class=\"skill-desc\">${skill.description}</span>
                            <span class=\"skill-meta\">等級要求: Lv.${skill.minLevel}</span>
                        </div>
                        ${skill.type === 'active' ? `<button data-id=\"${skill.id}\" class=\"activate-skill-btn\" ${isOnCooldown ? 'disabled' : ''}>啟動${cooldownText}</button>` : ''}
                    </li>
                `;
            });
        }
        html += '</ul>';

        html += '<h3>可習得技能</h3><ul class=\"available-skills-list\">';
        const availableSkills = SKILL_DEFINITIONS.filter(s => !avatar.skills.includes(s.id));
        if (availableSkills.length === 0) {
            html += '<li><p>沒有可習得的新技能。</p></li>';
        } else {
            availableSkills.forEach(skill => {
                const canLearn = avatar.level >= skill.minLevel && avatar.exp >= skill.expCost;
                html += `
                    <li class=\"skill-item\">
                        <div class=\"skill-info\">
                            <span class=\"skill-name\">${skill.name} (${skill.type === 'active' ? '主動' : '被動'})</span>
                            <span class=\"skill-desc\">${skill.description}</span>
                            <span class=\"skill-meta\">等級要求: Lv.${skill.minLevel} | 經驗值消耗: ${skill.expCost}</span>
                        </div>
                        <button data-id=\"${skill.id}\" class=\"learn-skill-btn\" ${canLearn ? '' : 'disabled'}>習得</button>
                    </li>
                `;
            });
        }
        html += '</ul>';

        // AI Skill Tips
        const aiSkillTips = await generateAISkillTips(avatar.id, document.body.innerText);
        if (aiSkillTips) {
            html += `<div class=\"ai-tip\"><strong>AI 技能提示:</strong><br>${aiSkillTips}</div>`;
        }

        parentElement.innerHTML = html;

        parentElement.querySelectorAll('.activate-skill-btn').forEach(button => {
            button.addEventListener('click', (e) => activateActiveSkill(avatar.id, e.target.dataset.id));
        });
        parentElement.querySelectorAll('.learn-skill-btn').forEach(button => {
            button.addEventListener('click', (e) => learnSkill(avatar.id, e.target.dataset.id));
        });
    }

    /**
     * Renders the relics panel with collected, equipped, and uncollected relics.
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    async function renderRelicsPanel(parentElement) {
        if (!parentElement || !activeAvatarId || !avatars[activeAvatarId]) {
            parentElement.innerHTML = '<p>請先選擇一個分身。</p>';
            return;
        }
        const avatar = avatars[activeAvatarId];

        let html = '<h3>已裝備神器</h3><ul class=\"equipped-relics-list\">';
        const equippedRelics = RELIC_DEFINITIONS.filter(r => avatar.equippedRelics.includes(r.id));
        if (equippedRelics.length === 0) {
            html += '<li><p>尚未裝備任何神器。</p></li>';
        } else {
            equippedRelics.forEach(relic => {
                const lastActivation = avatar.lastRelicActivation[relic.id] || 0;
                const cooldown = CONFIG.COOLDOWNS.ACTIVE_RELIC; // TODO: Apply passive cooldown reduction here
                const remainingCooldown = cooldown - (Date.now() - lastActivation);
                const isOnCooldown = relic.type === 'active' && remainingCooldown > 0;
                const cooldownText = isOnCooldown ? ` (冷卻中: ${Math.ceil(remainingCooldown / (60 * 1000))}分)` : '';
                const cooldownClass = isOnCooldown ? 'active-cooldown' : '';

                html += `
                    <li class=\"relic-item collected ${cooldownClass}\">
                        <div class=\"relic-info\">
                            <span class=\"relic-name\">${relic.name} (${relic.type === 'active' ? '主動' : '被動'})</span>
                            <span class=\"relic-desc\">${relic.description}</span>
                            <span class=\"relic-meta\">部位: ${relic.part === 'none' ? '無' : relic.part}</span>
                        </div>
                        <div>
                            ${relic.type === 'active' ? `<button data-id=\"${relic.id}\" class=\"activate-relic-btn\" ${isOnCooldown ? 'disabled' : ''}>啟動${cooldownText}</button>` : ''}
                            <button data-id=\"${relic.id}\" class=\"unequip-relic-btn\">卸下</button>
                        </div>
                    </li>
                `;
            });
        }
        html += '</ul>';

        html += '<h3>已收集神器 (未裝備)</h3><ul class=\"collected-relics-list\">';
        const collectedButNotEquipped = RELIC_DEFINITIONS.filter(r => avatar.relics.includes(r.id) && !avatar.equippedRelics.includes(r.id));
        if (collectedButNotEquipped.length === 0) {
            html += '<li><p>沒有已收集但未裝備的神器。</p></li>';
        } else {
            collectedButNotEquipped.forEach(relic => {
                const canEquip = avatar.equippedRelics.length < CONFIG.MAX_EQUIPPED_RELICS &&
                                 (relic.part === 'none' || !avatar.equippedRelics.some(eqRelicId => RELIC_DEFINITIONS.find(r => r.id === eqRelicId)?.part === relic.part));
                html += `
                    <li class=\"relic-item collected\">
                        <div class=\"relic-info\">
                            <span class=\"relic-name\">${relic.name} (${relic.type === 'active' ? '主動' : '被動'})</span>
                            <span class=\"relic-desc\">${relic.description}</span>
                            <span class=\"relic-meta\">部位: ${relic.part === 'none' ? '無' : relic.part}</span>
                        </div>
                        <button data-id=\"${relic.id}\" class=\"equip-relic-btn\" ${canEquip ? '' : 'disabled'}>裝備</button>
                    </li>
                `;
            });
        }
        html += '</ul>';

        html += '<h3>可收集神器</h3><ul class=\"available-relics-list\">';
        const availableRelics = RELIC_DEFINITIONS.filter(r => !avatar.relics.includes(r.id));
        if (availableRelics.length === 0) {
            html += '<li><p>沒有可收集的新神器。</p></li>';
        } else {
            availableRelics.forEach(relic => {
                const canCollect = avatar.level >= relic.minLevel && avatar.exp >= relic.expCost;
                html += `
                    <li class=\"relic-item\">
                        <div class=\"relic-info\">
                            <span class=\"relic-name\">${relic.name} (${relic.type === 'active' ? '主動' : '被動'})</span>
                            <span class=\"relic-desc\">${relic.description}</span>
                            <span class=\"relic-meta\">等級要求: Lv.${relic.minLevel} | 經驗值消耗: ${relic.expCost} | 部位: ${relic.part === 'none' ? '無' : relic.part}</span>
                        </div>
                        <button data-id=\"${relic.id}\" class=\"collect-relic-btn\" ${canCollect ? '' : 'disabled'}>收集</button>
                    </li>
                `;
            });
        }
        html += '</ul>';

        // AI Relic Tips
        const aiRelicTips = await generateAIRelicTips(avatar.id, document.body.innerText);
        if (aiRelicTips) {
            html += `<div class=\"ai-tip\"><strong>AI 神器提示:</strong><br>${aiRelicTips}</div>`;
        }

        parentElement.innerHTML = html;

        parentElement.querySelectorAll('.activate-relic-btn').forEach(button => {
            button.addEventListener('click', (e) => activateActiveRelic(avatar.id, e.target.dataset.id));
        });
        parentElement.querySelectorAll('.unequip-relic-btn').forEach(button => {
            button.addEventListener('click', (e) => unequipRelic(avatar.id, e.target.dataset.id));
        });
        parentElement.querySelectorAll('.equip-relic-btn').forEach(button => {
            button.addEventListener('click', (e) => equipRelic(avatar.id, e.target.dataset.id));
        });
        parentElement.querySelectorAll('.collect-relic-btn').forEach(button => {
            button.addEventListener('click', (e) => collectRelic(avatar.id, e.target.dataset.id));
        });
    }

    /**
     * Renders the MECE principles panel.
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    function renderMECEPanel(parentElement) {
        if (!parentElement || !activeAvatarId || !avatars[activeAvatarId]) {
            parentElement.innerHTML = '<p>請先選擇一個分身。</p>';
            return;
        }
        const avatar = avatars[activeAvatarId];

        let html = '<h3>萬能MECE極限性能晉級16法則</h3><ul class=\"mece-principles-list\">';
        MECE_PRINCIPLES.forEach(principle => {
            const masteryCount = avatar.meceMastery[principle.id] || 0;
            html += `
                <li>
                    <strong>${principle.name}:</strong> ${principle.description}
                    <p>掌握度: ${masteryCount} 次</p>
                    <button data-id=\"${principle.id}\" class=\"trigger-mece-btn\">觸發進化</button>
                </li>
            `;
        });
        html += '</ul>';
        parentElement.innerHTML = html;

        parentElement.querySelectorAll('.trigger-mece-btn').forEach(button => {
            button.addEventListener('click', (e) => triggerEvolution(avatar.id, e.target.dataset.id));
        });
    }

    /**
     * Renders the history panel (Mirror Memory Corridor).
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    function renderHistoryPanel(parentElement) {
        if (!parentElement || !activeAvatarId || !avatars[activeAvatarId]) {
            parentElement.innerHTML = '<p>請先選擇一個分身。</p>';
            return;
        }
        const avatar = avatars[activeAvatarId];

        let html = '<h3>鏡像回憶長廊</h3><ul class=\"history-list\">';
        if (avatar.history.length === 0) {
            html += '<li><p>此分身尚未有任何回憶。</p></li>';
        } else {
            // Display in reverse chronological order
            [...avatar.history].reverse().forEach(event => {
                const date = new Date(event.timestamp).toLocaleString();
                html += `
                    <li>
                        <strong>[${date}] ${event.type}:</strong> ${event.description}
                    </li>
                `;
            });
        }
        html += '</ul>';
        parentElement.innerHTML = html;
    }

    /**
     * Renders the new Memory Panel (Holy Ark).
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    function renderMemoryPanel(parentElement) {
        if (!parentElement || !activeAvatarId || !avatars[activeAvatarId]) {
            parentElement.innerHTML = '<p>請先選擇一個分身。</p>';
            return;
        }
        const avatar = avatars[activeAvatarId];

        let html = '<h3>聖櫃 - 記憶鑄造與檢索</h3>';
        html += `<p>當前選取文字: <strong>${selectedTextForCasting || '無'}</strong></p>`;
        const remainingCooldown = CONFIG.COOLDOWNS.MEMORY_CASTING - (Date.now() - lastMemoryCastingTime);
        const isOnCooldown = remainingCooldown > 0;
        const cooldownText = isOnCooldown ? ` (冷卻中: ${Math.ceil(remainingCooldown / 1000)}秒)` : '';

        html += `
            <button id=\"cast-memory-btn\" ${!selectedTextForCasting || isOnCooldown ? 'disabled' : ''}>
                鑄造記憶碎片${cooldownText}
            </button>
            <hr style=\"border-top: 1px dashed #444; margin: 15px 0;\"/>
            <h3>已鑄造記憶碎片</h3>
            <input type=\"text\" id=\"search-memory-input\" placeholder=\"檢索記憶碎片...\" />
            <button id=\"search-memory-btn\">檢索</button>
            <ul class=\"memory-fragments-list\">
        `;

        const searchTerm = parentElement.querySelector('#search-memory-input')?.value.toLowerCase() || '';
        const filteredFragments = avatar.memoryFragments.filter(f =>
            f.content.toLowerCase().includes(searchTerm) ||
            f.url.toLowerCase().includes(searchTerm) ||
            f.tags?.toLowerCase().includes(searchTerm)
        ).reverse(); // Newest first

        if (filteredFragments.length === 0) {
            html += '<li><p>聖櫃中沒有記憶碎片。</p></li>';
        } else {
            filteredFragments.forEach(fragment => {
                html += `
                    <li class=\"memory-fragment-item\">
                        <strong>[${new Date(fragment.timestamp).toLocaleString()}]</strong>
                        <p>${fragment.content.substring(0, 100)}...</p>
                        <small>來源: <a href=\"${fragment.url}\" target=\"_blank\" style=\"color:#c4b5fd;\">${fragment.url.substring(0, 50)}...</a></small>
                        ${fragment.tags ? `<small>標籤: ${fragment.tags}</small>` : ''}
                        <button data-id=\"${fragment.id}\" class=\"delete-memory-btn\" style=\"background: #e74c3c;\">刪除</button>
                    </li>
                `;
            });
        }
        html += '</ul>';
        parentElement.innerHTML = html;

        parentElement.querySelector('#cast-memory-btn').addEventListener('click', castMemoryFragment);
        const searchInput = parentElement.querySelector('#search-memory-input');
        searchInput.value = searchTerm; // Restore search term
        parentElement.querySelector('#search-memory-btn').addEventListener('click', () => renderMemoryPanel(parentElement));
        parentElement.querySelectorAll('.delete-memory-btn').forEach(button => {
            button.addEventListener('click', (e) => deleteMemoryFragment(e.target.dataset.id));
        });
    }

    /**
     * Renders the new Future Codex Panel.
     * @param {HTMLElement} parentElement - The parent element to render into.
     */
    function renderFutureCodexPanel(parentElement) {
        if (!parentElement) return;

        let html = '<h3>未來聖典 - 權能預置</h3>';
        html += '<p>這些是尚未解鎖的宇宙權能，它們是承諾，也是您成長的下一步目標。</p>';
        html += `
            <div style=\"display: flex; flex-direction: column; gap: 10px; margin-top: 15px;\">
                <button id=\"architecture-engine-btn\">
                    <span style=\"font-size: 1.2em; margin-right: 5px;\">⚙️</span> 架構永固引擎
                </button>
                <button id=\"entropy-reduction-btn\">
                    <span style=\"font-size: 1.2em; margin-right: 5px;\">✨</span> 熵減演算
                </button>
            </div>
        `;
        parentElement.innerHTML = html;

        parentElement.querySelector('#architecture-engine-btn').addEventListener('click', () => {
            showNotification('架構永固引擎: 能夠在混沌中編織出永恆穩定的系統架構，確保萬物歸宗的法則不被動搖。', 'info', 7000);
        });
        parentElement.querySelector('#entropy-reduction-btn').addEventListener('click', () => {
            showNotification('熵減演算: 逆轉宇宙熵增的趨勢，將無序轉化為有序，優化所有能量與信息流動的效率。', 'info', 7000);
        });
    }

    /**
     * Displays a notification message.
     * @param {string} message - The message to display.
     * @param {'success' | 'info' | 'warning' | 'error'} type - The type of notification.
     * @param {number} duration - Duration in milliseconds.
     */
    function showNotification(message, type = 'info', duration = 3000) {
        const notificationArea = document.getElementById(CONFIG.UI_IDS.NOTIFICATION_AREA);
        if (!notificationArea) return;

        const notification = document.createElement('div');
        notification.className = `junaaikey-notification ${type}`;
        notification.textContent = message;
        notificationArea.appendChild(notification);

        // Trigger reflow to ensure transition plays
        void notification.offsetWidth;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => notification.remove());
        }, duration);
    }

    /**
     * Displays a modal for level-up choices.
     * @param {string} avatarId - The ID of the avatar.
     * @param {Array<SkillDefinition | RelicDefinition>} choices - Array of skill or relic choices.
     */
    function showLevelUpChoiceModal(avatarId, choices) {
        let modal = document.getElementById(CONFIG.UI_IDS.LEVEL_UP_MODAL);
        if (modal) modal.remove(); // Remove any existing modal

        modal = document.createElement('div');
        modal.id = CONFIG.UI_IDS.LEVEL_UP_MODAL;
        modal.innerHTML = `
            <div class=\"modal-content\">
                <h3>恭喜升級！請選擇您的獎勵：</h3>
                <div class=\"choices-grid\">
                    ${choices.map(choice => `
                        <div class=\"choice-card\">
                            <h4>${choice.name} (${choice.type === 'active' || choice.type === 'passive' ? '技能' : '神器'})</h4>
                            <p>${choice.description}</p>
                            <p>等級要求: Lv.${choice.minLevel} | 經驗值消耗: ${choice.expCost}</p>
                            <button data-id=\"${choice.id}\" data-type=\"${choice.type === 'active' || choice.type === 'passive' ? 'skill' : 'relic'}\">選擇</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelectorAll('.choice-card button').forEach(button => {
            button.addEventListener('click', (e) => {
                const chosenId = e.target.dataset.id;
                const chosenType = e.target.dataset.type;

                if (chosenType === 'skill') {
                    learnSkill(avatarId, chosenId, true); // true for fromLevelUp
                } else if (chosenType === 'relic') {
                    collectRelic(avatarId, chosenId, true); // true for fromLevelUp
                }
                gainExp(avatarId, CONFIG.EXP_GAINS.LEVEL_UP_CHOICE, 'LEVEL_UP_CHOICE_BONUS'); // Bonus for making a choice
                modal.remove();
            });
        });
    }

    // --- AI 提示邏輯 ---

    /**
     * Fetches AI suggestions from Straico.
     * @param {string} prompt - The prompt for the AI.
     * @returns {Promise<string>} - The AI's response or an error message.
     */
    async function fetchAISuggestion(prompt) {
        const straicoKey = GM_getValue(CONFIG.STORAGE_KEYS.STRAICO_KEY, '');
        if (!straicoKey) {
            return "Straico API Key 未設定。請前往「人設」面板設定您的 API Key 以啟用 AI 提示功能。";
        }

        try {
            const response = await fetch(CONFIG.API_ENDPOINTS.STRAICO_AI_SUGGESTION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${straicoKey}`
                },
                body: JSON.stringify({
                    model: CONFIG.AI_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 300,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API 錯誤: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || "未能獲取 AI 提示。";
        } catch (error) {
            console.error("Straico AI 提示錯誤:", error);
            return `獲取 AI 提示失敗: ${error.message}`;
        }
    }

    /**
     * Generates AI skill tips for the active avatar.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} currentContent - The text content of the current webpage.
     * @returns {Promise<string>} - AI generated skill tips.
     */
    async function generateAISkillTips(avatarId, currentContent) {
        const avatar = avatars[avatarId];
        if (!avatar) return "分身不存在。";

        const learnedSkills = SKILL_DEFINITIONS.filter(s => avatar.skills.includes(s.id));
        const unlearnedSkills = SKILL_DEFINITIONS.filter(s => !avatar.skills.includes(s.id) && avatar.level >= s.minLevel);

        const prompt = `${CONFIG.AI_PROMPT_PREFIX}
        分身名稱: ${avatar.name}
        等級: ${avatar.level}
        經驗值: ${avatar.exp}/${avatar.expToNextLevel}
        已習得技能: ${learnedSkills.map(s => s.name).join(', ') || '無'}
        可習得技能 (等級足夠): ${unlearnedSkills.map(s => `${s.name} (Lv.${s.minLevel}, Exp:${s.expCost})`).join(', ') || '無'}
        當前網頁內容摘要: ${currentContent.substring(0, 500)}...
        ${CONFIG.AI_PROMPT_SUFFIX_SKILL}`;

        return fetchAISuggestion(prompt);
    }

    /**
     * Generates AI relic tips for the active avatar.
     * @param {string} avatarId - The ID of the avatar.
     * @param {string} currentContent - The text content of the current webpage.
     * @returns {Promise<string>} - AI generated relic tips.
     */
    async function generateAIRelicTips(avatarId, currentContent) {
        const avatar = avatars[avatarId];
        if (!avatar) return "分身不存在。";

        const collectedRelics = RELIC_DEFINITIONS.filter(r => avatar.relics.includes(r.id));
        const equippedRelics = RELIC_DEFINITIONS.filter(r => avatar.equippedRelics.includes(r.id));
        const uncollectedRelics = RELIC_DEFINITIONS.filter(r => !avatar.relics.includes(r.id) && avatar.level >= r.minLevel);

        const prompt = `${CONFIG.AI_PROMPT_PREFIX}
        分身名稱: ${avatar.name}
        等級: ${avatar.level}
        經驗值: ${avatar.exp}/${avatar.expToNextLevel}
        已收集神器: ${collectedRelics.map(r => r.name).join(', ') || '無'}
        已裝備神器: ${equippedRelics.map(r => r.name).join(', ') || '無'} (最多可裝備 ${CONFIG.MAX_EQUIPPED_RELICS} 個)
        可收集神器 (等級足夠): ${uncollectedRelics.map(r => `${r.name} (Lv.${r.minLevel}, Exp:${r.expCost}, 部位:${r.part})`).join(', ') || '無'}
        當前網頁內容摘要: ${currentContent.substring(0, 500)}...
        ${CONFIG.AI_PROMPT_SUFFIX_RELIC}`;

        return fetchAISuggestion(prompt);
    }

    // --- 新增：記憶鑄造與檢索功能 ---

    /**
     * Captures selected text and stores it as a memory fragment.
     */
    function castMemoryFragment() {
        if (!activeAvatarId || !avatars[activeAvatarId]) {
            showNotification('無活躍分身，無法鑄造記憶碎片。', 'error');
            return;
        }
        if (!selectedTextForCasting) {
            showNotification('請先選取要鑄造的文字。', 'warning');
            return;
        }

        const remainingCooldown = CONFIG.COOLDOWNS.MEMORY_CASTING - (Date.now() - lastMemoryCastingTime);
        if (remainingCooldown > 0) {
            showNotification(`記憶鑄造正在冷卻中，請等待 ${Math.ceil(remainingCooldown / 1000)} 秒。`, 'warning');
            return;
        }

        const avatar = avatars[activeAvatarId];
        const newFragment = {
            id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            content: selectedTextForCasting,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            tags: prompt('為此記憶碎片添加標籤 (逗號分隔):') || '',
        };

        avatar.memoryFragments.push(newFragment);
        saveAvatars();
        gainExp(activeAvatarId, CONFIG.EXP_GAINS.MEMORY_CAST, 'MEMORY_CAST');
        logHistory(activeAvatarId, { type: 'MEMORY_CAST', description: `鑄造記憶碎片: ${newFragment.content.substring(0, 30)}...` });
        showNotification('記憶碎片已鑄造並儲存到聖櫃！', 'success');
        selectedTextForCasting = ''; // Clear selected text after casting
        lastMemoryCastingTime = Date.now(); // Set cooldown
        if (currentPanel === 'memory') {
            renderMemoryPanel(); // Re-render if memory panel is open
        }
    }

    /**
     * Deletes a memory fragment from the active avatar's holy ark.
     * @param {string} fragmentId - The ID of the fragment to delete.
     */
    function deleteMemoryFragment(fragmentId) {
        if (!activeAvatarId || !avatars[activeAvatarId]) {
            showNotification('無活躍分身，無法刪除記憶碎片。', 'error');
            return;
        }
        if (confirm('確定要刪除此記憶碎片嗎？')) {
            const avatar = avatars[activeAvatarId];
            const initialLength = avatar.memoryFragments.length;
            avatar.memoryFragments = avatar.memoryFragments.filter(f => f.id !== fragmentId);
            if (avatar.memoryFragments.length < initialLength) {
                saveAvatars();
                showNotification('記憶碎片已刪除。', 'warning');
                logHistory(activeAvatarId, { type: 'MEMORY_DELETE', description: `刪除記憶碎片 ID: ${fragmentId}` });
                if (currentPanel === 'memory') {
                    renderMemoryPanel(); // Re-render if memory panel is open
                }
            } else {
                showNotification('記憶碎片未找到。', 'error');
            }
        }
    }

    // --- 輔助功能 ---

    /**
     * Debounces a function call.
     * @param {function} func - The function to debounce.
     * @param {number} delay - The debounce delay in milliseconds.
     * @returns {function} - The debounced function.
     */
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    /**
     * Throttles a function call.
     * @param {function} func - The function to throttle.
     * @param {number} limit - The throttle limit in milliseconds.
     * @returns {function} - The throttled function.
     */
    function throttle(func, limit) {
        let inThrottle;
        let lastResult;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
                lastResult = func.apply(context, args);
            }
            return lastResult;
        };
    }

    // --- 模擬外部操作以觸發經驗值和MECE原則 ---
    // These functions would be called by other parts of the userscript or external events.
    // For demonstration, we'll add them as global functions for manual testing.

    /**
     * Simulates pushing a note, gaining EXP.
     */
    window.simulatePushNote = () => {
        if (activeAvatarId) {
            gainExp(activeAvatarId, CONFIG.EXP_GAINS.PUSH_NOTE, 'PUSH_NOTE');
            showNotification('筆記已推送！', 'success');
        } else {
            showNotification('無活躍分身，無法推送筆記。', 'error');
        }
    };

    /**
     * Simulates copying markdown, gaining EXP.
     */
    window.simulateCopyMarkdown = () => {
        if (activeAvatarId) {
            gainExp(activeAvatarId, CONFIG.EXP_GAINS.COPY_MARKDOWN, 'COPY_MARKDOWN');
            showNotification('Markdown 已複製！', 'success');
        } else {
            showNotification('無活躍分身，無法複製 Markdown。', 'error');
        }
    };

    /**
     * Simulates downloading markdown, gaining EXP.
     */
    window.simulateDownloadMarkdown = () => {
        if (activeAvatarId) {
            gainExp(activeAvatarId, CONFIG.EXP_GAINS.DOWNLOAD_MARKDOWN, 'DOWNLOAD_MARKDOWN');
            showNotification('Markdown 已下載！', 'success');
        } else {
            showNotification('無活躍分身，無法下載 Markdown。', 'error');
        }
    };

    /**
     * Simulates auto content detection, gaining EXP and potentially triggering MECE.
     * @param {string} [meceId] - Optional MECE principle ID to trigger.
     */
    window.simulateAutoContentDetect = (meceId = null) => {
        if (activeAvatarId) {
            gainExp(activeAvatarId, CONFIG.EXP_GAINS.AUTO_CONTENT_DETECT, 'AUTO_CONTENT_DETECT');
            showNotification('自動內容偵測完成！', 'success');
            if (meceId) {
                triggerEvolution(activeAvatarId, meceId);
            }
        } else {
            showNotification('無活躍分身，無法執行內容偵測。', 'error');
        }
    };

    // --- 初始化 ---
    document.addEventListener('DOMContentLoaded', () => {
        initializeData();
        createFloatingOrb();
        // Initial application of passive effects for the active avatar
        if (activeAvatarId) {
            applyPassiveEffects(activeAvatarId);
        }
    });

    // Optional: Re-render menu if it's open and data changes (e.g., from external calls)
    // This is a simple approach; for more complex apps, consider a state management pattern.
    window.addEventListener('storage', (event) => {
        if (event.key === CONFIG.STORAGE_KEYS.AVATARS || event.key === CONFIG.STORAGE_KEYS.ACTIVE_AVATAR_ID) {
            initializeData(); // Re-load data
            if (menuVisible) {
                renderMenu(); // Re-render if menu is open
            }
            updateOrbDisplay();
        }
    });

    // New: Event listener for text selection to enable "Memory Casting"
    document.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            selectedTextForCasting = selection.toString().trim();
            // Optionally, show a temporary visual cue or enable a button
            // For now, it will just update the state for the Memory Panel
            if (currentPanel === 'memory') {
                renderMemoryPanel(); // Re-render to show selected text
            }
        } else {
            selectedTextForCasting = '';
            if (currentPanel === 'memory') {
                renderMemoryPanel(); // Re-render to clear selected text
            }
        }
    });

    // Register Tampermonkey menu commands for quick access
    GM_registerMenuCommand("顯示/隱藏神使介面", toggleMenu);
    GM_registerMenuCommand("鑄造選取文字為記憶碎片", () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            selectedTextForCasting = selection.toString().trim();
            castMemoryFragment();
        } else {
            showNotification('請先選取要鑄造的文字。', 'warning');
        }
    });

})();