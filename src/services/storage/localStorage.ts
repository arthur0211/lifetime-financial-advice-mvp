import { UserProfile, FinancialPlan } from '../../types';

const USER_PROFILE_KEY = 'lifepath_user_profile';
const FINANCIAL_PLAN_KEY = 'lifepath_financial_plan';

// ============================================================================
// PERFIL DO USUÁRIO
// ============================================================================

export function saveUserProfile(profile: Partial<UserProfile>): void {
  try {
    const serialized = JSON.stringify(profile);
    localStorage.setItem(USER_PROFILE_KEY, serialized);
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
}

export function loadUserProfile(): Partial<UserProfile> | null {
  try {
    const serialized = localStorage.getItem(USER_PROFILE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
}

export function clearUserProfile(): void {
  try {
    localStorage.removeItem(USER_PROFILE_KEY);
  } catch (error) {
    console.error('Error clearing user profile:', error);
  }
}

// ============================================================================
// PLANO FINANCEIRO
// ============================================================================

export function saveFinancialPlan(plan: FinancialPlan): void {
  try {
    const serialized = JSON.stringify(plan);
    localStorage.setItem(FINANCIAL_PLAN_KEY, serialized);
  } catch (error) {
    console.error('Error saving financial plan:', error);
  }
}

export function loadFinancialPlan(): FinancialPlan | null {
  try {
    const serialized = localStorage.getItem(FINANCIAL_PLAN_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Error loading financial plan:', error);
    return null;
  }
}

export function clearFinancialPlan(): void {
  try {
    localStorage.removeItem(FINANCIAL_PLAN_KEY);
  } catch (error) {
    console.error('Error clearing financial plan:', error);
  }
}

// ============================================================================
// LIMPAR TUDO
// ============================================================================

export function clearAllData(): void {
  clearUserProfile();
  clearFinancialPlan();
}
