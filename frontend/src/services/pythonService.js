// frontend/src/services/pythonService.js
import axios from 'axios';

const PYTHON_API_URL = process.env.REACT_APP_PYTHON_API_URL || 'https://agrookuvanja-python.onrender.com';
const pythonApi = axios.create({
  baseURL: PYTHON_API_URL,
  timeout: 60000, // 60 segundos
});

// Interceptor para logging
pythonApi.interceptors.request.use(request => {
  console.log('🚀 Enviando para Python:', request.method, request.url);
  return request;
});

pythonApi.interceptors.response.use(
  response => {
    console.log('✅ Resposta Python:', response.status);
    return response;
  },
  error => {
    console.error('❌ Erro Python:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

/**
 * Deteta pragas na imagem (envia como ficheiro)
 * @param {File} imageFile - Arquivo de imagem
 * @param {number} confThreshold - Limiar de confiança (0.0 a 1.0)
 * @returns {Promise<Object>} - Resultado da deteção
 */
export const detectPestFromImage = async (imageFile, confThreshold = 0.7) => {
  // Validações
  if (!imageFile) {
    throw new Error('Nenhuma imagem fornecida');
  }
  
  if (!imageFile.type.startsWith('image/')) {
    throw new Error('Arquivo não é uma imagem');
  }
  
  if (imageFile.size > 10 * 1024 * 1024) {
    throw new Error('Imagem muito grande (máx 10MB)');
  }
  
  try {
    console.log('🔍 Enviando imagem para deteção...', {
      nome: imageFile.name,
      tamanho: `${(imageFile.size / 1024).toFixed(2)} KB`,
      tipo: imageFile.type,
      threshold: confThreshold
    });
    
    // Criar FormData e anexar o ficheiro
    const formData = new FormData();
    formData.append('file', imageFile);  // ← NOME TEM DE SER 'file'
    formData.append('conf_threshold', confThreshold.toString());
    
    // Enviar para o endpoint /detect
    const response = await pythonApi.post('/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('✅ Deteção concluída:', {
      pragas: response.data.total_count || 0,
      tempo: `${response.data.processing_time_ms?.toFixed(0)}ms`
    });
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Erro na deteção:', error);
    
    // Tratamento de erros
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 400) {
        throw new Error(data.detail || 'Erro na imagem enviada');
      } else if (status === 413) {
        throw new Error('Imagem muito grande (máx 10MB)');
      } else if (status === 415) {
        throw new Error('Tipo de imagem não suportado');
      } else if (status === 422) {
        throw new Error('Formato de imagem inválido');
      } else if (status === 503) {
        throw new Error('Serviço de deteção indisponível');
      } else {
        throw new Error(data.detail || `Erro ${status}`);
      }
    } else if (error.request) {
      throw new Error('Servidor Python não respondeu. Verifique se está em http://localhost:8001');
    } else {
      throw error;
    }
  }
};

/**
 * Verifica saúde do serviço Python
 */
export const checkPythonHealth = async () => {
  try {
    const response = await pythonApi.get('/health');
    return {
      status: response.data.status,
      model_loaded: response.data.model_loaded,
      online: true
    };
  } catch (error) {
    return { status: 'offline', model_loaded: false, online: false };
  }
};

export default pythonApi;