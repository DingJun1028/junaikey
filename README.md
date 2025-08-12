---
type: JunAiKeySystem
title: ' 1. Firebase 初始化'
tags: []
---

### 🔧 **1. Firebase 初始化（所有節點共用）**

```javascript
// Firebase 初始化（直接複製貼上）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
```

---

### 🧠 **2. OMC-K 知識節點（Firestore 快速存取）**

```javascript
// 寫入知識圖形（自動同步）
firebase.firestore().collection("knowledgeGraph")
  .doc("entity1")
  .set({ 
    relationships: ["entity2", "entity3"],
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
  });
```

---

### 🔗 **3. OMC-L 連結節點（Cloud Functions 快速 API 整合）**

```javascript
// Boost.Space 整合（直接複製貼上）
exports.boostIntegration = functions.https.onRequest((req, res) => {
  res.status(200).send("Boost.Space 整合成功");
});
```

---

### 🤖 **4. OMC-A 代理節點（自動化工作流程）**

```javascript
// 每 5 分鐘自動執行
functions.pubsub.schedule("every 5 minutes").onRun(() => {
  console.log("自動化工作流程執行");
  return null;
});
```

---

### 📊 **5. OMC-E 演化節點（Analytics 快速監控）**

```javascript
// 自動記錄系統效能
firebase.analytics().logEvent('system_evolution', {
  metric: 'response_time',
  value: 123
});
```

---

### 🔐 **6. 安全規則（Firebase 預設設定）**

```javascript
// 使用 Firebase 預設安全規則（免設定）
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

### 🧾 **7. 認證實現（Firebase UI 快速套件）**

```html
<!-- 直接複製貼上登入介面 -->
<div id="firebaseui-auth-container"></div>
<script src="https://cdn.firebase.com/libs/firebaseui/4.8.0/firebaseui.js"></script>
<script>
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', {
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
  });
</script>
```

---

### 🚀 **8. 一鍵部署指令**

```bash
# 一次部署所有功能
firebase deploy --only functions,hosting,firestore,analytics
```

---

### 📝 使用注意事項

1. **懶人模式**：所有功能皆使用 Firebase 預設設定，適合快速驗證概念

2. **後續優化**：可逐步添加自定義安全規則與進階功能

3. **即時同步**：所有 Firestore 資料會自動同步，無需手動刷新
