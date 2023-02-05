interface AuthenticationFormProps {
  onAuthAttempt: (authenticatedSucessfully: boolean, attemptedKey: string) => void;
}

export default AuthenticationFormProps;