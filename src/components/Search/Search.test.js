import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('renders', () => {
  test('renders search input', async () => {
    render(<Search />);
    const input = await screen.findByRole('textbox');
    const placeholder = input.getAttribute('placeholder');

    expect(placeholder).toBe('Search...');
  });
});
