import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import { Container, FormGroup } from 'react-bootstrap';
import { Storage, API, graphqlOperation} from 'aws-amplify';
import { v4 as uuid } from 'uuid';

import { createItem as CreateItem } from './graphql/mutations';
import { listItems as ListItems } from './graphql/queries';
import config from './aws-exports';

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
        const items = await API.graphql(graphqlOperation(ListItems));
        // @ts-ignore
        this.setState({ items: items.data.listItems.items });
    }

    async removeItem() {
        try {
            // TODO: remove from storage and graphql.
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
                await API.graphql(graphqlOperation(CreateItem, { input: inputData }))
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
                        <input type="file" onChange={event => this.handleChange(event)} accept="image/png, image/jpeg" style={{margin: '10px 0px'}}/>
                        <input placeholder="Name" value={this.state.itemName} onChange={e => this.setState({itemName: e.target.value})}/>
                        <button className="btn-primary" onClick={() => this.addItem()}>Add</button>
                        {
                            this.state.items.map((p: any, i) => (
                                <div className="row" key={i}>
                                    <div className="col-3">
                                        <img
                                            style={{ width: 32}}
                                            src={p.image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-6">
                                        <div>{p.name}</div>
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-secondary" onClick={() => this.removeItem()}>del</button>
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