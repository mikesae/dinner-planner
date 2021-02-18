import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
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

    offsetDate(date: Date, offset: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + offset);
        return result;
    }

    onPreviousWeek() {
        this.setState({startDate: this.offsetDate(this.state.startDate, -7)});
    }

    onNextWeek() {
        this.setState({startDate: this.offsetDate(this.state.startDate, 7)});
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
                    <PlannerRow date={this.offsetDate(startDate, 0)}/>
                    <PlannerRow date={this.offsetDate(startDate, 1)}/>
                    <PlannerRow date={this.offsetDate(startDate, 2)}/>
                    <PlannerRow date={this.offsetDate(startDate, 3)}/>
                    <PlannerRow date={this.offsetDate(startDate, 4)}/>
                    <PlannerRow date={this.offsetDate(startDate, 5)}/>
                    <PlannerRow date={this.offsetDate(startDate, 6)}/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}