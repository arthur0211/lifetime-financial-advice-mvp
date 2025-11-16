import React, { ReactNode } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { ONBOARDING_STEPS } from '../../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  nextDisabled?: boolean;
  showProgress?: boolean;
}

export function OnboardingLayout({
  children,
  currentStep,
  onNext,
  onPrev,
  nextLabel = 'Continuar',
  prevLabel = 'Voltar',
  nextDisabled = false,
  showProgress = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">LifePath</h1>
          <p className="text-sm text-gray-600 mt-1">
            Planejamento financeiro ao longo da vida
          </p>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={ONBOARDING_STEPS.length}
            steps={ONBOARDING_STEPS}
          />
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
          {children}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div>
            {onPrev && currentStep > 0 && (
              <Button
                variant="secondary"
                onClick={onPrev}
                className="inline-flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                {prevLabel}
              </Button>
            )}
          </div>
          <div>
            {onNext && (
              <Button
                variant="primary"
                onClick={onNext}
                disabled={nextDisabled}
                className="inline-flex items-center gap-2"
              >
                {nextLabel}
                <ChevronRight size={20} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
