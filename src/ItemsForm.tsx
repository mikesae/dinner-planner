import { faEdit as editIcon } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import ImageComponent from './ImageComponent';
import { deleteItem } from './graphql/mutations';
import { getSortedItems } from './itemQueries';

export class ItemsForm extends Component<{
	category: string;
}> {
	state = {
		items: [],
		userName: '',
		modalIsOpen: false,
	};
	async componentDidMount() {
		try {
			const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			this.setState({ userName: user.username });
			await this.listItems();
		} catch (error) {
			console.log('ItemsForm listItems error: ', error);
		}
	}

	async listItems() {
		this.setState({
			items: await getSortedItems(this.state.userName, this.props.category),
		});
	}

	async removeItem(id: number) {
		try {
			await API.graphql(graphqlOperation(deleteItem, { input: { id: id } }));
			await this.listItems();
		} catch (error) {
			console.log('removeItem error: ', error);
		}
	}

	onOpenModal() {
		this.setState({ modalIsOpen: true });
	}

	onCloseModal() {
		this.setState({ modalIsOpen: false });
	}

	async onItemAdded() {
		this.onCloseModal();
		await this.listItems();
	}

	render() {
		return (
			<>
				<AddItemModal
					category={this.props.category}
					isOpen={this.state.modalIsOpen}
					onOK={() => this.onItemAdded()}
					onClose={() => this.onCloseModal()}
					userName={this.state.userName}
				/>
				<FormGroup>
					<Row onClick={() => this.onOpenModal()}>
						<Col className='col-3'>
							<div className='add-item-placeholder'>
								<FontAwesomeIcon className='link-icon' icon={faPlusCircle} />
							</div>
						</Col>
						<Col className='col-7 px-2 my-auto'>
							<div className='text-md-left'>Add...</div>
						</Col>
					</Row>
					{this.state.items.map((item: any) => (
						<Row key={item.id}>
							<Col className='col-3 img-col'>
								<ImageComponent src={item.image} />
							</Col>
							<Col className='col-7 px-2 my-auto'>
								<div className='text-md-left'>{item.name}</div>
							</Col>
							<Col className='col-1 px-0 my-auto'>
								<Link to={{ pathname: `/item/${item.id}` }}>
									<FontAwesomeIcon
										className='fa-1pt5x link-icon'
										icon={editIcon}
									/>
								</Link>
							</Col>
							<Col className='col-1 px-0 my-auto'>
								<FontAwesomeIcon
									className='fa-1pt5x link-icon'
									icon={faMinusCircle}
									onClick={() => this.removeItem(item.id)}
								/>
							</Col>
						</Row>
					))}
				</FormGroup>
			</>
		);
	}
}
