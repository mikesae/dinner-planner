import { ImageComponentDetail } from 'components/image/ImageComponent';
import TopNavbar from 'components/navbars/top-navbar/TopNavbar';
import AuthenticatedUserContext from 'contexts/AuthenticatedUserContext';
import { getItem, setItem } from 'data/api/itemQueries';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { storeImage } from 'utils/ImageUtility';
import './ItemDetail.scss';

type ItemDetails = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
};

const ItemDetail: FunctionComponent = () => {
  const { id } = useParams<any>();
  const [itemDetails, setItemDetails] = useState<ItemDetails>({
    id: id,
    name: '',
    description: '',
    image: '',
    category: '',
  });

  const user = useContext<any>(AuthenticatedUserContext);

  useEffect(() => {
    try {
      requestItemDetails(id);
    } catch (error) {
      console.log('Error getting item details.', error);
    }

    async function requestItemDetails(id: string) {
      const item = await getItem(id);
      setItemDetails(item);
    }
  }, [id]);

  async function onImageChange(event: any) {
    const {
      target: { files },
    } = event;

    const fileForUpload = files[0];
    const image = await storeImage(fileForUpload, user.username, itemDetails.name);
    setItemDetails({ ...itemDetails, image });
  }

  async function updateItem() {
    await setItem(itemDetails);
  }

  return (
    <>
      {itemDetails.name === '' ? (
        <>
          <TopNavbar title='' showBackNav={false} />
          <Container className='container'>
            <FormGroup>Loading...</FormGroup>
          </Container>
        </>
      ) : (
        <>
          <TopNavbar title={itemDetails.name} showBackNav={true} backNav={`/${itemDetails.category.toLowerCase()}`} />
          <Container className='item-detail-container'>
            <FormGroup>
              <Row className='px-3 py-3'>
                <Col className='img-col'>
                  <input
                    type='file'
                    name='file'
                    id='file'
                    className='input-file'
                    onChange={(event) => onImageChange(event)}
                    accept='image/png, image/jpeg'
                  />
                  <label htmlFor='file'>
                    <ImageComponentDetail src={itemDetails.image} alt={itemDetails.name} />
                  </label>
                </Col>
              </Row>
              <Row className='px-3 pb-3'>
                <FormLabel>Name</FormLabel>
                <input
                  type='text'
                  placeholder='Name'
                  className=''
                  value={itemDetails.name ?? ''}
                  onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
                />
              </Row>
              <Row className='px-3 pb-3'>
                <FormLabel>Description</FormLabel>
                <input
                  type='text'
                  placeholder='Description'
                  className=''
                  value={itemDetails.description ?? ''}
                  onChange={(e) =>
                    setItemDetails({
                      ...itemDetails,
                      description: e.target.value,
                    })
                  }
                />
              </Row>
              <Row className='px-3 pb-3'>
                <button
                  style={{ width: '100%' }}
                  className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth'
                  onClick={() => updateItem()}
                >
                  Update
                </button>
              </Row>
            </FormGroup>
          </Container>
        </>
      )}
    </>
  );
};

export default ItemDetail;
