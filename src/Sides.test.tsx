import { render } from '@testing-library/react';
import Mains from './Mains';
import Sides from './Sides';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

describe('Desserts component', () => {
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
		const { getByText } = render(
			<BrowserRouter>
				<Sides />
			</BrowserRouter>
		);
		const element = getByText(/Sides/i);
		expect(element).toBeInTheDocument();
	});
});
