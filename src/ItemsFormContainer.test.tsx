import { render, screen } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import { ItemsFormContainer } from './ItemsFormContainer';
import * as itemQueries from './itemQueries';

describe('Items form container component', () => {
	const authenticatedUserMock = jest.spyOn(Auth, 'currentAuthenticatedUser');
	const consoleLogMock = jest.spyOn(console, 'log');
	const consoleWarnMock = jest.spyOn(console, 'warn');
	const getItemMock = jest.spyOn(itemQueries, 'getItem');

	const testItem = {
		id: '42',
		name: 'some food',
		description: 'really good',
		image: '',
		category: 'Dinner',
	};

	beforeEach(() => {
		authenticatedUserMock.mockClear();
		consoleLogMock.mockClear();
		consoleWarnMock.mockClear();
		getItemMock.mockClear();

		authenticatedUserMock.mockReturnValue(
			Promise.resolve({ username: 'testy' })
		);

		getItemMock.mockReturnValue(Promise.resolve(testItem));
	});

	it('Renders category correctly.', async () => {
		// Arrange
		const expectedCategory = 'A test category; Really, anything.';

		// Render
		render(
			<BrowserRouter>
				<ItemsFormContainer category={expectedCategory} />
			</BrowserRouter>
		);

		// Assert
		expect(await screen.findByText(expectedCategory)).not.toBeNull();
	});
});
