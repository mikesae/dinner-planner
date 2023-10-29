import { render } from '@testing-library/react';
import Mains from './Mains';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

describe('Mains component', () => {
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

	it('renders title', () => {
		// Render and assert
		const { getByText } = render(
			<BrowserRouter>
				<Mains />
			</BrowserRouter>
		);
		const element = getByText(/Mains/i);
		expect(element).toBeInTheDocument();
	});
});
