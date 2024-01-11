import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import TopNavbar from 'components/navbars/top-navbar/TopNavbar';
import { addItemToMeal, removeItemFromMeal } from 'data/api/MealFunctions';
import { FunctionComponent, forwardRef } from 'react';
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

  async function onDragEnd(e: any) {
    const fromDate = e.active.data.current.date;
    const fromMealId = e.active.data.current.mealId;
    const fromUpdate = e.active.data.current.updateMeal;

    // non-event (probably a click)
    if (e.over === null) {
      console.log(`onDragEnd: click in place.`);
      return;
    }

    const toDate = e.over.data.current.date;
    const toMealId = e.over.data.current.mealId;
    const toUpdate = e.over.data.current.updateMeal;

    if (fromDate === toDate) {
      console.log(`Can't drag item placeholder with same date.`);
      return;
    }

    console.log(`Dragging ${e.active.data.current.name} from ${fromDate.toDateString()} to ${toDate.toDateString()}`);

    const itemId = e.active.data.current.id;

    // Remove active item from current meal and re-render
    await removeItemFromMeal(fromMealId, itemId);
    if (typeof fromUpdate === 'function') {
      fromUpdate();
    }

    // Add active item to over date.
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    await addItemToMeal(itemId, toMealId, toDate, user.userName);
    if (typeof toUpdate === 'function') {
      toUpdate();
    }
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
