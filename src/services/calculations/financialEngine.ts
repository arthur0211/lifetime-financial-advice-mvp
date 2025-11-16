import {
  UserProfile,
  FinancialPlan,
  EconomicBalance,
  LifeProjection,
  AssetAllocation,
  QualitativeIndicators,
} from '../../types';
import { FINANCIAL_CONSTANTS, LIFE_EXPECTANCY } from '../../constants';

/**
 * Motor de cálculos financeiros para o plano de vida
 * Implementa versão simplificada do modelo life-cycle
 */

// ============================================================================
// CÁLCULO DO CAPITAL HUMANO
// ============================================================================

function calculateHumanCapital(profile: Partial<UserProfile>): number {
  if (!profile.personalData || !profile.careerData) return 0;

  const birthDate = new Date(profile.personalData.birthDate);
  const currentAge = new Date().getFullYear() - birthDate.getFullYear();

  const retirementAge =
    profile.lifeGoals?.targetRetirementAge ||
    (profile.personalData.biologicalSex === 'male' ? 65 : 62);

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);

  if (yearsToRetirement === 0) return 0;

  // Renda anual atual
  const annualIncome =
    profile.careerData.monthlyNetIncome * 12 + profile.careerData.annualBonus;

  // Taxa de crescimento da renda baseada na expectativa
  let growthRate = 0;
  switch (profile.careerData.incomeGrowthExpectation) {
    case 'decreasing':
      growthRate = -0.01;
      break;
    case 'stable':
      growthRate = 0;
      break;
    case 'slow_growth':
      growthRate = 0.02;
      break;
    case 'fast_growth':
      growthRate = 0.04;
      break;
    default:
      growthRate = 0.02;
  }

  // Taxa de desconto ajustada por risco
  const stabilityAdjustment = ((5 - profile.careerData.incomeStability) / 5) * 0.02;
  const discountRate =
    FINANCIAL_CONSTANTS.RISK_FREE_RATE +
    FINANCIAL_CONSTANTS.MORTALITY_DISCOUNT +
    stabilityAdjustment;

  // Valor presente da renda futura
  let humanCapital = 0;
  for (let t = 1; t <= yearsToRetirement; t++) {
    const futureIncome = annualIncome * Math.pow(1 + growthRate, t);
    humanCapital += futureIncome / Math.pow(1 + discountRate, t);
  }

  return humanCapital;
}

// ============================================================================
// CÁLCULO DO PASSIVO DE CONSUMO OBRIGATÓRIO
// ============================================================================

function calculateConsumptionLiability(profile: Partial<UserProfile>): number {
  if (!profile.personalData || !profile.liabilitiesAndExpenses) return 0;

  const birthDate = new Date(profile.personalData.birthDate);
  const currentAge = new Date().getFullYear() - birthDate.getFullYear();

  const lifeExpectancy =
    LIFE_EXPECTANCY[profile.personalData.biologicalSex] || 80;
  const yearsRemaining = Math.max(0, lifeExpectancy - currentAge);

  const annualExpenses = profile.liabilitiesAndExpenses.monthlyEssentialExpenses * 12;

  // Valor presente dos gastos futuros
  let liabilityPV = 0;
  const discountRate =
    FINANCIAL_CONSTANTS.RISK_FREE_RATE + FINANCIAL_CONSTANTS.MORTALITY_DISCOUNT;

  for (let t = 1; t <= yearsRemaining; t++) {
    const futureExpenses = annualExpenses * Math.pow(1 + FINANCIAL_CONSTANTS.INFLATION_RATE, t);
    liabilityPV += futureExpenses / Math.pow(1 + discountRate, t);
  }

  return liabilityPV;
}

// ============================================================================
// BALANÇO ECONÔMICO
// ============================================================================

function buildEconomicBalance(profile: Partial<UserProfile>): EconomicBalance {
  const humanCapital = calculateHumanCapital(profile);
  const consumptionLiability = calculateConsumptionLiability(profile);

  const assets = profile.financialAssets;
  const financialAssets = assets
    ? assets.checkingAccount +
      assets.fixedIncome +
      assets.multimercado +
      assets.stocks +
      assets.retirement +
      assets.other
    : 0;

  const realEstate = assets
    ? assets.primaryResidence + assets.investmentProperties + assets.businessOwnership
    : 0;

  const totalAssets = humanCapital + financialAssets + realEstate;

  const liabilities = profile.liabilitiesAndExpenses;
  const debts = liabilities ? liabilities.mortgageBalance : 0;
  const totalLiabilities = consumptionLiability + debts;

  const economicNetWorth = totalAssets - totalLiabilities;

  return {
    humanCapital,
    financialAssets,
    realEstate,
    totalAssets,
    consumptionLiability,
    debts,
    totalLiabilities,
    economicNetWorth,
  };
}

