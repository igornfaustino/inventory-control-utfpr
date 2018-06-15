import React from 'react';


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
                <h2 className="font-sb font-nav margin-title" align='left'>{this.state.title}</h2>
                <Line></Line>
            </div>
		);
	}
}