import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopNavbar from 'components/navbars/top-navbar/TopNavbar';
import { FunctionComponent, forwardRef } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getPreviousStartDay, offsetDate } from 'utils/DateFunctions';
import { onDragEnd } from 'utils/DragAndDrop';
import './Planner.scss';
import PlannerRow from './planner-row/PlannerRow';

export interface IPlannerProps {
  startDate: Date;
  startDateUpdater: (date: Date) => void;
  desiredRowCount: number;
}

const Planner: FunctionComponent<IPlannerProps> = ({ startDate, startDateUpdater, desiredRowCount }) => {
  const CustomInput: any = forwardRef<HTMLInputElement>((props: any, ref: any) => {
    return (
      <div className='date-picker' ref={ref}>
        <button className='no-focus nudge-top' onClick={() => onPreviousWeek()}>
          <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faChevronUp} />
        </button>
        <span onClick={props.onClick}>
          &nbsp;{props.value}&nbsp;
          <button className='button-date-picker'>
            <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faCalendarAlt} />
          </button>
        </span>
        <button className='no-focus' onClick={() => onNextWeek()}>
          <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faChevronDown} />
        </button>
      </div>
    );
  });

  function onPreviousWeek() {
    startDateUpdater(offsetDate(startDate, -7));
  }

  function onNextWeek() {
    startDateUpdater(offsetDate(startDate, 7));
  }

  function plannerRows() {
    return Array.from({ length: desiredRowCount }, (_, offset) => (
      <PlannerRow
        key={offsetDate(startDate, offset).toDateString()}
        startDateUpdater={startDateUpdater}
        date={offsetDate(startDate, offset)}
      />
    ));
  }

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <div className='page'>
      <TopNavbar title={''} showBackNav={false}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => startDateUpdater(getPreviousStartDay(date))}
          customInput={<CustomInput />}
        />
      </TopNavbar>
      <Container>
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          {plannerRows()}
        </DndContext>
      </Container>
    </div>
  );
};

export default Planner;
