import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import './PlannerRow.scss';
import AddToPlannerModal from "./AddToPlannerModal";
import {API, Auth} from "aws-amplify";
import * as queries from "./graphql/queries";

export interface IPlannerRowProps {
    date: Date;
}

interface IPlannerRowState {
    modalIsOpen: boolean;
    userName: string;
    items: any[];
}

export default class PlannerRow extends Component<IPlannerRowProps,IPlannerRowState> {
    constructor(props: IPlannerRowProps) {
        super(props);

        this.state = {
            modalIsOpen: false,
            userName: '',
            items: []
        };
    }

    async listItems(date: Date) {
        const filter = {
            date: {
                eq: date
            },
            userName: {
                eq: this.state.userName
            }
        };
        const items = await API.graphql({query: queries.listMeals, variables: { filter: filter}});
        // @ts-ignore
        this.setState({ items: items.data.listMeals.items });
    }

    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            this.setState({userName: user.username});
            await this.listItems(this.props.date);
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

    render() {
        return (
            <Row className="planner-row">
                <AddToPlannerModal date={this.props.date} isOpen={this.state.modalIsOpen} OnOK={() => this.addMeal()} OnClose={() => this.onCloseModal()} />
                <Col className="col-3">
                    <label>{this.dayName(this.props.date)}</label>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(0)}/>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(1)}/>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className="meal-placeholder">
                        <FontAwesomeIcon className="link-icon" icon={faPlusCircle} onClick={() => this.onOpenModal(2)}/>
                    </div>
                </Col>
            </Row>
        )
    }
}