import React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import axios from 'axios';


import {NavLink} from 'react-router-dom';
import {isAdmin, isLoggedIn} from '../../utils/userLogin';

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

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                        <NavLink to='/' className={'menu-icon'}
                                 activeStyle={activeStyle}>
                            <img src={require('../../images/logoUTFPR.png')}
                                 style={{height: '30px'}} alt="UTFP-Logo"/>
                        </NavLink>
                    {
                        isLoggedIn() ?
                            <NavbarToggler onClick={this.toggle}/>
                            : ''
                    }

                    {
                        isLoggedIn() ? (
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className={'ml-auto'} navbar>
                                    <NavItem className={'menu-nav'}>
                                        <NavLink to='/solicitacao/' className={'menu-icon'}
                                                 activeStyle={activeStyle}>Solicitação</NavLink>
                                    </NavItem>
                                    {
                                        isAdmin() ? (
                                            <Nav navbar>
                                                <NavItem className={'menu-nav'}>
                                                    <NavLink to='/requisicao/' className={'menu-icon'}
                                                             activeStyle={activeStyle}>Compras</NavLink>
                                                </NavItem>
                                                <NavItem className={'menu-nav'}>
                                                    <NavLink to='/almoxarifado/' className={'menu-icon'}
                                                             activeStyle={activeStyle}>Almoxarifado</NavLink>
                                                </NavItem>
                                                <NavItem className={'menu-nav'}>
                                                    <NavLink to='/usuario/' className={'menu-icon'}
                                                             activeStyle={activeStyle}>Usuario</NavLink>
                                                </NavItem>
                                                <NavItem className={'menu-nav'}>
                                                    <NavLink to='/configuracoes' className={'menu-icon'}
                                                             activeStyle={activeStyle}>Configurações</NavLink>
                                                </NavItem>
                                            </Nav>
                                        ) : ''
                                    }
                                    <NavItem className={'menu-nav'}>
                                        <NavLink to='/logout' className={'menu-icon'}
                                                 onClick={this.logout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        ) : (
                            <Nav navbar>
                                <NavItem className="font-header-login">
                                    Sistema de Controle do Patrimônio e de Solicitações da
                                    UTFPR-CM
                                </NavItem>
                            </Nav>
                        )
                    }
                </Navbar>
            </div>
        );
    }
}

const activeStyle = {
    color: '#d9d9d9',
    textDecoration: 'underline',
    textDecorationColor: '#ffcc00'
};
