import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../pages/navbar/Navbar';

describe('Navbar component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Navbar active="new" setActive={() => {}} />);
    const navbarLogo = getByText('Top Games');
    expect(navbarLogo).toBeTruthy();
  });

  test('menu toggles correctly on small screens (max-width: 768px)', () => {
    // Mock window.innerWidth to simulate small screen
    const originalInnerWidth = global.innerWidth;
    global.innerWidth = 1139;
  
    const { getByRole, queryByText } = render(<Navbar active="new" setActive={() => {}} />);
    const menuIcon = getByRole('button');
    
    // Toggle menu
    fireEvent.click(menuIcon);
    expect(queryByText('New Games')).toBeTruthy(); // Menu should be visible

  
    // Restore original window.innerWidth
    global.innerWidth = originalInnerWidth;
  });

  test('menu items change active state correctly', () => {
    const setActive = jest.fn();
    const { getByText } = render(<Navbar active="new" setActive={setActive} />);
    const slotsMenuItem = getByText('Slots');
    fireEvent.click(slotsMenuItem);
    expect(setActive).toHaveBeenCalledWith('slots'); 
  });
});

