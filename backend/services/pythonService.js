const axios = require('axios');
const FormData = require('form-data');

class PythonService {
  constructor() {
    this.baseURL = process.env.PYTHON_API_URL || 'http://localhost:8001';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
    });
  }

  async detectFromImage(imageBuffer, filename) {
    try {
      const formData = new FormData();
      formData.append('file', imageBuffer, { filename });

      // Corrigido: usa '/detect' em vez de '/api/python/detect/image'
      const response = await this.client.post('/detect', formData, {
        headers: formData.getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erro Python detect:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
      throw new Error('Falha na detecção de imagem');
    }
  }

  async predictLosses(data) {
    try {
      // Este endpoint pode não existir; ajuste se necessário ou remova a funcionalidade
      const response = await this.client.post('/predict/losses', data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro Python predict:', error.message);
      throw error;
    }
  }

  async analyzeRisk(data) {
    try {
      // Este endpoint pode não existir; ajuste se necessário
      const response = await this.client.post('/analyze/risk', data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro Python risk:', error.message);
      throw error;
    }
  }

  async getCameraStream() {
    // Ajuste se houver um endpoint de stream
    return `${this.baseURL}/detect/stream`;
  }

  async healthCheck() {
    try {
      // Usa o endpoint /health que existe
      const response = await this.client.get('/health');
      // Assume que retorna algo como { "status": "ok" } ou similar
      return { status: 'online', ...response.data };
    } catch (error) {
      console.error('❌ Erro no health check do Python:', error.message);
      return { status: 'offline', error: error.message };
    }
  }
}

module.exports = new PythonService();