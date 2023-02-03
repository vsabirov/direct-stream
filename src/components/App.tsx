import React, { useState } from "react";

import "./App.scss";

import Room from "./Room";
import AuthenticationForm from "./AuthenticationForm";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!(process.env.REACT_APP_PASS_KEY));

  const onAuthAttempt = (authenticatedSucessfully: boolean) => {
    setIsAuthenticated(authenticatedSucessfully);
  }

  return (
    <>
      { 
        isAuthenticated ? 
        <Room /> 
        : 
        <AuthenticationForm onAuthAttempt={onAuthAttempt} /> 
      }
    </>
  );
}

export default App;
