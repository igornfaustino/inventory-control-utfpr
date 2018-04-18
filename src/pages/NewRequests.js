import React from 'react';
import './Pages.css';
import Line from '../components/Line/Line';

export default class NewRequest extends React.Component {
	render() {
		return (
			<div align='left' className='margin-title'>
				<h2 className='font'>Novas solicitações</h2>
				<Line></Line>
			</div >
		);
	}
}