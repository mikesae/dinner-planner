import React from "react";
import TopNavbar from './TopNavbar';
import { Container, FormGroup } from 'react-bootstrap';

const Planner: React.FC = () => (
    <div className="page">
        <TopNavbar title="Planner" showBackNav={false}/>
        <Container className="container">
            <FormGroup>
                <h1>Planner coming RSN</h1>
            </FormGroup>
            <div className="spacer"/>
        </Container>
    </div>
);

export default Planner;