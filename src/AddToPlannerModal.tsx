import React, {Component} from "react";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons/faWindowClose";
import {Container, Dropdown, FormGroup, FormLabel} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {API, Auth, graphqlOperation} from "aws-amplify";
import { createMeal } from './graphql/mutations';
import * as queries from "./graphql/queries";
import {dateToExtendedISODate} from 'aws-date-utils'

export interface IAddToPlannerModalProps {
    isOpen: boolean;
    OnOK: () => void;
    OnClose: () => void;
    date: Date;
}

interface IMealItem {
    id: number;
    name: string;
    image?: string;
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
            return {
                id: this.state.mains[this.state.selectedMain].id,
                name: this.state.mains[this.state.selectedMain].name
            };
        } else if (this.state.selectedMain !== -1) {
            return {
                id: this.state.mains[this.state.selectedMain].id,
                name: this.state.mains[this.state.selectedMain].name
            }
        }
        return {
            id: 0,
            name: ''
        }
    }

    async onAdd() {
        let selectedItem = this.getSelectedItem();
        if (selectedItem.id === 0) {
            return;
        }

        const meal = {
            date: dateToExtendedISODate(this.props.date),
            userName: this.state.userName,
            type: 'Dinner',
            items: [ selectedItem.id]
        };

        try {
            await API.graphql(graphqlOperation(createMeal, {input: meal}));
            this.props.OnOK();
        } catch (e) {
            console.log(`Error: ${e.toString()}`);
        }
    }

    render() {
        let mainTitle;
        let sideTitle;

        const idxMain = this.state.selectedMain;
        const idxSide = this.state.selectedSide;

        if (idxMain === -1) {
            mainTitle = <span>Choose a Main</span>;
        } else {
            mainTitle = <span><img className="img-item" src={this.state.mains[idxMain].image} alt=""/>{this.state.mains[idxMain].name}</span>;
        }
        if (idxSide === -1) {
            sideTitle = <span>Choose a Side</span>;
        } else {
            sideTitle = <span><img className="img-item" src={this.state.sides[idxSide].image} alt=""/>{this.state.sides[idxSide].name}</span>;
        }

        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.isOpen}
                onRequestClose={() => this.props.OnClose()}
                className="planner-modal"
            >
                <div>
                    <FontAwesomeIcon
                        className="close-icon link-icon"
                        size="2x"
                        icon={faWindowClose}
                        onClick={() => this.props.OnClose()}/>
                </div>
                <div className="spacer"/>
                <Container>
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
            </Modal>
        )
    }
}