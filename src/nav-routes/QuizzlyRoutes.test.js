import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../testUtils';
import QuizzlyRoutes from "./QuizzlyRoutes";

// smoke test
it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <QuizzlyRoutes />
            </UserProvider>
        </MemoryRouter>
    );
});

// snapshot tests
it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <QuizzlyRoutes />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});