import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal.jsx";

// TODO: Replace these with actual API calls from your backend
const signin = (data) => {
  console.log("Sign in with:", data);
  return Promise.resolve({ token: "mock-token" });
};

const getCurrentUser = (token) => {
  console.log("Getting current user with token:", token);
  return Promise.resolve({ id: "1", email: "user@example.com" });
};

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const closeActiveModal = () => {
    setActiveModal(null);
  };

  const handleLogin = (data) => {
    return signin(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getCurrentUser(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      });
  };

  return (
    <>
      <Header onLoginClick={() => setActiveModal("sign-in")} />
      <Main />
      <Footer />
      <LoginModal
        isOpen={activeModal === "sign-in"}
        onClose={closeActiveModal}
        onSignIn={handleLogin}
        onSwitchModal={() => setActiveModal("sign-up")}
      />
    </>
  );
}

export default App;
