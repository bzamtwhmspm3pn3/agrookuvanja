// backend/models/deteccao.js
const mongoose = require('mongoose');

const deteccaoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  localizacao: {
    type: String,
    default: 'Não especificada'
  },
  areaAfetada: {
    type: String,
    default: 'Área não especificada'
  },
  cultura: {
    type: String,
    default: 'Não especificada'
  },
  perdaEstimada: {
    type: Number,
    default: 0
  },
  nivelRisco: {
    type: String,
    enum: ['BAIXO', 'MÉDIO', 'ALTO', 'CRÍTICO', 'NENHUM'],
    default: 'NENHUM'
  },
  total_count: {
    type: Number,
    default: 0
  },
  detections: [{
    class: String,
    class_pt: String,
    confidence: Number,
    bbox: [Number],
    area: Number
  }],
  imagemUrl: {
    type: String,
    default: null
  },
  processado: {
    type: Boolean,
    default: true
  },
  resolvido: {
    type: Boolean,
    default: false
  },
  resolvidoEm: {
    type: Date,
    default: null
  },
  origem: {
    type: String,
    enum: ['deteccao', 'monitoramento', 'camera'],
    default: 'deteccao'
  },
  cameraId: {
    type: String,
    default: null
  },
  cameraNome: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Índices para consultas rápidas
deteccaoSchema.index({ usuarioId: 1, timestamp: -1 });
deteccaoSchema.index({ usuarioId: 1, resolvido: 1 });
deteccaoSchema.index({ 'detections.class': 1 });

module.exports = mongoose.model('Deteccao', deteccaoSchema);