import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import NewProduct from './pages/NewProduct/NewProduct';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Main></Main>
					{/* <NewProduct></NewProduct> */}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
