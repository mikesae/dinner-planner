import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthenticatedUserContext from 'contexts/AuthenticatedUserContext';
import { ItemsFormContainer } from './ItemsFormContainer';
import * as itemQueries from 'data/api/itemQueries';

describe('Items form container component', () => {
  const consoleLogMock = jest.spyOn(console, 'log');
  const consoleWarnMock = jest.spyOn(console, 'warn');
  const getSortedItemsMock = jest.spyOn(itemQueries, 'getSortedItems');

  const testItems = [
    {
      id: '42',
      name: 'item #1',
      description: 'really good',
      image: '',
      category: 'Dinner',
    },
    {
      id: '43',
      name: 'item #2',
      description: 'meh',
      image: '',
      category: 'Dinner',
    },
  ];

  const testUser: any = { username: 'testy' };

  beforeEach(() => {
    consoleLogMock.mockClear();
    consoleWarnMock.mockClear();
    getSortedItemsMock.mockClear();

    getSortedItemsMock.mockReturnValue(Promise.resolve(testItems));
  });

  it('Renders category correctly.', async () => {
    // Arrange
    const expectedCategory = 'A test category; Really, anything.';

    // Render
    render(
      <AuthenticatedUserContext.Provider value={testUser}>
        <BrowserRouter>
          <ItemsFormContainer category={expectedCategory} />
        </BrowserRouter>
      </AuthenticatedUserContext.Provider>
    );

    // Assert
    expect(await screen.findByText(expectedCategory)).not.toBeNull();
  });

  it('Renders items correctly.', async () => {
    // Arrange
    const expectedCategory = 'A test category; Really, anything.';

    // Render
    render(
      <AuthenticatedUserContext.Provider value={testUser}>
        <BrowserRouter>
          <ItemsFormContainer category={expectedCategory} />
        </BrowserRouter>
      </AuthenticatedUserContext.Provider>
    );

    // Assert
    expect(await screen.findByText(testItems[0].name)).not.toBeNull();
    expect(await screen.findByText(testItems[1].name)).not.toBeNull();
  });
});
