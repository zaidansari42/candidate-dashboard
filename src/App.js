import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import { useState } from 'react';
import Home from './components/Home';
import { CandidateContextProvider } from './context/candidateContext';

function App() {
  const [userLogedIn, setUserLogedIn] = useState(false);

  return (
    <CandidateContextProvider>
      {userLogedIn ? (
        <Home />
      ) : (
        <div className="d-flex flex-column">
          <GoogleOAuthProvider clientId="531846578448-upcvgmhri7pq45m5o8lglt5f34ri5ek5.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                setUserLogedIn(true);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
          <div>
            <h2>Login to Continue</h2>
          </div>
        </div>
      )}
    </CandidateContextProvider>
  );
}

export default App;
