import React, {Component} from "react";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons/faWindowClose";
import {Container, FormGroup} from "react-bootstrap";

export interface IAddToPlannerModalProps {
    isOpen: boolean;
    OnOK: () => void;
    OnClose: () => void;
}

export default class AddToPlannerModal extends Component<IAddToPlannerModalProps> {
    render() {
        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.isOpen}
                onRequestClose={() => this.props.OnClose()}
                className="planner-modal"
            >
                <div>
                    <FontAwesomeIcon
                        className="close-icon link-icon"
                        size="2x"
                        icon={faWindowClose}
                        onClick={() => this.props.OnClose()}/>
                </div>
                <div className="spacer"/>
                <Container className="container">
                    <FormGroup>
                        <div>Choose a main:</div>
                        <div>Choose a side:</div>
                        <button className="btn btn-primary" onClick={() => this.props.OnOK()}>Add</button>
                    </FormGroup>
                </Container>
            </Modal>
        )
    }
}