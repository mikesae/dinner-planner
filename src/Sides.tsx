import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import './MainsAndSides.scss';
import { Container, FormGroup } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Storage, API, graphqlOperation} from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { createItem, deleteItem } from './graphql/mutations';
import * as queries from './graphql/queries';
import config from './aws-exports';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faEdit as editIcon } from '@fortawesome/free-solid-svg-icons/faEdit';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config;

export default class Sides extends Component {
    state = {
        file: null,
        itemName: '',
        items: []
    };

    componentDidMount() {
        this.listItems();
    }

    handleChange(event: any) {
        const { target: { value, files } } = event;
        const fileForUpload = files[0];

        this.setState({
            itemName: fileForUpload.name.split(".")[0],
            file: fileForUpload || value
        });
    }

    async listItems() {
        const filter = {
            category: {
                eq: 'Sides'
            }
        };
        const items = await API.graphql({query: queries.listItems, variables: { filter: filter}});
        // @ts-ignore
        this.setState({ items: items.data.listItems.items });
    }

    async removeItem(id: number) {
        try {
            await API.graphql(graphqlOperation(deleteItem, { input: { id: id }}));
            await this.listItems();
        } catch(error) {
            console.log('error: ', error);
        }
    }

    async addItem() {
        const file = this.state.file;
        if (file) {
            // @ts-ignore
            const extension = file.name.split(".")[1];
            // @ts-ignore
            const { type: mimeType } = file;
            const key = `images/${uuid()}${this.state.itemName}.${extension}`;
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
            const inputData = {
                name: this.state.itemName,
                category: 'Sides',
                image: url };

            try {
                await Storage.put(key, file, {
                    contentType: mimeType
                })
                await API.graphql(graphqlOperation(createItem, { input: inputData }))
                await this.listItems();
            } catch (error) {
                console.log('error: ', error);
            }
        }
    }

    render() {
        return (
            <div className="page">
                <TopNavbar title="Sides" showBackNav={true}/>
                <Container className="container">
                    <FormGroup>
                        {
                            this.state.items.map((item: any) => (
                                <Row key={item.id}>
                                    <Col className="col-2 img-col">
                                        <img className="img-item" src={item.image} alt=""/>
                                    </Col>
                                    <Col className="col-8 px-2 my-auto">
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
                        <Row>
                            <Col className="col-2 img-col">
                                <input type="file" name="file" id="file" className="input-file" onChange={event => this.handleChange(event)} accept="image/png, image/jpeg"/>
                                <label htmlFor="file">
                                    <FontAwesomeIcon className="link-icon" icon={faCameraRetro}/>
                                </label>
                            </Col>
                            <Col className="col-8 px-2 my-auto">
                                <input type="text" placeholder="Name" className="" value={this.state.itemName} onChange={e => this.setState({itemName: e.target.value})}/>
                            </Col>
                            <Col className="col-1 px-0 my-auto">
                                <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.addItem()}/>
                            </Col>
                            <Col className="col-1 px-0 my-auto">
                            </Col>
                        </Row>
                    </FormGroup>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}