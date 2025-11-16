import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('renders with label text', () => {
    render(<Input label="Username" />);
    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText(/type here/i);
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('applies error styles when error is present', () => {
    render(<Input error="Error message" placeholder="test" />);
    const input = screen.getByPlaceholderText(/test/i);
    expect(input).toHaveClass('border-red-500');
  });

  it('supports email input type', () => {
    render(<Input type="email" placeholder="email" />);
    expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('type', 'email');
  });
});
