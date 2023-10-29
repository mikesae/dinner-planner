import { withAuthenticator } from '@aws-amplify/ui-react';
import { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './App.scss';
import BottomNavbar from './BottomNavbar';
import { getPreviousStartDay } from './DateFunctions';
import Desserts from './Desserts';
import ItemDetail from './ItemDetail';
import Mains from './Mains';
import Planner from './Planner';
import Profile from './Profile';
import Sides from './Sides';
import Vegetables from './Vegetables';
import './transitions.scss';

export class UnauthenticatedApp extends Component {
	state = {
		startDate: getPreviousStartDay(new Date()),
	};

	startDateUpdater(date: Date): void {
		this.setState({ startDate: date });
	}

	render() {
		return (
			<Suspense fallback={<div>Loading...</div>}>
				<BrowserRouter>
					<Route
						render={({ location }) => (
							<CSSTransitionGroup
								transitionName='cross-fade'
								transitionEnterTimeout={1000}
								transitionLeaveTimeout={1000}
							>
								<div key={location.pathname}>
									<Switch location={location}>
										<Route exact path='/'>
											<Planner
												startDate={this.state.startDate}
												startDateUpdater={(date) => this.startDateUpdater(date)}
											/>
										</Route>
										<Route path='/mains' component={Mains} />
										<Route path='/sides' component={Sides} />
										<Route path='/vegetables' component={Vegetables} />
										<Route path='/desserts' component={Desserts} />
										<Route path='/profile' component={Profile} />
										<Route path='/item/:id' component={ItemDetail} />
									</Switch>
								</div>
							</CSSTransitionGroup>
						)}
					/>
					<BottomNavbar />
				</BrowserRouter>
			</Suspense>
		);
	}
}

export default withAuthenticator(UnauthenticatedApp);
