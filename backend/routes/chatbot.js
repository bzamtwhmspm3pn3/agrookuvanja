// routes/chatbot.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const { protect } = require('../middleware/auth');  // ← Importar protect

console.log('🔍 chatbotController:', {
  iniciarConversa: typeof chatbotController?.iniciarConversa,
  enviarMensagem: typeof chatbotController?.enviarMensagem,
  getHistorico: typeof chatbotController?.getHistorico
});

// Rota pública para teste
router.get('/teste', (req, res) => {
  res.json({ success: true, message: 'Chatbot funcionando!' });
});

// Rotas protegidas
router.post('/iniciar', protect, chatbotController.iniciarConversa);
router.post('/:conversaId/mensagem', protect, chatbotController.enviarMensagem);
router.get('/historico', protect, chatbotController.getHistorico);

module.exports = router;