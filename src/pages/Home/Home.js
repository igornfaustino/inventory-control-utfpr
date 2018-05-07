import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<Header></Header>
				<div align="left" className={'margin'}>
					<h2>Bem-vindo Professor(a)!</h2>
					<h3>Sistema de controle do patrimônio e de solicitações UTFPR-CM</h3>
				</div >
			</div>
		);
	}
}