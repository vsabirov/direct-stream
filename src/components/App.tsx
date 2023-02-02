import React, { useState } from "react";

import "./App.scss";

import Room from "./Room";
import AuthenticationForm from "./AuthenticationForm";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onAuthAttempt = (result: boolean) => {
    setIsAuthenticated(result);
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
