import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Main from './pages/Main';
import Header from './components/Header/Header';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header></Header>
				{/* <header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header> */}
				<Main></Main>
			</div>
		);
	}
}

export default App;
