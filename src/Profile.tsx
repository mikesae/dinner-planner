import React from "react";
import TopNavbar from './TopNavbar';
import { Container, FormGroup } from 'react-bootstrap';

const Profile: React.FC = () => (
    <div className="page">
        <TopNavbar title="Profile" showBackNav={true}/>
        <Container className="container">
            <FormGroup>
                <h1>Profile coming RSN</h1>
            </FormGroup>
            <div className="spacer"/>
        </Container>
    </div>
);

export default Profile;