import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import { Container } from 'react-bootstrap';
import { ItemsForm } from './ItemsForm';

export default class Desserts extends Component {
    render() {
        return (
            <div className="page mains-and-sides">
                <TopNavbar title="Desserts" showBackNav={true}/>
                <Container>
                    <ItemsForm category='Desserts'/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}