// ============================================================================
// PROJEÇÃO DE VIDA
// ============================================================================

function buildLifeProjection(profile: Partial<UserProfile>): LifeProjection[] {
  if (!profile.personalData || !profile.careerData) return [];

  const birthDate = new Date(profile.personalData.birthDate);
  const currentAge = new Date().getFullYear() - birthDate.getFullYear();
  const currentYear = new Date().getFullYear();

  const retirementAge =
    profile.lifeGoals?.targetRetirementAge ||
    (profile.personalData.biologicalSex === 'male' ? 65 : 62);

  const lifeExpectancy =
    LIFE_EXPECTANCY[profile.personalData.biologicalSex] || 80;

  const projection: LifeProjection[] = [];

  const annualIncome =
    profile.careerData.monthlyNetIncome * 12 + profile.careerData.annualBonus;

  let growthRate = 0.02;
  switch (profile.careerData.incomeGrowthExpectation) {
    case 'decreasing':
      growthRate = -0.01;
      break;
    case 'stable':
      growthRate = 0;
      break;
    case 'slow_growth':
      growthRate = 0.02;
      break;
    case 'fast_growth':
      growthRate = 0.04;
      break;
  }

  // Projetar a cada 5 anos para simplificar
  for (let age = currentAge; age <= lifeExpectancy; age += 5) {
    const yearsFromNow = age - currentAge;
    const year = currentYear + yearsFromNow;

    // Capital humano decai até aposentadoria
    const yearsToRetirement = Math.max(0, retirementAge - age);
    let humanCapital = 0;

    for (let t = 1; t <= yearsToRetirement; t++) {
      const futureIncome = annualIncome * Math.pow(1 + growthRate, yearsFromNow + t);
      humanCapital += futureIncome / Math.pow(1 + FINANCIAL_CONSTANTS.RISK_FREE_RATE + 0.02, t);
    }

    // Capital financeiro cresce (simplificado)
    const currentFinancial = profile.financialAssets
      ? profile.financialAssets.checkingAccount +
        profile.financialAssets.fixedIncome +
        profile.financialAssets.multimercado +
        profile.financialAssets.stocks +
        profile.financialAssets.retirement +
        profile.financialAssets.other
      : 0;

    // Taxa de crescimento do capital financeiro baseada na alocação
    const growthRateFinancial = age < retirementAge ? 0.08 : 0.06;
    const financialCapital =
      currentFinancial * Math.pow(1 + growthRateFinancial, yearsFromNow);

    const totalWealth = humanCapital + financialCapital;

    // Consumo e poupança recomendados (simplificado)
    const recommendedConsumption = totalWealth * 0.04; // Regra dos 4%
    const currentIncome =
      age < retirementAge
        ? annualIncome * Math.pow(1 + growthRate, yearsFromNow)
        : 0;
    const recommendedSavings = Math.max(0, currentIncome - recommendedConsumption);

    projection.push({
      age,
      year,
      humanCapital,
      financialCapital,
      totalWealth,
      recommendedConsumption,
      recommendedSavings,
    });
  }

  return projection;
}

// ============================================================================
// ALOCAÇÃO DE ATIVOS
// ============================================================================

function calculateAssetAllocation(profile: Partial<UserProfile>): AssetAllocation {
  if (!profile.personalData || !profile.pecuniaryPreferences) {
    return {
      riskAssets: 50,
      defensiveAssets: 50,
      justification: 'Alocação padrão por falta de dados',
    };
  }

  const birthDate = new Date(profile.personalData.birthDate);
  const currentAge = new Date().getFullYear() - birthDate.getFullYear();

  const retirementAge =
    profile.lifeGoals?.targetRetirementAge ||
    (profile.personalData.biologicalSex === 'male' ? 65 : 62);

  // Fator idade (regra do "100 - idade" ajustada)
  const ageFactor = Math.max(20, Math.min(80, 110 - currentAge));

  // Fator tolerância a risco
  const riskScore = profile.pecuniaryPreferences.riskTolerance.score;

  // Capital humano como % do total
  const balance = buildEconomicBalance(profile);
  const hcRatio = balance.humanCapital / (balance.humanCapital + balance.financialAssets);

  // Se capital humano é estável (bond-like), pode arriscar mais no financeiro
  const stabilityBonus =
    profile.careerData && profile.careerData.incomeStability >= 4 ? 10 : 0;

  // Alocação final
  let riskAssets = (ageFactor * 0.4 + riskScore * 0.4 + hcRatio * 20 + stabilityBonus);
  riskAssets = Math.max(20, Math.min(90, riskAssets));

  const defensiveAssets = 100 - riskAssets;

  const justification = `Recomendamos ${riskAssets.toFixed(0)}% em ativos de risco com base na sua idade (${currentAge} anos), tolerância a risco (${profile.pecuniaryPreferences.riskTolerance.classification}), e perfil de capital humano.`;

  return {
    riskAssets: Math.round(riskAssets),
    defensiveAssets: Math.round(defensiveAssets),
    justification,
  };
}

