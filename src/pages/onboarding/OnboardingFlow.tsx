import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useEffect } from 'react';

// Importar todas as telas de onboarding
import { WelcomeScreen } from './WelcomeScreen';
import { PersonalDataScreen } from './PersonalDataScreen';
import { LifeGoalsScreen } from './LifeGoalsScreen';
import { CareerScreen } from './CareerScreen';
import { AssetsScreen } from './AssetsScreen';
import { LiabilitiesScreen } from './LiabilitiesScreen';
import { PreferencesScreen } from './PreferencesScreen';
import { ESGScreen } from './ESGScreen';
import { SummaryScreen } from './SummaryScreen';
import { PlanScreen } from './PlanScreen';

export function OnboardingFlow() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Se já completou o onboarding, redirecionar para o dashboard
  useEffect(() => {
    if (state.userProfile?.onboardingCompleted) {
      navigate('/dashboard');
    }
  }, [state.userProfile?.onboardingCompleted, navigate]);

  return (
    <Routes>
      <Route index element={<Navigate to="welcome" replace />} />
      <Route path="welcome" element={<WelcomeScreen />} />
      <Route path="personal" element={<PersonalDataScreen />} />
      <Route path="goals" element={<LifeGoalsScreen />} />
      <Route path="career" element={<CareerScreen />} />
      <Route path="assets" element={<AssetsScreen />} />
      <Route path="liabilities" element={<LiabilitiesScreen />} />
      <Route path="preferences" element={<PreferencesScreen />} />
      <Route path="esg" element={<ESGScreen />} />
      <Route path="summary" element={<SummaryScreen />} />
      <Route path="plan" element={<PlanScreen />} />
    </Routes>
  );
}
