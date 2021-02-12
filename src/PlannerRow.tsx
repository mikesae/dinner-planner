import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import './PlannerRow.scss';
import AddToPlannerModal from "./AddToPlannerModal";

export interface IPlannerRowProps {
    date: Date;
}

export default class PlannerRow extends Component<IPlannerRowProps> {
    state = {
        modalIsOpen: false,
        addingFor: 0
    };

    dayNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

    addMeal() {
        this.setState({modalIsOpen: false});
       // add meal for addingfor
    }

    onOpenModal(addingFor: number) {
        this.setState({modalIsOpen: true, addingFor: addingFor});
    }

    onCloseModal() {
        this.setState({modalIsOpen: false});
    }

    dayName(date: Date):string {
        return this.dayNames[date.getDay()];
    }

    render() {
        return (
            <Row className="planner-row">
                <AddToPlannerModal isOpen={this.state.modalIsOpen} OnOK={() => this.addMeal()} OnClose={() => this.onCloseModal()} />
                <Col className="col-2">
                    <label>{this.dayName(this.props.date)}</label>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(0)}/>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(1)}/>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(2)}/>
                    </div>
                </Col>
            </Row>
        )
    }
}