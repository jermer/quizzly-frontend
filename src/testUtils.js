import UserContext from "./auth/UserContext";

const demoUser = {
    username: "testuser",
    email: "test@test.net",
};

// what about "setCurrentUser"

const UserProvider =
    ({ children, currentUser = demoUser }) => (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    );

export { UserProvider };
