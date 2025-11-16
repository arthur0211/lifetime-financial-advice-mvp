import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Input, Select } from '../../components/ui';
import { PersonalData } from '../../types';
import { LABELS } from '../../constants';

export function PersonalDataScreen() {
  const navigate = useNavigate();
  const { state, updatePersonalData, nextStep } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    defaultValues: state.userProfile.personalData || {},
  });

  const onSubmit = (data: PersonalData) => {
    updatePersonalData(data);
    nextStep();
    navigate('/onboarding/goals');
  };

  const maritalStatusOptions = Object.entries(LABELS.maritalStatus).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <OnboardingLayout
      currentStep={1}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/welcome')}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Dados Pessoais
        </h2>
        <p className="text-gray-600 mb-8">
          Vamos começar conhecendo você melhor. Essas informações nos ajudam a
          personalizar suas recomendações.
        </p>

        <form className="space-y-6">
          <Input
            label="Nome completo"
            {...register('name', { required: 'Nome é obrigatório' })}
            error={errors.name?.message}
            placeholder="Seu nome"
            required
          />

          <Input
            label="Data de nascimento"
            type="date"
            {...register('birthDate', { required: 'Data de nascimento é obrigatória' })}
            error={errors.birthDate?.message}
            required
          />

          <Select
            label="Sexo biológico"
            options={[
              { value: 'male', label: 'Masculino' },
              { value: 'female', label: 'Feminino' },
            ]}
            {...register('biologicalSex', { required: 'Campo obrigatório' })}
            error={errors.biologicalSex?.message}
            placeholder="Selecione"
            required
          />

          <Select
            label="Estado civil"
            options={maritalStatusOptions}
            {...register('maritalStatus', { required: 'Campo obrigatório' })}
            error={errors.maritalStatus?.message}
            placeholder="Selecione"
            required
          />

          <div>
            <Input
              label="Número de dependentes econômicos"
              type="number"
              min="0"
              {...register('dependents', {
                required: 'Campo obrigatório',
                min: { value: 0, message: 'Valor não pode ser negativo' },
                valueAsNumber: true,
              })}
              error={errors.dependents?.message}
              helperText="Pessoas que dependem financeiramente de você (filhos, pais, etc.)"
              required
            />
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}
