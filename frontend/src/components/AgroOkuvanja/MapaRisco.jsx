// src/components/AgroOkuvanja/MapaRisco.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, AlertTriangle, Thermometer, Droplets,
  Wind, Sun, Cloud, TrendingUp, Volume2,
  Download, Share2, Layers, Crosshair
} from 'lucide-react';
import vozService from '../../services/vozService';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  vermelho: '#EF4444',
  amarelo: '#F59E0B',
  laranja: '#F97316'
};

export default function MapaRisco({ onAtualizarDashboard }) {
  const [dados, setDados] = useState(null);
  const [camadaAtiva, setCamadaAtiva] = useState('pragas');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [camadaAtiva]);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDados({
        areasRisco: [
          { id: 1, nome: 'Talhão Norte', risco: 'alto', pragas: 'Roedores', area: '2.5 ha', temp: 28, humidade: 65 },
          { id: 2, nome: 'Talhão Sul', risco: 'médio', pragas: 'Aves', area: '1.8 ha', temp: 27, humidade: 70 },
          { id: 3, nome: 'Talhão Leste', risco: 'baixo', pragas: 'Nenhuma', area: '3.2 ha', temp: 26, humidade: 68 },
          { id: 4, nome: 'Pomar', risco: 'médio', pragas: 'Aves', area: '0.8 ha', temp: 27, humidade: 72 }
        ],
        condicoesClimaticas: {
          temperatura: 27.5,
          humidade: 68,
          vento: 12,
          precipitacao: 0,
          indiceUV: 6
        },
        alertas: [
          'Risco alto de proliferação de roedores no Talhão Norte',
          'Condições favoráveis para aves no Pomar'
        ],
        recomendacoes: [
          'Iniciar monitoramento intensivo no Talhão Norte',
          'Instalar barreiras no Pomar'
        ]
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  const getCorRisco = (risco) => {
    switch(risco) {
      case 'alto': return cores.vermelho;
      case 'médio': return cores.laranja;
      case 'baixo': return cores.amarelo;
      default: return cores.verdePimenta;
    }
  };

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', color: cores.verdeAlface, marginBottom: '20px' }}>
        🗺️ Mapa de Risco
      </h1>

      {/* Condições climáticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={climaCardStyle}>
          <Thermometer size={20} color={cores.laranja} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {dados.condicoesClimaticas.temperatura}°C
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Temperatura</span>
        </div>
        <div style={climaCardStyle}>
          <Droplets size={20} color={cores.azul} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {dados.condicoesClimaticas.humidade}%
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Humidade</span>
        </div>
        <div style={climaCardStyle}>
          <Wind size={20} color="#6B7280" />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {dados.condicoesClimaticas.vento} km/h
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Vento</span>
        </div>
        <div style={climaCardStyle}>
          <Sun size={20} color={cores.amarelo} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {dados.condicoesClimaticas.indiceUV}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Índice UV</span>
        </div>
      </div>

      {/* Mapa simulado */}
      <div style={{
        background: '#E5E7EB',
        borderRadius: '15px',
        height: '300px',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Simulação de mapa com áreas de risco */}
        {dados.areasRisco.map(area => (
          <div
            key={area.id}
            style={{
              position: 'absolute',
              left: `${20 + area.id * 15}%`,
              top: `${30 + area.id * 10}%`,
              width: '80px',
              height: '80px',
              background: `${getCorRisco(area.risco)}30`,
              border: `2px solid ${getCorRisco(area.risco)}`,
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{area.nome}</span>
            <span style={{ fontSize: '0.7rem' }}>{area.risco}</span>
          </div>
        ))}
      </div>

      {/* Lista de áreas */}
      <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        {dados.areasRisco.map(area => (
          <div
            key={area.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px',
              background: 'white',
              borderRadius: '10px',
              border: `1px solid ${cores.verdeClaro}`
            }}
          >
            <div>
              <span style={{ fontWeight: 'bold', color: cores.verdeAlface }}>{area.nome}</span>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {area.area} • {area.pragas}
              </div>
            </div>
            <div style={{
              padding: '5px 15px',
              background: `${getCorRisco(area.risco)}20`,
              color: getCorRisco(area.risco),
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}>
              {area.risco.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const climaCardStyle = {
  background: 'white',
  padding: '15px',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  border: `1px solid ${cores.verdeClaro}`
};