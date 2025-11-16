import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
}

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AppProvider>
  );
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
