const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const SIGNUP_PATH = import.meta.env.VITE_AUTH_SIGNUP_PATH || "/signup";
const SIGNIN_PATH = import.meta.env.VITE_AUTH_SIGNIN_PATH || "/signin";
const CURRENT_USER_PATH = import.meta.env.VITE_AUTH_ME_PATH || "/users/me";

const processResponse = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const signup = ({ name, email, password }) => {
  const payload = {
    name,
    email,
    password,
  };

  return fetch(`${BASE_URL}${SIGNUP_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(processResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}${SIGNIN_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(processResponse);
};

export const getCurrentUser = (token) => {
  if (!token) {
    return Promise.reject(new Error("No auth token found"));
  }

  return fetch(`${BASE_URL}${CURRENT_USER_PATH}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processResponse);
};

export const signout = () => Promise.resolve();
