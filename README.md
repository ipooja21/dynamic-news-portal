# 📰 NewsHub - Dynamic News Portal

A modern, responsive and dynamic news portal built with React and Vite.

The website automatically fetches the latest news data from Google Sheets, which is continuously updated through an n8n automation workflow.

## 🚀 Live Website

Coming soon...

## ✨ Features

- 📰 Dynamic news articles
- 🔄 Automated news updates using n8n
- 📊 Google Sheets as a data source
- 🔎 Real-time article search
- 🏷️ Category-based filtering
- 🌙 Dark / Light mode
- 📱 Fully responsive design
- ⭐ Featured news section
- 🔥 Breaking news ticker
- 📈 Trending news sidebar
- 📖 Load More pagination
- 🖼️ Responsive article images
- 🔗 Direct links to original articles
- ⚡ Fast Vite-powered frontend

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Automation & Data
- n8n
- Google Sheets
- Google Visualization API
- CSV API

## 🔄 Architecture

```text
News Source
     ↓
    n8n
     ↓
Google Sheets
     ↓
React + Vite
     ↓
NewsHub Website
