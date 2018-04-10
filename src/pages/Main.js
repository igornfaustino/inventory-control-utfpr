import React from 'react';
import { Switch, Route } from 'react-router-dom';

{/* EXAMPLE... To see more...
 https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
*/}


// IMPORT HERE THE COMPONENTS THAT WILL BE RENDER!
// import Home from './Home'
// import Roster from './Roster'
// import Schedule from './Schedule'

/**
 * Main page, here you can pass your path and the componet to render...
 */
const Main = () => (
	<main>
		{/* <Switch>
			<Route exact path='/' component={Home} />
			<Route path='/roster' component={Roster} />
			<Route path='/schedule' component={Schedule} />
		</Switch> */}
	</main>
);

export default Main;