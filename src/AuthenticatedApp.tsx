import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { FunctionComponent, useEffect, useState } from 'react';
import { UnauthentictedApp } from './UnauthenticatedApp';
import './App.scss';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import './transitions.scss';

export const AuthenticatedApp: FunctionComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setCurrentUser();
  }, []);

  async function setCurrentUser() {
    setUser(await Auth.currentAuthenticatedUser({ bypassCache: true }));
  }

  return (
    <AuthenticatedUserContext.Provider value={user}>
      <UnauthentictedApp />
    </AuthenticatedUserContext.Provider>
  );
};

export default withAuthenticator(AuthenticatedApp);
