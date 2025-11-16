import { UserProfile, FinancialPlan } from '../types';

export const mockPersonalData = {
  name: 'João da Silva',
  birthDate: '1985-05-15',
  biologicalSex: 'male' as const,
  maritalStatus: 'married' as const,
  dependents: 2,
};

export const mockLifeGoals = {
  primaryGoal: 'retirement' as const,
  targetRetirementAge: 65,
  retirementAgeFlexibility: 'reasonably_flexible' as const,
  wantsSystemSuggestion: false,
};

export const mockCareerData = {
  profession: 'Engenheiro de Software',
  sector: 'technology' as const,
  monthlyNetIncome: 15000,
  annualBonus: 30000,
  yearsOfCareer: 15,
  incomeStability: 4 as const,
  incomeGrowthExpectation: 'slow_growth' as const,
};

export const mockFinancialAssets = {
  checkingAccount: 50000,
  fixedIncome: 100000,
  multimercado: 50000,
  stocks: 150000,
  retirement: 200000,
  other: 0,
  primaryResidence: 500000,
  investmentProperties: 0,
  businessOwnership: 0,
};

export const mockLiabilitiesAndExpenses = {
  mortgageBalance: 300000,
  mortgageMonthlyPayment: 3000,
  mortgageRemainingYears: 15,
  otherLiabilities: [],
  monthlyEssentialExpenses: 8000,
};

export const mockPecuniaryPreferences = {
  timePreference: 'balanced' as const,
  consumptionSmoothing: 'moderate_variation' as const,
  riskTolerance: {
    score: 65,
    classification: 'moderate' as const,
  },
  bequestFlexibility: 'balanced' as const,
  bequestStrength: 3 as const,
  bequestMotive: 'balanced' as const,
};

export const mockNonPecuniaryPreferences = {
  esgPreference: 'avoid_controversial' as const,
};

export const mockUserProfile: Partial<UserProfile> = {
  personalData: mockPersonalData,
  lifeGoals: mockLifeGoals,
  careerData: mockCareerData,
  financialAssets: mockFinancialAssets,
  liabilitiesAndExpenses: mockLiabilitiesAndExpenses,
  pecuniaryPreferences: mockPecuniaryPreferences,
  nonPecuniaryPreferences: mockNonPecuniaryPreferences,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  onboardingCompleted: true,
};

export const mockFinancialPlan: FinancialPlan = {
  economicBalance: {
    humanCapital: 2500000,
    financialAssets: 550000,
    realEstate: 500000,
    totalAssets: 3550000,
    consumptionLiability: 1800000,
    debts: 300000,
    totalLiabilities: 2100000,
    economicNetWorth: 1450000,
  },
  lifeProjection: [
    {
      age: 40,
      year: 2025,
      humanCapital: 2500000,
      financialCapital: 550000,
      totalWealth: 3050000,
      recommendedConsumption: 122000,
      recommendedSavings: 58000,
    },
    {
      age: 45,
      year: 2030,
      humanCapital: 2000000,
      financialCapital: 800000,
      totalWealth: 2800000,
      recommendedConsumption: 112000,
      recommendedSavings: 68000,
    },
  ],
  currentSavingsRate: 15,
  recommendedSavingsRate: 20,
  targetRetirementAge: 65,
  assetAllocation: {
    riskAssets: 70,
    defensiveAssets: 30,
    justification: 'Recomendamos 70% em ativos de risco com base na sua idade, tolerância a risco e perfil de capital humano.',
  },
  qualitativeIndicators: {
    lifeInsuranceNeed: 'high' as const,
    lifeInsuranceAmount: 1750000,
    annuityRecommendation: 'Renda vitalícia pode ser considerada futuramente, próximo à aposentadoria.',
  },
  generatedAt: '2024-01-01T00:00:00.000Z',
};
