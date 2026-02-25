// src/components/AgroOkuvanja/RelatoriosColheita.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Share2, Calendar,
  TrendingUp, DollarSign, Volume2, Printer,
  Mail, ChevronRight
} from 'lucide-react';
import vozService from '../../services/vozService';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  azul: '#3B82F6',
  roxo: '#8B5CF6'
};

export default function RelatoriosColheita({ onAtualizarDashboard }) {
  const [dados, setDados] = useState(null);
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('producao');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarRelatorios();
  }, [relatorioSelecionado]);

  const carregarRelatorios = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDados({
        relatorios: [
          {
            id: 'producao',
            nome: 'Relatório de Produção',
            periodo: 'Fevereiro 2026',
            total: '124.5 toneladas',
            valor: '3,245,000 Kz',
            variacao: '+12.5%',
            itens: [
              { cultura: 'Milho', producao: '45.2 t', valor: '1,234,500 Kz', area: '12 ha' },
              { cultura: 'Sorgo', producao: '32.8 t', valor: '890,200 Kz', area: '8 ha' },
              { cultura: 'Pastagem', producao: '46.5 t', valor: '1,120,300 Kz', area: '15 ha' }
            ]
          },
          {
            id: 'perdas',
            nome: 'Relatório de Perdas',
            periodo: 'Fevereiro 2026',
            total: '18.2 toneladas',
            valor: '475,000 Kz',
            variacao: '-5.2%',
            itens: [
              { causa: 'Roedores', perda: '8.5 t', valor: '221,000 Kz', area: 'Talhão Norte' },
              { causa: 'Aves', perda: '5.2 t', valor: '135,200 Kz', area: 'Talhão Sul' },
              { causa: 'Doenças', perda: '4.5 t', valor: '118,800 Kz', area: 'Pomar' }
            ]
          },
          {
            id: 'eficiencia',
            nome: 'Relatório de Eficiência',
            periodo: 'Fevereiro 2026',
            total: '78%',
            valor: 'Eficiência geral',
            variacao: '+8%',
            metricas: [
              { nome: 'Uso de água', valor: '82%', meta: '75%' },
              { nome: 'Mão de obra', valor: '76%', meta: '80%' },
              { nome: 'Insumos', valor: '79%', meta: '70%' }
            ]
          }
        ]
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  const relatorio = dados?.relatorios.find(r => r.id === relatorioSelecionado);

  const falarRelatorio = () => {
    if (!relatorio) return;
    
    const mensagem = `Relatório de ${relatorio.nome}. Período ${relatorio.periodo}. ` +
      `Total: ${relatorio.total}. Valor: ${relatorio.valor}. ` +
      `Variação: ${relatorio.variacao}.`;
    
    vozService.falar(mensagem);
  };

  const exportarPDF = () => {
    alert('Exportando PDF... (funcionalidade a ser implementada)');
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2rem', color: cores.azul }}>📋 Relatórios de Colheita</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportarPDF} style={acaoButtonStyle}>
            <Download size={16} /> PDF
          </button>
          <button onClick={falarRelatorio} style={audioButtonStyle}>
            <Volume2 size={16} /> Falar
          </button>
        </div>
      </div>

      <div style={tabsStyle}>
        {dados.relatorios.map(rel => (
          <button
            key={rel.id}
            onClick={() => setRelatorioSelecionado(rel.id)}
            style={{
              ...tabStyle,
              background: relatorioSelecionado === rel.id ? cores.verdePimenta : 'white',
              color: relatorioSelecionado === rel.id ? cores.verdeAlface : '#666'
            }}
          >
            <FileText size={16} />
            {rel.nome}
          </button>
        ))}
      </div>

      {relatorio && (
        <motion.div
          key={relatorio.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={relatorioCardStyle}
        >
          <div style={relatorioHeaderStyle}>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: cores.verdeAlface }}>{relatorio.nome}</h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{relatorio.periodo}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: cores.azul }}>
                {relatorio.total}
              </div>
              <div style={{ color: relatorio.variacao.startsWith('+') ? cores.verdePimenta : cores.vermelho }}>
                {relatorio.variacao}
              </div>
            </div>
          </div>

          <table style={tableStyle}>
            <thead>
              <tr>
                {relatorio.id === 'eficiencia' ? (
                  <>
                    <th style={thStyle}>Métrica</th>
                    <th style={thStyle}>Atual</th>
                    <th style={thStyle}>Meta</th>
                  </>
                ) : (
                  <>
                    <th style={thStyle}>{relatorio.id === 'producao' ? 'Cultura' : 'Causa'}</th>
                    <th style={thStyle}>{relatorio.id === 'producao' ? 'Produção' : 'Perda'}</th>
                    <th style={thStyle}>Valor</th>
                    <th style={thStyle}>Área</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {relatorio.itens?.map((item, i) => (
                <tr key={i}>
                  {relatorio.id === 'eficiencia' ? (
                    <>
                      <td style={tdStyle}>{item.nome}</td>
                      <td style={tdStyle}>{item.valor}</td>
                      <td style={tdStyle}>{item.meta}</td>
                    </>
                  ) : (
                    <>
                      <td style={tdStyle}>{item.cultura || item.causa}</td>
                      <td style={tdStyle}>{item.producao || item.perda}</td>
                      <td style={tdStyle}>{item.valor}</td>
                      <td style={tdStyle}>{item.area}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={acoesRodapeStyle}>
            <button style={rodapeButtonStyle}>
              <Share2 size={16} /> Partilhar
            </button>
            <button style={rodapeButtonStyle}>
              <Mail size={16} /> Enviar por Email
            </button>
            <button style={rodapeButtonStyle}>
              <Printer size={16} /> Imprimir
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  flexWrap: 'wrap',
  gap: '15px'
};

const acaoButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  background: 'white',
  color: cores.azul,
  border: `1px solid ${cores.verdeClaro}`,
  borderRadius: '30px',
  cursor: 'pointer'
};

const audioButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  background: cores.azul,
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer'
};

const tabsStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
  flexWrap: 'wrap'
};

const tabStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  border: `1px solid ${cores.verdeClaro}`,
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '0.95rem'
};

const relatorioCardStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  border: `1px solid ${cores.verdeClaro}`
};

const relatorioHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  paddingBottom: '15px',
  borderBottom: `2px solid ${cores.verdeClaro}`
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px'
};

const thStyle = {
  textAlign: 'left',
  padding: '10px',
  color: cores.verdeAlface,
  borderBottom: `1px solid ${cores.verdeClaro}`
};

const tdStyle = {
  padding: '10px',
  borderBottom: `1px solid ${cores.verdeClaro}`
};

const acoesRodapeStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'flex-end',
  paddingTop: '15px',
  borderTop: `1px solid ${cores.verdeClaro}`
};

const rodapeButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  padding: '8px 15px',
  background: cores.verdeClaro,
  border: 'none',
  borderRadius: '8px',
  color: cores.verdeAlface,
  cursor: 'pointer'
};