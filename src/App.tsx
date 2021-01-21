import React, { lazy, Suspense, Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BottomNavbar from './BottomNavbar';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './App.scss';
import './transitions.scss';
import { withAuthenticator } from '@aws-amplify/ui-react'

const Planner = lazy(() => import('./Planner'));
const Mains = lazy(() => import('./Mains'));
const Sides = lazy(() => import('./Sides'));
const Profile = lazy(() => import('./Profile'));

class App extends Component {
    render() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                        <Route
                            render={({location}) => (
                                <CSSTransitionGroup
                                    transitionName="cross-fade"
                                    transitionEnterTimeout={1000}
                                    transitionLeaveTimeout={1000}
                                >
                                    <div key={location.pathname}>
                                        <Switch location={location}>
                                            <Route path="/" exact component={Planner}/>
                                            <Route path="/mains" component={Mains}/>
                                            <Route path="/sides" component={Sides}/>
                                            <Route path="/profile" component={Profile}/>
                                        </Switch>
                                    </div>
                                </CSSTransitionGroup>
                            )}
                        />
                    <BottomNavbar/>
                </BrowserRouter>
            </Suspense>
         );
    }
}

export default withAuthenticator(App);