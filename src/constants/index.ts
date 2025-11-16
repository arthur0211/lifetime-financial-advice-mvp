// ============================================================================
// CONSTANTES - LIFETIME FINANCIAL ADVICE MVP
// ============================================================================

// Taxas e parâmetros financeiros
export const FINANCIAL_CONSTANTS = {
  INFLATION_RATE: 0.04, // 4% ao ano (estimativa)
  RISK_FREE_RATE: 0.06, // 6% ao ano (títulos)
  EQUITY_RETURN: 0.10, // 10% ao ano (esperado para ações)
  EQUITY_VOLATILITY: 0.18, // 18% (volatilidade ações)
  MORTALITY_DISCOUNT: 0.02, // 2% (ajuste por probabilidade de morte)
} as const;

// Tábuas de mortalidade simplificadas (expectativa de vida)
export const LIFE_EXPECTANCY = {
  male: 75,
  female: 82,
} as const;

// Labels para os formulários
export const LABELS = {
  maritalStatus: {
    single: 'Solteiro(a)',
    married: 'Casado(a)/União estável',
    divorced: 'Divorciado(a)',
    widowed: 'Viúvo(a)',
  },
  primaryGoal: {
    retirement: 'Garantir aposentadoria confortável',
    financial_independence: 'Atingir independência financeira',
    family_protection: 'Proteger família (seguro de vida / herança)',
    optimize_allocation: 'Otimizar alocação de investimentos ao longo da vida',
    other: 'Outro',
  },
  retirementAgeFlexibility: {
    very_flexible: 'Muito flexível',
    reasonably_flexible: 'Razoavelmente flexível',
    not_very_flexible: 'Pouco flexível',
    inflexible: 'Nada flexível',
  },
  sector: {
    public: 'Setor público',
    financial_services: 'Serviços financeiros',
    technology: 'Tecnologia',
    health: 'Saúde',
    education: 'Educação',
    industry: 'Indústria',
    other: 'Outros',
  },
  incomeGrowthExpectation: {
    decreasing: 'Cai com o tempo',
    stable: 'Fica estável',
    slow_growth: 'Cresce devagar',
    fast_growth: 'Cresce rápido',
  },
  timePreference: {
    consume_more_now: 'Consumir mais agora',
    balanced: 'Equilibrado',
    consume_more_later: 'Consumir mais depois',
  },
  consumptionSmoothing: {
    very_stable: 'Muito estável ao longo do tempo',
    moderate_variation: 'Oscilação moderada',
    high_variation: 'Pode oscilar bastante',
  },
  riskClassification: {
    conservative: 'Conservador',
    moderate: 'Moderado',
    aggressive: 'Arrojado',
  },
  bequestFlexibility: {
    maximize_consumption: 'Maximizar meu padrão de vida',
    balanced: 'Equilibrado entre consumo e herança',
    prioritize_bequest: 'Priorizar deixar herança',
  },
  bequestMotive: {
    maximize_own_consumption: 'Garantir ao máximo meu consumo',
    balanced: 'Meio termo',
    ensure_minimum_bequest: 'Garantir valor mínimo de herança',
  },
  esgPreference: {
    no_preference: 'Não me importo',
    avoid_controversial: 'Evitar setores controversos',
    prioritize_esg: 'Priorizar opções ESG',
  },
  liabilityType: {
    mortgage: 'Financiamento imobiliário',
    credit_card: 'Cartão de crédito',
    personal_loan: 'Empréstimo pessoal',
    auto_loan: 'Financiamento de automóvel',
    other: 'Outro',
  },
} as const;

// Perguntas do questionário de risco
export const RISK_QUESTIONS = [
  {
    id: 1,
    question: 'Se sua carteira de investimentos caísse 20% em um mês, você:',
    options: [
      { value: 0, label: 'Venderia tudo imediatamente' },
      { value: 25, label: 'Reduziria significativamente a exposição a risco' },
      { value: 50, label: 'Manteria os investimentos sem mexer' },
      { value: 75, label: 'Aproveitaria para comprar mais ativos de risco' },
      { value: 100, label: 'Investiria todo dinheiro disponível em ativos de risco' },
    ],
  },
  {
    id: 2,
    question: 'Qual retorno você esperaria de seus investimentos em um ano típico?',
    options: [
      { value: 0, label: 'Até 5% ao ano (preservação de capital)' },
      { value: 33, label: 'Entre 5% e 8% ao ano' },
      { value: 66, label: 'Entre 8% e 12% ao ano' },
      { value: 100, label: 'Acima de 12% ao ano' },
    ],
  },
  {
    id: 3,
    question: 'Qual sua experiência com investimentos?',
    options: [
      { value: 0, label: 'Nenhuma - só poupança/conta corrente' },
      { value: 33, label: 'Básica - renda fixa e fundos conservadores' },
      { value: 66, label: 'Intermediária - ações, fundos multimercado' },
      { value: 100, label: 'Avançada - derivativos, alavancagem, etc.' },
    ],
  },
] as const;

// Passos do onboarding
export const ONBOARDING_STEPS = [
  { id: 0, name: 'Boas-vindas', path: '/onboarding/welcome' },
  { id: 1, name: 'Dados Pessoais', path: '/onboarding/personal' },
  { id: 2, name: 'Objetivos', path: '/onboarding/goals' },
  { id: 3, name: 'Carreira', path: '/onboarding/career' },
  { id: 4, name: 'Ativos', path: '/onboarding/assets' },
  { id: 5, name: 'Passivos', path: '/onboarding/liabilities' },
  { id: 6, name: 'Preferências Financeiras', path: '/onboarding/preferences' },
  { id: 7, name: 'Preferências ESG', path: '/onboarding/esg' },
  { id: 8, name: 'Resumo', path: '/onboarding/summary' },
  { id: 9, name: 'Plano', path: '/onboarding/plan' },
] as const;

// Mensagens de validação
export const VALIDATION_MESSAGES = {
  required: 'Este campo é obrigatório',
  email: 'Email inválido',
  minAge: 'Idade mínima: 18 anos',
  maxAge: 'Idade máxima: 100 anos',
  positiveNumber: 'O valor deve ser positivo',
  invalidDate: 'Data inválida',
} as const;
