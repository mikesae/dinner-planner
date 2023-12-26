import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddItemModal from './AddItemModal';
import * as itemFunctions from 'data/api/itemFunctions';

describe('AddItemModal component', () => {
  const category = 'Sides';
  const modalIsOpen = true;
  const userName = 'tester1';
  const itemName = 'inputFile';
  const uploadFileName = itemName + '.jpg';
  const changeEvent: any = { target: { value: '', files: [{ name: uploadFileName }] } };
  const storeNewItemMock = jest.spyOn(itemFunctions, 'storeNewItem');

  beforeEach(() => {
    storeNewItemMock.mockClear();
  });

  it('Handles input change', async () => {
    const { container } = render(
      <AddItemModal category={category} isOpen={modalIsOpen} onOK={() => {}} onClose={() => {}} userName={userName} />
    );

    const inputElement: any = container.querySelector('input[type="file"]');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, changeEvent);

    const addButton: any = container.querySelector('button');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(storeNewItemMock).toHaveBeenCalledWith(userName, itemName, category, expect.anything());
  });
});
