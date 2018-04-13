import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import NewRequests from './NewRequests';
import Requests from './Requests';
import Products from './Products';

/* EXAMPLE... To see more...
 https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
*/


// IMPORT HERE THE COMPONENTS THAT WILL BE RENDER!
// import Schedule from './Schedule'

/**
 * Main page, here you can pass your path and the componet to render...
 */
const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/novasolicitacoes' component={NewRequests} />
			<Route path='/solicitacoes' component={Requests} />
			<Route path='/produtos' component={Products} />
		</Switch>
	</main>
);

export default Main;