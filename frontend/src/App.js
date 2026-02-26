// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import QuemSomos from './components/QuemSomos';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import AjudaModal from './components/AjudaModal';
import { 
  Sprout, LayoutDashboard, AlertTriangle, Bird, Rat, 
  Target, TrendingUp, Shield, Zap, Award, ChevronRight, 
  DollarSign, Mail, Phone, MapPin, MessageCircle,
  X, Instagram, Facebook, Twitter, Linkedin,
  ArrowDown, Rocket, Eye
} from 'lucide-react';
import logoAgrookuvanja from './assets/logoagrookuvanja.jpeg';
import favicon from './assets/favicon.ico';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  terra: '#8B5A2B',
  terraClara: '#C19A6B',
  castanho: '#654321'
};

// ===== CONTACT MODAL =====
function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const contactos = [
    { 
      icon: <Phone size={20} />, 
      titulo: "Telefone", 
      valor: "+244 900 000 000",
      link: "tel:+244900000000",
      bg: "#25D366"
    },
    { 
      icon: <Mail size={20} />, 
      titulo: "Email", 
      valor: "geral@agrookuvanja.ao",
      link: "mailto:geral@agrookuvanja.ao",
      bg: "#EA4335"
    },
    { 
      icon: <MapPin size={20} />, 
      titulo: "Morada", 
      valor: "Luanda, Angola",
      link: "https://maps.google.com/?q=Luanda,Angola",
      bg: "#4285F4"
    },
    { 
      icon: <MessageCircle size={20} />, 
      titulo: "WhatsApp", 
      valor: "+244 900 000 000",
      link: "https://wa.me/244900000000",
      bg: "#25D366"
    }
  ];

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
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        style={{
          background: 'white',
          borderRadius: '30px',
          padding: '40px',
          maxWidth: '500px',
          width: '90%',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#999'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: cores.verdeAlface,
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Fala Connosco! 🤝
        </h2>
        
        <p style={{ 
          textAlign: 'center', 
          color: '#666',
          marginBottom: '30px',
          fontSize: '1rem'
        }}>
          Estamos aqui para responder às tuas perguntas
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {contactos.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px',
                backgroundColor: '#F5F5F5',
                borderRadius: '15px',
                textDecoration: 'none',
                color: '#333',
                transition: 'all 0.3s'
              }}
            >
              <div style={{
                width: '45px',
                height: '45px',
                backgroundColor: item.bg,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.titulo}</div>
                <div style={{ fontWeight: 'bold' }}>{item.valor}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== SOLUÇÃO DETALHE =====
function SolucaoDetalhe({ solucaoId, onVoltar }) {
  const solucoesDetalhe = {
    'tecnica-ia': {
      titulo: "IA Preditiva",
      descricao: "Tecnologia de ponta para antecipação de pragas",
      procedimentos: [
        "1. Recolha de imagens das folhas através do app",
        "2. Processamento por rede neural convolutional",
        "3. Comparação com base de dados de 50.000+ imagens",
        "4. Identificação da praga com 98% de precisão",
        "5. Geração de relatório com recomendações"
      ],
      impactos: [
        "Redução de 40% nas perdas por pragas",
        "Economia média de 2,5 milhões Kz/ano por fazenda",
        "Antecipação de surtos em 7-14 dias",
        "Menor uso de pesticidas químicos"
      ],
      bg: `linear-gradient(135deg, ${cores.verdeAlface}, ${cores.verdePimenta})`
    },
    'monitoramento': {
      titulo: "Monitoramento 24/7",
      descricao: "Acompanhamento em tempo real da sua plantação",
      procedimentos: [
        "1. Instalação de sensores IoT no campo",
        "2. Monitoramento contínuo de temperatura e humidade",
        "3. Alertas automáticos para condições de risco",
        "4. Dashboards em tempo real pelo app",
        "5. Relatórios semanais de atividade"
      ],
      impactos: [
        "Cobertura de 5 milhões de hectares até 2028",
        "Redução de 30% no tempo de resposta",
        "Detecção precoce de focos de pragas",
        "Otimização do uso de recursos"
      ],
      bg: `linear-gradient(135deg, ${cores.verdePimenta}, ${cores.verdeAlface})`
    },
    'produtividade': {
      titulo: "Aumento de Produtividade",
      descricao: "Maximize o rendimento da sua colheita",
      procedimentos: [
        "1. Análise de dados históricos da propriedade",
        "2. Recomendações personalizadas de cultivo",
        "3. Calendário de ações preventivas",
        "4. Comparação com benchmarks nacionais",
        "5. Relatórios de ROI e produtividade"
      ],
      impactos: [
        "Aumento médio de 45% na produtividade",
        "Potencial de crescimento até 2035",
        "Melhor planeamento da safra",
        "Redução de 25% nos custos operacionais"
      ],
      bg: `linear-gradient(135deg, ${cores.verdeAlface}, ${cores.castanho})`
    }
  };

  if (!solucoesDetalhe[solucaoId]) {
    return (
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '60px 20px',
        textAlign: 'center' 
      }}>
        <h2 style={{ color: cores.verdeAlface }}>Solução não encontrada</h2>
        <button
          onClick={onVoltar}
          style={{
            background: cores.verdePimenta,
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Voltar
        </button>
      </div>
    );
  }

  const solucao = solucoesDetalhe[solucaoId];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 20px'
      }}
    >
      <motion.button
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onVoltar}
        style={{
          background: 'none',
          border: 'none',
          color: cores.verdeAlface,
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '20px',
          padding: '10px 15px',
          borderRadius: '8px'
        }}
      >
        ← Voltar
      </motion.button>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          background: solucao.bg,
          borderRadius: '30px',
          padding: '40px',
          color: 'white',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
          {solucao.titulo}
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px' }}>
          {solucao.descricao}
        </p>

        <div style={{ display: 'grid', gap: '30px' }}>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px' 
            }}>
              <span>⚙️</span> Procedimento Técnico
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {solucao.procedimentos.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '15px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px' 
            }}>
              <span>📊</span> Impactos Esperados
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px' 
            }}>
              {solucao.impactos.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '15px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Tecnologia:</span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '0.8rem'
            }}>
              🤖 Machine Learning
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '0.8rem'
            }}>
              📡 IoT
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            Meta 2035 • Alinhado com ODS 2
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== WELCOME SECTION =====
function WelcomeSection({ onExplorarClick, onContactClick, onSolucaoClick }) {
  const [activeCard, setActiveCard] = useState(null);
  
  const problemas = [
    {
      id: 1,
      titulo: "Roedores",
      icone: <Rat size={40} />,
      descricao: "Ratões e camundongos destroem até 30% da produção nacional",
      impacto: "45 mil milhões Kz/ano",
      estatistica: "1,2M famílias afetadas",
      bg: `linear-gradient(145deg, ${cores.verdeAlface}, ${cores.verdePimenta})`,
      corTexto: '#FFFFFF',
      emoji: "🐀"
    },
    {
      id: 2,
      titulo: "Aves",
      icone: <Bird size={40} />,
      descricao: "Pássaros atacam grãos e frutas em desenvolvimento",
      impacto: "28 mil milhões Kz/ano",
      estatistica: "Milho, sorgo e girassol",
      bg: `linear-gradient(145deg, ${cores.verdePimenta}, ${cores.verdeAlface})`,
      corTexto: '#FFFFFF',
      emoji: "🐦"
    },
    {
      id: 3,
      titulo: "Perdas Pós-Colheita",
      icone: <AlertTriangle size={40} />,
      descricao: "Angola perde até 30% da produção após a colheita",
      impacto: "9M toneladas/ano",
      estatistica: "Meta UA: 15% até 2035",
      bg: `linear-gradient(145deg, ${cores.verdeAlface}, ${cores.verdePimenta})`,
      corTexto: '#FFFFFF',
      emoji: "📦"
    }
  ];

  const solucoes = [
    {
      id: 4,
      titulo: "IA Preditiva",
      icone: <Zap size={40} />,
      descricao: "98% de precisão na detecção de pragas",
      beneficio: "Antecipe surtos em 7-14 dias",
      resultado: "-40% nas perdas",
      bg: `linear-gradient(145deg, ${cores.verdeAlface}, ${cores.verdePimenta})`,
      corTexto: '#FFFFFF',
      emoji: "🤖",
      detalhe: "tecnica-ia"
    },
    {
      id: 5,
      titulo: "Monitoramento 24/7",
      icone: <Eye size={40} />,
      descricao: "Cobertura em tempo real de 5M hectares",
      beneficio: "Ação imediata",
      resultado: "Cobertura nacional 2028",
      bg: `linear-gradient(145deg, ${cores.verdePimenta}, ${cores.verdeAlface})`,
      corTexto: '#FFFFFF',
      emoji: "📡",
      detalhe: "monitoramento"
    },
    {
      id: 6,
      titulo: "Produtividade",
      icone: <TrendingUp size={40} />,
      descricao: "Potencial de crescimento de 45% até 2035",
      beneficio: "+Lucro garantido",
      resultado: "Meta: -40% perdas",
      bg: `linear-gradient(145deg, ${cores.verdeAlface}, ${cores.verdePimenta})`,
      corTexto: '#FFFFFF',
      emoji: "📈",
      detalhe: "produtividade"
    }
  ];

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  const slideInFromTop = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        style={{
          background: `linear-gradient(135deg, ${cores.verdeAlface}, ${cores.verdePimenta})`,
          borderRadius: '40px',
          padding: '60px 40px',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 40px -20px rgba(0,0,0,0.3)'
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -200, y: -200, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 0.1 }}
            transition={{ duration: 1 + i * 0.1, delay: i * 0.05 }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.1,
              pointerEvents: 'none'
            }}
          >
            {['🌱', '🌿', '🌾', '🌽', '🌳'][i % 5]}
          </motion.div>
        ))}

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
  
  {/* Logo animado - substituindo o Sprout */}
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
    style={{
      width: '100px',
      height: '100px',
      background: 'white',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden',
      border: `3px solid ${cores.verdePimenta}`,
      boxShadow: `0 10px 30px ${cores.verdeAlface}80`
    }}
  >
    <motion.div
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 4,
        ease: "easeInOut"
      }}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <img 
        src={logoAgrookuvanja} 
        alt="AgroOkuvanja Logo" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = '🌱';
        }}
      />
    </motion.div>
  </motion.div>

  {/* Título */}
  <motion.h1
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    style={{
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
    }}
  >
    AGRO<span style={{ color: cores.verdeClaro }}>OKUVANJA</span>
  </motion.h1>

  {/* Slogan principal (apenas este) */}
