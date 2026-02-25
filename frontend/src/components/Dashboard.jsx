// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Camera, Bug, Bird, Rat, Map, BarChart3,
  AlertTriangle, CheckCircle, Clock, Calendar, Download, Share2,
  Settings, Users, Target, TrendingUp, TrendingDown, Leaf, Award,
  Sun, Cloud, Droplets, Thermometer, MapPin, ChevronRight, Activity,
  Shield, Zap, Eye, MessageCircle, Bell, BellRing, Menu, Grid,
  List, Filter, MoreVertical, Star, Heart, Volume2, Mic,
  Brain, FileText, Sprout, Video, DollarSign, Ruler, History,
  RefreshCw, Wifi, WifiOff, Save, PieChart, LineChart, Info
} from 'lucide-react';

// Importar componentes do AgroOkuvanja
import DeteccaoPragas from './AgroOkuvanja/DeteccaoPragas';
import GestaoRoedores from './AgroOkuvanja/GestaoRoedores';
import GestaoAves from './AgroOkuvanja/GestaoAves';
import MapaRisco from './AgroOkuvanja/MapaRisco';
import MetricasProducao from './AgroOkuvanja/MetricasProducao';
import MonitoramentoCampo from './AgroOkuvanja/MonitoramentoCampo';
import RecomendacoesIA from './AgroOkuvanja/RecomendacoesIA';
import RelatoriosColheita from './AgroOkuvanja/RelatoriosColheita';
import ConfiguracaoCameras from './AgroOkuvanja/ConfiguracaoCameras';
import vozService from '../services/vozService';

const cores = {
  verdeAlface: '#1A4D2E',
  verdePimenta: '#82B74D',
  verdeClaro: '#E8F0E8',
  verdeEscuro: '#0A2E1A',
  cinzaClaro: '#F9FAFB',
  cinza: '#F3F4F6',
  texto: '#1F2937',
  textoClaro: '#6B7280',
  vermelho: '#EF4444',
  amarelo: '#F59E0B',
  azul: '#3B82F6',
  roxo: '#8B5CF6',
  sucesso: '#10B981',
  aviso: '#F59E0B',
  erro: '#EF4444',
  info: '#3B82F6',
  marrom: '#8B4513'
};

// Mapeamento de nomes de pragas em português
const nomesPortugues = {
  // Aves
  'bird': 'Pássaro',
  'pigeon': 'Pombo',
  'sparrow': 'Pardal',
  'weaver': 'Pássaro-tecelão',
  'crow': 'Corvo',
  'dove': 'Pomba',
  'starling': 'Estorninho',
  'blackbird': 'Melro',
  
  // Roedores
  'rat': 'Ratazana',
  'mouse': 'Camundongo',
  'rodent': 'Roedor',
  'squirrel': 'Esquilo',
  'beaver': 'Castor',
  'porcupine': 'Porco-espinho',
  
  // Insetos
  'locust': 'Gafanhoto',
  'grasshopper': 'Gafanhoto',
  'beetle': 'Besouro',
  'caterpillar': 'Lagarta',
  'ant': 'Formiga',
  'fly': 'Mosca',
  'mosquito': 'Mosquito',
  'bee': 'Abelha',
  'wasp': 'Vespa',
  'spider': 'Aranha',
  'aphid': 'Pulgão',
  'whitefly': 'Mosca-branca',
  'thrips': 'Tripes',
  'scale': 'Cochonilha',
  'mealybug': 'Cochonilha-algodão',
  
  // Pragas específicas
  'fall_armyworm': 'Lagarta-do-cartucho',
  'corn_borer': 'Broca-do-milho',
  'cotton_bollworm': 'Lagarta-da-maçã',
  'soybean_caterpillar': 'Lagarta-da-soja',
  'coffee_borer': 'Broca-do-café',
  'coffee_leaf_miner': 'Bicho-mineiro-do-café',
  'citrus_leafminer': 'Minadora-dos-citros',
  'banana_weevil': 'Broca-da-bananeira',
  'cassava_mosaic': 'Mosaico-da-mandioca',
  'sweetpotato_weevil': 'Broca-da-batata-doce',
  'potato_tubermoth': 'Traça-da-batata',
  'tomato_borer': 'Broca-do-tomate',
  'bean_beetle': 'Besouro-do-feijão',
  'default': 'Praga não identificada'
};

