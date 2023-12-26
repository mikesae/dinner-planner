import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { storeNewItem } from 'data/api/itemFunctions';
import { FunctionComponent, useState } from 'react';
import { Container, FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import '../Modal.scss';

export interface IAddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
  category: string;
  userName: string;
}

const AddItemModal: FunctionComponent<IAddItemModalProps> = ({ isOpen, onClose, onOK, category, userName }) => {
  const [file, setFile] = useState<File | null>(null);
  const [itemName, setItemName] = useState<string>('');

  async function addItem() {
    if (file) {
      await storeNewItem(userName, itemName, category, file);
    }
    onOK();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const {
      target: { value, files },
    } = event;

    if (files && files.length > 0) {
      const fileForUpload: File = files[0];

      setItemName(fileForUpload.name.split('.')[0]);
      setFile(fileForUpload || value);
    }
  }

  return (
    <Rodal visible={isOpen} onClose={() => onClose()} animation='slideUp' duration={1000} measure='%' width={100} height={100}>
      <Container className='planner-modal'>
        <FormGroup>
          <Row>
            <Col className='col-3 img-col'>
              <input
                type='file'
                name='file'
                id='file'
                className='input-file'
                onChange={(event) => handleChange(event)}
                accept='image/png, image/jpeg'
              />
              <label htmlFor='file'>
                <FontAwesomeIcon className='link-icon' icon={faCameraRetro} />
              </label>
            </Col>
            <Col className='col-7 px-2 my-auto'>
              <input
                type='text'
                placeholder='Name'
                className=''
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className='text-center'>
          <button
            className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth btn-on-bottom'
            onClick={() => addItem()}
          >
            Add
          </button>
        </FormGroup>
      </Container>
    </Rodal>
  );
};

export default AddItemModal;
