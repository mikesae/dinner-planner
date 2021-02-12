import React, {Component} from "react";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons/faWindowClose";
import {Container, Dropdown, FormGroup } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {API, Auth} from "aws-amplify";
import * as queries from "./graphql/queries";

export interface IAddToPlannerModalProps {
    isOpen: boolean;
    OnOK: () => void;
    OnClose: () => void;
}

export default class AddToPlannerModal extends Component<IAddToPlannerModalProps> {
    state = {
        mainTitle: 'Choose Main',
        sideTitle: 'Choose Side',
        mains: [],
        sides: []
    };

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

    onMainPicked(value: string) {
        this.setState({mainTitle: value});
    }

    onSidePicked(value: string) {
        this.setState({sideTitle: value});
    }

    render() {
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
                        <DropdownButton title={this.state.mainTitle}>
                            {
                                this.state.mains.map((item: any) => (
                                    <Dropdown.Item key={item.id} onSelect={() => this.onMainPicked(item.name)}>
                                        <img className="img-item" src={item.image} alt=""/>{item.name}
                                    </Dropdown.Item>
                                ))
                            }
                        </DropdownButton>
                    </FormGroup>
                    <FormGroup>
                        <DropdownButton title={this.state.sideTitle}>
                            {
                                this.state.sides.map((item: any) => (
                                    <Dropdown.Item key={item.id} onSelect={() => this.onSidePicked(item.name)}>
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