import React, { useState, useEffect } from "react";

// Componentes
import Profile from "./components/Profile";
import AbaAjuda from "./components/AbaAjuda";
import AbaQuemSomos from "./components/AbaQuemSomos";
import FooterAgroOkuvanja from "./components/FooterAgroOkuvanja";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

// Componentes específicos do AGROOKUVANJA
import MonitoramentoCampo from "./components/AgroOkuvanja/MonitoramentoCampo";
import DeteccaoPragas from "./components/AgroOkuvanja/DeteccaoPragas";
import GestaoRoedores from "./components/AgroOkuvanja/GestaoRoedores";
import GestaoAves from "./components/AgroOkuvanja/GestaoAves";
import MapaRisco from "./components/AgroOkuvanja/MapaRisco";
import RelatoriosColheita from "./components/AgroOkuvanja/RelatoriosColheita";
import RecomendacoesIA from "./components/AgroOkuvanja/RecomendacoesIA";
import HistoricoOcorrencias from "./components/AgroOkuvanja/HistoricoOcorrencias";
import MetricasProducao from "./components/AgroOkuvanja/MetricasProducao";

// Services
import { getUserProfile, logout } from "./services/auth";

const translations = {
  pt: {
    bemVindo: "Bem-vindo",
    perfil: "Perfil",
    monitoramento: "Monitoramento de Campo",
    deteccao: "Detecção de Pragas",
    roedores: "Gestão de Roedores",
    aves: "Gestão de Aves",
    mapaRisco: "Mapa de Risco",
    relatorios: "Relatórios de Colheita",
    recomendacoes: "Recomendações IA",
    historico: "Histórico de Ocorrências",
    metricas: "Métricas de Produção",
    logout: "Sair",
    dashboard: "Painel de Controle",
    config: "Configurações",
    ajuda: "Ajuda",
    sobre: "Sobre Nós",
    versao: "Versão 1.0.0"
  },
  en: {
    bemVindo: "Welcome",
    perfil: "Profile",
    monitoramento: "Field Monitoring",
    deteccao: "Pest Detection",
    roedores: "Rodent Management",
    aves: "Bird Management",
    mapaRisco: "Risk Map",
    relatorios: "Harvest Reports",
    recomendacoes: "AI Recommendations",
    historico: "Occurrence History",
    metricas: "Production Metrics",
    logout: "Logout",
    dashboard: "Dashboard",
    config: "Settings",
    ajuda: "Help",
    sobre: "About Us",
    versao: "Version 1.0.0"
  }
};

