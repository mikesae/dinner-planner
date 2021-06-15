import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import './MainsAndSides.scss';
import { Container, FormGroup } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {deleteItem } from './graphql/mutations';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faEdit as editIcon } from '@fortawesome/free-solid-svg-icons/faEdit';
import ImageComponent from "./ImageComponent";
import AddItemModal from "./AddItemModal";
import {getSortedItems} from "./itemQueries";

export default class Sides extends Component {
    state = {
        file: null,
        itemName: '',
        items: [],
        userName: '',
        modalIsOpen: false
    };

    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            this.setState({userName: user.username, email: user.attributes.email});
            await this.listItems();
        } catch (error) {
            console.log('Sides error: ', error);
        }
    }

    async listItems() {
        this.setState({ items: await getSortedItems(this.state.userName, 'Sides') });
    }

    async removeItem(id: number) {
        try {
            await API.graphql(graphqlOperation(deleteItem, { input: { id: id }}));
            await this.listItems();
        } catch(error) {
            console.log('removeItem error: ', error);
        }
    }

    onOpenModal() {
        this.setState({modalIsOpen: true});
    }

    onCloseModal() {
        this.setState({modalIsOpen: false});
    }

    async onItemAdded() {
        this.onCloseModal();
        await this.listItems();
    }

    render() {
        return (
            <div className="page">
                <AddItemModal category="Sides" isOpen={this.state.modalIsOpen} onOK={() => this.onItemAdded()} onClose={() => this.onCloseModal()} userName={this.state.userName}/>
                <TopNavbar title="Sides" showBackNav={true}/>
                <Container className="container">
                    <FormGroup>
                        <Row onClick={() => this.onOpenModal()}>
                            <Col className="col-3">
                                <div className="add-item-placeholder">
                                    <FontAwesomeIcon className="link-icon" icon={faPlusCircle}/>
                                </div>
                            </Col>
                            <Col className="col-7 px-2 my-auto">
                                <div className="text-md-left">Add...</div>
                            </Col>
                        </Row>
                        {
                            this.state.items.map((item: any) => (
                                <Row key={item.id}>
                                    <Col className="col-3 img-col">
                                        <ImageComponent src={item.image}/>
                                    </Col>
                                    <Col className="col-7 px-2 my-auto">
                                        <div className="text-md-left">{item.name}</div>
                                    </Col>
                                    <Col className="col-1 px-0 my-auto">
                                        <FontAwesomeIcon className="link-icon" icon={faMinusCircle}  onClick={() => this.removeItem(item.id)}/>
                                    </Col>
                                    <Col className="col-1 px-0 my-auto">
                                        <FontAwesomeIcon className="link-icon" icon={editIcon}  onClick={() => this.removeItem(item.id)}/>
                                    </Col>
                                </Row>
                            ))
                        }
                    </FormGroup>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}