import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopNavbar from 'components/navbars/top-navbar/TopNavbar';
import { Component, forwardRef } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getPreviousStartDay, offsetDate } from 'utils/DateFunctions';
import './Planner.scss';
import PlannerRow from './planner-row/PlannerRow';

export interface IPlannerProps {
  startDate: Date;
  startDateUpdater: (date: Date) => void;
  desiredRowCount: number;
}

export default class Planner extends Component<IPlannerProps> {
  CustomInput = forwardRef<HTMLInputElement>((props: any, ref: any) => {
    return (
      <div className='date-picker' ref={ref}>
        <button className='no-focus nudge-top' onClick={() => this.onPreviousWeek()}>
          <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faChevronUp} />
        </button>
        <span onClick={props.onClick}>
          &nbsp;{props.value}&nbsp;
          <button className='button-date-picker'>
            <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faCalendarAlt} />
          </button>
        </span>
        <button className='no-focus' onClick={() => this.onNextWeek()}>
          <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faChevronDown} />
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

  plannerRows() {
    return Array.from({ length: this.props.desiredRowCount }, (_, offset) => (
      <PlannerRow
        key={offsetDate(this.props.startDate, offset).toDateString()}
        startDateUpdater={this.props.startDateUpdater}
        date={offsetDate(this.props.startDate, offset)}
      />
    ));
  }

  render() {
    const startDate = this.props.startDate;

    return (
      <div className='page'>
        <TopNavbar title={''} showBackNav={false}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => this.props.startDateUpdater(getPreviousStartDay(date))}
            customInput={<this.CustomInput />}
          />
        </TopNavbar>
        <Container>
          <>{this.plannerRows()}</>
        </Container>
      </div>
    );
  }
}
