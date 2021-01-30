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
                <button className="btn-date-picker" onClick={() => this.onPreviousWeek()}>
                    <FontAwesomeIcon className="link-icon" icon={faChevronLeft}/>
                </button>
                &nbsp;{props.value}&nbsp;
                <button className="btn-date-picker" onClick={() => this.onNextWeek()}>
                    <FontAwesomeIcon className="link-icon" icon={faChevronRight}/>
                </button>
                &nbsp;
                <button className="btn-date-picker" onClick={props.onClick}>
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

    render() {
        return (
            <div className="page">
                <TopNavbar title={""} showBackNav={false}>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={(date:Date) => this.changeStartDate(date)}
                        customInput={<this.CustomInput/>}
                    />
                </TopNavbar>
                <div className="spacer"/>
                <Container className="container">
                    <div className="spacer"/>
                </Container>
            </div>
        )
    }
}