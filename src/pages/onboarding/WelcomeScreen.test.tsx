import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { WelcomeScreen } from './WelcomeScreen';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('WelcomeScreen', () => {
  it('renders welcome content', () => {
    render(<WelcomeScreen />);

    const elements = screen.getAllByText(/lifepath/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('displays main features', () => {
    render(<WelcomeScreen />);

    const capitalHumano = screen.getAllByText(/capital humano/i);
    expect(capitalHumano.length).toBeGreaterThan(0);
  });

  it('shows how it works section', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText(/como funciona/i)).toBeInTheDocument();
  });

  it('displays estimated time', () => {
    render(<WelcomeScreen />);

    expect(screen.getByText(/10 minutos/i)).toBeInTheDocument();
  });

  it('navigates to personal data screen on button click', async () => {
    const user = userEvent.setup();
    render(<WelcomeScreen />);

    const startButton = screen.getByRole('button', { name: /começar/i });
    await user.click(startButton);

    expect(mockNavigate).toHaveBeenCalledWith('/onboarding/personal');
  });
});
