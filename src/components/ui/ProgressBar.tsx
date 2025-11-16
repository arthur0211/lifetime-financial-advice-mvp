import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { id: number; name: string }[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Barra de progresso */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Indicador de etapa */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Etapa {currentStep + 1} de {totalSteps}
        </div>
        <div className="text-sm font-medium text-primary-600">
          {steps[currentStep]?.name}
        </div>
      </div>

      {/* Steps detalhados (apenas em telas maiores) */}
      <div className="hidden md:flex justify-between mt-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              index <= currentStep ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                index <= currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              } ${index === currentStep ? 'ring-4 ring-primary-200' : ''}`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-xs text-center max-w-[80px]">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