// ===== COMPONENTE PARA EXIBIR NOME DA PRAGA COM ÍCONE =====
function NomePraga({ classe, confidence, mostrarConfianca = true }) {
  const getIcone = () => {
    const classeLower = classe?.toLowerCase() || '';
    if (classeLower.includes('bird') || classeLower.includes('pigeon') || classeLower.includes('sparrow')) {
      return <Bird size={16} color={cores.amarelo} />;
    }
    if (classeLower.includes('rat') || classeLower.includes('mouse') || classeLower.includes('rodent')) {
      return <Rat size={16} color={cores.marrom} />;
    }
    return <Bug size={16} color={cores.azul} />;
  };

  const getCorConfianca = () => {
    if (confidence > 0.7) return cores.vermelho;
    if (confidence > 0.4) return cores.amarelo;
    return cores.verdeAlface;
  };

  const nome = nomesPortugues[classe?.toLowerCase()] || classe || 'Praga não identificada';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '28px',
        height: '28px',
        background: cores.cinzaClaro,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getIcone()}
      </div>
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{nome}</div>
        {mostrarConfianca && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: cores.textoClaro }}>Confiança:</span>
            <span style={{ fontSize: '0.7rem', color: getCorConfianca(), fontWeight: 'bold' }}>
              {Math.round(confidence * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== COMPONENTE DE ESTATÍSTICAS EM TEMPO REAL =====
function EstatisticasReais({ dados }) {
  if (!dados) return null;

  // Contar pragas por categoria
  const pragasPorCategoria = {
    roedores: 0,
    aves: 0,
    insetos: 0
  };

  dados.ultimasPragas?.forEach(praga => {
    if (praga.class?.toLowerCase().includes('rat') || praga.class?.toLowerCase().includes('mouse')) {
      pragasPorCategoria.roedores++;
    } else if (praga.class?.toLowerCase().includes('bird') || praga.class?.toLowerCase().includes('pigeon')) {
      pragasPorCategoria.aves++;
    } else {
      pragasPorCategoria.insetos++;
    }
  });

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '20px',
      marginBottom: '20px',
      border: `1px solid ${cores.verdeClaro}`
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Camera size={16} color={cores.verdeAlface} />
            <span style={{ fontSize: '0.9rem', color: cores.textoClaro }}>Total de Scans</span>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: cores.texto }}>
            {dados.totalScans || 0}
          </span>
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Bug size={16} color={cores.amarelo} />
            <span style={{ fontSize: '0.9rem', color: cores.textoClaro }}>Total de Pragas</span>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: cores.texto }}>
            {dados.totalPragas || 0}
          </span>
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <DollarSign size={16} color={cores.verdePimenta} />
            <span style={{ fontSize: '0.9rem', color: cores.textoClaro }}>Perda Total</span>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: cores.texto }}>
            {dados.perdaTotal ? `${dados.perdaTotal.toLocaleString()} Kz` : '---'}
          </span>
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Ruler size={16} color={cores.azul} />
            <span style={{ fontSize: '0.9rem', color: cores.textoClaro }}>Área Monitorada</span>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: cores.texto }}>
            {dados.areaTotal || 0} ha
          </span>
        </div>
      </div>

      {/* Distribuição por categoria */}
      {(pragasPorCategoria.roedores > 0 || pragasPorCategoria.aves > 0 || pragasPorCategoria.insetos > 0) && (
        <div style={{
          display: 'flex',
          gap: '20px',
          padding: '15px',
          background: cores.cinzaClaro,
          borderRadius: '12px'
        }}>
          {pragasPorCategoria.roedores > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rat size={16} color={cores.marrom} />
              <span><strong>{pragasPorCategoria.roedores}</strong> Roedores</span>
            </div>
          )}
          {pragasPorCategoria.aves > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bird size={16} color={cores.amarelo} />
              <span><strong>{pragasPorCategoria.aves}</strong> Aves</span>
            </div>
          )}
          {pragasPorCategoria.insetos > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bug size={16} color={cores.azul} />
              <span><strong>{pragasPorCategoria.insetos}</strong> Insetos</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== COMPONENTE DE GRÁFICO DE TENDÊNCIAS =====
function GraficoTendencias({ historico }) {
  if (!historico || historico.length === 0) return null;

  // Agrupar por data
  const dadosAgrupados = historico.reduce((acc, item) => {
    const data = new Date(item.timestamp).toLocaleDateString();
    if (!acc[data]) {
      acc[data] = { 
        total: 0, 
        perda: 0, 
        count: 0,
        pragas: []
      };
    }
    acc[data].total += item.total_count || 0;
    acc[data].perda += item.perdaEstimada || 0;
    acc[data].count += 1;
    if (item.detections) {
      acc[data].pragas.push(...item.detections);
    }
    return acc;
  }, {});

  const datas = Object.keys(dadosAgrupados).slice(-7);
  const valoresPragas = datas.map(d => dadosAgrupados[d].total);
  const valoresPerda = datas.map(d => dadosAgrupados[d].perda / 1000);
  const pragasPorData = datas.map(d => dadosAgrupados[d].pragas);

  const maxValor = Math.max(...valoresPragas, 1);

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '20px',
      border: `1px solid ${cores.verdeClaro}`
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: cores.texto, marginBottom: '20px' }}>
        Tendência de Deteções (últimos 7 dias)
      </h3>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '150px' }}>
        {datas.map((data, i) => {
          const altura = (valoresPragas[i] / maxValor) * 100;
          const pragasHoje = pragasPorData[i] || [];
          
          return (
            <div key={i} style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '5px',
              position: 'relative'
            }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{
                  width: '100%',
                  height: `${altura}px`,
                  background: `linear-gradient(to top, ${cores.verdeAlface}, ${cores.verdePimenta})`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s',
                  position: 'relative'
                }}>
                  {/* Tooltip com nomes das pragas */}
                  {pragasHoje.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: cores.texto,
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      whiteSpace: 'nowrap',
                      display: 'none',
                      zIndex: 10
                    }}>
                      {pragasHoje.map((p, idx) => (
                        <div key={idx}>{p.class}</div>
                      ))}
                    </div>
                  )}
                </div>
                {valoresPerda[i] > 0 && (
                  <div style={{
                    width: '100%',
                    height: `${(valoresPerda[i] / 100) * 50}px`,
                    background: cores.vermelho,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.7
                  }} />
                )}
              </div>
              <span style={{ fontSize: '0.7rem', color: cores.textoClaro }}>{data.split('/')[0]}</span>
            </div>
          );
        })}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', background: cores.verdeAlface, borderRadius: '2px' }} />
          <span style={{ fontSize: '0.8rem', color: cores.textoClaro }}>Pragas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', background: cores.vermelho, borderRadius: '2px' }} />
          <span style={{ fontSize: '0.8rem', color: cores.textoClaro }}>Perda (mil Kz)</span>
        </div>
      </div>
    </div>
  );
}

