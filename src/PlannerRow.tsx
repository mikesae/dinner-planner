import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons/faWindowClose';
import Modal from 'react-modal';
import './PlannerRow.scss';
import {Container, FormGroup} from "react-bootstrap";

export interface IPlannerRowProps {
    title: string;
}

export default class PlannerRow extends Component<IPlannerRowProps> {
    state = {
        modalIsOpen : false
    };

    addMeal() {
        this.onOpenModal();
    }

    onOpenModal() {
        this.setState({modalIsOpen: true});
    }

    onCloseModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <Row className="planner-row">
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.onCloseModal()}
                    className="planner-modal"
                    >
                    <div>
                        <FontAwesomeIcon className="close-icon link-icon" size="2x" icon={faWindowClose}  onClick={() => this.onCloseModal()}/>
                    </div>
                    <div className="spacer"/>
                    <Container className="container">
                        <FormGroup>
                            <div>Choose a main:</div>
                            <div>Choose a side:</div>
                        </FormGroup>
                    </Container>
                </Modal>
                <Col className="col-2">
                    <label>{this.props.title}</label>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.addMeal()}/>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.addMeal()}/>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.addMeal()}/>
                    </div>
                </Col>
            </Row>
        )
    }
}