import { faEdit as editIcon } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API, graphqlOperation } from 'aws-amplify';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import ImageComponent from './ImageComponent';
import { deleteItem } from './graphql/mutations';
import { getSortedItems } from './itemQueries';

interface Props {
  category: string;
}

export const ItemsForm: FunctionComponent<Props> = ({ category }) => {
  const [items, setItems] = useState([]);
  const user = useContext<any>(AuthenticatedUserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    try {
      getItems(category);
    } catch (error) {
      console.log('ItemsForm listItems error: ', error);
    }
    // eslint-disable-next-line
  }, [category]);

  async function getItems(category: string) {
    const items = await getSortedItems(user.username, category);
    setItems(items);
  }

  async function removeItem(id: number) {
    try {
      await API.graphql(graphqlOperation(deleteItem, { input: { id: id } }));
      await getItems(category);
    } catch (error) {
      console.log('removeItem error: ', error);
    }
  }

  function onOpenModal() {
    setModalIsOpen(true);
  }

  function onCloseModal() {
    setModalIsOpen(false);
  }

  async function onItemAdded() {
    onCloseModal();
    await getItems(category);
  }

  return (
    <>
      <AddItemModal
        category={category}
        isOpen={modalIsOpen}
        onOK={() => onItemAdded()}
        onClose={() => onCloseModal()}
        userName={user.username}
      />
      <FormGroup>
        <Row onClick={() => onOpenModal()}>
          <Col className='col-3'>
            <div className='add-item-placeholder'>
              <FontAwesomeIcon className='link-icon' icon={faPlusCircle} />
            </div>
          </Col>
          <Col className='col-7 px-2 my-auto'>
            <div className='text-md-left'>Add...</div>
          </Col>
        </Row>
        {items.map((item: any) => (
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
                onClick={() => removeItem(item.id)}
              />
            </Col>
          </Row>
        ))}
      </FormGroup>
    </>
  );
};
