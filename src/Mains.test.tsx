import { render } from '@testing-library/react';
import Mains from './Mains';
import { BrowserRouter } from 'react-router-dom';

describe('Mains component', () => {
	it('renders title', () => {
		const { getByText } = render(
			<BrowserRouter>
				<Mains userName='testy-user' />
			</BrowserRouter>
		);
		const element = getByText(/Mains/i);
		expect(element).toBeInTheDocument();
	});
});
