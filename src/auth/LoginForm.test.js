import { fireEvent, render } from '@testing-library/react';
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
it("shows error alert on incorrect login", function () {
    const { getByText, getByLabelText, queryByText } = render(
        <MemoryRouter>
            <LoginForm login={() => ({
                success: false,
                errors: ["Invalid username/password"]
            })} />
        </MemoryRouter>
    );

    // const usernameInput = getByLabelText("Username");
    // const passwordInput = getByLabelText("Password");
    const btn = getByText("Submit");

    console.log(">>>>", btn);

    expect(
        queryByText("Invalid username/password")
    ).not.toBeInTheDocument();

    // fireEvent.change(usernameInput, { target: { value: "badusername" } });
    // fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(btn);

    expect(
        queryByText("Invalid username/password")
    ).toBeInTheDocument();

})
