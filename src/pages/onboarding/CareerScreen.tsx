import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Input, Select, RadioGroup, Slider } from '../../components/ui';
import { CareerData } from '../../types';
import { LABELS } from '../../constants';

export function CareerScreen() {
  const navigate = useNavigate();
  const { state, updateCareerData, nextStep } = useApp();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CareerData>({
    defaultValues: state.userProfile.careerData || {
      incomeStability: 3,
    },
  });

  const onSubmit = (data: CareerData) => {
    updateCareerData(data);
    nextStep();
    navigate('/onboarding/assets');
  };

  const sectorOptions = Object.entries(LABELS.sector).map(
    ([value, label]) => ({ value, label })
  );

  const growthOptions = Object.entries(LABELS.incomeGrowthExpectation).map(
    ([value, label]) => ({ value, label })
  );

  const incomeStability = watch('incomeStability', 3);

  return (
    <OnboardingLayout
      currentStep={3}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/goals')}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Carreira e Renda
        </h2>
        <p className="text-gray-600 mb-8">
          Informações sobre sua carreira nos ajudam a estimar seu capital humano
          - o valor presente da sua renda futura.
        </p>

        <form className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Situação Atual
          </h3>

          <Input
            label="Profissão"
            {...register('profession', { required: 'Campo obrigatório' })}
            error={errors.profession?.message}
            placeholder="Ex: Engenheiro de Software, Médico, Professor..."
            required
          />

          <Select
            label="Setor de atuação"
            options={sectorOptions}
            {...register('sector', { required: 'Campo obrigatório' })}
            error={errors.sector?.message}
            placeholder="Selecione"
            required
          />

          <Input
            label="Renda líquida mensal atual"
            type="number"
            min="0"
            step="0.01"
            {...register('monthlyNetIncome', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.monthlyNetIncome?.message}
            helperText="Valor que você recebe mensalmente após impostos (R$)"
            required
          />

          <Input
            label="Renda variável (bônus/comissão) média anual"
            type="number"
            min="0"
            step="0.01"
            {...register('annualBonus', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.annualBonus?.message}
            helperText="Se não recebe bônus/comissão, digite 0 (R$)"
            required
          />

          <Input
            label="Tempo de carreira"
            type="number"
            min="0"
            max="60"
            {...register('yearsOfCareer', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              max: { value: 60, message: 'Valor muito alto' },
              valueAsNumber: true,
            })}
            error={errors.yearsOfCareer?.message}
            helperText="Anos trabalhando na sua área/profissão"
            required
          />

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Perspectiva Futura
          </h3>

          <Controller
            name="incomeStability"
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Slider
                label="Quão estável é a sua renda?"
                min={1}
                max={5}
                value={field.value}
                onChange={field.onChange}
                labels={{ min: 'Muito instável', max: 'Muito estável' }}
                helperText={
                  incomeStability === 1
                    ? 'Renda altamente variável (autônomo, comissionado)'
                    : incomeStability === 5
                    ? 'Renda muito estável (servidor público, CLT estável)'
                    : 'Renda moderadamente estável'
                }
              />
            )}
          />

          <Controller
            name="incomeGrowthExpectation"
            control={control}
            rules={{ required: 'Selecione uma opção' }}
            render={({ field }) => (
              <RadioGroup
                label="Qual a sua expectativa de crescimento real da renda ao longo da carreira?"
                options={growthOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.incomeGrowthExpectation?.message}
                name="incomeGrowthExpectation"
                required
              />
            )}
          />
        </form>
      </div>
    </OnboardingLayout>
  );
}
