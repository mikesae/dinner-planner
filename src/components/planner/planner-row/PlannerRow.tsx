import { GraphQLQuery } from '@aws-amplify/api';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API, Auth } from 'aws-amplify';
import { dateToExtendedISODate } from 'aws-date-utils';
import UpdatePlannerModal from 'components/modals/update-item/UpdatePlannerModal';
import PlannerItem from 'components/planner/planner-row/planner-item/PlannerItem';
import { ListMealsQuery } from 'data/api/API';
import * as queries from 'data/graphql/queries';
import { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './PlannerRow.scss';

export interface IPlannerRowProps {
  date: Date;
  startDateUpdater: (date: Date) => void;
}

interface IPlannerRowState {
  modalIsOpen: boolean;
  items: any[];
  meal: any;
  clickedItemId: string;
}

export default class PlannerRow extends Component<IPlannerRowProps, IPlannerRowState> {
  constructor(props: IPlannerRowProps) {
    super(props);
    this.state = {
      modalIsOpen: false,
      items: [],
      meal: {},
      clickedItemId: '',
    };
  }

  async updateMealItemIds(items: any) {
    let updatedItems = [];
    for (let i: number = 0; i < items.length; i += 1) {
      const result: any = await API.graphql({
        query: queries.getItem,
        variables: { id: items[i] },
      });
      const item: any = result.data.getItem;
      if (item !== null) {
        updatedItems.push(item);
      }
    }
    this.setState({ items: updatedItems });
  }

  async updateMeal(date: any) {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: false });

    let isoDate = dateToExtendedISODate(date);
    isoDate = isoDate.substring(0, isoDate.length - 6);
    const filter = {
      date: {
        eq: isoDate,
      },
      userName: {
        eq: user.username,
      },
      type: {
        eq: 'Dinner',
      },
    };
    const result: any = await API.graphql<GraphQLQuery<ListMealsQuery>>({
      query: queries.listMeals,
      variables: { filter: filter, limit: 365, nextToken: null },
    });
    const meals: any = result.data.listMeals.items;
    if (meals.length > 0) {
      const meal = meals[0];
      this.setState({ meal: meal });
      await this.updateMealItemIds(meal.items);
    } else {
      this.setState({ meal: {} });
      await this.updateMealItemIds([]);
    }
  }

  async componentDidMount() {
    try {
      await this.updateMeal(this.props.date);
    } catch (error) {
      console.log('PlannerRow error: ', error);
    }
  }

  async componentDidUpdate(prevProps: IPlannerRowProps) {
    if (prevProps.date !== this.props.date) {
      await this.updateMeal(this.props.date);
    }
  }

  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  async onOkUpdateMeal(date: any) {
    await this.updateMeal(date);
    this.setState({ modalIsOpen: false });
  }

  onOpenModal() {
    this.setState({ modalIsOpen: true });
  }

  onCloseModal() {
    this.setState({ modalIsOpen: false });
  }

  dayName(date: Date): string {
    return this.dayNames[date.getDay()];
  }

  onItemClick(id: string) {
    this.setState({ clickedItemId: id });
    this.onOpenModal();
  }

  onAddItemClick() {
    this.setState({ clickedItemId: '' });
    this.onOpenModal();
  }

  sameDay(dateA: Date, dateB: Date) {
    return (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    );
  }

  dayLabel(date: Date) {
    const isToday: boolean = this.sameDay(date, new Date());
    const labelText = this.dayName(date);
    const dateText = `${date.getMonth() + 1}/${date.getDate()}`;
    return (
      <label onClick={() => this.props.startDateUpdater(date)} className={'label-day' + (isToday ? ' label-day-today' : '')}>
        {labelText}
        <br />
        {dateText}
      </label>
    );
  }

  render() {
    const items: any = this.state.items;

    return (
      <Row className='row-planner'>
        <UpdatePlannerModal
          date={this.props.date}
          mealId={this.state.meal.id}
          itemId={this.state.clickedItemId}
          isOpen={this.state.modalIsOpen}
          OnOK={() => this.onOkUpdateMeal(this.props.date)}
          OnClose={() => this.onCloseModal()}
        />
        <Col className='col-day'>{this.dayLabel(this.props.date)}</Col>
        {items.map((item: any) => (
          <Col className='col-planner-item img-col' key={item.id} onClick={() => this.onItemClick(item.id)}>
            <PlannerItem imageSrc={item.image} name={item.name} />
          </Col>
        ))}
        {items.length < 4 && (
          <Col className='col-planner-item'>
            <div className='meal-placeholder planner-row-item'>
              <FontAwesomeIcon className='link-icon' icon={faPlusCircle} onClick={() => this.onAddItemClick()} />
            </div>
          </Col>
        )}
      </Row>
    );
  }
}
