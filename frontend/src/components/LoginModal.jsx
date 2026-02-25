// src/components/LoginModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { login } from '../services/auth';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  vermelhoErro: '#DC2626'
};

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpar erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.email || !formData.password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      
      if (response.success) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        onLoginSuccess(response.user, response.token);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '400px',
          width: '90%',
          position: 'relative',
          zIndex: 10000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#999',
            padding: '5px',
            borderRadius: '5px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <X size={20} />
        </button>

        <h2 style={{ 
          color: cores.verdeAlface, 
          fontSize: '2rem', 
          marginBottom: '10px', 
          textAlign: 'center' 
        }}>
          Bem-vindo de volta! 👋
        </h2>
        
        <p style={{ 
          textAlign: 'center', 
          color: '#6B7280', 
          marginBottom: '30px',
          fontSize: '0.95rem'
        }}>
          Acesse sua conta para continuar
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: '#FEE2E2',
              color: cores.vermelhoErro,
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: cores.verdeAlface,
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              Email
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `2px solid ${error && !formData.email ? cores.vermelhoErro : cores.verdeClaro}`,
              borderRadius: '10px',
              transition: 'all 0.3s'
            }}>
              <span style={{ padding: '0 12px', color: '#9CA3AF' }}>
                <Mail size={20} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '15px 15px 15px 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  background: 'transparent'
                }}
                disabled={loading}
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: cores.verdeAlface,
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              Senha
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `2px solid ${error && !formData.password ? cores.vermelhoErro : cores.verdeClaro}`,
              borderRadius: '10px',
              transition: 'all 0.3s'
            }}>
              <span style={{ padding: '0 12px', color: '#9CA3AF' }}>
                <Lock size={20} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '15px 15px 15px 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  background: 'transparent'
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 12px',
                  color: '#9CA3AF'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Lembrar-me e Recuperar senha */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6B7280',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  accentColor: cores.verdePimenta
                }}
              />
              Lembrar-me
            </label>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: cores.verdePimenta,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Botão Entrar */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#9CA3AF' : cores.verdeAlface,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px',
              transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>

        {/* Link para registo */}
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '0.95rem' }}>
          Não tem uma conta?{' '}
          <span
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            style={{
              color: cores.verdePimenta,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cadastre-se
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}