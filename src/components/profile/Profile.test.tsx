import { render, screen } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import AuthenticatedUserContext from 'contexts/AuthenticatedUserContext';
import { BrowserRouter } from 'react-router-dom';
import Profile from './Profile';

describe('Profile component', () => {
  const authenticatedUserMock = jest.spyOn(Auth, 'currentAuthenticatedUser');
  const testUser: any = {
    username: 'testy',
    attributes: { email: 'testy@gmail.com' },
  };

  beforeEach(() => {
    authenticatedUserMock.mockClear();

    authenticatedUserMock.mockReturnValue(Promise.resolve(testUser));
  });

  it('Renders user name and email', async () => {
    // Arrange

    // Render
    render(
      <AuthenticatedUserContext.Provider value={testUser}>
        <BrowserRouter>
          <Profile></Profile>
        </BrowserRouter>
      </AuthenticatedUserContext.Provider>
    );

    // Assert
    expect(await screen.findByText(testUser.username)).not.toBeNull();
    expect(await screen.findByText(testUser.attributes.email)).not.toBeNull();
  });
});
