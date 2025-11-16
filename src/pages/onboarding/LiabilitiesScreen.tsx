import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Input } from '../../components/ui';
import { LiabilitiesAndExpenses } from '../../types';

export function LiabilitiesScreen() {
  const navigate = useNavigate();
  const { state, updateLiabilities, nextStep } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LiabilitiesAndExpenses>({
    defaultValues: state.userProfile.liabilitiesAndExpenses || {
      mortgageBalance: 0,
      mortgageMonthlyPayment: 0,
      mortgageRemainingYears: 0,
      otherLiabilities: [],
      monthlyEssentialExpenses: 0,
    },
  });

  const onSubmit = (data: LiabilitiesAndExpenses) => {
    updateLiabilities(data);
    nextStep();
    navigate('/onboarding/preferences');
  };

  return (
    <OnboardingLayout
      currentStep={5}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/assets')}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Passivos e Gastos Obrigatórios
        </h2>
        <p className="text-gray-600 mb-8">
          Informações sobre dívidas e gastos essenciais nos ajudam a calcular seu
          passivo de consumo obrigatório.
        </p>

        <form className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Financiamento Imobiliário
          </h3>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              💡 Se você não tem financiamento imobiliário, deixe todos os valores
              em 0 (zero).
            </p>
          </div>

          <Input
            label="Saldo devedor do financiamento"
            type="number"
            min="0"
            step="0.01"
            {...register('mortgageBalance', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.mortgageBalance?.message}
            helperText="Quanto você ainda deve do financiamento (R$)"
            required
          />

          <Input
            label="Parcela mensal"
            type="number"
            min="0"
            step="0.01"
            {...register('mortgageMonthlyPayment', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.mortgageMonthlyPayment?.message}
            helperText="Valor da parcela mensal do financiamento (R$)"
            required
          />

          <Input
            label="Prazo restante"
            type="number"
            min="0"
            max="50"
            {...register('mortgageRemainingYears', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              max: { value: 50, message: 'Prazo muito longo' },
              valueAsNumber: true,
            })}
            error={errors.mortgageRemainingYears?.message}
            helperText="Quantos anos faltam para quitar (anos)"
            required
          />

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Gastos Obrigatórios (Consumo Não Discricionário)
          </h3>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-900 mb-2">
              <strong>O que incluir:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-yellow-900 space-y-1">
              <li>Moradia (aluguel, condomínio, IPTU)</li>
              <li>Alimentação básica</li>
              <li>Transporte essencial</li>
              <li>Plano de saúde</li>
              <li>Educação obrigatória (escola dos filhos)</li>
              <li>Outras despesas fixas essenciais</li>
            </ul>
            <p className="text-sm text-yellow-900 mt-2">
              <strong>NÃO incluir:</strong> Lazer, viagens, hobbies, gastos
              discricionários
            </p>
          </div>

          <Input
            label="Gastos mensais essenciais"
            type="number"
            min="0"
            step="0.01"
            {...register('monthlyEssentialExpenses', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.monthlyEssentialExpenses?.message}
            helperText="Total mensal de gastos fixos e essenciais (R$)"
            required
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> Para simplificar este MVP, estamos considerando
              apenas o financiamento imobiliário. Outras dívidas podem ser
              adicionadas em versões futuras.
            </p>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}