// ===== COMPONENTE DE ÚLTIMAS DETEÇÕES =====
function UltimasDetecoes({ detecoes }) {
  if (!detecoes || detecoes.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '20px',
        border: `1px solid ${cores.verdeClaro}`,
        textAlign: 'center',
        color: cores.textoClaro
      }}>
        Nenhuma deteção realizada ainda
      </div>
    );
  }

  const getIcon = (classe) => {
    if (classe?.toLowerCase().includes('bird')) return <Bird size={16} color={cores.amarelo} />;
    if (classe?.toLowerCase().includes('rat')) return <Rat size={16} color={cores.marrom} />;
    return <Bug size={16} color={cores.azul} />;
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '20px',
      border: `1px solid ${cores.verdeClaro}`
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: cores.texto, marginBottom: '15px' }}>
        Últimas Deteções
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {detecoes.slice(0, 5).map((det, index) => (
          <div key={index} style={{
            padding: '12px',
            background: cores.cinzaClaro,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {getIcon(det.detections?.[0]?.class)}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {det.total_count} {det.total_count === 1 ? 'praga' : 'pragas'}
                </span>
                <span style={{ fontSize: '0.7rem', color: cores.textoClaro }}>
                  {new Date(det.timestamp).toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: cores.textoClaro }}>
                <span>{det.localizacao || 'Local não especificado'}</span>
                {det.perdaEstimada && (
                  <span style={{ color: cores.vermelho }}>Perda: {det.perdaEstimada.toLocaleString()} Kz</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== COMPONENTE DE RECOMENDAÇÕES ATIVAS =====
function RecomendacoesAtivas({ recomendacoes }) {
  if (!recomendacoes || recomendacoes.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '20px',
        border: `1px solid ${cores.verdeClaro}`,
        textAlign: 'center',
        color: cores.textoClaro
      }}>
        Nenhuma recomendação ativa
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '20px',
      border: `1px solid ${cores.verdeClaro}`
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: cores.texto, marginBottom: '15px' }}>
        Recomendações Ativas
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recomendacoes.slice(0, 3).map((rec, index) => (
          <div key={index} style={{
            padding: '12px',
            background: cores.verdeClaro,
            borderRadius: '8px',
            borderLeft: `4px solid ${cores.verdePimenta}`,
            fontSize: '0.9rem'
          }}>
            {rec}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== COMPONENTE DE ALERTAS RECENTES =====
function AlertasRecentes({ alertas }) {
  if (!alertas || alertas.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '20px',
        border: `1px solid ${cores.verdeClaro}`,
        textAlign: 'center',
        color: cores.textoClaro
      }}>
        Nenhum alerta no momento
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '20px',
      border: `1px solid ${cores.verdeClaro}`
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: cores.texto, marginBottom: '15px' }}>
        Alertas Recentes
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alertas.slice(0, 3).map((alerta, index) => {
          const nivelCor = alerta.nivelRisco === 'ALTO' || alerta.nivelRisco === 'CRÍTICO' ? cores.vermelho :
                          alerta.nivelRisco === 'MÉDIO' ? cores.amarelo : cores.verdeAlface;
          
          return (
            <div key={index} style={{
              padding: '12px',
              background: `${nivelCor}10`,
              borderRadius: '8px',
              border: `1px solid ${nivelCor}30`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', color: nivelCor }}>
                  {alerta.total_count} {alerta.total_count === 1 ? 'praga' : 'pragas'}
                </span>
                <span style={{ fontSize: '0.7rem', color: cores.textoClaro }}>
                  {new Date(alerta.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: cores.textoClaro }}>
                {alerta.localizacao || 'Local não especificado'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== COMPONENTE DE AÇÕES RÁPIDAS =====
function AcoesRapidas({ setAbaAtiva }) {
  const acoes = [
    { id: 'deteccao', icone: <Camera size={20} />, texto: 'Nova Deteção', cor: cores.verdeAlface },
    { id: 'metricas', icone: <BarChart3 size={20} />, texto: 'Ver Métricas', cor: cores.azul },
    { id: 'ia', icone: <Brain size={20} />, texto: 'Recomendações IA', cor: cores.roxo },
    { id: 'mapa', icone: <Map size={20} />, texto: 'Mapa de Risco', cor: cores.amarelo }
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '20px',
      border: `1px solid ${cores.verdeClaro}`,
      marginTop: '20px'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: cores.texto, marginBottom: '15px' }}>
        Ações Rápidas
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '10px'
      }}>
        {acoes.map((acao) => (
          <motion.button
            key={acao.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAbaAtiva(acao.id)}
            style={{
              padding: '15px 10px',
              background: cores.cinzaClaro,
              border: `1px solid ${cores.verdeClaro}`,
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              color: acao.cor
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: `${acao.cor}15`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {acao.icone}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '500', color: cores.texto }}>{acao.texto}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ===== COMPONENTE DE NAVEGAÇÃO LATERAL =====
function Sidebar({ abaAtiva, setAbaAtiva, notificacoes }) {
  const [colapsado, setColapsado] = useState(false);
  
  const menuItems = [
    { id: 'resumo', icone: <LayoutDashboard size={20} />, label: 'Resumo', cor: cores.verdeAlface },
    { id: 'deteccao', icone: <Camera size={20} />, label: 'Detecção de Pragas', cor: cores.azul, notif: notificacoes?.deteccao },
    { id: 'roedores', icone: <Rat size={20} />, label: 'Gestão de Roedores', cor: cores.vermelho, notif: notificacoes?.roedores },
    { id: 'aves', icone: <Bird size={20} />, label: 'Gestão de Aves', cor: cores.amarelo, notif: notificacoes?.aves },
    { id: 'mapa', icone: <Map size={20} />, label: 'Mapa de Risco', cor: cores.roxo, notif: notificacoes?.mapa },
    { id: 'metricas', icone: <BarChart3 size={20} />, label: 'Métricas', cor: cores.verdePimenta },
    { id: 'monitoramento', icone: <Sun size={20} />, label: 'Monitoramento', cor: cores.azul },
    { id: 'ia', icone: <Brain size={20} />, label: 'Recomendações IA', cor: cores.roxo, notif: notificacoes?.ia },
    { id: 'relatorios', icone: <FileText size={20} />, label: 'Relatórios', cor: cores.verdeAlface },
    { id: 'cameras', icone: <Video size={20} />, label: 'Câmaras IP', cor: cores.azul }
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        width: colapsado ? '80px' : '280px',
        background: 'white',
        borderRadius: '24px',
        padding: '24px 16px',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
        border: `1px solid ${cores.verdeClaro}`,
        transition: 'width 0.3s ease',
        height: 'fit-content',
        position: 'sticky',
        top: '20px'
      }}
    >
      {/* Botão colapsar */}
      <button
        onClick={() => setColapsado(!colapsado)}
        style={{
          position: 'absolute',
          right: -12,
          top: 20,
          width: 24,
          height: 24,
          background: cores.verdePimenta,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        <ChevronRight size={14} style={{ transform: colapsado ? 'rotate(180deg)' : 'none' }} />
      </button>

      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
        padding: '0 8px'
      }}>
        <div style={{
          width: 40,
          height: 40,
          background: cores.verdeAlface,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px'
        }}>
          🌱
        </div>
        {!colapsado && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontWeight: 'bold', color: cores.verdeAlface }}
          >
            AGROOKUVANJA
          </motion.span>
        )}
      </div>

      {/* Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map(item => (
          <motion.button
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAbaAtiva(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: colapsado ? '0' : '12px',
              padding: colapsado ? '12px' : '12px 16px',
              background: abaAtiva === item.id ? `${item.cor}15` : 'transparent',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              width: '100%',
              color: abaAtiva === item.id ? item.cor : cores.textoClaro,
              position: 'relative',
              justifyContent: colapsado ? 'center' : 'flex-start'
            }}
          >
            <span style={{ color: abaAtiva === item.id ? item.cor : 'inherit' }}>
              {item.icone}
            </span>
            {!colapsado && (
              <span style={{ 
                fontSize: '0.95rem',
                fontWeight: abaAtiva === item.id ? 'bold' : 'normal',
                flex: 1,
                textAlign: 'left'
              }}>
                {item.label}
              </span>
            )}
            {!colapsado && item.notif > 0 && (
              <span style={{
                background: cores.vermelho,
                color: 'white',
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: 12,
                minWidth: 20,
                textAlign: 'center'
              }}>
                {item.notif}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Rodapé do menu */}
      <div style={{
        marginTop: '32px',
        padding: '16px 8px',
        borderTop: `1px solid ${cores.verdeClaro}`
      }}>
        <button
          onClick={() => vozService.falar('Bem-vindo ao AgroOkuvanja. Estou aqui para ajudar.')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: cores.verdeClaro,
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            width: '100%',
            color: cores.verdeAlface
          }}
        >
          <Mic size={18} />
          {!colapsado && <span style={{ fontSize: '0.9rem' }}>Assistente de Voz</span>}
        </button>
      </div>
    </motion.aside>
  );
}

// ===== COMPONENTE PRINCIPAL =====
export default function Dashboard({ user }) {
  const [abaAtiva, setAbaAtiva] = useState('resumo');
  const [loading, setLoading] = useState(true);
  
  // Estados para dados reais dos componentes
  const [deteccoes, setDeteccoes] = useState([]);
  const [metricas, setMetricas] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [alertasMapa, setAlertasMapa] = useState([]);
  const [notificacoes, setNotificacoes] = useState({
    deteccao: 0,
    roedores: 0,
    aves: 0,
    mapa: 0,
    ia: 0
  });

  // Calcular estatísticas agregadas dos dados reais
  const estatisticas = {
    totalScans: deteccoes.length,
    totalPragas: deteccoes.reduce((acc, d) => acc + (d.total_count || 0), 0),
    perdaTotal: deteccoes.reduce((acc, d) => acc + (d.perdaEstimada || 0), 0),
    areaTotal: deteccoes.reduce((acc, d) => {
      const area = parseFloat(d.areaAfetada) || 0;
      return acc + area;
    }, 0)
  };

  // Handlers para receber dados dos componentes filhos
  const handleNovaDeteccao = (dados) => {
    setDeteccoes(prev => [dados, ...prev].slice(0, 50));
    setNotificacoes(prev => ({ ...prev, deteccao: prev.deteccao + 1 }));
  };

  const handleAtualizarMetricas = (dados) => {
    setMetricas(prev => [dados, ...prev].slice(0, 100));
  };

  const handleNovasRecomendacoes = (dados) => {
    if (dados?.recomendacoes) {
      setRecomendacoes(prev => [...dados.recomendacoes, ...prev].slice(0, 20));
      setNotificacoes(prev => ({ ...prev, ia: prev.ia + dados.recomendacoes.length }));
    }
  };

  const handleNovoAlertaMapa = (dados) => {
    setAlertasMapa(prev => [dados, ...prev].slice(0, 30));
    setNotificacoes(prev => ({ ...prev, mapa: prev.mapa + 1 }));
    
    // Atualizar contadores específicos por tipo de praga
    if (dados.pragas) {
      dados.pragas.forEach(praga => {
        if (praga.class?.toLowerCase().includes('rat')) {
          setNotificacoes(prev => ({ ...prev, roedores: prev.roedores + 1 }));
        } else if (praga.class?.toLowerCase().includes('bird')) {
          setNotificacoes(prev => ({ ...prev, aves: prev.aves + 1 }));
        }
      });
    }
  };

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        flexDirection: 'column'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 60,
            height: 60,
            border: `4px solid ${cores.verdeClaro}`,
            borderTopColor: cores.verdePimenta,
            borderRadius: '50%',
            marginBottom: 20
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: cores.verdeAlface, fontSize: '1.1rem' }}
        >
          A preparar o teu dashboard...
        </motion.p>
      </div>
    );
  }

  // Renderizar conteúdo baseado na aba ativa
  const renderConteudo = () => {
    switch(abaAtiva) {
      case 'deteccao':
        return (
          <DeteccaoPragas
            onResultado={handleNovaDeteccao}
            onAtualizarDashboard={() => {}}
            onEnviarParaRelatorios={(dados) => console.log('Relatório:', dados)}
            onEnviarParaMetricas={handleAtualizarMetricas}
            onEnviarParaMapaRisco={handleNovoAlertaMapa}
            onEnviarParaRecomendacoes={handleNovasRecomendacoes}
          />
        );
      
      case 'roedores':
        return <GestaoRoedores alertas={alertasMapa.filter(a => 
          a.pragas?.some(p => p.class?.toLowerCase().includes('rat'))
        )} />;
      
      case 'aves':
        return <GestaoAves alertas={alertasMapa.filter(a => 
          a.pragas?.some(p => p.class?.toLowerCase().includes('bird'))
        )} />;
      
      case 'mapa':
        return <MapaRisco alertas={alertasMapa} />;
      
      case 'metricas':
        return <MetricasProducao dados={metricas} />;
      
      case 'monitoramento':
        return <MonitoramentoCampo />;
      
      case 'ia':
        return <RecomendacoesIA recomendacoes={recomendacoes} />;
      
      case 'relatorios':
        return <RelatoriosColheita deteccoes={deteccoes} />;
      
      case 'cameras':
        return <ConfiguracaoCameras />;
      
      default:
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Estatísticas em tempo real */}
            <EstatisticasReais dados={estatisticas} />
            
            {/* Grid de gráficos e alertas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <GraficoTendencias historico={deteccoes} />
              <AlertasRecentes alertas={deteccoes.filter(d => d.total_count > 1)} />
            </div>
            
            {/* Grid de últimas deteções e recomendações */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <UltimasDetecoes detecoes={deteccoes} />
              <RecomendacoesAtivas recomendacoes={recomendacoes} />
            </div>
            
            {/* Ações rápidas */}
            <AcoesRapidas setAbaAtiva={setAbaAtiva} />
            
            {/* Mensagem quando não há dados */}
            {deteccoes.length === 0 && (
              <div style={{
                marginTop: '20px',
                padding: '30px',
                background: 'white',
                borderRadius: '24px',
                border: `1px solid ${cores.verdeClaro}`,
                textAlign: 'center',
                color: cores.textoClaro
              }}>
                <Camera size={48} style={{ marginBottom: '15px', opacity: 0.5 }} />
                <h3>Nenhuma deteção realizada ainda</h3>
                <p style={{ marginTop: '10px' }}>
                  Comece por fazer uma deteção de pragas para ver os dados aqui
                </p>
                <button
                  onClick={() => setAbaAtiva('deteccao')}
                  style={{
                    marginTop: '20px',
                    padding: '12px 30px',
                    background: cores.verdeAlface,
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Fazer Primeira Deteção
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '20px',
      minHeight: '100vh'
    }}>
      {/* Sidebar */}
      <Sidebar 
        abaAtiva={abaAtiva} 
        setAbaAtiva={setAbaAtiva}
        notificacoes={notificacoes}
      />

      {/* Conteúdo principal */}
      <main style={{ flex: 1, minHeight: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={abaAtiva}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderConteudo()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}