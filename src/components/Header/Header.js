import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem
} from 'reactstrap';


import { NavLink } from 'react-router-dom';

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
	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="md">
					<NavLink to='/' >
						<img src={require('../../images/logoUTFPR.png')} width="120" alt="UTFP-Logo"></img>
					</NavLink>
					
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem className={'menu-nav'} navbar-rigth>
								<NavLink to='/novasolicitacoes' className={'menu-icon'} activeStyle={activeStyle}>Nova Solicitação</NavLink>
							</NavItem>
							<NavItem className={'menu-nav'}>
								<NavLink to='/produtos' className={'menu-icon'} activeStyle={activeStyle}>Produtos já solicitados</NavLink>
							</NavItem>
							<NavItem className={'menu-nav'}>
								<NavLink to='/solicitacoes' className={'menu-icon'} activeStyle={activeStyle}>Suas Solicitações</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
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