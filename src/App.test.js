import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// smoke test
it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
