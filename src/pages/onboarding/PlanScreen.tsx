import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Card, Button } from '../../components/ui';
import { generateFinancialPlan } from '../../services/calculations/financialEngine';
import { FinancialPlan } from '../../types';
import {
  TrendingUp,
  Wallet,
  PieChart,
  Shield,
  AlertCircle,
  CheckCircle,
  Download,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function PlanScreen() {
  const navigate = useNavigate();
  const { state, setFinancialPlan, completeOnboarding } = useApp();
  const [plan, setPlan] = useState<FinancialPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gerar plano financeiro
    setTimeout(() => {
      const generatedPlan = generateFinancialPlan(state.userProfile);
      setPlan(generatedPlan);
      setFinancialPlan(generatedPlan);
      setLoading(false);
    }, 1500); // Simular processamento
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleFinish = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <OnboardingLayout currentStep={9} showProgress={false}>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-6"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Gerando seu plano...
          </h3>
          <p className="text-gray-600">
            Estamos calculando seu capital humano e criando recomendações
            personalizadas
          </p>
        </div>
      </OnboardingLayout>
    );
  }

  if (!plan) {
    return (
      <OnboardingLayout currentStep={9} showProgress={false}>
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Erro ao gerar plano
          </h3>
          <p className="text-gray-600 mb-6">
            Houve um problema ao processar seus dados. Por favor, tente novamente.
          </p>
          <Button onClick={() => navigate('/onboarding/summary')}>
            Voltar
          </Button>
        </div>
      </OnboardingLayout>
    );
  }

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Seu Plano Financeiro Está Pronto!
          </h1>
          <p className="text-xl text-gray-600">
            Aqui está sua estratégia personalizada para o longo prazo
          </p>
        </div>

        {/* Balanço Econômico */}
        <Card title="Balanço Econômico" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Ativos Totais</h4>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(plan.economicBalance.totalAssets)}
              </p>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>Capital Humano: {formatCurrency(plan.economicBalance.humanCapital)}</p>
                <p>Capital Financeiro: {formatCurrency(plan.economicBalance.financialAssets)}</p>
                <p>Imóveis: {formatCurrency(plan.economicBalance.realEstate)}</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Wallet className="w-5 h-5 text-red-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Passivos Totais</h4>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(plan.economicBalance.totalLiabilities)}
              </p>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>Passivo de Consumo: {formatCurrency(plan.economicBalance.consumptionLiability)}</p>
                <p>Dívidas: {formatCurrency(plan.economicBalance.debts)}</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">
                  Patrimônio Líquido Econômico
                </h4>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(plan.economicBalance.economicNetWorth)}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Seu verdadeiro patrimônio considerando capital humano
              </p>
            </div>
          </div>
        </Card>

        {/* Evolução do Patrimônio */}
        <Card title="Evolução do Patrimônio ao Longo da Vida" className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={plan.lifeProjection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" label={{ value: 'Idade', position: 'insideBottom', offset: -5 }} />
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
                name="Patrimônio Total"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            Este gráfico mostra como seu capital humano diminui ao longo do tempo
            enquanto seu capital financeiro deve crescer.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Taxa de Poupança */}
          <Card title="Recomendação de Poupança">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Taxa Atual
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {plan.currentSavingsRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gray-400 h-3 rounded-full"
                    style={{ width: `${plan.currentSavingsRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Taxa Recomendada
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {plan.recommendedSavingsRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full"
                    style={{ width: `${plan.recommendedSavingsRate}%` }}
                  ></div>
                </div>
              </div>

              {plan.currentSavingsRate < plan.recommendedSavingsRate && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-900">
                    <strong>Atenção:</strong> Você está poupando menos do que o
                    recomendado. Considere aumentar sua taxa de poupança para
                    atingir seus objetivos.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Alocação de Ativos */}
          <Card title="Alocação de Ativos Recomendada">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
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
                    <span className="text-sm text-gray-700">Ativos de Risco</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {plan.assetAllocation.riskAssets}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-700">Ativos Defensivos</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {plan.assetAllocation.defensiveAssets}%
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4 text-center">
                {plan.assetAllocation.justification}
              </p>
            </div>
          </Card>
        </div>

        {/* Indicadores Qualitativos */}
        <Card title="Recomendações Adicionais" className="mb-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Seguro de Vida
                </h4>
                <p className="text-sm text-gray-700">
                  Necessidade:{' '}
                  <span className="font-semibold">
                    {plan.qualitativeIndicators.lifeInsuranceNeed === 'high'
                      ? 'Alta'
                      : plan.qualitativeIndicators.lifeInsuranceNeed === 'medium'
                      ? 'Média'
                      : 'Baixa'}
                  </span>
                </p>
                {plan.qualitativeIndicators.lifeInsuranceAmount && (
                  <p className="text-sm text-gray-700 mt-1">
                    Cobertura sugerida:{' '}
                    {formatCurrency(plan.qualitativeIndicators.lifeInsuranceAmount)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <TrendingUp className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Renda Vitalícia (Anuidade)
                </h4>
                <p className="text-sm text-gray-700">
                  {plan.qualitativeIndicators.annuityRecommendation}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <PieChart className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Idade Alvo de Aposentadoria
                </h4>
                <p className="text-sm text-gray-700">
                  {plan.targetRetirementAge} anos
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Ações */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="lg" onClick={handleFinish}>
            Ir para o Dashboard
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/onboarding/summary')}>
            Revisar Dados
          </Button>
        </div>
      </div>
    </div>
  );
}
