import React, { forwardRef } from 'react';

interface SliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
  error?: string;
  labels?: { min: string; max: string };
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, min, max, step = 1, value, onChange, helperText, error, labels }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          {labels && (
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{labels.min}</span>
              <span>{labels.max}</span>
            </div>
          )}
        </div>
        <div className="text-center mt-2 text-sm font-semibold text-primary-600">
          {value}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
