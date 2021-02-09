import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

export interface IPlannerRowProps {
    title: string;
}

export default class PlannerRow extends Component<IPlannerRowProps> {
    addMeal() {
        return;
    }

    render() {
        return (
            <Row className="planner-row">
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