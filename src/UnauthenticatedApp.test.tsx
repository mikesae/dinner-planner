import { render, screen } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import UnauthentictedApp from './UnauthenticatedApp';

describe('UnauthenticatedApp component', () => {
  const authenticatedUserMock = jest.spyOn(Auth, 'currentAuthenticatedUser');
  const consoleLogMock = jest.spyOn(console, 'log');
  const consoleWarnMock = jest.spyOn(console, 'warn');

  beforeEach(() => {
    authenticatedUserMock.mockClear();
    consoleLogMock.mockClear();
    consoleWarnMock.mockClear();

    authenticatedUserMock.mockReturnValue(
      Promise.resolve({ username: 'testy' })
    );
  });

  it('Renders all needed button names', async () => {
    // Render
    render(<UnauthentictedApp />);

    // Assert
    expect(await screen.findByText(/Mains/i)).not.toBeNull();
    expect(await screen.findByText(/Sides/i)).not.toBeNull();
    expect(await screen.findByText(/Vegetables/i)).not.toBeNull();
    expect(await screen.findByText(/Desserts/i)).not.toBeNull();

    // TODO: check for rendering of non-textual elements such as profile, etc.
  });
});
