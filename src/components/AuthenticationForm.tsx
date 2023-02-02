import React, { useState } from "react";

import "./AuthenticationForm.scss";

interface AuthenticationFormProps {
  onAuthAttempt: (result: boolean) => void;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = (props: AuthenticationFormProps) => {
  const [currentKey, setCurrentKey] = useState("");
    
  const tryToAuthenticate = () => {
    props.onAuthAttempt(currentKey === (process.env.PASS_KEY || "entry"));
  }
  
  return (
    <div className="authentication-form">
      <h1>Authentication</h1>
        <input type="password" placeholder="Key" onChange={(e) => setCurrentKey(e.target.value)} />
        <br />
        <button onClick={tryToAuthenticate}>Log in</button>
    </div>
  )
}

export default AuthenticationForm;
