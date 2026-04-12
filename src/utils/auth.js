const MOCK_USER = { id: "1", email: "user@example.com", name: "Mise User" };

// Frontend-safe mock auth service. Swap these with real API calls when backend is ready.
export const signin = ({ email }) => {
  return Promise.resolve({ token: "mock-token", email });
};

export const getCurrentUser = (token) => {
  if (!token) {
    return Promise.reject("No auth token found");
  }

  return Promise.resolve(MOCK_USER);
};

export const signout = () => {
  return Promise.resolve();
};
