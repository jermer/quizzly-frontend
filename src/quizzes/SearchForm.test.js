import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from './SearchForm';

// smoke test
it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <SearchForm />
        </MemoryRouter>
    );
});

// snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SearchForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
