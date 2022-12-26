import React, { Suspense, Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BottomNavbar from './BottomNavbar';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './App.scss';
import './transitions.scss';
import { withAuthenticator } from '@aws-amplify/ui-react'
import {getPreviousStartDay} from "./DateFunctions";
import Planner from './Planner';
import Sides from './Sides';
import Profile from './Profile';
import ItemDetail from "./ItemDetail";
import Mains from './Mains';
import Desserts from './Desserts';

class App extends Component {
    state = {
        startDate: getPreviousStartDay(new Date())
    }

    startDateUpdater(date:Date):void {
        this.setState({startDate: date})
    }

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
                                            <Route exact path="/">
                                                <Planner startDate={this.state.startDate} startDateUpdater={(date) => this.startDateUpdater(date)} />
                                            </Route>
                                            <Route path="/mains" component={Mains}/>
                                            <Route path="/sides" component={Sides}/>
                                            <Route path="/desserts" component={Desserts}/>
                                            <Route path="/profile" component={Profile}/>
                                            <Route path="/item/:id" component={ItemDetail}/>
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