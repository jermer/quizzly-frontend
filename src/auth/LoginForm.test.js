import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

//
it("shows error alert on incorrect login", async function () {
    const { getByText, getByLabelText, queryByText } = render(
        <MemoryRouter>
            {/* Mock the behavior of the login function to fail */}
            <LoginForm login={() => ({
                success: false,
                errors: ["Invalid username/password"]
            })} />
        </MemoryRouter>
    );

    const btn = getByText("Submit");

    expect(
        queryByText("Invalid username/password")
    ).not.toBeInTheDocument();

    // simulate button click event
    await act(async () => {
        await fireEvent.click(btn);
    })

    expect(
        queryByText("Invalid username/password")
    ).toBeInTheDocument();

})
