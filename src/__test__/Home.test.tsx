import { render, screen } from '@testing-library/react';
import Home from '../pages/home/Home';

describe('Home', () => {
  test('renders without crashing', () => {
    render(<Home games={[]} />);
    expect(screen.getByText('No games found')).toBeTruthy();
  });

  test('displays game information when games are provided', () => {
    const games = [
      {
        id: '1',
        name: 'Test Game',
        image: 'test-image.jpg',
        jackpot: 1000,
        categories: ['top', 'new']
      }
    ];

    render(<Home games={games} />);

    expect(screen.getByText('New & Top')).toBeTruthy();
  });
});