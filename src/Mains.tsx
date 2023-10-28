import { Component } from 'react';
import { Container } from 'react-bootstrap';
import { ItemsForm } from './ItemsForm';
import './MainsAndSides.scss';
import TopNavbar from './TopNavbar';

export default class Mains extends Component<{ userName?: string }> {
	render() {
		return (
			<div className='page mains-and-sides'>
				<TopNavbar title='Mains' showBackNav={true} />
				<Container>
					<ItemsForm category='Mains' userName={this.props.userName} />
					<div className='spacer' />
				</Container>
			</div>
		);
	}
}
