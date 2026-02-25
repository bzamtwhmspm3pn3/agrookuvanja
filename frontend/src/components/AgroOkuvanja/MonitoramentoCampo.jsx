// src/components/AgroOkuvanja/MonitoramentoCampo.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, MapPin, Calendar, Clock, Thermometer,
  Droplets, Wind, Sun, Volume2, Download, Share2
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

export default function MonitoramentoCampo({ onAtualizarDashboard }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDados({
        condicoesAtuais: {
          temperatura: 28.5,
          humidade: 72,
          vento: 15,
          precipitacao: 0,
          indiceUV: 7
        },
        proximasHoras: [
          { hora: '14:00', temp: 29, chuva: 0 },
          { hora: '15:00', temp: 28, chuva: 0 },
          { hora: '16:00', temp: 27, chuva: 10 },
          { hora: '17:00', temp: 26, chuva: 30 }
        ],
        alertas: [
          'Possibilidade de chuva às 16h',
          'Temperaturas elevadas - hidratação necessária'
        ]
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  const falarMonitoramento = () => {
    if (!dados) return;
    
    const mensagem = `Monitoramento de Campo. Temperatura atual ${dados.condicoesAtuais.temperatura} graus. ` +
      `Humidade ${dados.condicoesAtuais.humidade} por cento. ` +
      `Vento ${dados.condicoesAtuais.vento} quilómetros por hora.`;
    
    vozService.falar(mensagem);
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2rem', color: cores.verdeAlface }}>🌾 Monitoramento de Campo</h1>
        <button onClick={falarMonitoramento} style={audioButtonStyle}>
          <Volume2 size={18} /> Falar Condições
        </button>
      </div>

      <div style={condicoesAtuaisStyle}>
        <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>Condições Atuais</h3>
        <div style={condicoesGridStyle}>
          <div style={condicaoCardStyle}>
            <Thermometer size={24} color={cores.laranja} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {dados.condicoesAtuais.temperatura}°C
            </span>
          </div>
          <div style={condicaoCardStyle}>
            <Droplets size={24} color={cores.azul} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {dados.condicoesAtuais.humidade}%
            </span>
          </div>
          <div style={condicaoCardStyle}>
            <Wind size={24} color="#6B7280" />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {dados.condicoesAtuais.vento} km/h
            </span>
          </div>
          <div style={condicaoCardStyle}>
            <Sun size={24} color={cores.amarelo} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {dados.condicoesAtuais.indiceUV}
            </span>
          </div>
        </div>
      </div>

      <div style={previsaoStyle}>
        <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>Próximas Horas</h3>
        <div style={horasGridStyle}>
          {dados.proximasHoras.map((hora, i) => (
            <div key={i} style={horaCardStyle}>
              <div style={{ fontWeight: 'bold', color: cores.verdeAlface }}>{hora.hora}</div>
              <div>{hora.temp}°C</div>
              <div style={{ fontSize: '0.8rem', color: hora.chuva > 0 ? cores.azul : '#666' }}>
                {hora.chuva > 0 ? `${hora.chuva}% chuva` : 'Sem chuva'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {dados.alertas.length > 0 && (
        <div style={alertasStyle}>
          <h3 style={{ color: cores.amarelo, marginBottom: '10px' }}>⚠️ Alertas</h3>
          {dados.alertas.map((alerta, i) => (
            <div key={i} style={alertaItemStyle}>
              {alerta}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '25px'
};

const audioButtonStyle = {
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

const condicoesAtuaisStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '20px',
  marginBottom: '20px',
  border: `1px solid ${cores.verdeClaro}`
};

const condicoesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '15px'
};

const condicaoCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  padding: '15px',
  background: cores.verdeClaro,
  borderRadius: '12px'
};

const previsaoStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '20px',
  marginBottom: '20px',
  border: `1px solid ${cores.verdeClaro}`
};

const horasGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '10px'
};

const horaCardStyle = {
  textAlign: 'center',
  padding: '15px',
  background: cores.verdeClaro,
  borderRadius: '12px'
};

const alertasStyle = {
  background: '#FEF3C7',
  borderRadius: '15px',
  padding: '20px',
  border: '1px solid #FDE68A'
};

const alertaItemStyle = {
  padding: '8px',
  background: 'white',
  borderRadius: '8px',
  marginBottom: '5px'
};