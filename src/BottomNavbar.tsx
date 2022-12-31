import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import './BottomNavbar.scss';
import { faUtensils as MainIcon } from '@fortawesome/free-solid-svg-icons/faUtensils';
import { faCarrot as SideIcon } from '@fortawesome/free-solid-svg-icons/faCarrot';
import { faIceCream as DessertIcon} from '@fortawesome/free-solid-svg-icons/faIceCream';

export default class BottomNavbar extends Component {
    render() {
        return (
            <Navbar className="jumbotron-fluid border-top justify-content-center navbar-bottom" fixed="bottom">
                <NavItem className="text-center">
                    <NavLink
                        to="/mains"
                        isActive={match => {
                            if (!match) {
                                return false;
                            }
                            return match.isExact;
                        }}
                        activeClassName="active"
                    >
                        <div className="btn">
                            <FontAwesomeIcon className="link-icon" icon={MainIcon}/>
                            <div className="icon-label">Mains</div>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem className="text-center">
                    <NavLink
                         to="/sides"
                         isActive={match => {
                             if (!match) {
                                 return false;
                             }
                             return match.isExact;
                         }}
                         activeClassName="active"
                    >
                        <div className="btn">
                            <FontAwesomeIcon className="link-icon" icon={SideIcon}/>
                            <div className="icon-label">Sides</div>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem className="text-center">
                    <NavLink
                         to="/desserts"
                         isActive={match => {
                             if (!match) {
                                 return false;
                             }
                             return match.isExact;
                         }}
                         activeClassName="active"
                    >
                        <div className="btn">
                            <FontAwesomeIcon className="link-icon" icon={DessertIcon}/>
                            <div className="icon-label">Desserts</div>
                        </div>
                    </NavLink>
                </NavItem>
            </Navbar>
        );
    }
}