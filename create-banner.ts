import * as fs from 'fs';
import * as path from 'path';

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xml:lang="zh-Hant" width="1200" height="400" viewBox="0 0 1200 400" role="img" aria-labelledby="title desc">
  <title id="title">JunAiKey ❤️ 君愛心鑰 - 六向同步收藏系統 OmniKey v6.6</title>
  <desc id="desc">專為 GitHub 專案頁設計的精美橫幅，展示 JunAiKey 六向同步收藏系統與支援平台</desc>
  
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
    
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    
    <style type="text/css"><![CDATA[
      .main-title { 
        font-family: 'Noto Sans TC', 'Microsoft JhengHei', 'Segoe UI', sans-serif; 
        fill: #ffffff; 
        font-weight: 800; 
        font-size: 48px; 
        letter-spacing: 1px;
      }
      .sub-title { 
        font-family: 'Noto Sans TC', 'Microsoft JhengHei', 'Segoe UI', sans-serif; 
        fill: #94a3b8; 
        font-size: 20px; 
        font-weight: 400;
      }
      .platform-text {
        font-family: 'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
        fill: #e2e8f0;
        font-size: 14px;
        font-weight: 600;
      }
      .version-badge {
        font-family: 'Courier New', monospace;
        fill: #fbbf24;
        font-size: 16px;
        font-weight: bold;
      }
    ]]></style>
  </defs>

  <rect width="1200" height="400" fill="url(#bgGradient)" />
  
  <g opacity="0.1">
    <polygon points="100,50 150,80 150,140 100,170 50,140 50,80" fill="#60a5fa" />
    <polygon points="250,50 300,80 300,140 250,170 200,140 200,80" fill="#34d399" />
    <polygon points="400,50 450,80 450,140 400,170 350,140 350,80" fill="#f472b6" />
    <polygon points="550,50 600,80 600,140 550,170 500,140 500,80" fill="#fbbf24" />
    <polygon points="700,50 750,80 750,140 700,170 650,140 650,80" fill="#a78bfa" />
    <polygon points="850,50 900,80 900,140 850,170 800,140 800,80" fill="#fb7185" />
  </g>
  
  <g transform="translate(80, 120)" filter="url(#shadow)">
    <text class="main-title" x="0" y="0">JunAiKey ❤️</text>
    <text class="main-title" x="0" y="55" style="fill: #60a5fa;">君愛心鑰</text>
    <text class="sub-title" x="0" y="100">六向同步收藏系統</text>
    <text class="sub-title" x="0" y="125">OmniKey - 一次提交，六方同步</text>
    <rect x="0" y="145" width="120" height="35" rx="18" fill="#1e293b" stroke="#60a5fa" stroke-width="1"/>
    <text class="version-badge" x="60" y="168" text-anchor="middle">v6.6</text>
  </g>
  
  <g transform="translate(720, 80)">
    <text class="platform-text" x="0" y="0" style="font-size: 18px; fill: #60a5fa;">支援平台</text>
    <g transform="translate(0, 30)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
        <text class="platform-text" x="40" y="50" text-anchor="middle">Capacities</text>
      </g>
      <g transform="translate(100, 0)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="#1e293b" stroke="#34d399" stroke-width="2"/>
        <text class="platform-text" x="40" y="50" text-anchor="middle">Notion</text>
      </g>
      <g transform="translate(200, 0)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="#1e293b" stroke="#f472b6" stroke-width="2"/>
        <text class="platform-text" x="40" y="50" text-anchor="middle">Boost</text>
      </g>
      <g transform="translate(50, 100)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
        <text class="platform-text" x="40" y="50" text-anchor="middle">Supabase</text>
      </g>
      <g transform="translate(150, 100)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="#1e293b" stroke="#a78bfa" stroke-width="2"/>
        <text class="platform-text" x="40" y="50" text-anchor="middle">AITable</text>
      </g>
      <g transform="translate(250, 100)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="#1e293b" stroke="#fb7185" stroke-width="2"/>
        <text class="platform-text" x="40" y="50" text-anchor="middle">Upnote</text>
      </g>
    </g>
  </g>
  
  <g opacity="0.3">
    <line x1="500" y1="200" x2="700" y2="200" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,5"/>
    <polygon points="695,195 705,200 695,205" fill="#60a5fa"/>
  </g>
  
  <text x="600" y="370" text-anchor="middle" class="sub-title" style="font-size: 14px; opacity: 0.8;">
    GitHub Actions 自動化同步 • TypeScript 實現 • 永續知識循環架構
  </text>
</svg>`;

const outputPath = path.join(__dirname, 'assets', 'junaikey-omnikey-banner.svg');
fs.writeFileSync(outputPath, svgContent);
console.log('Banner created successfully:', outputPath);
