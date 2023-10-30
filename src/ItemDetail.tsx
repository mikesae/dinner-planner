import { Auth } from 'aws-amplify';
import { FunctionComponent, useEffect, useState } from 'react';
import { Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { ImageComponentDetail } from './ImageComponent';
import { storeImage } from './ImageUtility';
import './ItemDetail.scss';
import TopNavbar from './TopNavbar';
import { getItem, setItem } from './itemQueries';

const ItemDetail: FunctionComponent = (props: any) => {
	const [userName, setUserName] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const { id } = props.match.params;
				const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
				setUserName(user.username);
				const item = await getItem(id);
				setName(item.name);
				setDescription(item.description);
				setImage(item.image);
				setCategory(item.category);
			} catch (error) {
				console.log('Error getting item details.', error);
			}
		})();
	}, [props.match.params]);

	async function onImageChange(event: any) {
		const {
			target: { files },
		} = event;
		const fileForUpload = files[0];

		setImage(await storeImage(fileForUpload, userName, name));
	}

	async function updateItem() {
		const { id } = props.match.params;
		await setItem({ id, name, description, image, category });
	}

	return (
		<>
			{name === '' ? (
				<>
					<TopNavbar title='' showBackNav={false} />
					<Container className='container'>
						<FormGroup>Loading...</FormGroup>
						<div className='spacer' />
					</Container>
				</>
			) : (
				<>
					<TopNavbar
						title={name}
						showBackNav={true}
						backNav={`/${category.toLowerCase()}`}
					/>
					<Container>
						<FormGroup>
							<Row className='px-3 py-3'>
								<Col>
									<input
										type='file'
										name='file'
										id='file'
										className='input-file'
										onChange={(event) => onImageChange(event)}
										accept='image/png, image/jpeg'
									/>
									<label htmlFor='file'>
										<ImageComponentDetail src={image} />
									</label>
								</Col>
							</Row>
							<Row className='px-3 pb-3'>
								<FormLabel>Name</FormLabel>
								<input
									type='text'
									placeholder='Name'
									className=''
									value={name ?? ''}
									onChange={(e) => setName(e.target.value)}
								/>
							</Row>
							<Row className='px-3 pb-3'>
								<FormLabel>Description</FormLabel>
								<input
									type='text'
									placeholder='Description'
									className=''
									value={description ?? ''}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Row>
							<Row className='px-3 pb-3'>
								<button
									style={{ width: '100%' }}
									className='btn btn-primary'
									onClick={() => updateItem()}
								>
									Update
								</button>
							</Row>
						</FormGroup>
						<div className='spacer' />
					</Container>
				</>
			)}
		</>
	);
};

export default ItemDetail;
