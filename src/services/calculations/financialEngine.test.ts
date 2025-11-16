import { describe, it, expect } from 'vitest';
import { generateFinancialPlan } from './financialEngine';
import { mockUserProfile } from '../../test/mockData';

describe('Financial Engine', () => {
  describe('generateFinancialPlan', () => {
    it('generates a complete financial plan', () => {
      const plan = generateFinancialPlan(mockUserProfile);

      expect(plan).toHaveProperty('economicBalance');
      expect(plan).toHaveProperty('lifeProjection');
      expect(plan).toHaveProperty('assetAllocation');
      expect(plan).toHaveProperty('qualitativeIndicators');
      expect(plan).toHaveProperty('generatedAt');
    });

    it('calculates economic balance correctly', () => {
      const plan = generateFinancialPlan(mockUserProfile);
      const { economicBalance } = plan;

      expect(economicBalance.humanCapital).toBeGreaterThan(0);
      expect(economicBalance.financialAssets).toBeGreaterThan(0);
      expect(economicBalance.totalAssets).toBe(
        economicBalance.humanCapital +
          economicBalance.financialAssets +
          economicBalance.realEstate
      );
      expect(economicBalance.economicNetWorth).toBe(
        economicBalance.totalAssets - economicBalance.totalLiabilities
      );
    });

    it('generates life projection with multiple data points', () => {
      const plan = generateFinancialPlan(mockUserProfile);

      expect(plan.lifeProjection).toBeInstanceOf(Array);
      expect(plan.lifeProjection.length).toBeGreaterThan(0);

      const firstProjection = plan.lifeProjection[0];
      expect(firstProjection).toHaveProperty('age');
      expect(firstProjection).toHaveProperty('year');
      expect(firstProjection).toHaveProperty('humanCapital');
      expect(firstProjection).toHaveProperty('financialCapital');
      expect(firstProjection).toHaveProperty('totalWealth');
    });

    it('calculates asset allocation based on risk profile', () => {
      const plan = generateFinancialPlan(mockUserProfile);
      const { assetAllocation } = plan;

      expect(assetAllocation.riskAssets).toBeGreaterThanOrEqual(20);
      expect(assetAllocation.riskAssets).toBeLessThanOrEqual(90);
      expect(assetAllocation.defensiveAssets).toBe(100 - assetAllocation.riskAssets);
      expect(assetAllocation.justification).toBeTruthy();
    });

    it('provides qualitative indicators', () => {
      const plan = generateFinancialPlan(mockUserProfile);
      const { qualitativeIndicators } = plan;

      expect(['low', 'medium', 'high']).toContain(
        qualitativeIndicators.lifeInsuranceNeed
      );
      expect(qualitativeIndicators.annuityRecommendation).toBeTruthy();
    });

    it('calculates savings rate recommendations', () => {
      const plan = generateFinancialPlan(mockUserProfile);

      expect(plan.currentSavingsRate).toBeGreaterThanOrEqual(0);
      expect(plan.recommendedSavingsRate).toBeGreaterThanOrEqual(0);
      expect(plan.recommendedSavingsRate).toBeLessThanOrEqual(100);
    });

    it('sets target retirement age', () => {
      const plan = generateFinancialPlan(mockUserProfile);

      expect(plan.targetRetirementAge).toBeDefined();
      expect(plan.targetRetirementAge).toBeGreaterThan(0);
    });

    it('handles conservative risk profile', () => {
      const conservativeProfile = {
        ...mockUserProfile,
        pecuniaryPreferences: {
          ...mockUserProfile.pecuniaryPreferences!,
          riskTolerance: {
            score: 20,
            classification: 'conservative' as const,
          },
        },
      };

      const plan = generateFinancialPlan(conservativeProfile);

      // Conservative profile should have lower risk allocation than aggressive
      expect(plan.assetAllocation.riskAssets).toBeLessThan(70);
    });

    it('handles aggressive risk profile', () => {
      const aggressiveProfile = {
        ...mockUserProfile,
        pecuniaryPreferences: {
          ...mockUserProfile.pecuniaryPreferences!,
          riskTolerance: {
            score: 90,
            classification: 'aggressive' as const,
          },
        },
      };

      const plan = generateFinancialPlan(aggressiveProfile);

      // Aggressive profile should have higher risk allocation
      expect(plan.assetAllocation.riskAssets).toBeGreaterThan(60);
    });

    it('recommends life insurance for users with dependents', () => {
      const profileWithDependents = {
        ...mockUserProfile,
        personalData: {
          ...mockUserProfile.personalData!,
          dependents: 3,
        },
      };

      const plan = generateFinancialPlan(profileWithDependents);

      if (plan.qualitativeIndicators.lifeInsuranceNeed !== 'low') {
        expect(plan.qualitativeIndicators.lifeInsuranceAmount).toBeGreaterThan(0);
      }
    });

    it('human capital decreases over time in projection', () => {
      const plan = generateFinancialPlan(mockUserProfile);

      for (let i = 1; i < plan.lifeProjection.length; i++) {
        expect(plan.lifeProjection[i].humanCapital).toBeLessThanOrEqual(
          plan.lifeProjection[i - 1].humanCapital
        );
      }
    });

    it('handles profile without complete data gracefully', () => {
      const incompleteProfile = {
        personalData: mockUserProfile.personalData,
      };

      const plan = generateFinancialPlan(incompleteProfile);

      expect(plan).toBeDefined();
      expect(plan.economicBalance).toBeDefined();
    });

    it('generates timestamp for plan creation', () => {
      const plan = generateFinancialPlan(mockUserProfile);

      expect(plan.generatedAt).toBeDefined();
      const timestamp = new Date(plan.generatedAt);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });
});
