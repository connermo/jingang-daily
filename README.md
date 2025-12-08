# ☯️ 道日课 (Tao Daily)

> 结合现代商业案例与生活智慧的《道德经》深度修习工具。
> A modern Tao Te Ching learning application with business insights and life wisdom.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Vite](https://img.shields.io/badge/Vite-Fast-yellow)

## 📖 项目简介

![index](E:\08-daodejing\tao-daily\img\index.png)

![index2](E:\08-daodejing\tao-daily\img\index2.png)

![index3](E:\08-daodejing\tao-daily\img\index3.png)

**道日课** 是一款极简主义的《道德经》修习应用。与传统的阅读器不同，本项目致力于将古老的智慧与现代生活连接。

应用内置了完整的 **81章** 内容，并将其划分为 **20天** 的修习计划。每一章不仅包含原文和今译，更核心的是提供了 **「心法解读」** 和 **「现代商业/生活案例」**，帮助用户在职场决策、生活处世中应用道的智慧。

所有数据（笔记、进度、收藏）均存储在浏览器本地（LocalStorage），注重隐私，无需联网登录即可使用。

## ✨ 核心功能

* **📚 完整收录**：包含《道德经》全 81 章，分为四个阶段（道之体、道之用、德之修、道之终）。
* **💡 深度解读**：
    * **原文/今译**：精准的翻译对照。
    * **心法**：提炼核心逻辑（如反脆弱、第一性原理、去中心化）。
    * **案例**：结合 Apple、Amazon、华为等商业案例及职场情境分析。
* **📝 沉浸式体验**：
    * **深色/浅色模式**：一键切换，舒适护眼。
    * **随手笔记**：支持对每一章记录感悟，自动保存。
    * **书签收藏**：一键收藏重点章节。
* **📊 进度追踪**：可视化的 20 天修习进度条。
* **💾 数据安全**：
    * **完全离线**：数据存储在本地。
    * **备份/恢复**：支持导出 JSON 备份文件，防止数据丢失。
* **📱 响应式设计**：完美适配手机、平板和桌面端，侧边栏可折叠。

## 🛠️ 技术栈

本项目基于现代前端技术构建，轻量且高效：

* **框架**: [React](https://react.dev/) (Hooks: \useState\, \useEffect\, \useMemo\)
* **构建工具**: [Vite](https://vitejs.dev/)
* **样式库**: [Tailwind CSS](https://tailwindcss.com/)
* **图标库**: [Lucide React](https://lucide.dev/)
* **部署平台**: Cloudflare Pages / Vercel / Netlify

## 🚀 快速开始

### 环境要求
* Node.js >= 16.0.0
* npm 或 yarn

### 本地运行

1.  **克隆项目**
    `git clone https://github.com/redv678/tao-daily.git`
    
    `cd tao-daily`
    
2.  **安装依赖**
    
    `npm install`
    
3.  **启动开发服务器**
    
    `npm run dev`
    打开浏览器访问 \http://localhost:5173\ 即可看到应用。

## 📦 打包与部署

### 构建生产版本

`npm run build`
构建完成后，静态文件将生成在 \dist\ 目录下。

### 部署到 Cloudflare Pages (推荐)
1.  安装 Wrangler 
`npm install -g wrangler`
2.  登录 Cloudflare: 
`npx wrangler login`
3.  部署:
    
    `npm run build`
    `npx wrangler pages deploy dist --project-name=tao-daily`

## 📂 项目结构

\\\
tao-daily/
 src/
    components/      # UI 组件
    data/            # (如果你将数据抽离)
    TaoDailyApp.jsx  # 核心主应用逻辑
    App.jsx          # 入口组件
    main.jsx         # 渲染入口
    index.css        # Tailwind 引入
 public/              # 静态资源
 index.html           # HTML 模板
 tailwind.config.js   # Tailwind 配置
 vite.config.js       # Vite 配置

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！
如果你有更好的案例解读或发现了翻译错误，欢迎贡献代码。

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

**Designed & Built by [redv678](https://github.com/redv678)**
