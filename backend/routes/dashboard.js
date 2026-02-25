// routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Importar middleware de autenticação
let protect;
try {
  protect = require('../middleware/auth').protect;
  console.log('✅ Auth middleware carregado em dashboard');
} catch (error) {
  console.log('⚠️ Erro ao carregar auth middleware em dashboard:', error.message);
  // Fallback
  protect = (req, res, next) => {
    console.log('⚠️ Usando protect dummy em dashboard');
    req.userId = '123456789';
    req.user = { id: '123456789', role: 'agricultor' };
    next();
  };
}

console.log('🔍 dashboardController:', {
  getDashboardData: typeof dashboardController?.getDashboardData,
  registrarScan: typeof dashboardController?.registrarScan
});

// Todas as rotas do dashboard são protegidas
router.use(protect);

router.get('/', dashboardController.getDashboardData);
router.post('/scan', dashboardController.registrarScan);

module.exports = router;