import { render } from '@testing-library/react';
import Desserts from './Desserts';
import { BrowserRouter } from 'react-router-dom';

describe('Desserts component', () => {
	it('renders title', () => {
		const { getByText } = render(
			<BrowserRouter>
				<Desserts userName='testy-user' />
			</BrowserRouter>
		);
		const element = getByText(/Desserts/i);
		expect(element).toBeInTheDocument();
	});
});
