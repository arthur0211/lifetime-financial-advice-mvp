// ============================================================================
// TIPOS PRINCIPAIS - LIFETIME FINANCIAL ADVICE MVP
// ============================================================================

// ----------------------------------------------------------------------------
// Dados Pessoais (Tela 2)
// ----------------------------------------------------------------------------
export interface PersonalData {
  name: string;
  birthDate: string;
  biologicalSex: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  dependents: number;
}

// ----------------------------------------------------------------------------
// Contexto e Objetivos (Tela 3)
// ----------------------------------------------------------------------------
export interface LifeGoals {
  primaryGoal: 'retirement' | 'financial_independence' | 'family_protection' | 'optimize_allocation' | 'other';
  primaryGoalOther?: string;
  targetRetirementAge?: number;
  retirementAgeFlexibility: 'very_flexible' | 'reasonably_flexible' | 'not_very_flexible' | 'inflexible';
  wantsSystemSuggestion: boolean;
}

// ----------------------------------------------------------------------------
// Carreira e Renda (Tela 4)
// ----------------------------------------------------------------------------
export interface CareerData {
  profession: string;
  sector: 'public' | 'financial_services' | 'technology' | 'health' | 'education' | 'industry' | 'other';
  sectorOther?: string;
  monthlyNetIncome: number;
  annualBonus: number;
  yearsOfCareer: number;
  incomeStability: 1 | 2 | 3 | 4 | 5; // 1 = muito instável, 5 = muito estável
  incomeGrowthExpectation: 'decreasing' | 'stable' | 'slow_growth' | 'fast_growth';
}

// ----------------------------------------------------------------------------
// Ativos Financeiros (Tela 5)
// ----------------------------------------------------------------------------
export interface FinancialAssets {
  checkingAccount: number;
  fixedIncome: number;
  multimercado: number;
  stocks: number;
  retirement: number;
  other: number;
  otherDescription?: string;

  // Imóveis
  primaryResidence: number;
  investmentProperties: number;

  // Outras posições
  businessOwnership: number;
  businessDescription?: string;
}

// ----------------------------------------------------------------------------
// Passivos e Gastos (Tela 6)
// ----------------------------------------------------------------------------
export interface Liability {
  type: 'mortgage' | 'credit_card' | 'personal_loan' | 'auto_loan' | 'other';
  typeOther?: string;
  balance: number;
  monthlyPayment: number;
  remainingYears: number;
}

export interface LiabilitiesAndExpenses {
  mortgageBalance: number;
  mortgageMonthlyPayment: number;
  mortgageRemainingYears: number;

  otherLiabilities: Liability[];

  monthlyEssentialExpenses: number; // Gastos obrigatórios
}

// ----------------------------------------------------------------------------
// Preferências Pecuniárias (Tela 7)
// ----------------------------------------------------------------------------

// 7.1 - Impaciência para consumo
export type TimePreference = 'consume_more_now' | 'balanced' | 'consume_more_later';

// 7.2 - Suavização de consumo (EOIS)
export type ConsumptionSmoothing = 'very_stable' | 'moderate_variation' | 'high_variation';

// 7.3 - Tolerância a risco
export interface RiskTolerance {
  score: number; // 0-100
  classification: 'conservative' | 'moderate' | 'aggressive';
}

// 7.4 - Flexibilidade consumo vs herança
export type BequestFlexibility = 'maximize_consumption' | 'balanced' | 'prioritize_bequest';
export type BequestStrength = 1 | 2 | 3 | 4 | 5;

// 7.5 - Força do motivo de herança
export type BequestMotive = 'maximize_own_consumption' | 'balanced' | 'ensure_minimum_bequest';

export interface PecuniaryPreferences {
  timePreference: TimePreference;
  consumptionSmoothing: ConsumptionSmoothing;
  riskTolerance: RiskTolerance;
  bequestFlexibility: BequestFlexibility;
  bequestStrength: BequestStrength;
  bequestMotive: BequestMotive;
}

// ----------------------------------------------------------------------------
// Preferências Não-Pecuniárias (Tela 8)
// ----------------------------------------------------------------------------
export type ESGPreference = 'no_preference' | 'avoid_controversial' | 'prioritize_esg';

export interface NonPecuniaryPreferences {
  esgPreference: ESGPreference;
}

// ----------------------------------------------------------------------------
// Estado Completo do Usuário
// ----------------------------------------------------------------------------
export interface UserProfile {
  personalData: PersonalData;
  lifeGoals: LifeGoals;
  careerData: CareerData;
  financialAssets: FinancialAssets;
  liabilitiesAndExpenses: LiabilitiesAndExpenses;
  pecuniaryPreferences: PecuniaryPreferences;
  nonPecuniaryPreferences: NonPecuniaryPreferences;

  // Metadata
  createdAt: string;
  updatedAt: string;
  onboardingCompleted: boolean;
}

// ----------------------------------------------------------------------------
// Cálculos e Resultados
// ----------------------------------------------------------------------------

// Balanço Econômico
export interface EconomicBalance {
  humanCapital: number;
  financialAssets: number;
  realEstate: number;
  totalAssets: number;

  consumptionLiability: number;
  debts: number;
  totalLiabilities: number;

  economicNetWorth: number;
}

// Projeção ao longo do tempo
export interface LifeProjection {
  age: number;
  year: number;
  humanCapital: number;
  financialCapital: number;
  totalWealth: number;
  recommendedConsumption: number;
  recommendedSavings: number;
}

// Alocação de ativos recomendada
export interface AssetAllocation {
  riskAssets: number; // percentual (0-100)
  defensiveAssets: number; // percentual (0-100)
  justification: string;
}

// Indicadores qualitativos
export interface QualitativeIndicators {
  lifeInsuranceNeed: 'low' | 'medium' | 'high';
  lifeInsuranceAmount?: number;
  annuityRecommendation: string;
}

// Plano Financeiro Completo
export interface FinancialPlan {
  economicBalance: EconomicBalance;
  lifeProjection: LifeProjection[];
  currentSavingsRate: number;
  recommendedSavingsRate: number;
  targetRetirementAge: number;
  assetAllocation: AssetAllocation;
  qualitativeIndicators: QualitativeIndicators;

  generatedAt: string;
}

// ----------------------------------------------------------------------------
// Estado da Aplicação
// ----------------------------------------------------------------------------
export interface AppState {
  currentStep: number;
  userProfile: Partial<UserProfile>;
  financialPlan?: FinancialPlan;
}
