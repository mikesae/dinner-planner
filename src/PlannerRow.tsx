import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import './PlannerRow.scss';
import AddToPlannerModal from "./AddToPlannerModal";
import {API, Auth, graphqlOperation} from "aws-amplify";
import * as queries from "./graphql/queries";
import {dateToExtendedISODate} from "aws-date-utils";
import {updateMeal} from "./graphql/mutations";

export interface IPlannerRowProps {
    date: Date;
}

interface IPlannerRowState {
    modalIsOpen: boolean;
    userName: string;
    items: any[];
    meal: any;
    loading: boolean;
}

export default class PlannerRow extends Component<IPlannerRowProps, IPlannerRowState> {
    constructor(props: IPlannerRowProps) {
        super(props);
        this.state = {
            modalIsOpen: false,
            userName: '',
            items: [],
            meal: {},
            loading: true
        };
    }

    async updateMealItemIds(items: any) {
        let updatedItems = [];
        for (let i:number = 0; i < items.length; i += 1) {
            const result:any = await API.graphql({ query: queries.getItem, variables: { id: items[i]}});
            const item:any = result.data.getItem;
            if (item !== null) {
                updatedItems.push(item);
            }
        }
        this.setState({ items: updatedItems});
    }

    async updateMeal() {
        this.setState({loading: true});
        const filter = {
            date: {
                eq: dateToExtendedISODate(this.props.date)
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

        if (meals.length > 0) {
            const meal = meals[0];
            this.setState({ meal: meal});
            await this.updateMealItemIds(meal.items);
        } else {
            await this.updateMealItemIds([]);
        }

        this.setState({loading: false});
    }

    async componentDidMount() {
        try {
            this.setState({loading: true});
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            this.setState({userName: user.username});
            await this.updateMeal();
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async componentDidUpdate(prevProps: IPlannerRowProps) {
        if (prevProps.date !== this.props.date) {
            await this.updateMeal();
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

    async addMeal() {
        this.setState({modalIsOpen: false});
        await this.updateMeal();
    }

    onOpenModal() {
        this.setState({modalIsOpen: true});
    }

    onCloseModal() {
        this.setState({modalIsOpen: false});
    }

    dayName(date: Date):string {
        return this.dayNames[date.getDay()];
    }

    async removeItemFromMeal(id: string) {
        try {
            let meal = this.state.meal;
            let updatedMeal = {
                id: meal.id,
                date: meal.date,
                userName: meal.userName,
                type: meal.type,
                items: []
            };

            meal.items.forEach((item:string) => {
                if (item !== id) {
                    // @ts-ignore
                    updatedMeal.items.push(item);
                }
            });
            await API.graphql(graphqlOperation(updateMeal, {input: updatedMeal}));
            await this.updateMeal();
        } catch (e) {
            console.log(`Error: ${e.toString()}`);
        }
    }

    async onItemClick(id: string) {
        // TODO: Put up menu for delete / view.
        await this.removeItemFromMeal(id);
    }

    renderItem(item: any, key: number) {
        return (
            <Col className="col-3 img-col" key={key}>
                <img className="img-item" src={item.image} alt="" onClick={() => this.onItemClick(item.id)}/>
                <label className="label-item">{item.name}</label>
            </Col>
        );
    }

    render() {
        const items:any = this.state.items;
        return (
            <Row className="planner-row">
                <AddToPlannerModal date={this.props.date} mealId={this.state.meal.id} isOpen={this.state.modalIsOpen} OnOK={() => this.addMeal()} OnClose={() => this.onCloseModal()} />
                <Col className="col-2">
                    <label className="label-day">{this.dayName(this.props.date)}</label>
                </Col>
                {
                    items.map((item:any, index:number) => (
                        this.renderItem(item, index)
                    ))
                }
                {
                    items.length < 3 &&
                    <Col className="col-3">
                        <div className="meal-placeholder">
                            <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal()}/>
                        </div>
                        <label className="label-item">&nbsp;</label>
                    </Col>
                }
            </Row>
        )
    }
}