// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require('path');

// Importar rotas
const authRoutes = require("./routes/auth");
const avaliacaoRoutes = require("./routes/avaliacoes");
const chatbotRoutes = require("./routes/chatbot");
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require("./routes/dashboard");
const modelosRoutes = require('./routes/modelos');
const detectionRoutes = require("./routes/detectionRoutes");


// Middleware de erro
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  exposedHeaders: ['Content-Length', 'Content-Type', 'Content-Disposition'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'Cache-Control'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
};

app.use(cors(corsOptions));

// Headers personalizados
app.use((req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'credentialless');
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Type, Content-Disposition');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middleware de segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Muitas requisições deste IP, tente novamente mais tarde."
  }
});
app.use("/api", limiter);

// Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1y',
  immutable: true
}));

// Conectar MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB conectado com sucesso"))
  .catch((err) => {
    console.error("❌ ERRO A CONECTAR MONGO:", err);
    process.exit(1);
  });

// ============ ROTAS ============
app.use("/api/auth", authRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/modelos', modelosRoutes);
app.use("/api/detection", detectionRoutes);

// Rota de saúde
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AGROOKUVANJA Backend está funcionando",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Rota raiz
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AGROOKUVANJA Backend</title>
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 40px; 
            background: linear-gradient(135deg, #1A4D2E, #82B74D);
            color: white;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container { max-width: 800px; }
          h1 { font-size: 3rem; margin-bottom: 10px; }
          .card { 
            background: rgba(255,255,255,0.1); 
            padding: 30px; 
            border-radius: 20px; 
            margin: 20px 0;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
          }
          .badge {
            background: #E8F0E8;
            color: #1A4D2E;
            padding: 5px 15px;
            border-radius: 50px;
            font-size: 0.9rem;
            display: inline-block;
            margin: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌱 AGROOKUVANJA Backend</h1>
          <div class="card">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
              <span class="badge">🚀 v1.0.0</span>
              <span class="badge">📊 API Online</span>
              <span class="badge">🔥 MongoDB</span>
            </div>
            <p><strong>📍 Porta:</strong> ${PORT}</p>
            <p><strong>🌍 Ambiente:</strong> ${process.env.NODE_ENV || "development"}</p>
            <p><strong>🔗 Frontend:</strong> ${process.env.FRONTEND_URL || "http://localhost:3000"}</p>
          </div>
          <div class="card">
            <h2>📋 Endpoints disponíveis</h2>
            <ul style="list-style: none; padding: 0;">
              <li>• <a href="/api/health">/api/health</a> - Status do sistema</li>
              <li>• /api/auth - Autenticação</li>
              <li>• /api/profile - Perfil do agricultor</li>
              <li>• /api/dashboard - Dashboard</li>
              <li>• /api/modelos - Gestão de modelos</li>
              <li>• /api/avaliacoes - Avaliações</li>
              <li>• /api/chatbot - Chatbot de suporte</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Middleware de erro
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🌱 AGROOKUVANJA BACKEND v1.0.0 INICIADO");
  console.log("=".repeat(60));
  console.log(`📍 Porta: ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Frontend: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
  console.log(`🔥 MongoDB: Conectado`);
  console.log("=".repeat(60));
});

module.exports = app;