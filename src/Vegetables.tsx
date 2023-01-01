import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import { Container } from 'react-bootstrap';
import { ItemsForm } from './ItemsForm';

export default class Vegetables extends Component {
    render() {
        return (
            <div className="page mains-and-sides">
                <TopNavbar title="Vegetables" showBackNav={true}/>
                <Container>
                    <ItemsForm category='Vegetables'/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}