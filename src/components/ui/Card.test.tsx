import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p data-testid="card-content">Card content</p>
      </Card>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText(/card title/i)).toBeInTheDocument();
  });

  it('renders with subtitle', () => {
    render(
      <Card title="Title" subtitle="Subtitle">
        Content
      </Card>
    );
    expect(screen.getByText(/subtitle/i)).toBeInTheDocument();
  });

  it('renders content correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
});
