import React, { useState } from "react";

import AuthenticationFormProps from "../models/AuthenticationFormProps";

import "./AuthenticationForm.scss";

const AuthenticationForm: React.FC<AuthenticationFormProps> = (props: AuthenticationFormProps) => {
  const [currentKey, setCurrentKey] = useState("");
    
  const tryToAuthenticate = () => {
    props.onAuthAttempt(currentKey === (process.env.REACT_APP_PASS_KEY || currentKey), currentKey);
  }
  
  return (
    <div className="authentication-form">
      <h1>Entry Guard</h1>
        <input type="password" placeholder="Key" onChange={(e) => setCurrentKey(e.target.value)} />
        <br />
        <button onClick={tryToAuthenticate}>Pass through</button>
    </div>
  )
}

export default AuthenticationForm;
