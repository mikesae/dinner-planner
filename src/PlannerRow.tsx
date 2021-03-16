import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import './PlannerRow.scss';
import AddToPlannerModal from "./AddToPlannerModal";
import {API, Auth} from "aws-amplify";
import * as queries from "./graphql/queries";
import {dateToExtendedISODate} from "aws-date-utils";

export interface IPlannerRowProps {
    date: Date;
}

interface IPlannerRowState {
    modalIsOpen: boolean;
    userName: string;
    items: any[];
    loading: boolean;
    mealDate: Date;
}

export default class PlannerRow extends Component<IPlannerRowProps,IPlannerRowState> {
    constructor(props: IPlannerRowProps) {
        super(props);
        this.state = {
            modalIsOpen: false,
            userName: '',
            items: [],
            mealDate: props.date,
            loading: true
        };
    }

    async listItems(date: Date) {
        const filter = {
            date: {
                eq: dateToExtendedISODate(date)
            },
            userName: {
                eq: this.state.userName
            },
            type: {
                eq: 'Dinner'
            }
        };
        const result:any = await API.graphql({query: queries.listMeals, variables: { filter: filter}});
        const meals:any = result.data.listMeals.items;
        let items = [{ id: 0}, {id: 0}, {id: 0}];

        if (meals.length > 0) {
            const meal = meals[0];

            for (let i:number = 0; i < meal.items.length; i += 1) {
                const result:any = await API.graphql({ query: queries.getItem, variables: { id: meal.items[i]}});
                const item:any = result.data.getItem;
                if (item !== null) {
                    items[i] = Object.assign({}, item);
                }
            }
        }
        this.setState({ items: items});
        this.setState({loading: false});
    }

    async componentDidMount() {
        try {
            this.setState({mealDate: this.props.date});
            this.setState({loading: true});
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            this.setState({userName: user.username});
            await this.listItems(this.state.mealDate);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    dayNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

    addMeal() {
        this.setState({modalIsOpen: false});
    }

    onOpenModal(addingFor: number) {
        this.setState({modalIsOpen: true});
    }

    onCloseModal() {
        this.setState({modalIsOpen: false});
    }

    dayName(date: Date):string {
        return this.dayNames[date.getDay()];
    }

    renderItem(item: any) {
        if (this.state.loading) {
            return(
                <div>
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faEllipsisH}/>
                    </div>
                    <label className="label-item">Loading...</label>
                </div>
            );
        }
        if (item.id === 0) {
            return(
                <div>
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(0)}/>
                    </div>
                    <label className="label-item">&nbsp;</label>
                </div>
            );
        }
        return(
            <div>
                <img className="img-item" src={item.image} alt=""/>
                <label className="label-item">{item.name}</label>
            </div>
        );
    }

    render() {
        const items:any = this.state.items;
        return (
            <Row className="planner-row">
                <AddToPlannerModal date={this.props.date} isOpen={this.state.modalIsOpen} OnOK={() => this.addMeal()} OnClose={() => this.onCloseModal()} />
                <Col className="col-2">
                    <label className="label-day">{this.dayName(this.props.date)}</label>
                </Col>
                <Col className="col-3">
                    {this.renderItem(items[0])}
                </Col>
                <Col className="col-3">
                    {this.renderItem(items[1])}
                </Col>
                <Col className="col-3">
                    {this.renderItem(items[2])}
                </Col>
            </Row>
        )
    }
}