import React, {Component} from 'react';
import './TopNavbar.scss';
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface ITopNavBarProps {
    title: string;
    showBackNav: boolean;
}

export default class TopNavbar extends Component<ITopNavBarProps> {
    render() {
        return (
            <>
            <Navbar className="jumbotron-fluid border-bottom navbar-top" fixed="top">
                <Row className="container-fluid no-gutters">
                    <Col className="col-2">
                        {this.props.showBackNav &&
                        <Link to="/" className="navbar-left-link">
                            <div className="btn">
                                <FontAwesomeIcon className="link-icon" icon={faChevronLeft}/>
                            </div>
                        </Link>
                        }
                    </Col>
                    <Col className="col-8 navbar-content">
                        <span>{this.props.title}</span>
                        <div>
                            {this.props.children}
                        </div>
                    </Col>
                    <Col className="col-2 col-image">
                        <Image thumbnail fluid src="/logo.png"/>
                    </Col>
                </Row>
            </Navbar>
            <div className="spacer"/>
            </>
        );
    }
}