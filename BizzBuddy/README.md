# 🚀 BizBuddy

BizBuddy is a smart operations assistant that helps small businesses monitor inventory, payments, and staff performance using Google Sheets — enhanced with AI-powered insights and automated risk alerts.

The platform transforms spreadsheet data into actionable dashboards so business owners can make faster, smarter decisions.

---

## 🌟 Problem Statement

Small businesses frequently manage operations through spreadsheets, which leads to:

- Scattered data across multiple sheets
- Manual tracking and delayed decisions
- Difficulty identifying operational risks early
- Lack of intelligent recommendations

---

## 💡 Proposed Solution

BizBuddy acts as an intelligent layer on top of existing business spreadsheets.

The system:

- Connects directly to Google Sheets
- Analyzes operational data automatically
- Generates risk alerts in real-time
- Provides AI-driven business recommendations
- Displays everything in a modern dashboard

---

## 🧠 Key Features

### 📊 Smart Dashboard
- Real-time business statistics
- Inventory, payments, and staff monitoring
- Risk scoring system
- Visual charts and insights

### ⚠️ Automated Alerts
- Low stock detection
- Pending payment tracking
- Operational risk alerts

### 🤖 AI Recommendations
- Gemini-powered business advice
- Context-aware suggestions
- Smart caching to reduce API usage

### 🔄 Smart Data Sync
- Google Sheets integration
- Cached dashboard snapshots for consistency
- Stable refresh experience

### 📧 Smart Email Notifications
- Sends alerts only when risk changes
- Cooldown logic to prevent spam

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Google Sheets API

### AI & Services
- Google Gemini API
- Email notification service

---

## ⚙️ How It Works

1. User connects Google Sheets (Inventory, Payments, Staff)
2. Backend parses sheet data
3. Risk engine generates stats and alerts
4. Dashboard data is cached for consistency
5. AI generates actionable recommendations
6. Dashboard displays live insights
