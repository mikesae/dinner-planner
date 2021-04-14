import React, {Component} from "react";
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import {Container, Dropdown, FormGroup, FormLabel} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createMeal, updateMeal} from './graphql/mutations';
import * as queries from "./graphql/queries";
import {dateToExtendedISODate} from 'aws-date-utils'
import {getMeal} from "./graphql/queries";
import './Modal.scss';
import ImageComponent from "./ImageComponent";

export interface IAddToPlannerModalProps {
    isOpen: boolean;
    OnOK: () => void;
    OnClose: () => void;
    date: Date;
    mealId?: string;
}

interface IMealItem {
    id: number;
    name: string;
    image: string;
}

interface IAddToPlannerModalState {
    userName: string;
    selectedMain: number;
    selectedSide: number;
    mains: IMealItem[];
    sides: IMealItem[];
}

export default class AddToPlannerModal extends Component<IAddToPlannerModalProps, IAddToPlannerModalState> {
    constructor(props: IAddToPlannerModalProps) {
        super(props);
        this.state = {
            userName: '',
            selectedMain: -1,
            selectedSide: -1,
            mains: [],
            sides: []
        };
    }

    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            this.setState({userName: user.username});
            const mains = await this.getItems('Mains', user.username);
            this.setState({mains: mains});
            const sides = await this.getItems('Sides', user.username);
            this.setState({sides: sides});
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async getItems(category: string, userName: string) {
        const filter = {
            category: {
                eq: category
            },
            userName: {
                eq: userName
            }
        };
        const items:any = await API.graphql({query: queries.listItems, variables: { filter: filter}});
        return items.data.listItems.items;
    }

    onMainPicked(idxItem: number) {
        this.setState({selectedMain: idxItem, selectedSide: -1});
    }

    onSidePicked(idxItem: number) {
        this.setState({selectedMain: -1, selectedSide: idxItem});
    }

    getSelectedItem(): IMealItem {
        if (this.state.selectedMain !== -1) {
            return {...this.state.mains[this.state.selectedMain]};
        } else if (this.state.selectedSide !== -1) {
            return {...this.state.sides[this.state.selectedSide]};
        }
        return {id: 0, name: '', image: ''};
    }

    async onAdd() {
        let selectedItem = this.getSelectedItem();
        if (selectedItem.id === 0) {
            return;
        }

        try {
            if (typeof this.props.mealId !== 'undefined') {
                const getResult:any = await API.graphql(graphqlOperation(getMeal, { id: this.props.mealId }));
                let items = getResult.data.getMeal.items;
                items.push(selectedItem.id);
                const meal = {
                    id: this.props.mealId,
                    date: dateToExtendedISODate(this.props.date),
                    userName: this.state.userName,
                    type: 'Dinner',
                    items: items
                };
                await API.graphql(graphqlOperation(updateMeal, {input: meal}));
            } else {
                const meal = {
                    date: dateToExtendedISODate(this.props.date),
                    userName: this.state.userName,
                    type: 'Dinner',
                    items: [ selectedItem.id]
                };
                await API.graphql(graphqlOperation(createMeal, {input: meal}));
            }
        } catch (e) {
            console.log(`Error: ${e.toString()}`);
        }
        this.props.OnOK();
    }

    render() {
        let mainTitle;
        let sideTitle;

        const idxMain = this.state.selectedMain;
        const idxSide = this.state.selectedSide;

        if (idxMain === -1) {
            mainTitle = <span>Choose a Main</span>;
        } else {
            mainTitle = <span><ImageComponent src={this.state.mains[idxMain].image}/>{this.state.mains[idxMain].name}</span>;
        }
        if (idxSide === -1) {
            sideTitle = <span>Choose a Side</span>;
        } else {
            sideTitle = <span><ImageComponent src={this.state.sides[idxSide].image}/>{this.state.sides[idxSide].name}</span>;
        }

        return (
            <Rodal
                visible={this.props.isOpen}
                onClose={() => this.props.OnClose()}
                animation="slideUp"
                duration={1000}
                measure="%"
                width={100}
                height={88}
            >
                <div className="spacer"/>
                <Container className="planner-modal">
                    <FormGroup>
                        <DropdownButton title={mainTitle}>
                            {
                                this.state.mains.map((item: any, index: number) => (
                                    <Dropdown.Item key={item.id} onSelect={() => this.onMainPicked(index)}>
                                        <img className="img-item" src={item.image} alt=""/>{item.name}
                                    </Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <FormLabel>OR</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <DropdownButton title={sideTitle}>
                            {
                                this.state.sides.map((item: any, index: number) => (
                                    <Dropdown.Item key={item.id} onSelect={() => this.onSidePicked(index)}>
                                        <img className="img-item" src={item.image} alt=""/>{item.name}
                                    </Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <button className="btn btn-primary btn-on-bottom" onClick={() => this.onAdd()}>Add</button>
                    </FormGroup>
                </Container>
            </Rodal>
        )
    }
}