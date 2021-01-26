import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import './Profile.scss';
import { Container, FormGroup } from 'react-bootstrap';
import {AmplifySignOut} from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

export default class Profile extends Component {
    state = {
        userName: '',
        email: ''
    };

    componentDidMount() {
        Auth.currentAuthenticatedUser({
            bypassCache: true
        }).then(user => this.setState({userName: user.username, email: user.attributes.email}));
    }

    render() {
        return (
            <div className="page">
                <TopNavbar title="Profile" showBackNav={true}/>
                <Container className="container">
                    <FormGroup>
                        <div className="form-label">Username: <b>{this.state.userName}</b></div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-label">Email: <b>{this.state.email}</b></div>
                    </FormGroup>
                    <FormGroup>
                        <AmplifySignOut/>
                    </FormGroup>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}