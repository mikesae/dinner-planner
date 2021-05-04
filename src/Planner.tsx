import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Planner.scss';
import TopNavbar from './TopNavbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import PlannerRow from './PlannerRow';
import {getPreviousMonday, offsetDate} from "./DateFunctions";

export interface IPlannerProps {
    startDate: Date;
    startDateUpdater: (date: Date) => void;
}

export default class Planner extends Component<IPlannerProps> {
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

    onPreviousWeek() {
        this.props.startDateUpdater(offsetDate(this.props.startDate, -7));
    }

    onNextWeek() {
        this.props.startDateUpdater(offsetDate(this.props.startDate, 7));
    }

    render() {
        const startDate = this.props.startDate;

        return (
            <div className="page">
                <TopNavbar title={""} showBackNav={false}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date:Date) => this.props.startDateUpdater(getPreviousMonday(date))}
                        customInput={<this.CustomInput/>}
                    />
                </TopNavbar>
                <Container className="container">
                    <PlannerRow date={offsetDate(startDate, 0)}/>
                    <PlannerRow date={offsetDate(startDate, 1)}/>
                    <PlannerRow date={offsetDate(startDate, 2)}/>
                    <PlannerRow date={offsetDate(startDate, 3)}/>
                    <PlannerRow date={offsetDate(startDate, 4)}/>
                    <PlannerRow date={offsetDate(startDate, 5)}/>
                    <PlannerRow date={offsetDate(startDate, 6)}/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}