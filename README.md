<div align="center">

# 🧑‍💻 Code Editor Frontend

**A browser interface for creating, browsing, and editing code projects.**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111)](https://developer.mozilla.org/) [![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=111)](https://react.dev/) [![Live demo](https://img.shields.io/badge/Live%20Demo-code--editor--front--nine.vercel.app-111?logo=vercel&logoColor=white)](https://code-editor-front-nine.vercel.app)

</div>

## ✨ Overview

The frontend delivers an editor-first experience and connects to `code-editor-backend` for project and file operations.

## 🚀 Features

- Code editing workspace
- Project and file navigation
- Responsive interface
- Backend API integration
- Clear extension point for previews and collaboration

## 🧱 Architecture

```mermaid
flowchart LR
  U[Developer] --> UI[React UI]
  UI --> ED[Editor Components]
  UI --> API[API Client]
  API --> B[Code Editor Backend]
```

## 🖼️ Screenshots

![Editor workspace](docs/screenshots/editor.png)

> Add the screenshot at `docs/screenshots/editor.png`, or replace this link with a deployed image.

## ⚡ Run locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## 🔧 Configuration

Configure the backend base URL using the frontend environment variable expected by the API client.

## 📄 License

MIT License.
