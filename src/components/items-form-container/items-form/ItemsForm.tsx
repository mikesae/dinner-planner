import { faEdit as editIcon } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API, graphqlOperation } from 'aws-amplify';
import { ImageComponent } from 'components/image/ImageComponent';
import AddItemModal from 'components/modals/add-item/AddItemModal';
import AuthenticatedUserContext from 'contexts/AuthenticatedUserContext';
import { getSortedItems } from 'data/api/itemQueries';
import { deleteItem } from 'data/graphql/mutations';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Row onClick={() => onOpenModal()}>
        <Col className='col-3 col-sm-2 p-2'>
          <div className='add-item-placeholder'>
            <FontAwesomeIcon className='link-icon' icon={faPlusCircle} />
          </div>
        </Col>
        <Col className='col-5 col-sm-8 px-0 my-auto'>
          <div>Add...</div>
        </Col>
      </Row>
      {items.map((item: any) => (
        <Row key={item.id}>
          <Col className='col-3 col-sm-2 p-2'>
            <ImageComponent src={item.image} alt={item.name} />
          </Col>
          <Col className='col-5 col-sm-8 px-0 my-auto'>
            <div>{item.name}</div>
          </Col>
          <Col className='col-2 col-sm-1 my-auto'>
            <Link to={{ pathname: `/item/${item.id}` }}>
              <FontAwesomeIcon className='fa-1pt5x link-icon' icon={editIcon} />
            </Link>
          </Col>
          <Col className='col-2 col-sm-1 my-auto'>
            <FontAwesomeIcon className='fa-1pt5x link-icon' icon={faMinusCircle} onClick={() => removeItem(item.id)} />
          </Col>
        </Row>
      ))}
    </>
  );
};
