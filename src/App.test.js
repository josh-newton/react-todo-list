import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders', () => {
  test('renders todo app title', async () => {
    render(<App />);
    const title = await screen.findByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Todo');
  });
});
