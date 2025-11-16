import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OnboardingLayout } from '../../components/ui/OnboardingLayout';
import { Input } from '../../components/ui';
import { FinancialAssets } from '../../types';

export function AssetsScreen() {
  const navigate = useNavigate();
  const { state, updateFinancialAssets, nextStep } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialAssets>({
    defaultValues: state.userProfile.financialAssets || {
      checkingAccount: 0,
      fixedIncome: 0,
      multimercado: 0,
      stocks: 0,
      retirement: 0,
      other: 0,
      primaryResidence: 0,
      investmentProperties: 0,
      businessOwnership: 0,
    },
  });

  const onSubmit = (data: FinancialAssets) => {
    updateFinancialAssets(data);
    nextStep();
    navigate('/onboarding/liabilities');
  };

  return (
    <OnboardingLayout
      currentStep={4}
      onNext={handleSubmit(onSubmit)}
      onPrev={() => navigate('/onboarding/career')}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Ativos Financeiros e Imóveis
        </h2>
        <p className="text-gray-600 mb-8">
          Informe seus ativos atuais. Isso nos ajuda a calcular seu patrimônio
          líquido e definir a alocação ideal.
        </p>

        <form className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              💡 <strong>Dica:</strong> Se você não tem um tipo específico de
              ativo, basta deixar o valor em 0 (zero).
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Ativos Financeiros
          </h3>

          <Input
            label="Conta corrente / Reserva de emergência"
            type="number"
            min="0"
            step="0.01"
            {...register('checkingAccount', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.checkingAccount?.message}
            helperText="Dinheiro disponível imediatamente (R$)"
            required
          />

          <Input
            label="Renda Fixa (CDB, Tesouro Direto, etc.)"
            type="number"
            min="0"
            step="0.01"
            {...register('fixedIncome', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.fixedIncome?.message}
            helperText="Total investido em títulos de renda fixa (R$)"
            required
          />

          <Input
            label="Fundos Multimercado"
            type="number"
            min="0"
            step="0.01"
            {...register('multimercado', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.multimercado?.message}
            helperText="Fundos que investem em múltiplas classes de ativos (R$)"
            required
          />

          <Input
            label="Ações e ETFs"
            type="number"
            min="0"
            step="0.01"
            {...register('stocks', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.stocks?.message}
            helperText="Total em ações, fundos de ações e ETFs (R$)"
            required
          />

          <Input
            label="Previdência Privada / Planos com benefício fiscal"
            type="number"
            min="0"
            step="0.01"
            {...register('retirement', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.retirement?.message}
            helperText="PGBL, VGBL e outros planos de previdência (R$)"
            required
          />

          <Input
            label="Outros investimentos"
            type="number"
            min="0"
            step="0.01"
            {...register('other', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.other?.message}
            helperText="Criptomoedas, P2P lending, etc. (R$)"
            required
          />

          <Input
            label="Descrição dos outros investimentos"
            {...register('otherDescription')}
            placeholder="Ex: Bitcoin, lending P2P..."
            helperText="Opcional - apenas se tiver preenchido 'Outros investimentos'"
          />

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Imóveis
          </h3>

          <Input
            label="Imóvel de moradia (residência principal)"
            type="number"
            min="0"
            step="0.01"
            {...register('primaryResidence', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.primaryResidence?.message}
            helperText="Valor estimado do imóvel onde você mora (R$)"
            required
          />

          <Input
            label="Imóveis para investimento"
            type="number"
            min="0"
            step="0.01"
            {...register('investmentProperties', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.investmentProperties?.message}
            helperText="Valor total de imóveis de aluguel ou investimento (R$)"
            required
          />

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Outras Posições
          </h3>

          <Input
            label="Participação em empresas"
            type="number"
            min="0"
            step="0.01"
            {...register('businessOwnership', {
              required: 'Campo obrigatório',
              min: { value: 0, message: 'Valor deve ser positivo' },
              valueAsNumber: true,
            })}
            error={errors.businessOwnership?.message}
            helperText="Valor estimado da sua participação em negócios (R$)"
            required
          />

          <Input
            label="Descrição da participação"
            {...register('businessDescription')}
            placeholder="Ex: Sócio de startup, franquia..."
            helperText="Opcional - apenas se tiver participação em empresas"
          />
        </form>
      </div>
    </OnboardingLayout>
  );
}
