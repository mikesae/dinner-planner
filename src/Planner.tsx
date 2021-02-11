import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Planner.scss';
import TopNavbar from './TopNavbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import PlannerRow from './PlannerRow';

export default class Planner extends Component {
    state = {
        startDate : new Date()
    };

    changeStartDate(date: Date) {
        this.setState({startDate: date})
    }

    CustomInput = React.forwardRef<HTMLInputElement>((props: any, ref: any) =>
    {
        return(
            <div className="date-picker" ref={ref}>
                <button className="btn btn-date-picker" onClick={() => this.onPreviousWeek()}>
                    <FontAwesomeIcon className="link-icon" icon={faChevronLeft}/>
                </button>
                <span>&nbsp;{props.value}&nbsp;</span>
                <button className="btn btn-date-picker" onClick={() => this.onNextWeek()}>
                    <FontAwesomeIcon className="link-icon" icon={faChevronRight}/>
                </button>
                &nbsp;
                <button className="btn btn-date-picker" onClick={props.onClick}>
                    <FontAwesomeIcon className="link-icon" icon={faCalendar}/>
                </button>
            </div>
        );
    });

    onPreviousWeek() {
        let date = this.state.startDate;
        date.setDate(date.getDate() - 7);
        this.setState({startDate: date});
    }

    onNextWeek() {
        let date = this.state.startDate;
        date.setDate(date.getDate() + 7);
        this.setState({startDate: date});
    }

    dayNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    dayName(date: Date, offset: number):string {
        let offsetDate = new Date();

        offsetDate.setDate(date.getDate() + offset);
        return this.dayNames[offsetDate.getDay()];
    }

    render() {
        const startDate = this.state.startDate;

        return (
            <div className="page">
                <TopNavbar title={""} showBackNav={false}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date:Date) => this.changeStartDate(date)}
                        customInput={<this.CustomInput/>}
                    />
                </TopNavbar>
                <Container className="container">
                    <PlannerRow title={this.dayName(startDate, 0)}/>
                    <PlannerRow title={this.dayName(startDate, 1)}/>
                    <PlannerRow title={this.dayName(startDate, 2)}/>
                    <PlannerRow title={this.dayName(startDate, 3)}/>
                    <PlannerRow title={this.dayName(startDate, 4)}/>
                    <PlannerRow title={this.dayName(startDate, 5)}/>
                    <PlannerRow title={this.dayName(startDate, 6)}/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}