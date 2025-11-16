import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { RadioGroup } from '../../components/ui';
import { NonPecuniaryPreferences } from '../../types';
import { LABELS } from '../../constants';
import { Leaf } from 'lucide-react';

export function ESGScreen() {
  const navigate = useNavigate();
  const { state, updateNonPecuniaryPreferences, nextStep } = useApp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NonPecuniaryPreferences>({
    defaultValues: state.userProfile.nonPecuniaryPreferences || {},
  });

  const onSubmit = (data: NonPecuniaryPreferences) => {
    updateNonPecuniaryPreferences(data);
    nextStep();
    navigate('/onboarding/summary');
  };

  const esgOptions = Object.entries(LABELS.esgPreference).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <OnboardingLayout
      currentStep={7}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/preferences')}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="w-12 h-12 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Preferências Não-Pecuniárias
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Você se importa em alinhar seus investimentos a temas como meio
          ambiente, impacto social e governança (ESG)?
        </p>

        <form className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">
              O que é ESG?
            </h3>
            <p className="text-sm text-green-800">
              ESG significa Environmental (Ambiental), Social e Governance
              (Governança). Investimentos ESG buscam alinhar retorno financeiro
              com impacto positivo no mundo, evitando empresas controversas e
              priorizando práticas sustentáveis.
            </p>
          </div>

          <Controller
            name="esgPreference"
            control={control}
            rules={{ required: 'Selecione uma opção' }}
            render={({ field }) => (
              <RadioGroup
                label="Qual é a sua preferência em relação a ESG?"
                options={esgOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.esgPreference?.message}
                name="esgPreference"
                required
              />
            )}
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> No MVP, esta preferência será apenas
              registrada e exibida como um indicador. Em versões futuras,
              influenciará diretamente a seleção de produtos de investimento.
            </p>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}
