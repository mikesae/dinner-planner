import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Component } from 'react';
import { Container, FormGroup } from 'react-bootstrap';
import './Profile.scss';
import TopNavbar from './TopNavbar';

export default class Profile extends Component {
	state = {
		userName: '',
		email: '',
	};

	componentDidMount() {
		Auth.currentAuthenticatedUser({
			bypassCache: true,
		}).then((user) => this.setState({ userName: user.username, email: user.attributes.email }));
	}

	render() {
		return (
			<div className='page'>
				<TopNavbar title='Profile' showBackNav={true} />
				<Container className='container'>
					<FormGroup>
						<div className='form-label'>
							Username: <b>{this.state.userName}</b>
						</div>
					</FormGroup>
					<FormGroup>
						<div className='form-label'>
							Email: <b>{this.state.email}</b>
						</div>
					</FormGroup>
					<Authenticator>
						{({ signOut }) => (
							<FormGroup>
								<button
									className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth'
									onClick={signOut}
								>
									Sign out
								</button>
							</FormGroup>
						)}
					</Authenticator>
				</Container>
			</div>
		);
	}
}
