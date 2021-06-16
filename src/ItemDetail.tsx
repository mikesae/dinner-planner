import React, { Component } from 'react';
import TopNavbar from "./TopNavbar";
import {getItem} from "./itemQueries";
import {Container, FormGroup, FormLabel, Row} from "react-bootstrap";
import {ImageComponentDetail} from "./ImageComponent";
import './ItemDetail.scss';
import Col from "react-bootstrap/Col";
import {storeImage} from "./ImageUtility";
import {Auth} from "aws-amplify";

export class ItemDetail extends Component {
    state = {
        id: '',
        item: null,
        userName: ''
    };

    constructor(props: any) {
        super(props);
        this.state = {
            id: props.match.params.id,
            item: null,
            userName: ''
        }
    }

    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            this.setState({userName: user.username});
            this.setState({item: await getItem(this.state.id) });
        } catch (error) {
            console.log('Mains error: ', error);
        }
    }

    setItemName(name: string) {
        let item:any = this.state.item;
        item.name = name;
        this.setState({item: item});
    }

    setItemDescription(description: string) {
        let item:any = this.state.item;
        item.description = description;
        this.setState({item: item});
    }

    async onImageChange(event: any) {
        const {target: {value, files}} = event;
        const fileForUpload = files[0];

        let item: any = this.state.item;
        item.image = await storeImage(fileForUpload, "mikesae", item.name);
        this.setState({item: item});
    }

    render() {
        const item:any = this.state.item;
        return(
            <>
            {item === null ?
                <>
                    <TopNavbar title="" showBackNav={false}/>
                    <Container className="container">
                        <FormGroup>
                            Loading...
                        </FormGroup>
                        <div className="spacer"/>
                    </Container>
                </>
                :
                <>
                    <TopNavbar title={item.name} showBackNav={true} backNav={item.category === 'Mains' ? '/mains' : '/sides'}/>
                    <Container>
                        <FormGroup>
                            <Row className="px-3 py-3">
                                <Col>
                                    <input type="file" name="file" id="file" className="input-file" onChange={event => this.onImageChange(event)} accept="image/png, image/jpeg"/>
                                    <label htmlFor="file">
                                        <ImageComponentDetail src={item.image}/>
                                    </label>
                                </Col>
                            </Row>
                            <Row className="px-3">
                                <FormLabel>Name</FormLabel>
                            </Row>
                            <Row className="px-3 pb-3">
                                <input type="text" placeholder="Name" className="" value={item.name ?? ""} onChange={e => this.setItemName(e.target.value)}/>
                            </Row>
                            <Row className="px-3">
                                <FormLabel>Description</FormLabel>
                            </Row>
                            <Row className="px-3 pb-3">
                                <input type="text" placeholder="Description" className="" value={item.description ?? ""} onChange={e => this.setItemDescription(e.target.value)}/>
                            </Row>
                        </FormGroup>
                    <div className="spacer"/>
                    </Container>
                </>
            }
            </>
        );
    }
}