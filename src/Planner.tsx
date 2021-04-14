import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Planner.scss';
import TopNavbar from './TopNavbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import PlannerRow from './PlannerRow';

export default class Planner extends Component {
    getPreviousMonday(date:Date) {
        date.setDate(date.getDate() + 1 - (date.getDay() || 7));
        return date;
    }
    state = {
        startDate : this.getPreviousMonday(new Date())
    };

    changeStartDate(date: Date) {
        this.setState({startDate: this.getPreviousMonday(date)})
    }

    CustomInput = React.forwardRef<HTMLInputElement>((props: any, ref: any) =>
    {
        return(
            <div className="date-picker" ref={ref}>
                <button className="btn" onClick={() => this.onPreviousWeek()}>
                    <FontAwesomeIcon className="fa-2x link-icon" icon={faChevronUp}/>
                </button>
                <span>&nbsp;{props.value}&nbsp;</span>
                <button className="btn btn-date-picker" onClick={props.onClick}>
                    <FontAwesomeIcon className="fa-2x link-icon" icon={faCalendar}/>
                </button>
                <button className="btn" onClick={() => this.onNextWeek()}>
                    <FontAwesomeIcon className="fa-2x link-icon" icon={faChevronDown}/>
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