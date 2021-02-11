import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons/faWindowClose';
import 'react-responsive-modal/styles.css';
// @ts-ignore
import { Modal } from 'react-responsive-modal';
import './PlannerRow.scss';
import {Container, FormGroup} from "react-bootstrap";

export interface IPlannerRowProps {
    title: string;
}

export default class PlannerRow extends Component<IPlannerRowProps> {
    state = {
        modalOpen : false
    };

    addMeal() {
        this.onOpenModal();
    }

    onOpenModal() {
        this.setState({modalOpen: true});
    }

    onCloseModal() {
        this.setState({modalOpen: false});
    }

    closeIcon = (
        <FontAwesomeIcon className="close-icon" icon={faWindowClose}/>
    )

    render() {
        return (
            <Row className="planner-row">
                <Modal
                    open={this.state.modalOpen}
                    onClose={() => this.onCloseModal()}
                    center
                    closeIcon={this.closeIcon}
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                    }}>
                    <Container className="container">
                        <FormGroup>
                            <div className="spacer"/>
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