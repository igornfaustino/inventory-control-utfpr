import React from 'react';

import {Link} from 'react-router-dom';
import { Glyphicon } from "react-bootstrap";
import Line from './Line/Line';
import '../../pages/Pages.css';

export class LevelSubHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pages: props.pages
		};
	}
	LevelPages= ()=>{
		const pages=this.state.pages.map(page=>{
			return(
			<div>
				<Link to={page.url}>
					{page.nome}
				</Link>
				 
			</div>
			)
		})
		return pages
	}

	render() {
		return (
			<div>
                <h2 className="font font-nav margin-title" align='left'>{this.state.title}</h2>
				<this.LevelPages/>
                <Line></Line>
            </div>
		);
	}
}
export class SubHeader extends React.Component {
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