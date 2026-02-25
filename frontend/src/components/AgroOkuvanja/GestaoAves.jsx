// src/components/AgroOkuvanja/GestaoAves.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bird, AlertTriangle, MapPin, Calendar,
  Volume2, Download, Share2, Filter, CheckCircle,
  Bell, BellRing, Cloud, Sun
} from 'lucide-react';
import vozService from '../../services/vozService';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  vermelho: '#EF4444',
  amarelo: '#F59E0B',
  azul: '#3B82F6'
};

export default function GestaoAves({ onAtualizarDashboard }) {
  const [dados, setDados] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [carregando, setCarregando] = useState(true);
  const [audioAtivo, setAudioAtivo] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [filtro]);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDados({
        totalDetecoes: 17,
        ativos: 3,
        resolvidos: 14,
        areasCriticas: 2,
        especiesIdentificadas: ['Pássaro-tecelão', 'Pomba', 'Papagaio-cinzento'],
        ultimasOcorrencias: [
          {
            id: 1,
            local: 'Talhão Sul',
            data: 'Hoje, 08:15',
            severidade: 'alta',
            status: 'ativo',
            area: '1.8 ha',
            especie: 'Pássaro-tecelão'
          },
          {
            id: 2,
            local: 'Pomar',
            data: 'Ontem, 16:30',
            severidade: 'media',
            status: 'ativo',
            area: '0.5 ha',
            especie: 'Pomba'
          },
          {
            id: 3,
            local: 'Talhão Norte',
            data: 'Ontem, 11:20',
            severidade: 'baixa',
            status: 'resolvido',
            area: '0.3 ha',
            especie: 'Papagaio-cinzento'
          }
        ],
        recomendacoes: [
          'Instalar redes de proteção nas áreas críticas',
          'Utilizar dispositivos sonoros de dissuasão',
          'Aplicar repelentes naturais'
        ],
        alertas: [
          'Aumento da atividade no período da manhã',
          'Época de reprodução - reforçar medidas'
        ]
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  const falarAlerta = () => {
    if (!audioAtivo || !dados) return;
    
    const mensagem = `Gestão de Aves. ${dados.ativos} focos ativos. ` +
      `Espécies: ${dados.especiesIdentificadas.join(', ')}. ` +
      `Recomendamos ${dados.recomendacoes[0]}`;
    
    vozService.falar(mensagem);
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={headerStyle}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.verdeAlface }}>
            🐦 Gestão de Aves
          </h1>
          <p style={{ color: '#666' }}>Monitoramento e controlo de aves pragas</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setAudioAtivo(!audioAtivo)} style={audioButtonStyle(audioAtivo)}>
            {audioAtivo ? <Volume2 size={18} /> : <Bell size={18} />}
            {audioAtivo ? 'Áudio Ativo' : 'Alertas'}
          </button>
          <button onClick={falarAlerta} style={alertaButtonStyle}>
            <BellRing size={18} /> Falar Alerta
          </button>
        </div>
      </motion.div>

      <div style={statsGridStyle}>
        <motion.div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.verdeAlface }}>
            {dados.totalDetecoes}
          </div>
          <div style={{ color: '#666' }}>Total de Deteções</div>
        </motion.div>
        <motion.div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.amarelo }}>
            {dados.ativos}
          </div>
          <div style={{ color: '#666' }}>Focos Ativos</div>
        </motion.div>
        <motion.div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.azul }}>
            {dados.especiesIdentificadas.length}
          </div>
          <div style={{ color: '#666' }}>Espécies</div>
        </motion.div>
      </div>

      <div style={especiesContainerStyle}>
        {dados.especiesIdentificadas.map((especie, i) => (
          <span key={i} style={especieBadgeStyle}>{especie}</span>
        ))}
      </div>

      <div style={grid2ColStyle}>
        <div>
          <h3 style={sectionTitleStyle}>📍 Últimas Ocorrências</h3>
          {dados.ultimasOcorrencias.map(ocorrencia => (
            <motion.div key={ocorrencia.id} style={ocorrenciaCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bird size={20} color={cores.amarelo} />
                <div>
                  <span style={{ fontWeight: 'bold', color: cores.verdeAlface }}>
                    {ocorrencia.especie}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {ocorrencia.local} • {ocorrencia.data}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 style={sectionTitleStyle}>⚠️ Alertas</h3>
          {dados.alertas.map((alerta, i) => (
            <motion.div key={i} style={alertaCardStyle}>
              <AlertTriangle size={18} color={cores.vermelho} />
              <p style={{ color: '#991B1B', fontSize: '0.9rem', marginTop: '5px' }}>{alerta}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div style={recomendacoesContainerStyle}>
        <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>💡 Recomendações</h3>
        {dados.recomendacoes.map((rec, i) => (
          <div key={i} style={recomendacaoItemStyle}>
            <CheckCircle size={16} color={cores.verdePimenta} />
            <span style={{ color: '#666' }}>{rec}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Estilos reutilizáveis
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  flexWrap: 'wrap',
  gap: '15px'
};

const audioButtonStyle = (audioAtivo) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  background: audioAtivo ? cores.verdePimenta : cores.vermelho,
  color: audioAtivo ? cores.verdeAlface : 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer'
});

const alertaButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  background: cores.verdeAlface,
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px',
  marginBottom: '25px'
};

const statCardStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const especiesContainerStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '15px',
  marginBottom: '20px',
  border: `1px solid ${cores.verdeClaro}`
};

const especieBadgeStyle = {
  padding: '5px 15px',
  background: cores.verdeClaro,
  color: cores.verdeAlface,
  borderRadius: '20px',
  fontSize: '0.9rem',
  marginRight: '10px'
};

const grid2ColStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '20px',
  marginBottom: '25px'
};

const sectionTitleStyle = {
  color: cores.verdeAlface,
  marginBottom: '15px'
};

const ocorrenciaCardStyle = {
  padding: '15px',
  background: 'white',
  borderRadius: '12px',
  border: `1px solid ${cores.verdeClaro}`,
  marginBottom: '10px'
};

const alertaCardStyle = {
  padding: '15px',
  background: '#FEF2F2',
  borderRadius: '12px',
  border: '1px solid #FECACA',
  marginBottom: '10px'
};

const recomendacoesContainerStyle = {
  background: cores.verdeClaro,
  borderRadius: '15px',
  padding: '20px'
};

const recomendacaoItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  background: 'white',
  borderRadius: '8px',
  marginBottom: '5px'
};