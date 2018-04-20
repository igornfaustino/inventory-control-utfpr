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
                <h2 className='font' align='left' className='margin-title'>{this.state.title}</h2>
                <Line></Line>
            </div>
		);
	}
}