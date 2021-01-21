import React from "react";
import TopNavbar from './TopNavbar';
import './Profile.scss';
import { Container, FormGroup } from 'react-bootstrap';
import {AmplifySignOut} from "@aws-amplify/ui-react";

const Profile: React.FC = () => (
    <div className="page">
        <TopNavbar title="Profile" showBackNav={true}/>
        <Container className="container">
            <FormGroup>
                <div className="row">
                    <div className="col-2 offset-4">
                        <AmplifySignOut/>
                    </div>
                </div>
            </FormGroup>
            <div className="spacer"/>
        </Container>
    </div>
);

export default Profile;