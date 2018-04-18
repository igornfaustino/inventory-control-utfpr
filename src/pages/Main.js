import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import NewRequests from './NewRequests';
import Requests from './Requests';
import Products from './Products/Products';

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