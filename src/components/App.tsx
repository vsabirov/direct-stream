import React, { useState } from "react";

import "./App.scss";

import Room from "./Room";
import AuthenticationForm from "./AuthenticationForm";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!(process.env.REACT_APP_PASS_KEY));
  const [attemptedKey, setAttemptedKey] = useState("");

  const onAuthAttempt = (authenticatedSucessfully: boolean, attemptedKey: string) => {
    setAttemptedKey(attemptedKey);
    setIsAuthenticated(authenticatedSucessfully);
  }

  return (
    <>
      { 
        isAuthenticated ? 
        <Room passKey={attemptedKey} /> 
        : 
        <AuthenticationForm onAuthAttempt={onAuthAttempt} /> 
      }
    </>
  );
}

export default App;
