// controllers/chatbotController.js
const Conversa = require('../models/conversa');

// Iniciar conversa
const iniciarConversa = async (req, res, next) => {
  try {
    const { mensagem } = req.body;
    const userId = req.userId;

    const conversa = new Conversa({
      userId,
      titulo: mensagem.substring(0, 50),
      mensagens: [{
        remetente: 'user',
        texto: mensagem
      }, {
        remetente: 'bot',
        texto: 'Olá! Como posso ajudar? 🌱'
      }]
    });

    await conversa.save();

    res.json({
      success: true,
      conversa
    });
  } catch (error) {
    next(error);
  }
};

// Enviar mensagem
const enviarMensagem = async (req, res, next) => {
  try {
    const { conversaId } = req.params;
    const { mensagem } = req.body;

    const conversa = await Conversa.findById(conversaId);
    
    conversa.mensagens.push({
      remetente: 'user',
      texto: mensagem
    });

    // Resposta automática simples
    conversa.mensagens.push({
      remetente: 'bot',
      texto: 'Recebi a tua mensagem. Em breve responderemos!'
    });

    await conversa.save();

    res.json({
      success: true,
      mensagens: conversa.mensagens
    });
  } catch (error) {
    next(error);
  }
};

// Histórico
const getHistorico = async (req, res, next) => {
  try {
    const userId = req.userId;
    const conversas = await Conversa.find({ userId }).sort('-dataInicio');
    
    res.json({
      success: true,
      conversas
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  iniciarConversa,
  enviarMensagem,
  getHistorico
};