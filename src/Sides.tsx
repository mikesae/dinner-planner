import React from "react";
import TopNavbar from './TopNavbar';
import { Container, FormGroup } from 'react-bootstrap';

const Sides: React.FC = () => (
    <div className="page">
        <TopNavbar title="Sides" showBackNav={true}/>
        <Container className="container">
            <FormGroup>
                <h1>Sides coming RSN</h1>
            </FormGroup>
            <div className="spacer"/>
        </Container>
    </div>
);

export default Sides;