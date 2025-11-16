import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button, Card } from '../../components/ui';
import { TrendingUp, RefreshCw, Settings, LogOut } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

export function Dashboard() {
  const navigate = useNavigate();
  const { state, resetProfile } = useApp();

  useEffect(() => {
    if (!state.userProfile?.onboardingCompleted) {
      navigate('/onboarding');
    }
  }, [state.userProfile?.onboardingCompleted, navigate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleRestart = () => {
    if (confirm('Tem certeza que deseja resetar seus dados? Esta ação não pode ser desfeita.')) {
      resetProfile();
      navigate('/onboarding');
    }
  };

  if (!state.financialPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nenhum plano financeiro encontrado
          </h2>
          <Button onClick={() => navigate('/onboarding')}>
            Iniciar Onboarding
          </Button>
        </div>
      </div>
    );
  }

  const plan = state.financialPlan;

  const pieData = [
    {
      name: 'Ativos de Risco',
      value: plan.assetAllocation.riskAssets,
      color: '#0ea5e9',
    },
    {
      name: 'Ativos Defensivos',
      value: plan.assetAllocation.defensiveAssets,
      color: '#10b981',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary-600">LifePath</h1>
            <p className="text-sm text-gray-600 mt-1">
              Olá, {state.userProfile.personalData?.name}!
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/onboarding/summary')}
            >
              <Settings size={16} className="mr-2" />
              Editar Perfil
            </Button>
            <Button variant="outline" size="sm" onClick={handleRestart}>
              <LogOut size={16} className="mr-2" />
              Recomeçar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Patrimônio Econômico</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(plan.economicBalance.economicNetWorth)}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Capital Humano</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(plan.economicBalance.humanCapital)}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Taxa de Poupança Recomendada
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {plan.recommendedSavingsRate}%
                </p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold">
                  {plan.currentSavingsRate}%
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Evolução do Patrimônio */}
          <Card title="Evolução do Patrimônio">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={plan.lifeProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="age"
                  label={{ value: 'Idade', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  tickFormatter={(value) =>
                    new Intl.NumberFormat('pt-BR', {
                      notation: 'compact',
                      compactDisplay: 'short',
                    }).format(value)
                  }
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Idade: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="humanCapital"
                  stroke="#f59e0b"
                  name="Capital Humano"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="financialCapital"
                  stroke="#0ea5e9"
                  name="Capital Financeiro"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="totalWealth"
                  stroke="#10b981"
                  name="Total"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Alocação de Ativos */}
          <Card title="Alocação Recomendada">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RePieChart>
              </ResponsiveContainer>

              <div className="w-full mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-700">Ações/Fundos de Risco</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {plan.assetAllocation.riskAssets}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-700">Renda Fixa/Defensivos</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {plan.assetAllocation.defensiveAssets}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recomendações */}
        <Card title="Próximos Passos" className="mb-8">
          <div className="space-y-4">
            {plan.currentSavingsRate < plan.recommendedSavingsRate && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-semibold text-yellow-900">
                  Aumente sua taxa de poupança
                </p>
                <p className="text-sm text-yellow-800 mt-1">
                  Você está poupando {plan.currentSavingsRate}% da sua renda. Tente
                  aumentar para {plan.recommendedSavingsRate}% para atingir seus
                  objetivos de longo prazo.
                </p>
              </div>
            )}

            {plan.qualitativeIndicators.lifeInsuranceNeed === 'high' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="font-semibold text-blue-900">
                  Considere contratar seguro de vida
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  Com base no seu capital humano e dependentes, recomendamos uma
                  cobertura de aproximadamente{' '}
                  {plan.qualitativeIndicators.lifeInsuranceAmount &&
                    formatCurrency(plan.qualitativeIndicators.lifeInsuranceAmount)}
                  .
                </p>
              </div>
            )}

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-900">
                Revise seu plano regularmente
              </p>
              <p className="text-sm text-green-800 mt-1">
                Recomendamos atualizar seus dados a cada 6-12 meses ou quando houver
                mudanças significativas na sua vida financeira.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Plano gerado em:{' '}
            {new Date(plan.generatedAt).toLocaleDateString('pt-BR')}
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/onboarding/summary')}
          >
            <RefreshCw size={16} className="mr-2" />
            Atualizar Dados e Recalcular
          </Button>
        </div>
      </main>
    </div>
  );
}
