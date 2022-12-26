import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import './MainsAndSides.scss';
import { Container } from 'react-bootstrap';
import { ItemsForm } from './ItemsForm';

export default class Sides extends Component {
    render() {
        return (
            <div className="page mains-and-sides">
                <TopNavbar title="Sides" showBackNav={true}/>
                <Container className="container">
                    <ItemsForm category='Sides'/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}