import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { TrendingUp, Target, Shield, BarChart3 } from 'lucide-react';

export function WelcomeScreen() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
      title: 'Capital Humano',
      description: 'Estimamos o valor presente da sua renda futura ao longo da vida',
    },
    {
      icon: <Target className="w-8 h-8 text-primary-600" />,
      title: 'Plano Personalizado',
      description: 'Recomendações de consumo, poupança e investimento alinhadas aos seus objetivos',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: 'Gestão de Risco',
      description: 'Alocação ótima considerando sua tolerância a risco e perfil',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-600" />,
      title: 'Visão de Longo Prazo',
      description: 'Projeções até a aposentadoria e planejamento de herança',
    },
  ];

  return (
    <OnboardingLayout
      currentStep={0}
      onNext={() => navigate('/onboarding/personal')}
      nextLabel="Começar"
      showProgress={false}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo ao LifePath
        </h1>
        <p className="text-xl text-gray-600">
          Planejamento financeiro ao longo da vida, em uma visão única
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Como funciona?
          </h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">1.</span>
              <span>Você informa sua realidade financeira e objetivos de vida</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">2.</span>
              <span>Estimamos seu capital humano e construímos seu balanço econômico</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">3.</span>
              <span>Geramos um plano personalizado de consumo, poupança e investimento</span>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>⏱️ Tempo estimado: 10 minutos</p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
