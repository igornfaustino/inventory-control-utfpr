import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem
} from 'reactstrap';
import axios from 'axios';


import { NavLink } from 'react-router-dom';
import { isAdmin } from '../../utils/userLogin';

import './Header.css';

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	logout() {
		axios.defaults.headers = {}
		localStorage.clear()
	}

	render() {
		let header
		if (isAdmin()) {
			header = (<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem className={'menu-nav'}>
						<NavLink to='/novasolicitacoes' className={'menu-icon'} activeStyle={activeStyle}>Nova Solicitação</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/solicitacoes' className={'menu-icon'} activeStyle={activeStyle}>Solicitações</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/requisicao' className={'menu-icon'} activeStyle={activeStyle}>Compras</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/almoxarifado' className={'menu-icon'} activeStyle={activeStyle}>Almoxarifado</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/configuracoes' className={'menu-icon'} activeStyle={activeStyle}>Configurações</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/' className={'menu-icon'} onClick={this.logout}>Logout</NavLink>
					</NavItem>
				</Nav>
			</Collapse>)
		} else {
			header = (<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem className={'menu-nav'}>
						<NavLink to='/novasolicitacoes' className={'menu-icon'} activeStyle={activeStyle}>Nova Solicitação</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/produtos' className={'menu-icon'} activeStyle={activeStyle}>Histórico de pedidos</NavLink>
					</NavItem>
					<NavItem className={'menu-nav'}>
						<NavLink to='/' className={'menu-icon'} onClick={this.logout}>Logout</NavLink>
					</NavItem>
				</Nav>
			</Collapse>)
		}

		return (
			<div>
				<Navbar color="dark" dark expand="md">
					<NavLink to='/home'><img src={require('../../images/logoUTFPR.png')} style={{ width: '150px' }} alt="UTFP-Logo"></img></NavLink>
					<NavbarToggler onClick={this.toggle} />
					{ header }
				</Navbar>
			</div >
		);
	}
}

const activeStyle = {
	color: '#d9d9d9',
	textDecoration: 'underline',
	textDecorationColor: '#ffcc00'
};