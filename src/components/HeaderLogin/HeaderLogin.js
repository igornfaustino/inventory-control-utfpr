import React from 'react';
import {
	Navbar,
} from 'reactstrap';


import { NavLink } from 'react-router-dom';

import '../Header/Header.css';
import './HeaderLogin.css';

export default class Header extends React.Component {
	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="md">
					<NavLink to='/'><img src={require('../../images/logoUTFPR.png')} alt="UTFP-Logo"></img></NavLink>
						<h1 className="font-header-login">&emsp;Sistema de Controle do Patrimônio e de Solicitações da UTFPR-CM</h1>
				</Navbar>
			</div >
		);
	}
}