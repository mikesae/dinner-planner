import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import './Mains.scss';
import { Container, FormGroup } from 'react-bootstrap';
import { Storage, API, graphqlOperation} from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { createItem, deleteItem } from './graphql/mutations';
import { listItems } from './graphql/queries';
import config from './aws-exports';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config;

export default class Mains extends Component {
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
        const items = await API.graphql(graphqlOperation(listItems));
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
                category: 'Mains',
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
                <TopNavbar title="Mains" showBackNav={true}/>
                <Container className="container">
                    <FormGroup>
                        <div className="row">
                            <div className="col-2">
                                <input type="file" name="file" id="file" className="input-file" onChange={event => this.handleChange(event)} accept="image/png, image/jpeg"/>
                                <label htmlFor="file">
                                    <FontAwesomeIcon className="link-icon" icon={faCameraRetro}/>
                                </label>
                            </div>
                            <div className="col-8">
                                <input type="text" placeholder="Name" className="col-form-label-lg" value={this.state.itemName} onChange={e => this.setState({itemName: e.target.value})}/>
                            </div>
                            <div className="col-2">
                                <button className="btn" onClick={() => this.addItem()}>
                                    <FontAwesomeIcon className="link-icon" icon={faPlusCircle}/>
                                </button>
                            </div>
                        </div>
                        {
                            this.state.items.map((item: any) => (
                                <div className="row" key={item.id}>
                                    <div className="col-2">
                                        <img className="img-item" src={item.image} alt=""/>
                                    </div>
                                    <div className="col-8">
                                        <div className="col-form-label-lg">{item.name}</div>
                                    </div>
                                    <div className="col-2">
                                        <button className="btn" onClick={() => this.removeItem(item.id)}>
                                            <FontAwesomeIcon className="link-icon" icon={faMinusCircle}/>
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </FormGroup>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}