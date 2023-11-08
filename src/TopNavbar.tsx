import React, { Component } from 'react';
import './TopNavbar.scss';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'react-bootstrap/Image';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface ITopNavBarProps {
	title: string;
	showBackNav: boolean;
	backNav?: string;
}

export default class TopNavbar extends Component<ITopNavBarProps> {
	render() {
		return (
			<>
				<Navbar className='jumbotron-fluid border-bottom navbar-top' fixed='top'>
					<Row className='container-fluid no-gutters'>
						<Col className='col-1'>
							{this.props.showBackNav ? (
								<Link to={this.props.backNav ?? '/'} className='navbar-left-link'>
									<div className='btn'>
										<FontAwesomeIcon className='link-icon' icon={faChevronLeft} />
									</div>
								</Link>
							) : (
								<Image fluid src='/logo.png' />
							)}
						</Col>
						<Col className='col-10 navbar-content'>
							<span>{this.props.title}</span>
							<div>{this.props.children}</div>
						</Col>
						<Col className='col-1'>
							<Link to='/profile'>
								<div className='btn'>
									<FontAwesomeIcon className='link-icon fa-1pt5x' icon={faUser} />
								</div>
							</Link>
						</Col>
					</Row>
				</Navbar>
				<div className='spacer' />
			</>
		);
	}
}
