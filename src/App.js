import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Header from './components/Header/Header';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Main></Main>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
