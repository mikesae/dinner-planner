import React, { Component } from "react";
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import { Container, Dropdown, FormGroup, FormLabel } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createMeal } from './graphql/mutations';
import { dateToExtendedISODate } from 'aws-date-utils'
import './Modal.scss';
import ImageComponent from "./ImageComponent";
import Row from "react-bootstrap/Row";
import { getSortedItems } from "./itemQueries";
import { getMealItemIds, updateMealItems } from "./MealFunctions";


export interface IUpdatePlannerModalProps {
    isOpen: boolean;
    OnOK: () => void;
    OnClose: () => void;
    date: Date;
    mealId?: string;
    itemId: string;
}

interface IMealItem {
    id: number;
    name: string;
    image: string;
}

interface IUpdatePlannerModalState {
    userName: string;
    selectedMain: number;
    selectedSide: number;
    mains: IMealItem[];
    sides: IMealItem[];
}

export default class UpdatePlannerModal extends Component<IUpdatePlannerModalProps, IUpdatePlannerModalState> {
    constructor(props: IUpdatePlannerModalProps) {
        super(props);
        this.state = {
            userName: '',
            selectedMain: -1,
            selectedSide: -1,
            mains: [],
            sides: [],
        };
    }

    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
            this.setState({ userName: user.username });
            this.setState({ mains: await getSortedItems(user.username, 'Mains') });
            this.setState({ sides: await getSortedItems(user.username, 'Sides') });
        } catch (error) {
            console.log('error: ', error);
        }
    }

    onMainPicked(idxItem: number) {
        this.setState({ selectedMain: idxItem, selectedSide: -1 });
    }

    onSidePicked(idxItem: number) {
        this.setState({ selectedMain: -1, selectedSide: idxItem });
    }

    getSelectedItem(): IMealItem {
        if (this.state.selectedMain !== -1) {
            return { ...this.state.mains[this.state.selectedMain] };
        } else if (this.state.selectedSide !== -1) {
            return { ...this.state.sides[this.state.selectedSide] };
        }
        return { id: 0, name: '', image: '' };
    }

    async onReplace() {
        let selectedItem = this.getSelectedItem();
        if (selectedItem.id === 0) {
            return;
        }
        const itemIds: string[] = await getMealItemIds(this.props.mealId);
        let newItemIds: string[] = [];
        itemIds.forEach((itemId: string) => {
            if (itemId === this.props.itemId) {
                newItemIds.push(String(selectedItem.id));
            } else {
                newItemIds.push(itemId);
            }
        })
        await updateMealItems(newItemIds, this.props.mealId);
        this.props.OnOK();
    }

    async onRemove() {
        try {
            const itemIds = await getMealItemIds(this.props.mealId);
            let newItemIds: string[] = [];
            itemIds.forEach((itemId: string) => {
                if (itemId !== this.props.itemId) {
                    newItemIds.push(itemId);
                }
            });
            await updateMealItems(newItemIds);
        } catch (e) {
            console.log(`Error: ${e.toString()}`);
        }
        this.props.OnOK();
    }

    async onAdd() {
        let selectedItem = this.getSelectedItem();
        if (selectedItem.id === 0) {
            return;
        }

        try {
            if (typeof this.props.mealId !== 'undefined') {
                const itemIds = await getMealItemIds(this.props.mealId);
                itemIds.push(selectedItem.id);
                await updateMealItems(itemIds, this.props.mealId);
            } else {
                const meal = {
                    date: dateToExtendedISODate(this.props.date),
                    userName: this.state.userName,
                    type: 'Dinner',
                    items: [selectedItem.id]
                };
                await API.graphql(graphqlOperation(createMeal, { input: meal }));
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
        const addingItem = this.props.itemId === '';

        if (idxMain === -1) {
            mainTitle = <span>Choose a Main</span>;
        } else {
            mainTitle = <span><ImageComponent src={this.state.mains[idxMain].image} />{this.state.mains[idxMain].name}</span>;
        }
        if (idxSide === -1) {
            sideTitle = <span>Choose a Side</span>;
        } else {
            sideTitle = <span><ImageComponent src={this.state.sides[idxSide].image} />{this.state.sides[idxSide].name}</span>;
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
                <div className="spacer" />
                <Container className="planner-modal">
                    {!addingItem &&
                        <FormGroup>
                            <button className="btn btn-primary btn-on-bottom" onClick={() => this.onRemove()}>Remove</button>
                            <Row></Row>
                        </FormGroup>
                    }
                    <FormGroup>
                        <DropdownButton title={mainTitle}>
                            {
                                this.state.mains.map((item: any, index: number) => (
                                    <Dropdown.Item key={item.id} onSelect={() => this.onMainPicked(index)}>
                                        <img className="img-item" src={item.image} alt="" />{item.name}
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
                                        <img className="img-item" src={item.image} alt="" />{item.name}
                                    </Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    </FormGroup>
                    <FormGroup className="text-center">
                        {addingItem
                            ? <button className="btn btn-primary btn-on-bottom"
                                onClick={() => this.onAdd()}>Add</button>
                            : <button className="btn btn-primary btn-on-bottom"
                                onClick={() => this.onReplace()}>Replace</button>
                        }
                    </FormGroup>
                </Container>
            </Rodal>
        )
    }
}