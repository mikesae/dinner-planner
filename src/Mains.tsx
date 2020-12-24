import React from "react";
import TopNavbar from './TopNavbar';
import { Container, FormGroup } from 'react-bootstrap';

const Mains: React.FC = () => (
    <div className="page">
        <TopNavbar title="Mains" showBackNav={true}/>
        <Container className="container">
            <FormGroup>
                <h1>Mains coming RSN</h1>
            </FormGroup>
            <div className="spacer"/>
        </Container>
    </div>
);

export default Mains;