import React, { Component } from "react";
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import { Container, Dropdown, FormGroup, FormLabel } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Auth } from "aws-amplify";
import './Modal.scss';
import ImageComponent from "./ImageComponent";
import Row from "react-bootstrap/Row";
import { getSortedItems } from "./itemQueries";
import { getMealItemIds, updateMealItems, addMeal } from "./MealFunctions";

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
    selectedDessert: number;
    mains: IMealItem[];
    sides: IMealItem[];
    desserts: IMealItem[];
}

const NOT_SELECTED:number = -1;

export default class UpdatePlannerModal extends Component<IUpdatePlannerModalProps, IUpdatePlannerModalState> {
    constructor(props: IUpdatePlannerModalProps) {
        super(props);
        this.state = {
            userName: '',
            selectedMain: NOT_SELECTED,
            selectedSide: NOT_SELECTED,
            selectedDessert: NOT_SELECTED,
            mains: [],
            sides: [],
            desserts: []
        };
    }

    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
            this.setState({ userName: user.username });
            this.setState({ mains: await getSortedItems(user.username, 'Mains') });
            this.setState({ sides: await getSortedItems(user.username, 'Sides') });
            this.setState({ desserts: await getSortedItems(user.username, 'Desserts') });
        } catch (error) {
            console.log('error: ', error);
        }
    }

    onMainPicked(idxItem: number) {
        this.setState({ selectedMain: idxItem, selectedSide: NOT_SELECTED, selectedDessert: NOT_SELECTED });
    }

    onSidePicked(idxItem: number) {
        this.setState({ selectedMain: NOT_SELECTED, selectedSide: idxItem, selectedDessert: NOT_SELECTED });
    }

    onDessertPicked(idxItem: number) {
        this.setState({selectedMain: NOT_SELECTED, selectedSide: NOT_SELECTED, selectedDessert: idxItem});
    }

    getSelectedItem(): IMealItem {
        if (this.state.selectedMain !== NOT_SELECTED) {
            return { ...this.state.mains[this.state.selectedMain] };
        } else if (this.state.selectedSide !== NOT_SELECTED) {
            return { ...this.state.sides[this.state.selectedSide] };
        } else if (this.state.selectedDessert !== NOT_SELECTED) {
            return {...this.state.desserts[this.state.selectedDessert] };
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
            await updateMealItems(newItemIds, this.props.mealId);
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
            let mealId: string | undefined = this.props.mealId;if (typeof mealId === 'undefined') {
                mealId = await addMeal(this.props.date, this.state.userName);
            }

            const itemIds = await getMealItemIds(mealId);
            itemIds.push(selectedItem.id);
            await updateMealItems(itemIds, mealId);

        } catch (e) {
            console.log('Error: ' + e);
        }
        this.props.OnOK();
    }

    render() {
        let mainTitle;
        let sideTitle;
        let dessertTitle;

        const idxMain = this.state.selectedMain;
        const idxSide = this.state.selectedSide;
        const idxDessert = this.state.selectedDessert;
        const addingItem = this.props.itemId === '';

        if (idxMain === NOT_SELECTED) {
            mainTitle = <span>Choose a Main</span>;
        } else {
            mainTitle = <span><ImageComponent src={this.state.mains[idxMain].image} />{this.state.mains[idxMain].name}</span>;
        }
        if (idxSide === NOT_SELECTED) {
            sideTitle = <span>Choose a Side</span>;
        } else {
            sideTitle = <span><ImageComponent src={this.state.sides[idxSide].image} />{this.state.sides[idxSide].name}</span>;
        }
        if (idxDessert === NOT_SELECTED) {
            dessertTitle = <span>Choose a Dessert</span>;
        } else {
            dessertTitle = <span><ImageComponent src={this.state.desserts[idxDessert].image} />{this.state.desserts[idxDessert].name}</span>;
        }

        return (
            <Rodal
                visible={this.props.isOpen}
                onClose={() => this.props.OnClose()}
                animation="slideUp"
                duration={1000}
                measure="%"
                width={100}
                height={100}
            >
                <div className="spacer" />
                <Container className="planner-modal">
                    {!addingItem &&
                        <FormGroup>
                            <button className="btn btn-primary" onClick={() => this.onRemove()}>Remove</button>
                            <Row/>
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
                        <FormLabel>OR</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <DropdownButton title={dessertTitle}>
                            {
                                this.state.desserts.map((item: any, index: number) => (
                                    <Dropdown.Item key={item.id} onSelect={() => this.onDessertPicked(index)}>
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