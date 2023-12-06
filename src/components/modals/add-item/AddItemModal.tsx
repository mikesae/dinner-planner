import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Component } from 'react';
import { Container, FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { v4 as uuid } from 'uuid';
import config from 'aws-exports';
import { createItem } from 'data/graphql/mutations';
import '../Modal.scss';

export interface IAddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
  category: string;
  userName: string;
}

interface IAddItemModalState {
  file: any;
  itemName: string;
}

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

export default class AddItemModal extends Component<IAddItemModalProps, IAddItemModalState> {
  constructor(props: IAddItemModalProps) {
    super(props);
    this.state = {
      file: null,
      itemName: '',
    };
  }

  async componentDidMount() {
    this.setState({ itemName: '' });
  }

  async addItem() {
    const file = this.state.file;
    if (file) {
      // @ts-ignore
      const extension = file.name.split('.')[1];
      // @ts-ignore
      const { type: mimeType } = file;
      const key = `images/${uuid()}${this.props.userName}-${this.state.itemName}.${extension}`;
      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      const inputData = {
        name: this.state.itemName,
        category: this.props.category,
        image: url,
        userName: this.props.userName,
      };

      try {
        await Storage.put(key, file, {
          contentType: mimeType,
        });
        await API.graphql(graphqlOperation(createItem, { input: inputData }));
      } catch (error) {
        console.log('AddItemModal error: ', error);
      }
    }
    this.props.onOK();
  }

  handleChange(event: any) {
    const {
      target: { value, files },
    } = event;
    const fileForUpload = files[0];

    this.setState({
      itemName: fileForUpload.name.split('.')[0],
      file: fileForUpload || value,
    });
  }

  render() {
    return (
      <Rodal
        visible={this.props.isOpen}
        onClose={() => this.props.onClose()}
        animation='slideUp'
        duration={1000}
        measure='%'
        width={100}
        height={100}
      >
        <Container className='planner-modal'>
          <FormGroup>
            <Row>
              <Col className='col-3 img-col'>
                <input
                  type='file'
                  name='file'
                  id='file'
                  className='input-file'
                  onChange={(event) => this.handleChange(event)}
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
                  value={this.state.itemName}
                  onChange={(e) => this.setState({ itemName: e.target.value })}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup className='text-center'>
            <button
              className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth btn-on-bottom'
              onClick={() => this.addItem()}
            >
              Add
            </button>
          </FormGroup>
        </Container>
      </Rodal>
    );
  }
}