// src/components/AgroOkuvanja/MetricasProducao.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Volume2,
  Calendar, Download, Share2, Activity, Award
} from 'lucide-react';
import vozService from '../../services/vozService';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  vermelho: '#EF4444',
  amarelo: '#F59E0B',
  azul: '#3B82F6',
  roxo: '#8B5CF6'
};

export default function MetricasProducao({ onAtualizarDashboard }) {
  const [dados, setDados] = useState(null);
  const [periodo, setPeriodo] = useState('mes');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [periodo]);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDados({
        producao: { total: '124.5', unidade: 'toneladas', variacao: 12.5 },
        receita: { total: '3,245,000', moeda: 'Kz', variacao: 8.3 },
        perdas: { total: '18.2', unidade: 'toneladas', variacao: -5.2 },
        eficiencia: 78,
        culturas: [
          { nome: 'Milho', area: '12 ha', producao: '45.2 t', valor: '1,234,500 Kz' },
          { nome: 'Sorgo', area: '8 ha', producao: '32.8 t', valor: '890,200 Kz' },
          { nome: 'Pastagem', area: '15 ha', producao: '46.5 t', valor: '1,120,300 Kz' }
        ],
        historico: [65, 72, 78, 82, 79, 85, 88, 84, 86, 89, 91, 94],
        meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  const falarMetricas = () => {
    if (!dados) return;
    
    const mensagem = `Métricas de Produção. Produção total: ${dados.producao.total} ${dados.producao.unidade}. ` +
      `Receita: ${dados.receita.total} ${dados.receita.moeda}. ` +
      `Perdas: ${dados.perdas.total} ${dados.perdas.unidade}. ` +
      `Eficiência: ${dados.eficiencia} por cento.`;
    
    vozService.falar(mensagem);
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2rem', color: cores.verdeAlface }}>📊 Métricas de Produção</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['semana', 'mes', 'ano'].map(p => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              style={{
                padding: '8px 15px',
                background: periodo === p ? cores.verdePimenta : 'white',
                color: periodo === p ? cores.verdeAlface : '#666',
                border: `1px solid ${cores.verdeClaro}`,
                borderRadius: '20px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {p}
            </button>
          ))}
          <button onClick={falarMetricas} style={audioButtonStyle}>
            <Volume2 size={16} /> Falar
          </button>
        </div>
      </div>

      <div style={statsGridStyle}>
        <div style={metricCardStyle}>
          <div style={{ color: '#666' }}>Produção Total</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.verdeAlface }}>
            {dados.producao.total}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>{dados.producao.unidade}</div>
          <div style={{ color: dados.producao.variacao > 0 ? cores.verdePimenta : cores.vermelho }}>
            {dados.producao.variacao > 0 ? '+' : ''}{dados.producao.variacao}%
          </div>
        </div>

        <div style={metricCardStyle}>
          <div style={{ color: '#666' }}>Receita</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.amarelo }}>
            {dados.receita.total}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>{dados.receita.moeda}</div>
          <div style={{ color: dados.receita.variacao > 0 ? cores.verdePimenta : cores.vermelho }}>
            {dados.receita.variacao > 0 ? '+' : ''}{dados.receita.variacao}%
          </div>
        </div>

        <div style={metricCardStyle}>
          <div style={{ color: '#666' }}>Perdas</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.vermelho }}>
            {dados.perdas.total}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>{dados.perdas.unidade}</div>
          <div style={{ color: dados.perdas.variacao < 0 ? cores.verdePimenta : cores.vermelho }}>
            {dados.perdas.variacao > 0 ? '+' : ''}{dados.perdas.variacao}%
          </div>
        </div>

        <div style={metricCardStyle}>
          <div style={{ color: '#666' }}>Eficiência</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: cores.roxo }}>
            {dados.eficiencia}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>média do período</div>
        </div>
      </div>

      <div style={graficoStyle}>
        <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>📈 Evolução da Produção</h3>
        <div style={barrasContainerStyle}>
          {dados.historico.map((valor, i) => (
            <div key={i} style={barraItemStyle}>
              <div style={{
                width: '100%',
                height: `${valor}px`,
                background: `linear-gradient(to top, ${cores.verdeAlface}, ${cores.verdePimenta})`,
                borderRadius: '5px 5px 0 0'
              }} />
              <span style={{ fontSize: '0.7rem', marginTop: '5px' }}>{dados.meses[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={tabelaStyle}>
        <h3 style={{ color: cores.verdeAlface, marginBottom: '15px' }}>🌽 Detalhamento por Cultura</h3>
        <table style={tableStyle}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${cores.verdeClaro}` }}>
              <th style={thStyle}>Cultura</th>
              <th style={thStyle}>Área</th>
              <th style={thStyle}>Produção</th>
              <th style={thStyle}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {dados.culturas.map((cultura, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${cores.verdeClaro}` }}>
                <td style={tdStyle}>{cultura.nome}</td>
                <td style={tdStyle}>{cultura.area}</td>
                <td style={tdStyle}>{cultura.producao}</td>
                <td style={tdStyle}>{cultura.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '25px',
  flexWrap: 'wrap',
  gap: '15px'
};

const audioButtonStyle = {
  padding: '8px 15px',
  background: cores.verdeAlface,
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px',
  marginBottom: '25px'
};

const metricCardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '15px',
  border: `1px solid ${cores.verdeClaro}`
};

const graficoStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '20px',
  marginBottom: '25px',
  border: `1px solid ${cores.verdeClaro}`
};

const barrasContainerStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  height: '150px',
  gap: '5px'
};

const barraItemStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const tabelaStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '20px',
  border: `1px solid ${cores.verdeClaro}`
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thStyle = {
  textAlign: 'left',
  padding: '10px',
  color: cores.verdeAlface
};

const tdStyle = {
  padding: '10px'
};