import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Input, RadioGroup } from '../../components/ui';
import { LifeGoals } from '../../types';
import { LABELS } from '../../constants';
import { useState } from 'react';

export function LifeGoalsScreen() {
  const navigate = useNavigate();
  const { state, updateLifeGoals, nextStep } = useApp();
  const [wantsSuggestion, setWantsSuggestion] = useState(
    state.userProfile.lifeGoals?.wantsSystemSuggestion ?? false
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LifeGoals>({
    defaultValues: state.userProfile.lifeGoals || {},
  });

  const onSubmit = (data: LifeGoals) => {
    updateLifeGoals({ ...data, wantsSystemSuggestion: wantsSuggestion });
    nextStep();
    navigate('/onboarding/career');
  };

  const primaryGoalOptions = Object.entries(LABELS.primaryGoal).map(
    ([value, label]) => ({ value, label })
  );

  const flexibilityOptions = Object.entries(LABELS.retirementAgeFlexibility).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <OnboardingLayout
      currentStep={2}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/personal')}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Contexto e Objetivos
        </h2>
        <p className="text-gray-600 mb-8">
          Entender seus objetivos nos ajuda a criar um plano alinhado com o que
          é importante para você.
        </p>

        <form className="space-y-8">
          <Controller
            name="primaryGoal"
            control={control}
            rules={{ required: 'Selecione um objetivo' }}
            render={({ field }) => (
              <RadioGroup
                label="Qual é o seu principal objetivo com este plano?"
                options={primaryGoalOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.primaryGoal?.message}
                name="primaryGoal"
                required
              />
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Idade de aposentadoria
            </h3>

            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                id="wantsSuggestion"
                checked={wantsSuggestion}
                onChange={(e) => setWantsSuggestion(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="wantsSuggestion" className="text-sm text-gray-700">
                Ainda não sei / quero que o sistema sugira
              </label>
            </div>

            {!wantsSuggestion && (
              <Input
                label="Em que idade você gostaria idealmente de se aposentar?"
                type="number"
                min="40"
                max="100"
                {...register('targetRetirementAge', {
                  required: !wantsSuggestion ? 'Campo obrigatório' : false,
                  min: { value: 40, message: 'Idade mínima: 40 anos' },
                  max: { value: 100, message: 'Idade máxima: 100 anos' },
                  valueAsNumber: true,
                })}
                error={errors.targetRetirementAge?.message}
                helperText="Idade em que gostaria de parar de trabalhar por obrigação"
              />
            )}

            <Controller
              name="retirementAgeFlexibility"
              control={control}
              rules={{ required: 'Selecione uma opção' }}
              render={({ field }) => (
                <RadioGroup
                  label="Quão flexível é essa idade para você?"
                  options={flexibilityOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.retirementAgeFlexibility?.message}
                  name="retirementAgeFlexibility"
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