// ============================================================================
// INDICADORES QUALITATIVOS
// ============================================================================

function calculateQualitativeIndicators(
  profile: Partial<UserProfile>
): QualitativeIndicators {
  const dependents = profile.personalData?.dependents || 0;
  const balance = buildEconomicBalance(profile);

  // Necessidade de seguro de vida
  let lifeInsuranceNeed: 'low' | 'medium' | 'high' = 'low';
  let lifeInsuranceAmount: number | undefined;

  if (dependents > 0 && balance.humanCapital > 0) {
    const ratio = balance.humanCapital / balance.financialAssets;

    if (ratio > 10) {
      lifeInsuranceNeed = 'high';
      lifeInsuranceAmount = balance.humanCapital * 0.7;
    } else if (ratio > 3) {
      lifeInsuranceNeed = 'medium';
      lifeInsuranceAmount = balance.humanCapital * 0.5;
    } else {
      lifeInsuranceNeed = 'low';
    }
  }

  // Recomendação de renda vitalícia
  const birthDate = profile.personalData?.birthDate
    ? new Date(profile.personalData.birthDate)
    : new Date();
  const currentAge = new Date().getFullYear() - birthDate.getFullYear();

  let annuityRecommendation = '';
  if (currentAge > 55) {
    annuityRecommendation =
      'Considere avaliar a compra de renda vitalícia (anuidade) próximo à aposentadoria para se proteger contra o risco de longevidade.';
  } else {
    annuityRecommendation =
      'Renda vitalícia pode ser considerada futuramente, próximo à aposentadoria.';
  }

  return {
    lifeInsuranceNeed,
    lifeInsuranceAmount,
    annuityRecommendation,
  };
}

// ============================================================================
// FUNÇÃO PRINCIPAL - GERAR PLANO FINANCEIRO
// ============================================================================

export function generateFinancialPlan(profile: Partial<UserProfile>): FinancialPlan {
  const economicBalance = buildEconomicBalance(profile);
  const lifeProjection = buildLifeProjection(profile);
  const assetAllocation = calculateAssetAllocation(profile);
  const qualitativeIndicators = calculateQualitativeIndicators(profile);

  // Taxa de poupança atual vs recomendada
  const currentIncome = profile.careerData?.monthlyNetIncome
    ? profile.careerData.monthlyNetIncome * 12 + (profile.careerData.annualBonus || 0)
    : 0;

  const currentExpenses = profile.liabilitiesAndExpenses?.monthlyEssentialExpenses
    ? profile.liabilitiesAndExpenses.monthlyEssentialExpenses * 12
    : 0;

  const currentSavings = Math.max(0, currentIncome - currentExpenses);
  const currentSavingsRate = currentIncome > 0 ? (currentSavings / currentIncome) * 100 : 0;

  // Taxa recomendada (simplificado - 15-20% para acumulação)
  const birthDate = profile.personalData?.birthDate
    ? new Date(profile.personalData.birthDate)
    : new Date();
  const currentAge = new Date().getFullYear() - birthDate.getFullYear();

  const retirementAge =
    profile.lifeGoals?.targetRetirementAge ||
    (profile.personalData?.biologicalSex === 'male' ? 65 : 62);

  const yearsToRetirement = Math.max(0, retirementAge - currentAge);

  let recommendedSavingsRate = 15;
  if (yearsToRetirement < 10) recommendedSavingsRate = 25;
  else if (yearsToRetirement < 20) recommendedSavingsRate = 20;

  return {
    economicBalance,
    lifeProjection,
    currentSavingsRate: Math.round(currentSavingsRate),
    recommendedSavingsRate,
    targetRetirementAge: retirementAge,
    assetAllocation,
    qualitativeIndicators,
    generatedAt: new Date().toISOString(),
  };
}
