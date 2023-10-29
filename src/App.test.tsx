import { act, render } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { UnauthenticatedApp } from './App';

describe('App component', () => {
	const authenticatedUserMock = jest.spyOn(Auth, 'currentAuthenticatedUser');
	const consoleLogMock = jest.spyOn(console, 'log');
	const consoleWarnMock = jest.spyOn(console, 'warn');
	function withAuthenticator(element: any) {
		return element;
	}

	beforeEach(() => {
		authenticatedUserMock.mockClear();
		consoleLogMock.mockClear();
		consoleWarnMock.mockClear();

		authenticatedUserMock.mockReturnValue(
			Promise.resolve({ username: 'testy' })
		);
	});

	it('renders title', () => {
		act(() => {
			// Render
			const { getByText } = render(<UnauthenticatedApp />);

			// Assert
			const mainsElement = getByText(/Mains/i);
			const sidesElement = getByText(/Sides/i);
			const vegesElement = getByText(/Vegetables/i);
			const dessertsElement = getByText(/Desserts/i);
			expect(mainsElement).toBeInTheDocument();
			expect(sidesElement).toBeInTheDocument();
			expect(vegesElement).toBeInTheDocument();
			expect(dessertsElement).toBeInTheDocument();

			// TODO: check for rendering of non-textual elements such as profile, etc.
		});
	});
});
