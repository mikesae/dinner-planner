import { act, render } from '@testing-library/react';
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
		let renderResult: any = {};

		// Act
		await act(async () => {
			// Render
			renderResult = render(
				<BrowserRouter>
					<ItemDetail {...props} />
				</BrowserRouter>
			);
		});

		// Assert
		const nameElement = renderResult.getByText(testItem.name);
		expect(nameElement).toBeInTheDocument();
		const descriptionElement = renderResult.getByText(testItem.name);
		expect(descriptionElement).toBeInTheDocument();
	});
});
