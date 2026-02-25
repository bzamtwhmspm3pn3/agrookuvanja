# 🌱 AgroOkuvanja - Sistema de Deteção de Pragas

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Sobre o Projeto

AgroOkuvanja é uma plataforma completa para deteção e gestão de pragas agrícolas, desenvolvida para o **Timbuktoo Agritech Hackathon 2026**. O sistema utiliza Inteligência Artificial (YOLOv8) para identificar pragas como roedores e aves em plantações.

## ✨ Funcionalidades

- 🔍 **Deteção de Pragas** via upload de imagem ou câmara
- 🐀 **Gestão Específica** para Roedores e Aves
- 🗺️ **Mapa de Risco** interativo
- 📊 **Métricas de Produção** e relatórios
- 🤖 **Recomendações IA** personalizadas
- 🎤 **Assistente de Voz** em português natural

## 🚀 Tecnologias

### Frontend
- React 18
- Framer Motion
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- FastAPI (Python)
- Ultralytics YOLOv8
- OpenCV

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- Python 3.11+
- MongoDB Atlas

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/SEU_USUARIO/agrookuvanja.git
cd agrookuvanja
Backend (Node.js)

bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas configurações
npm run dev
Backend Python

bash
cd backend/python
python -m venv venv
# Ativar ambiente virtual
venv\Scripts\activate  # Windows
# ou
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
cd api
python app.py
Frontend

bash
cd frontend
npm install
npm start
🌍 Deploy
Frontend (Vercel/Netlify)
bash
cd frontend
npm run build
Backend Node (Render/Railway)
Porta: 5000

Comando: npm start

Backend Python (Heroku/DigitalOcean)
Porta: 8001

Comando: python api/app.py

Banco de Dados (MongoDB Atlas)
Cluster gratuito já configurado

👥 Equipa
Paulo Oliveira - Gestor de Projetos

Isaac Oliveira - Designer

Tiago Bondo - Front-End Developer

Venâncio Martins - ML Developer

Graças Tonga - Técnico Agrônomo

Chela Nguvo - Analista de Dados

David Teles - Técnico Agrônomo

Avindo Santos - ML Developer

📄 Licença
MIT

🏆 Hackathon
Timbuktoo Agritech Hackathon 2026

Parceiros: Governo de Angola, PNUD, Acelera Angola, Acelera Agro

text

## 📝 **CRIAR `backend/.env.example`**

```env
# Servidor
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/agrookuvanja

# JWT
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRE=30d

# Frontend
FRONTEND_URL=http://localhost:3000

# Python API
PYTHON_API_URL=http://localhost:8001
📝 CRIAR backend/python/README.md
markdown
# AgroOkuvanja Python API

API de deteção de pragas usando YOLOv8.

## Instalação

```bash
cd backend/python
python -m venv venv
venv\Scripts\activate  # Windows
# ou
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
Executar
bash
cd api
python app.py
Endpoints
GET /health - Status do serviço

POST /detect - Deteção de pragas (upload imagem)

GET /model-info - Info do modelo

Porta
A API roda em http://localhost:8001
