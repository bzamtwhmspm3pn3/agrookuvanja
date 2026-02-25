// backend/services/pythonService.js
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

      const response = await this.client.post('/api/python/detect/image', formData, {
        headers: formData.getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erro Python detect:', error.message);
      throw new Error('Falha na detecção de imagem');
    }
  }

  async predictLosses(data) {
    try {
      const response = await this.client.post('/api/python/predict/losses', data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro Python predict:', error.message);
      throw error;
    }
  }

  async analyzeRisk(data) {
    try {
      const response = await this.client.post('/api/python/analyze/risk', data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro Python risk:', error.message);
      throw error;
    }
  }

  async getCameraStream() {
    return `${this.baseURL}/api/python/detect/stream`;
  }

  async healthCheck() {
    try {
      const response = await this.client.get('/api/python/health');
      return { status: 'online', ...response.data };
    } catch (error) {
      return { status: 'offline', error: error.message };
    }
  }
}

module.exports = new PythonService();