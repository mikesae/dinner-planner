import { render } from '@testing-library/react';
import TopNavBar from './TopNavbar';
import { BrowserRouter } from 'react-router-dom';

describe('Mains component', () => {
	it('renders title', () => {
		const title = 'NavBar Title';
		const { getByText } = render(
			<BrowserRouter>
				<TopNavBar title={title} showBackNav={true} />
			</BrowserRouter>
		);

		const element = getByText(title);
		expect(element).toBeInTheDocument();
	});
});
