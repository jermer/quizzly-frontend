import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../testUtils';
import Navigation from './Navigation';

// smoke test
it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <Navigation />
            </UserProvider>
        </MemoryRouter>
    );
});

// snapshot tests
it("matches snapshot when logged in", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Navigation />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// snapshot test
it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Navigation />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});