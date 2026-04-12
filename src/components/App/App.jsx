import { useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import BenefitsSection from "../BenefitsSection/BeneftsSection.jsx";
import FeaturesSection from "../FeaturesSection/FeaturesSection.jsx";
import ConnectSection from "../ConnectSection/ConnectSection.jsx";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import { getCurrentUser, signin, signout } from "../../utils/auth.js";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresRef = useRef(null);
  const howToRef = useRef(null);
  const connectRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsLoading(false);
      return;
    }

    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sectionMap = {
    top: topRef,
    benefits: benefitsRef,
    features: featuresRef,
    "how-to": howToRef,
    connect: connectRef,
  };

  const scrollToSection = (section) => {
    sectionMap[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavigate = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(section), 0);
      return;
    }

    scrollToSection(section);
  };

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

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    return signout().finally(() => {
      localStorage.removeItem("jwt");
      setCurrentUser(null);
      setIsLoggedIn(false);
      closeActiveModal();
      navigate("/");
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onLoginClick={() => setActiveModal("sign-in")}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onDashboardClick={handleDashboardClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main topRef={topRef} howToRef={howToRef} />
              <BenefitsSection benefitsRef={benefitsRef} />
              <FeaturesSection featuresRef={featuresRef} />
              <ConnectSection connectRef={connectRef} />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LoginModal
        isOpen={activeModal === "sign-in"}
        onClose={closeActiveModal}
        onSignIn={handleLogin}
        onSwitchModal={() => setActiveModal("sign-up")}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
