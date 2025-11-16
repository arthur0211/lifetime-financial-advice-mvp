import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveUserProfile,
  loadUserProfile,
  clearUserProfile,
  saveFinancialPlan,
  loadFinancialPlan,
  clearFinancialPlan,
  clearAllData,
} from './localStorage';
import { mockUserProfile, mockFinancialPlan } from '../../test/mockData';

describe('localStorage service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('User Profile', () => {
    it('saves user profile to localStorage', () => {
      saveUserProfile(mockUserProfile);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'lifepath_user_profile',
        JSON.stringify(mockUserProfile)
      );
    });

    it('loads user profile from localStorage', () => {
      const profileString = JSON.stringify(mockUserProfile);
      localStorage.getItem = vi.fn().mockReturnValue(profileString);

      const result = loadUserProfile();

      expect(localStorage.getItem).toHaveBeenCalledWith('lifepath_user_profile');
      expect(result).toEqual(mockUserProfile);
    });

    it('returns null when no profile exists', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null);

      const result = loadUserProfile();

      expect(result).toBeNull();
    });

    it('clears user profile from localStorage', () => {
      clearUserProfile();

      expect(localStorage.removeItem).toHaveBeenCalledWith('lifepath_user_profile');
    });

    it('handles JSON parse errors gracefully', () => {
      localStorage.getItem = vi.fn().mockReturnValue('invalid json');

      const result = loadUserProfile();

      expect(result).toBeNull();
    });
  });

  describe('Financial Plan', () => {
    it('saves financial plan to localStorage', () => {
      saveFinancialPlan(mockFinancialPlan);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'lifepath_financial_plan',
        JSON.stringify(mockFinancialPlan)
      );
    });

    it('loads financial plan from localStorage', () => {
      const planString = JSON.stringify(mockFinancialPlan);
      localStorage.getItem = vi.fn().mockReturnValue(planString);

      const result = loadFinancialPlan();

      expect(localStorage.getItem).toHaveBeenCalledWith('lifepath_financial_plan');
      expect(result).toEqual(mockFinancialPlan);
    });

    it('returns null when no plan exists', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null);

      const result = loadFinancialPlan();

      expect(result).toBeNull();
    });

    it('clears financial plan from localStorage', () => {
      clearFinancialPlan();

      expect(localStorage.removeItem).toHaveBeenCalledWith(
        'lifepath_financial_plan'
      );
    });
  });

  describe('Clear All Data', () => {
    it('clears both user profile and financial plan', () => {
      clearAllData();

      expect(localStorage.removeItem).toHaveBeenCalledWith('lifepath_user_profile');
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        'lifepath_financial_plan'
      );
    });
  });
});
