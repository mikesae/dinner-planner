import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Planner.scss';
import TopNavbar from './TopNavbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import PlannerRow from './PlannerRow';
import {getPreviousStartDay, offsetDate} from "./DateFunctions";

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
                    <FontAwesomeIcon className="link-icon" icon={faChevronUp}/>
                </button>
                <span>&nbsp;{props.value}&nbsp;</span>
                <button className="btn btn-date-picker" onClick={props.onClick}>
                    <FontAwesomeIcon className="link-icon" icon={faCalendarAlt}/>
                </button>
                <button className="btn" onClick={() => this.onNextWeek()}>
                    <FontAwesomeIcon className="link-icon" icon={faChevronDown}/>
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
                        onChange={(date:Date) => this.props.startDateUpdater(getPreviousStartDay(date))}
                        customInput={<this.CustomInput/>}
                    />
                </TopNavbar>
                <Container>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 0)}/>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 1)}/>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 2)}/>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 3)}/>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 4)}/>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 5)}/>
                    <PlannerRow startDateUpdater={this.props.startDateUpdater} date={offsetDate(startDate, 6)}/>
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}