<motion.p
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
  style={{
    fontSize: '1.5rem',
    color: 'rgba(255,255,255,0.95)',
    maxWidth: '600px',
    margin: '0 auto 30px',
    fontWeight: '500',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
  }}
>
  Tecnologia a favor da sua produção 🇦🇴
</motion.p>

  {/* Botões de ação */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
    style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}
  >
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onExplorarClick}
      style={{
        background: 'white',
        color: cores.verdeAlface,
        border: 'none',
        padding: '15px 35px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        borderRadius: '50px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}
    >
      Explorar Soluções
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '15px 35px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        borderRadius: '50px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)'
      }}
    >
     </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onContactClick}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '15px 35px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <MessageCircle size={20} /> Falar com Equipa
            </motion.button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginTop: '40px' }}
          >
            <ArrowDown size={30} color="white" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={slideInFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}
      >
        {[
          { numero: "3,5M", label: "famílias agricultoras", emoji: "👨‍🌾" },
          { numero: "30,5M", label: "toneladas/ano", emoji: "🌽" },
          { numero: "+8,5%", label: "crescimento 2025", emoji: "📈" },
          { numero: "35M ha", label: "terras aráveis", emoji: "🌍" }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={slideInFromLeft}
            whileHover={{ y: -5, scale: 1.02 }}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '20px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              border: `1px solid ${cores.verdeClaro}`,
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.emoji}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: cores.verdeAlface }}>
              {item.numero}
            </div>
            <div style={{ color: '#666' }}>{item.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ marginBottom: '50px' }}
      >
        <motion.h2
          variants={slideInFromBottom}
          style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: cores.verdeAlface,
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          O <span style={{ color: cores.verdePimenta }}>Problema</span> em Angola
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {problemas.map((problema, index) => (
            <motion.div
              key={problema.id}
              variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: '0 30px 40px rgba(0,0,0,0.3)'
              }}
              onHoverStart={() => setActiveCard(problema.id)}
              onHoverEnd={() => setActiveCard(null)}
              style={{
                background: problema.bg,
                borderRadius: '25px',
                padding: '30px',
                color: 'white',
                boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {activeCard === problema.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '140%',
                    height: '140%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '15px',
                  borderRadius: '15px'
                }}>
                  {problema.icone}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{problema.titulo}</h3>
              </div>

              <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', opacity: 0.9 }}>
                {problema.descricao}
              </p>

              <div style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '15px',
                borderRadius: '15px'
              }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  {problema.impacto}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  {problema.estatistica}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ marginBottom: '50px' }}
      >
        <motion.h2
          variants={slideInFromBottom}
          style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: cores.verdeAlface,
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          Nossas <span style={{ color: cores.verdePimenta }}>Soluções</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {solucoes.map((solucao, index) => (
            <motion.div
              key={solucao.id}
              variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: '0 30px 40px rgba(0,0,0,0.3)'
              }}
              onClick={() => onSolucaoClick(solucao.detalhe)}
              style={{
                background: solucao.bg,
                borderRadius: '25px',
                padding: '30px',
                color: 'white',
                boxShadow: '0 20px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <motion.div
                initial={{ x: -200, y: -200, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 0.1 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '8rem',
                  opacity: 0.1,
                  pointerEvents: 'none'
                }}
              >
                {solucao.emoji}
              </motion.div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '15px',
                  borderRadius: '15px'
                }}>
                  {solucao.icone}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{solucao.titulo}</h3>
              </div>

              <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', opacity: 0.9 }}>
                {solucao.descricao}
              </p>

              <div style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '15px',
                borderRadius: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <Zap size={20} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{solucao.beneficio}</span>
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  {solucao.resultado}
                </div>
              </div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.3)',
                  padding: '8px 15px',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                Ver detalhes →
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  fontSize: '0.8rem'
                }}
              >
                Meta 2035
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={slideInFromBottom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: `linear-gradient(135deg, ${cores.verdeAlface}, ${cores.verdePimenta})`,
          borderRadius: '40px',
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 30px 40px -20px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -200, y: -200, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 0.05 }}
            transition={{ duration: 1 + i * 0.1, delay: i * 0.1 }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${30 + Math.random() * 40}px`,
              opacity: 0.05,
              pointerEvents: 'none'
            }}
          >
            {['🌱', '🌿', '🌾', '🌽', '🌳'][i % 5]}
          </motion.div>
        ))}

        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', position: 'relative' }}>
          Pronto para <span style={{ color: cores.verdeClaro }}>proteger</span> a sua colheita?
        </h2>
        
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', opacity: 0.9 }}>
          Junta-te a nós na missão de reduzir as perdas e aumentar a produtividade da agricultura angolana.
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExplorarClick}
            style={{
              background: 'white',
              color: cores.verdeAlface,
              border: 'none',
              padding: '15px 40px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Rocket size={20} /> Criar Conta Grátis
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '15px 40px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <MessageCircle size={20} /> Falar com Equipa
          </motion.button>
        </div>

        <p style={{
          marginTop: '30px',
          fontSize: '0.8rem',
          opacity: 0.6
        }}>
          Dados do Ministério da Agricultura e Florestas • Campanha 2024/2025
        </p>
      </motion.div>
    </div>
  );
}

// ===== APP PRINCIPAL =====
function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarContacto, setMostrarContacto] = useState(false);
  const [mostrarAjuda, setMostrarAjuda] = useState(false);  // ← ADICIONADO
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [mostrarWelcome, setMostrarWelcome] = useState(true);
  const [solucaoSelecionada, setSolucaoSelecionada] = useState(null);
  
  const footerRef = useRef(null);

  useEffect(() => {
    const userSalvo = localStorage.getItem('agrookuvanja_user');
    if (userSalvo) {
      try {
        const user = JSON.parse(userSalvo);
        setUsuarioLogado(user);
        setAbaAtiva('dashboard');
        console.log('🔄 Usuário recuperado do localStorage:', user);
      } catch (e) {
        console.error('Erro ao recuperar usuário:', e);
      }
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    console.log('✅ Login bem-sucedido:', user);
    
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('agrookuvanja_user', JSON.stringify(user));
    
    setUsuarioLogado(user);
    setMostrarLogin(false);
    setAbaAtiva('dashboard');
  };

  const handleLogout = () => {
    console.log('🚪 Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('agrookuvanja_user');
    setUsuarioLogado(null);
    setAbaAtiva('inicio');
  };

  const handleContactClick = () => {
    setMostrarContacto(true);
  };

  const handleSolucaoClick = (solucaoId) => {
    setSolucaoSelecionada(solucaoId);
  };

  const handleVoltarClick = () => {
    setSolucaoSelecionada(null);
  };

  // DASHBOARD (usuário logado)
  if (usuarioLogado) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header 
          usuarioLogado={usuarioLogado}
          onLogout={handleLogout}
          onDashboardClick={() => setAbaAtiva('dashboard')}
          onQuemSomosClick={() => setAbaAtiva('quem-somos')}
          onContactClick={handleContactClick}
          onProfileClick={() => setAbaAtiva('perfil')}
          onSettingsClick={() => setAbaAtiva('configuracoes')}
          onHelpClick={() => setMostrarAjuda(true)}  // ← AGORA FUNCIONA
          onEstatisticasClick={() => setAbaAtiva('estatisticas')}
        />
        <main style={{ paddingTop: '80px' }}>
          {abaAtiva === 'dashboard' && <Dashboard user={usuarioLogado} />}
          {abaAtiva === 'quem-somos' && <QuemSomos />}
        </main>
        <div ref={footerRef}>
          <Footer />
        </div>

        <AnimatePresence>
          {mostrarContacto && (
            <ContactModal
              isOpen={mostrarContacto}
              onClose={() => setMostrarContacto(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mostrarAjuda && (
            <AjudaModal
              isOpen={mostrarAjuda}
              onClose={() => setMostrarAjuda(false)}
              onContactClick={handleContactClick}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // LANDING PAGE (não logado)
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header
        onLoginClick={() => setMostrarLogin(true)}
        onRegisterClick={() => setMostrarCadastro(true)}
        onQuemSomosClick={() => {
          setMostrarWelcome(false);
          setSolucaoSelecionada(null);
        }}
        onContactClick={handleContactClick}
      />

      <main>
        {solucaoSelecionada ? (
          <SolucaoDetalhe 
            solucaoId={solucaoSelecionada} 
            onVoltar={handleVoltarClick}
          />
        ) : mostrarWelcome ? (
          <WelcomeSection 
            onExplorarClick={() => setMostrarCadastro(true)}
            onContactClick={handleContactClick}
            onSolucaoClick={handleSolucaoClick}
          />
        ) : (
          <QuemSomos />
        )}
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>

      <AnimatePresence>
        {mostrarLogin && (
          <LoginModal
            isOpen={mostrarLogin}
            onClose={() => setMostrarLogin(false)}
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => {
              setMostrarLogin(false);
              setMostrarCadastro(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mostrarCadastro && (
          <RegisterModal
            isOpen={mostrarCadastro}
            onClose={() => setMostrarCadastro(false)}
            onSwitchToLogin={() => {
              setMostrarCadastro(false);
              setMostrarLogin(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mostrarContacto && (
          <ContactModal
            isOpen={mostrarContacto}
            onClose={() => setMostrarContacto(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;