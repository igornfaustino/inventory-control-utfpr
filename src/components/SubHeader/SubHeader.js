import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem
} from 'reactstrap';


import { NavLink } from 'react-router-dom';

import Line from './Line/Line';
import '../../pages/Pages.css';

export default class SubHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.title
		};
	}
	
	render() {
		return (
			<div>
                <h2 className="font font-nav margin-title" align='left'>{this.state.title}</h2>
                <Line></Line>
            </div>
		);
	}
}