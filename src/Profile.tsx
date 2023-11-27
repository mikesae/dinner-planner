import { Authenticator } from '@aws-amplify/ui-react';
import { FunctionComponent, useContext } from 'react';
import { Container, FormGroup } from 'react-bootstrap';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import './Profile.scss';
import TopNavbar from './TopNavbar';

const Profile: FunctionComponent = () => {
  const user = useContext<any>(AuthenticatedUserContext);

  return (
    <div className='page'>
      <TopNavbar title='Profile' showBackNav={true} />
      {user && (
        <Container className='container'>
          <FormGroup>
            <div className='form-label'>
              Username: <b>{user.username}</b>
            </div>
          </FormGroup>
          <FormGroup>
            <div className='form-label'>
              Email: <b>{user.attributes.email}</b>
            </div>
          </FormGroup>
          <Authenticator>
            {({ signOut }) => (
              <FormGroup>
                <button
                  className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth'
                  onClick={signOut}
                >
                  Sign out
                </button>
              </FormGroup>
            )}
          </Authenticator>
        </Container>
      )}
    </div>
  );
};

export default Profile;
