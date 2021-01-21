import React, {Suspense} from "react";
import TopNavbar from './TopNavbar';
import { Container, FormGroup } from 'react-bootstrap';
import {AmplifySignOut} from "@aws-amplify/ui-react";

const Profile: React.FC = () => (
    <div className="page">
        <TopNavbar title="Profile" showBackNav={true}/>
        <Container className="container">
            <FormGroup>
                <h1>Profile coming RSN</h1>
                <AmplifySignOut/>
            </FormGroup>
            <div className="spacer"/>
        </Container>
    </div>
);

export default Profile;