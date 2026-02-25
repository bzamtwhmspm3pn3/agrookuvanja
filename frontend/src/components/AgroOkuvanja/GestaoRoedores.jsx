// src/components/AgroOkuvanja/GestaoRoedores.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rat, AlertTriangle, MapPin, Calendar, TrendingUp,
  Volume2, Download, Share2, Filter, CheckCircle,
  Bell, BellRing, Clock
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

export default function GestaoRoedores({ onAtualizarDashboard }) {
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
        totalDetecoes: 23,
        ativos: 5,
        resolvidos: 18,
        areasCriticas: 3,
        ultimasOcorrencias: [
          {
            id: 1,
            local: 'Talhão Norte',
            data: 'Hoje, 10:23',
            severidade: 'alta',
            status: 'ativo',
            area: '2.5 ha'
          },
          {
            id: 2,
            local: 'Talhão Sul',
            data: 'Ontem, 15:47',
            severidade: 'media',
            status: 'ativo',
            area: '1.2 ha'
          },
          {
            id: 3,
            local: 'Talhão Leste',
            data: 'Ontem, 09:12',
            severidade: 'baixa',
            status: 'resolvido',
            area: '0.8 ha'
          }
        ],
        recomendacoes: [
          'Instalar armadilhas mecânicas nas áreas críticas',
          'Aplicar raticida biológico nos talhões Norte e Sul',
          'Reforçar monitoramento noturno'
        ],
        alertas: [
          'Área crítica detectada no Talhão Norte',
          'Aumento de 30% na atividade nas últimas 24h'
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
    
    const mensagem = `Gestão de Roedores. Temos ${dados.ativos} focos ativos. ` +
      `Áreas críticas: ${dados.areasCriticas}. ` +
      `Recomendamos ${dados.recomendacoes[0]}`;
    
    vozService.falar(mensagem);
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${cores.verdeClaro}`,
            borderTopColor: cores.verdePimenta,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ color: cores.verdeAlface }}>A carregar dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.verdeAlface }}>
            🐀 Gestão de Roedores
          </h1>
          <p style={{ color: '#666', marginTop: '5px' }}>
            Monitoramento e controlo integrado
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setAudioAtivo(!audioAtivo)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: audioAtivo ? cores.verdePimenta : cores.vermelho,
              color: audioAtivo ? cores.verdeAlface : 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer'
            }}
          >
            {audioAtivo ? <Volume2 size={18} /> : <Bell size={18} />}
            {audioAtivo ? 'Áudio Ativo' : 'Alertas'}
          </button>

          <button
            onClick={falarAlerta}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: cores.verdeAlface,
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer'
            }}
          >
            <BellRing size={18} />
            Falar Alerta
          </button>
        </div>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
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
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.vermelho }}>
            {dados.areasCriticas}
          </div>
          <div style={{ color: '#666' }}>Áreas Críticas</div>
        </motion.div>

        <motion.div style={statCardStyle}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.verdePimenta }}>
            {dados.resolvidos}
          </div>
          <div style={{ color: '#666' }}>Resolvidos</div>
        </motion.div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginBottom: '25px'
      }}>
        <div>
          <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>📍 Últimas Ocorrências</h3>
          {dados.ultimasOcorrencias.map(ocorrencia => (
            <motion.div key={ocorrencia.id} style={ocorrenciaCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Rat size={20} color={ocorrencia.severidade === 'alta' ? cores.vermelho : cores.amarelo} />
                <div>
                  <span style={{ fontWeight: 'bold', color: cores.verdeAlface }}>{ocorrencia.local}</span>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {ocorrencia.area} • {ocorrencia.data}
                  </div>
                </div>
              </div>
              <span style={{
                padding: '4px 8px',
                background: ocorrencia.status === 'ativo' ? '#FEE2E2' : '#D1FAE5',
                color: ocorrencia.status === 'ativo' ? cores.vermelho : cores.verdeAlface,
                borderRadius: '12px',
                fontSize: '0.8rem'
              }}>
                {ocorrencia.status}
              </span>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>⚠️ Alertas</h3>
          {dados.alertas.map((alerta, index) => (
            <motion.div key={index} style={{
              padding: '15px',
              background: '#FEF2F2',
              borderRadius: '12px',
              border: '1px solid #FECACA',
              marginBottom: '10px'
            }}>
              <AlertTriangle size={18} color={cores.vermelho} />
              <p style={{ color: '#991B1B', fontSize: '0.9rem', marginTop: '5px' }}>{alerta}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div style={{
        background: cores.verdeClaro,
        borderRadius: '15px',
        padding: '20px'
      }}>
        <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>💡 Recomendações</h3>
        {dados.recomendacoes.map((rec, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            background: 'white',
            borderRadius: '8px',
            marginBottom: '5px'
          }}>
            <CheckCircle size={16} color={cores.verdePimenta} />
            <span style={{ color: '#666' }}>{rec}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const statCardStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const ocorrenciaCardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px',
  background: 'white',
  borderRadius: '12px',
  border: `1px solid ${cores.verdeClaro}`,
  marginBottom: '10px'
};