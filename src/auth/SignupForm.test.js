import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupForm from './SignupForm';

// smoke test
it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>
    );
});

// snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
