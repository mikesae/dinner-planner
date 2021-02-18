import React, {Component} from "react";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons/faWindowClose";
import {Container, Dropdown, FormGroup, FormLabel} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {API, Auth} from "aws-amplify";
import * as queries from "./graphql/queries";

export interface IAddToPlannerModalProps {
    isOpen: boolean;
    OnOK: () => void;
    OnClose: () => void;
}

interface IMealItem {
    id: number;
    name: string;
    image: string;
}

interface IAddToPlannerModalState {
    selectedMain: number;
    selectedSide: number;
    mains: IMealItem[];
    sides: IMealItem[]
}

export default class AddToPlannerModal extends Component<IAddToPlannerModalProps, IAddToPlannerModalState> {
    constructor(props: IAddToPlannerModalProps) {
        super(props);
        this.state = {
            selectedMain: -1,
            selectedSide: -1,
            mains: [],
            sides: []
        };
    }


    async componentDidMount() {
        try {
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
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
                        <button className="btn btn-primary btn-on-bottom" onClick={() => this.props.OnOK()}>Add</button>
                    </FormGroup>
                </Container>
            </Modal>
        )
    }
}