function TopBar({ lang, setLang, onAuthClick, usuarioLogado, onLogout }) {
  const t = translations[lang];

  return (
    <header className="fixed w-full z-50 flex items-center justify-between p-4 bg-[#1A4D2E] shadow-lg">
      <div className="text-2xl font-bold text-[#E8F0E8]">AGROOKUVANJA</div>

      <div className="flex items-center gap-4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="rounded-lg p-2 bg-[#F0F7E8] text-[#1A4D2E] focus:outline-none focus:ring-2 focus:ring-[#82B74D]"
        >
          <option value="pt">Português 🇦🇴</option>
          <option value="en">English 🇺🇸</option>
        </select>

        {usuarioLogado ? (
          <div className="flex items-center gap-4">
            <span className="text-[#E8F0E8] font-medium">
              {usuarioLogado.username || "Agricultor"}
            </span>
            <button
              onClick={onLogout}
              className="bg-[#D94A3D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#C0392B] transition"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="bg-[#82B74D] text-[#1A4D2E] font-bold py-2 px-4 rounded-lg hover:bg-[#94C76D] transition"
          >
            Iniciar Sessão / Cadastrar
          </button>
        )}
      </div>
    </header>
  );
}

function DashboardContent({ user, lang, onLogout }) {
  const t = translations[lang];
  const [abaAtiva, setAbaAtiva] = useState("Dashboard");
  const [profileData, setProfileData] = useState(null);
  
  const [estadoLocal, setEstadoLocal] = useState({
    scansRealizados: 0,
    planoAtivo: false,
    atividades: [],
    pragasDetectadas: [],
    alertasAtivos: [],
    areasRisco: [],
    metricasCampo: {
      totalHectares: 50,
      culturasAtivas: ["Milho", "Sorgo", "Pastagem"]
    }
  });

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const result = await getUserProfile(user?.id);
      if (result?.success) {
        setProfileData(result.profile);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const realizarScan = () => {
    if (!estadoLocal.planoAtivo && estadoLocal.scansRealizados >= 5) {
      alert("Limite de scans gratuitos atingido!");
      return false;
    }
    setEstadoLocal(prev => ({
      ...prev,
      scansRealizados: prev.scansRealizados + 1
    }));
    return true;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#1A4D2E] to-[#2D6A4F] text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            Bem-vindo de volta, {profileData?.nome || user?.username || "Agricultor"}!
          </h2>
          <p className="text-[#E8F0E8]">
            {profileData?.propriedade || "Propriedade Rural"} • {profileData?.hectares || 0} hectares
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1A4D2E] mb-4">
            {estadoLocal.planoAtivo ? "✅ Plano Premium Ativo" : "📸 Scans Disponíveis"}
          </h3>
          <div className="text-center">
            <span className="text-3xl font-bold text-[#1A4D2E]">
              {estadoLocal.planoAtivo ? "∞" : `${5 - estadoLocal.scansRealizados}/5`}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { key: "MonitoramentoCampo", icon: "🌾", title: t.monitoramento, color: "from-emerald-500 to-green-600" },
          { key: "DeteccaoPragas", icon: "🔍", title: t.deteccao, color: "from-blue-500 to-blue-600" },
          { key: "GestaoRoedores", icon: "🐀", title: t.roedores, color: "from-amber-500 to-orange-600" },
          { key: "GestaoAves", icon: "🐦", title: t.aves, color: "from-sky-500 to-cyan-600" },
          { key: "MapaRisco", icon: "🗺️", title: t.mapaRisco, color: "from-red-500 to-rose-600" },
          { key: "RecomendacoesIA", icon: "🤖", title: t.recomendacoes, color: "from-purple-500 to-purple-600" },
          { key: "RelatoriosColheita", icon: "📊", title: t.relatorios, color: "from-indigo-500 to-indigo-600" },
          { key: "HistoricoOcorrencias", icon: "📋", title: t.historico, color: "from-teal-500 to-teal-600" }
        ].map((card) => (
          <div
            key={card.key}
            className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1`}
            onClick={() => setAbaAtiva(card.key)}
          >
            <div className="text-3xl mb-4">{card.icon}</div>
            <h4 className="font-bold text-lg mb-2">{card.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConteudo = () => {
    switch (abaAtiva) {
      case "Dashboard": return renderDashboard();
      case "Perfil": return <Profile user={user} />;
      case "Sobre": return <AbaQuemSomos />;
      case "Ajuda": return <AbaAjuda />;
      case "MonitoramentoCampo": return <MonitoramentoCampo onRealizarScan={realizarScan} />;
      case "DeteccaoPragas": return <DeteccaoPragas planoAtivo={estadoLocal.planoAtivo} scansRestantes={5 - estadoLocal.scansRealizados} onRealizarScan={realizarScan} />;
      case "GestaoRoedores": return <GestaoRoedores />;
      case "GestaoAves": return <GestaoAves />;
      case "MapaRisco": return <MapaRisco />;
      case "RecomendacoesIA": return <RecomendacoesIA />;
      case "RelatoriosColheita": return <RelatoriosColheita />;
      case "HistoricoOcorrencias": return <HistoricoOcorrencias />;
      case "MetricasProducao": return <MetricasProducao />;
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1A4D2E] to-[#82B74D] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1A4D2E]">AGROOKUVANJA</h1>
              <p className="text-sm text-gray-500">Detecção e Gestão de Pragas</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-[#1A4D2E] text-white">
          <div className="p-4">
            <nav className="space-y-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  abaAtiva === "Dashboard" ? "bg-[#82B74D] text-[#1A4D2E] font-semibold" : "hover:bg-white/10"
                }`}
                onClick={() => setAbaAtiva("Dashboard")}
              >
                🏠 {t.dashboard}
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  abaAtiva === "Perfil" ? "bg-[#82B74D] text-[#1A4D2E] font-semibold" : "hover:bg-white/10"
                }`}
                onClick={() => setAbaAtiva("Perfil")}
              >
                👤 {t.perfil}
              </button>
              
              <div className="pt-4 mt-4 border-t border-white/20">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 transition"
                >
                  🚪 {t.logout}
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-auto">
          {renderConteudo()}
        </main>
      </div>
    </div>
  );
}

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [lang, setLang] = useState("pt");

  useEffect(() => {
    const savedUser = localStorage.getItem('agrookuvanja_user');
    if (savedUser) {
      setUsuarioLogado(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('agrookuvanja_user', JSON.stringify(user));
    setUsuarioLogado(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('agrookuvanja_user');
    setUsuarioLogado(null);
    logout();
  };

  if (usuarioLogado) {
    return (
      <div className="App">
        <TopBar
          lang={lang}
          setLang={setLang}
          usuarioLogado={usuarioLogado}
          onLogout={handleLogout}
        />
        <DashboardContent user={usuarioLogado} lang={lang} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="App">
      <TopBar
        lang={lang}
        setLang={setLang}
        onAuthClick={() => setShowAuthModal(true)}
        usuarioLogado={null}
      />
      
      <main className="pt-20">
        <div className="min-h-screen bg-gradient-to-b from-[#1A4D2E] to-[#2D6A4F] text-white">
          <div className="container mx-auto text-center py-20">
            <h1 className="text-5xl font-bold mb-4">AGROOKUVANJA</h1>
            <p className="text-xl text-[#E8F0E8] mb-8">
              Sistema de Detecção e Gestão de Pragas Agrícolas
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#82B74D] text-[#1A4D2E] font-bold py-3 px-8 rounded-lg hover:bg-[#94C76D] transition text-lg"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </main>

      <FooterAgroOkuvanja setAbaAtiva={() => {}} lang={lang} />

      {showAuthModal && authMode === "login" && (
        <LoginModal
          onClose={() => setShowAuthModal(false)}
          lang={lang}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setAuthMode("register")}
        />
      )}
    </div>
  );
}

export default App;