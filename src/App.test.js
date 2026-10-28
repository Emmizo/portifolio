import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio hero', () => {
  render(<App />);
  expect(screen.getByText(/Building reliable web & mobile experiences/i)).toBeInTheDocument();
});
