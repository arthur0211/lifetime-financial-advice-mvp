import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Card } from '../../components/ui';
import { LABELS } from '../../constants';
import { User, Target, Briefcase, Wallet, CreditCard, Heart, Leaf } from 'lucide-react';

export function SummaryScreen() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { userProfile } = state;

  const formatCurrency = (value?: number) => {
    if (value === undefined) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const totalAssets =
    (userProfile.financialAssets?.checkingAccount || 0) +
    (userProfile.financialAssets?.fixedIncome || 0) +
    (userProfile.financialAssets?.multimercado || 0) +
    (userProfile.financialAssets?.stocks || 0) +
    (userProfile.financialAssets?.retirement || 0) +
    (userProfile.financialAssets?.other || 0) +
    (userProfile.financialAssets?.primaryResidence || 0) +
    (userProfile.financialAssets?.investmentProperties || 0) +
    (userProfile.financialAssets?.businessOwnership || 0);

  const totalLiabilities =
    (userProfile.liabilitiesAndExpenses?.mortgageBalance || 0);

  return (
    <OnboardingLayout
      currentStep={8}
      onNext={() => navigate('/onboarding/plan')}
      onPrev={() => navigate('/onboarding/esg')}
      nextLabel="Gerar Meu Plano"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Resumo dos Seus Dados
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Revise suas informações antes de gerar seu plano financeiro
          personalizado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Perfil Pessoal */}
          <Card title="Perfil Pessoal" className="flex flex-col">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Dados Pessoais</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Nome:</strong> {userProfile.personalData?.name}
              </p>
              <p>
                <strong>Estado Civil:</strong>{' '}
                {userProfile.personalData?.maritalStatus &&
                  LABELS.maritalStatus[userProfile.personalData.maritalStatus]}
              </p>
              <p>
                <strong>Dependentes:</strong> {userProfile.personalData?.dependents}
              </p>
            </div>
          </Card>

          {/* Objetivos */}
          <Card title="Objetivos de Vida" className="flex flex-col">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Objetivos</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Objetivo Principal:</strong>{' '}
                {userProfile.lifeGoals?.primaryGoal &&
                  LABELS.primaryGoal[userProfile.lifeGoals.primaryGoal]}
              </p>
              <p>
                <strong>Idade de Aposentadoria:</strong>{' '}
                {userProfile.lifeGoals?.wantsSystemSuggestion
                  ? 'Sugerida pelo sistema'
                  : `${userProfile.lifeGoals?.targetRetirementAge} anos`}
              </p>
            </div>
          </Card>

          {/* Carreira */}
          <Card title="Carreira e Renda" className="flex flex-col">
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Profissional</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Profissão:</strong> {userProfile.careerData?.profession}
              </p>
              <p>
                <strong>Renda Mensal:</strong>{' '}
                {formatCurrency(userProfile.careerData?.monthlyNetIncome)}
              </p>
              <p>
                <strong>Setor:</strong>{' '}
                {userProfile.careerData?.sector &&
                  LABELS.sector[userProfile.careerData.sector]}
              </p>
            </div>
          </Card>

          {/* Patrimônio */}
          <Card title="Patrimônio" className="flex flex-col">
            <div className="flex items-center mb-4">
              <Wallet className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Ativos e Passivos</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Total de Ativos:</strong> {formatCurrency(totalAssets)}
              </p>
              <p>
                <strong>Total de Passivos:</strong>{' '}
                {formatCurrency(totalLiabilities)}
              </p>
              <p>
                <strong>Patrimônio Líquido:</strong>{' '}
                {formatCurrency(totalAssets - totalLiabilities)}
              </p>
            </div>
          </Card>

          {/* Gastos */}
          <Card title="Gastos Mensais" className="flex flex-col">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Despesas</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Gastos Essenciais:</strong>{' '}
                {formatCurrency(
                  userProfile.liabilitiesAndExpenses?.monthlyEssentialExpenses
                )}
                /mês
              </p>
              {userProfile.liabilitiesAndExpenses?.mortgageMonthlyPayment && userProfile.liabilitiesAndExpenses.mortgageMonthlyPayment > 0 && (
                <p>
                  <strong>Financiamento:</strong>{' '}
                  {formatCurrency(
                    userProfile.liabilitiesAndExpenses.mortgageMonthlyPayment
                  )}
                  /mês
                </p>
              )}
            </div>
          </Card>

          {/* Preferências */}
          <Card title="Preferências" className="flex flex-col">
            <div className="flex items-center mb-4">
              <Heart className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Perfil</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Perfil de Risco:</strong>{' '}
                {userProfile.pecuniaryPreferences?.riskTolerance?.classification &&
                  LABELS.riskClassification[
                    userProfile.pecuniaryPreferences.riskTolerance.classification
                  ]}{' '}
                ({userProfile.pecuniaryPreferences?.riskTolerance?.score}/100)
              </p>
              <p>
                <strong>ESG:</strong>{' '}
                {userProfile.nonPecuniaryPreferences?.esgPreference &&
                  LABELS.esgPreference[
                    userProfile.nonPecuniaryPreferences.esgPreference
                  ]}
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
          <div className="flex items-start">
            <Leaf className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Pronto para ver seu plano?
              </h3>
              <p className="text-sm text-primary-800">
                Com base nas informações fornecidas, vamos calcular seu capital
                humano, construir seu balanço econômico e gerar recomendações
                personalizadas de consumo, poupança e investimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
