// src/components/Header.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, LogOut, User, 
  Settings, HelpCircle, Bell, Home, BarChart3,
  Target, Leaf, Phone, Mail, MapPin, Sprout,
  Award, Star, MessageCircle
} from 'lucide-react';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8'
};

export default function Header({ 
  usuarioLogado, 
  onLoginClick, 
  onRegisterClick, 
  onLogout,
  onDashboardClick,
  onQuemSomosClick,
  onContactClick,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  onEstatisticasClick
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);

  // Header para visitantes (não logados)
  if (!usuarioLogado) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{
          backgroundColor: cores.verdeAlface,
          color: 'white',
          padding: '12px 30px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{ fontSize: '28px' }}
            >
              🌱
            </motion.div>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>
              AGRO<span style={{ color: cores.verdePimenta }}>OKUVANJA</span>
            </span>
          </motion.div>

          {/* Navegação Desktop */}
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            
            {/* Links Institucionais */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={onQuemSomosClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '5px 0',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.borderBottomColor = cores.verdePimenta;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255,255,255,0.8)';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Sobre
              </button>
              
              <button
                onClick={onContactClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '5px 0',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.borderBottomColor = cores.verdePimenta;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255,255,255,0.8)';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Contacto
              </button>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginClick}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: `1px solid ${cores.verdePimenta}`,
                  padding: '8px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s'
                }}
              >
                Entrar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#94C76D' }}
                whileTap={{ scale: 0.95 }}
                onClick={onRegisterClick}
                style={{
                  background: cores.verdePimenta,
                  color: cores.verdeAlface,
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 10px rgba(130, 183, 77, 0.3)'
                }}
              >
                Criar Conta
              </motion.button>
            </div>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
            className="mobile-menu-button"
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {menuAberto && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                overflow: 'hidden',
                padding: menuAberto ? '20px' : 0,
                background: '#0A2E1A',
                marginTop: '12px',
                borderRadius: '10px'
              }}
              className="mobile-menu"
            >
              <button onClick={() => { onQuemSomosClick(); setMenuAberto(false); }} style={mobileButtonStyle}>
                Sobre
              </button>
              <button onClick={() => { onContactClick(); setMenuAberto(false); }} style={mobileButtonStyle}>
                Contacto
              </button>
              <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />
              <button onClick={() => { onLoginClick(); setMenuAberto(false); }} style={mobileButtonStyle}>
                Entrar
              </button>
              <button onClick={() => { onRegisterClick(); setMenuAberto(false); }} style={{...mobileButtonStyle, background: cores.verdePimenta, color: cores.verdeAlface, borderRadius: '8px'}}>
                Criar Conta
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    );
  }

  // Header para utilizadores LOGADOS
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor: cores.verdeAlface,
        color: 'white',
        padding: '10px 30px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => onDashboardClick()}
        >
          <span style={{ fontSize: '24px' }}>🌱</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>AGRO<span style={{ color: cores.verdePimenta }}>OKUVANJA</span></span>
        </motion.div>

        {/* Navegação Principal */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          
          {/* Dashboard */}
          <button
            onClick={() => onDashboardClick()}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.95rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <Home size={16} />
            Dashboard
          </button>

          {/* Estatísticas */}
          <button
            onClick={() => {
              if (onEstatisticasClick) onEstatisticasClick();
              else onDashboardClick();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.8)',
              padding: '8px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.95rem',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'white';
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255,255,255,0.8)';
              e.target.style.background = 'none';
            }}
          >
            <BarChart3 size={16} />
            Estatísticas
          </button>

          {/* Notificações */}
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 8,
              height: 8,
              background: cores.vermelho || '#EF4444',
              borderRadius: '50%'
            }} />
          </button>

          {/* Perfil Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setPerfilAberto(!perfilAberto)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                padding: '5px 15px',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                background: cores.verdePimenta,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cores.verdeAlface,
                fontWeight: 'bold'
              }}>
                {usuarioLogado.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span>{usuarioLogado.username || 'Utilizador'}</span>
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {perfilAberto && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '45px',
                    right: 0,
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                    width: '220px',
                    overflow: 'hidden',
                    zIndex: 1001
                  }}
                >
                  {/* Cabeçalho do perfil */}
                  <div style={{ 
                    padding: '15px', 
                    borderBottom: '1px solid #eee',
                    background: `linear-gradient(135deg, ${cores.verdeClaro}, white)`
                  }}>
                    <p style={{ fontWeight: 'bold', color: cores.verdeAlface, marginBottom: '3px' }}>
                      {usuarioLogado.username}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{usuarioLogado.email}</p>
                  </div>
                  
                  {/* Botões do perfil - TODOS FUNCIONAIS */}
                  <button 
                    onClick={() => {
                      if (onProfileClick) onProfileClick();
                      setPerfilAberto(false);
                    }}
                    style={dropdownItemStyle}
                  >
                    <User size={16} color={cores.verdeAlface} />
                    <span>Meu Perfil</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (onEstatisticasClick) onEstatisticasClick();
                      else onDashboardClick();
                      setPerfilAberto(false);
                    }}
                    style={dropdownItemStyle}
                  >
                    <Award size={16} color={cores.verdeAlface} />
                    <span>Minhas Conquistas</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (onSettingsClick) onSettingsClick();
                      setPerfilAberto(false);
                    }}
                    style={dropdownItemStyle}
                  >
                    <Settings size={16} color={cores.verdeAlface} />
                    <span>Configurações</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (onHelpClick) onHelpClick();
                      setPerfilAberto(false);
                    }}
                    style={dropdownItemStyle}
                  >
                    <MessageCircle size={16} color={cores.verdeAlface} />
                    <span>Ajuda & Suporte</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (onContactClick) onContactClick();
                      setPerfilAberto(false);
                    }}
                    style={dropdownItemStyle}
                  >
                    <Phone size={16} color={cores.verdeAlface} />
                    <span>Contactar Suporte</span>
                  </button>
                  
                  <hr style={{ margin: '5px 0', borderColor: '#eee' }} />
                  
                  {/* Botão de Logout */}
                  <button 
                    onClick={() => {
                      onLogout();
                      setPerfilAberto(false);
                    }}
                    style={{...dropdownItemStyle, color: '#DC2626'}}
                  >
                    <LogOut size={16} color="#DC2626" />
                    <span>Sair</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Mobile Button */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          className="mobile-menu-button"
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile para logados */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              padding: menuAberto ? '20px' : 0,
              background: '#0A2E1A',
              marginTop: '12px',
              borderRadius: '10px'
            }}
            className="mobile-menu"
          >
            <button onClick={() => { onDashboardClick(); setMenuAberto(false); }} style={mobileButtonStyle}>
              <Home size={16} style={{ marginRight: '10px' }} /> Dashboard
            </button>
            <button onClick={() => { if (onProfileClick) onProfileClick(); setMenuAberto(false); }} style={mobileButtonStyle}>
              <User size={16} style={{ marginRight: '10px' }} /> Meu Perfil
            </button>
            <button onClick={() => { if (onSettingsClick) onSettingsClick(); setMenuAberto(false); }} style={mobileButtonStyle}>
              <Settings size={16} style={{ marginRight: '10px' }} /> Configurações
            </button>
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />
            <button onClick={() => { onLogout(); setMenuAberto(false); }} style={{...mobileButtonStyle, color: '#FF6B6B'}}>
              <LogOut size={16} style={{ marginRight: '10px' }} /> Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Estilos reutilizáveis
const mobileButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '12px',
  background: 'none',
  border: 'none',
  color: 'white',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '1rem',
  borderRadius: '5px'
};

const dropdownItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  padding: '12px 15px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  color: '#333',
  transition: 'background 0.2s'
};

// Adicionar estilos CSS
const style = document.createElement('style');
style.innerHTML = `
  @media (max-width: 768px) {
    .mobile-menu-button {
      display: block !important;
    }
    .mobile-menu {
      display: block !important;
    }
    div[style*="display: flex; gap: 30px;"] {
      display: none !important;
    }
    div[style*="display: flex; gap: 15px;"] {
      display: none !important;
    }
  }
  
  button {
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: rgba(0,0,0,0.05) !important;
  }
  
  [style*="dropdownItemStyle"]:hover {
    background-color: #f5f5f5 !important;
  }
`;
document.head.appendChild(style);