import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

// smoke test
it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
});

// snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
