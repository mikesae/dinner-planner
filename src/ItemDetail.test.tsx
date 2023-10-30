import { render, screen } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import * as itemQueries from './itemQueries';

describe('Item detail component', () => {
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

	it('Renders item details correctly.', async () => {
		// Arrange
		const props: any = { match: { params: { id: '44' } } };

		// Render
		render(
			<BrowserRouter>
				<ItemDetail {...props} />
			</BrowserRouter>
		);

		// Assert
		expect(await screen.findByText(testItem.name)).not.toBeNull();
		expect(
			await screen.findAllByDisplayValue(testItem.description)
		).not.toBeNull();
	});
});
