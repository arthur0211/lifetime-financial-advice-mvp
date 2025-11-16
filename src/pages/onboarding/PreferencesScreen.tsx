import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { RadioGroup, Slider } from '../../components/ui';
import { PecuniaryPreferences, RiskTolerance } from '../../types';
import { LABELS, RISK_QUESTIONS } from '../../constants';

export function PreferencesScreen() {
  const navigate = useNavigate();
  const { state, updatePecuniaryPreferences, nextStep } = useApp();

  const [riskAnswers, setRiskAnswers] = useState<number[]>([50, 50, 50]);
  const [bequestStrength, setBequestStrength] = useState<number>(
    state.userProfile.pecuniaryPreferences?.bequestStrength || 3
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PecuniaryPreferences>({
    defaultValues: state.userProfile.pecuniaryPreferences || {},
  });

  const calculateRiskTolerance = (): RiskTolerance => {
    const avgScore = riskAnswers.reduce((a, b) => a + b, 0) / riskAnswers.length;
    let classification: 'conservative' | 'moderate' | 'aggressive';

    if (avgScore < 35) classification = 'conservative';
    else if (avgScore < 65) classification = 'moderate';
    else classification = 'aggressive';

    return { score: Math.round(avgScore), classification };
  };

  const onSubmit = (data: Omit<PecuniaryPreferences, 'riskTolerance'>) => {
    const riskTolerance = calculateRiskTolerance();

    updatePecuniaryPreferences({
      ...data,
      riskTolerance,
      bequestStrength: bequestStrength as 1 | 2 | 3 | 4 | 5,
    });
    nextStep();
    navigate('/onboarding/esg');
  };

  const timePreferenceOptions = Object.entries(LABELS.timePreference).map(
    ([value, label]) => ({ value, label })
  );

  const consumptionSmoothingOptions = Object.entries(
    LABELS.consumptionSmoothing
  ).map(([value, label]) => ({ value, label }));

  const bequestFlexibilityOptions = Object.entries(
    LABELS.bequestFlexibility
  ).map(([value, label]) => ({ value, label }));

  const bequestMotiveOptions = Object.entries(LABELS.bequestMotive).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <OnboardingLayout
      currentStep={6}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/liabilities')}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Preferências Financeiras
        </h2>
        <p className="text-gray-600 mb-8">
          Essas perguntas nos ajudam a entender suas preferências pessoais para
          criar um plano verdadeiramente alinhado com você.
        </p>

        <form className="space-y-10">
          {/* 1. Preferência Temporal */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              1. Preferência de Consumo ao Longo do Tempo
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Suponha que você terá 40 anos de vida financeira pela frente. Você
              prefere:
            </p>
            <Controller
              name="timePreference"
              control={control}
              rules={{ required: 'Selecione uma opção' }}
              render={({ field }) => (
                <RadioGroup
                  options={timePreferenceOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.timePreference?.message}
                  name="timePreference"
                  required
                />
              )}
            />
          </div>

          {/* 2. Suavização de Consumo */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              2. Variação do Padrão de Consumo
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Você prefere um padrão de gastos que:
            </p>
            <Controller
              name="consumptionSmoothing"
              control={control}
              rules={{ required: 'Selecione uma opção' }}
              render={({ field }) => (
                <RadioGroup
                  options={consumptionSmoothingOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.consumptionSmoothing?.message}
                  name="consumptionSmoothing"
                  required
                />
              )}
            />
          </div>

          {/* 3. Tolerância a Risco */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              3. Tolerância a Risco
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Responda as perguntas abaixo para avaliarmos seu perfil de risco:
            </p>

            <div className="space-y-6">
              {RISK_QUESTIONS.map((question, index) => (
                <div key={question.id} className="pb-6 border-b border-gray-200">
                  <p className="font-medium text-gray-900 mb-3">
                    {question.question}
                  </p>
                  <RadioGroup
                    options={question.options}
                    value={riskAnswers[index]}
                    onChange={(value) => {
                      const newAnswers = [...riskAnswers];
                      newAnswers[index] = value as number;
                      setRiskAnswers(newAnswers);
                    }}
                    name={`risk_${question.id}`}
                  />
                </div>
              ))}

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary-900">
                  Seu perfil de risco: {LABELS.riskClassification[calculateRiskTolerance().classification]}
                </p>
                <p className="text-sm text-primary-700 mt-1">
                  Score: {calculateRiskTolerance().score}/100
                </p>
              </div>
            </div>
          </div>

          {/* 4. Flexibilidade Consumo vs Herança */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              4. Prioridade: Consumo vs Herança
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Em relação a deixar herança (para pessoas ou causas), qual frase
              mais se aproxima de você?
            </p>
            <Controller
              name="bequestFlexibility"
              control={control}
              rules={{ required: 'Selecione uma opção' }}
              render={({ field }) => (
                <RadioGroup
                  options={bequestFlexibilityOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.bequestFlexibility?.message}
                  name="bequestFlexibility"
                  required
                />
              )}
            />

            <div className="mt-6">
              <Slider
                label="Quão forte é essa preferência?"
                min={1}
                max={5}
                value={bequestStrength}
                onChange={setBequestStrength}
                labels={{ min: 'Fraca', max: 'Muito forte' }}
              />
            </div>
          </div>

          {/* 5. Força do Motivo de Herança */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              5. Motivação para Herança
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Se você tivesse que priorizar, o que é mais importante?
            </p>
            <Controller
              name="bequestMotive"
              control={control}
              rules={{ required: 'Selecione uma opção' }}
              render={({ field }) => (
                <RadioGroup
                  options={bequestMotiveOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.bequestMotive?.message}
                  name="bequestMotive"
                  required
                />
              )}
            />
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}
