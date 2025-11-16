import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';
import { mockPersonalData, mockFinancialPlan } from '../test/mockData';

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppProvider>{children}</AppProvider>
  );

  it('provides initial state', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    expect(result.current.state.currentStep).toBe(0);
    expect(result.current.state.userProfile).toBeDefined();
  });

  it('updates personal data', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.updatePersonalData(mockPersonalData);
    });

    expect(result.current.state.userProfile.personalData).toEqual(mockPersonalData);
  });

  it('advances to next step', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.state.currentStep).toBe(1);
  });

  it('goes back to previous step', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.nextStep();
      result.current.nextStep();
    });

    expect(result.current.state.currentStep).toBe(2);

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.state.currentStep).toBe(1);
  });

  it('does not go below step 0', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.state.currentStep).toBe(0);
  });

  it('goes to specific step', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.goToStep(5);
    });

    expect(result.current.state.currentStep).toBe(5);
  });

  it('sets financial plan', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.setFinancialPlan(mockFinancialPlan);
    });

    expect(result.current.state.financialPlan).toEqual(mockFinancialPlan);
  });

  it('completes onboarding', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.completeOnboarding();
    });

    expect(result.current.state.userProfile.onboardingCompleted).toBe(true);
  });

  it('resets profile', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // First, add some data
    act(() => {
      result.current.updatePersonalData(mockPersonalData);
      result.current.nextStep();
    });

    expect(result.current.state.currentStep).toBe(1);
    expect(result.current.state.userProfile.personalData).toBeDefined();

    // Then reset
    act(() => {
      result.current.resetProfile();
    });

    expect(result.current.state.currentStep).toBe(0);
    expect(result.current.state.userProfile.onboardingCompleted).toBeFalsy();
  });

  it('updates timestamp when data changes', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const initialTime = result.current.state.userProfile.updatedAt;

    act(() => {
      result.current.updatePersonalData(mockPersonalData);
    });

    const updatedTime = result.current.state.userProfile.updatedAt;

    expect(updatedTime).toBeDefined();
    if (initialTime) {
      expect(new Date(updatedTime!).getTime()).toBeGreaterThanOrEqual(
        new Date(initialTime).getTime()
      );
    }
  });

  it('throws error when useApp is used outside provider', () => {
    expect(() => {
      renderHook(() => useApp());
    }).toThrow('useApp must be used within an AppProvider');
  });

  it('persists data to localStorage', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.updatePersonalData(mockPersonalData);
    });

    // Check that localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('updates all data sections independently', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const lifeGoals = {
      primaryGoal: 'retirement' as const,
      targetRetirementAge: 65,
      retirementAgeFlexibility: 'reasonably_flexible' as const,
      wantsSystemSuggestion: false,
    };

    act(() => {
      result.current.updatePersonalData(mockPersonalData);
      result.current.updateLifeGoals(lifeGoals);
    });

    expect(result.current.state.userProfile.personalData).toEqual(mockPersonalData);
    expect(result.current.state.userProfile.lifeGoals).toEqual(lifeGoals);
  });
});
