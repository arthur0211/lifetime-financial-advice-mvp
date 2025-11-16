import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, FinancialPlan } from '../types';
import { loadUserProfile, saveUserProfile } from '../services/storage/localStorage';

// ============================================================================
// TIPOS DE AÇÕES
// ============================================================================

type Action =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_PERSONAL_DATA'; payload: Partial<UserProfile['personalData']> }
  | { type: 'UPDATE_LIFE_GOALS'; payload: Partial<UserProfile['lifeGoals']> }
  | { type: 'UPDATE_CAREER_DATA'; payload: Partial<UserProfile['careerData']> }
  | { type: 'UPDATE_FINANCIAL_ASSETS'; payload: Partial<UserProfile['financialAssets']> }
  | { type: 'UPDATE_LIABILITIES'; payload: Partial<UserProfile['liabilitiesAndExpenses']> }
  | { type: 'UPDATE_PECUNIARY_PREFERENCES'; payload: Partial<UserProfile['pecuniaryPreferences']> }
  | { type: 'UPDATE_NON_PECUNIARY_PREFERENCES'; payload: Partial<UserProfile['nonPecuniaryPreferences']> }
  | { type: 'SET_FINANCIAL_PLAN'; payload: FinancialPlan }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RESET_PROFILE' }
  | { type: 'LOAD_PROFILE'; payload: Partial<UserProfile> };

// ============================================================================
// ESTADO INICIAL
// ============================================================================

const initialState: AppState = {
  currentStep: 0,
  userProfile: {
    onboardingCompleted: false,
  },
};

// ============================================================================
// REDUCER
// ============================================================================

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };

    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };

    case 'UPDATE_PERSONAL_DATA':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          personalData: {
            ...state.userProfile.personalData,
            ...action.payload,
          } as UserProfile['personalData'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_LIFE_GOALS':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          lifeGoals: {
            ...state.userProfile.lifeGoals,
            ...action.payload,
          } as UserProfile['lifeGoals'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_CAREER_DATA':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          careerData: {
            ...state.userProfile.careerData,
            ...action.payload,
          } as UserProfile['careerData'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_FINANCIAL_ASSETS':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          financialAssets: {
            ...state.userProfile.financialAssets,
            ...action.payload,
          } as UserProfile['financialAssets'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_LIABILITIES':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          liabilitiesAndExpenses: {
            ...state.userProfile.liabilitiesAndExpenses,
            ...action.payload,
          } as UserProfile['liabilitiesAndExpenses'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_PECUNIARY_PREFERENCES':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          pecuniaryPreferences: {
            ...state.userProfile.pecuniaryPreferences,
            ...action.payload,
          } as UserProfile['pecuniaryPreferences'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_NON_PECUNIARY_PREFERENCES':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          nonPecuniaryPreferences: {
            ...state.userProfile.nonPecuniaryPreferences,
            ...action.payload,
          } as UserProfile['nonPecuniaryPreferences'],
          updatedAt: new Date().toISOString(),
        },
      };

    case 'SET_FINANCIAL_PLAN':
      return {
        ...state,
        financialPlan: action.payload,
      };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          onboardingCompleted: true,
          updatedAt: new Date().toISOString(),
        },
      };

    case 'RESET_PROFILE':
      return initialState;

    case 'LOAD_PROFILE':
      return {
        ...state,
        userProfile: action.payload,
      };

    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;

  // Helper methods
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  updatePersonalData: (data: Partial<UserProfile['personalData']>) => void;
  updateLifeGoals: (data: Partial<UserProfile['lifeGoals']>) => void;
  updateCareerData: (data: Partial<UserProfile['careerData']>) => void;
  updateFinancialAssets: (data: Partial<UserProfile['financialAssets']>) => void;
  updateLiabilities: (data: Partial<UserProfile['liabilitiesAndExpenses']>) => void;
  updatePecuniaryPreferences: (data: Partial<UserProfile['pecuniaryPreferences']>) => void;
  updateNonPecuniaryPreferences: (data: Partial<UserProfile['nonPecuniaryPreferences']>) => void;

  setFinancialPlan: (plan: FinancialPlan) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar perfil do localStorage na inicialização
  useEffect(() => {
    const savedProfile = loadUserProfile();
    if (savedProfile) {
      dispatch({ type: 'LOAD_PROFILE', payload: savedProfile });
    }
  }, []);

  // Salvar perfil no localStorage sempre que mudar
  useEffect(() => {
    if (state.userProfile && Object.keys(state.userProfile).length > 1) {
      saveUserProfile(state.userProfile);
    }
  }, [state.userProfile]);

  // Helper methods
  const nextStep = () => dispatch({ type: 'NEXT_STEP' });
  const prevStep = () => dispatch({ type: 'PREV_STEP' });
  const goToStep = (step: number) => dispatch({ type: 'SET_STEP', payload: step });

  const updatePersonalData = (data: Partial<UserProfile['personalData']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_DATA', payload: data });
  };

  const updateLifeGoals = (data: Partial<UserProfile['lifeGoals']>) => {
    dispatch({ type: 'UPDATE_LIFE_GOALS', payload: data });
  };

  const updateCareerData = (data: Partial<UserProfile['careerData']>) => {
    dispatch({ type: 'UPDATE_CAREER_DATA', payload: data });
  };

  const updateFinancialAssets = (data: Partial<UserProfile['financialAssets']>) => {
    dispatch({ type: 'UPDATE_FINANCIAL_ASSETS', payload: data });
  };

  const updateLiabilities = (data: Partial<UserProfile['liabilitiesAndExpenses']>) => {
    dispatch({ type: 'UPDATE_LIABILITIES', payload: data });
  };

  const updatePecuniaryPreferences = (data: Partial<UserProfile['pecuniaryPreferences']>) => {
    dispatch({ type: 'UPDATE_PECUNIARY_PREFERENCES', payload: data });
  };

  const updateNonPecuniaryPreferences = (data: Partial<UserProfile['nonPecuniaryPreferences']>) => {
    dispatch({ type: 'UPDATE_NON_PECUNIARY_PREFERENCES', payload: data });
  };

  const setFinancialPlan = (plan: FinancialPlan) => {
    dispatch({ type: 'SET_FINANCIAL_PLAN', payload: plan });
  };

  const completeOnboarding = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  const resetProfile = () => {
    dispatch({ type: 'RESET_PROFILE' });
  };

  const value: AppContextType = {
    state,
    dispatch,
    nextStep,
    prevStep,
    goToStep,
    updatePersonalData,
    updateLifeGoals,
    updateCareerData,
    updateFinancialAssets,
    updateLiabilities,
    updatePecuniaryPreferences,
    updateNonPecuniaryPreferences,
    setFinancialPlan,
    completeOnboarding,
    resetProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================================================
// HOOK CUSTOMIZADO
// ============================================================================

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
