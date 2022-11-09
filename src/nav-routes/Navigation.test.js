import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

/**
 * 
 * NEED TO MOCK USER
 * 
 */

// smoke test
it('renders without crashing', () => {

    // render(
    //     <MemoryRouter>
    //         <Navigation />
    //     </MemoryRouter>
    // );
});

// snapshot test
it("matches snapshot", function () {

    // const { asFragment } = render(
    //     <MemoryRouter>
    //         <Navigation />
    //     </MemoryRouter>,
    // );
    // expect(asFragment()).toMatchSnapshot();
});
